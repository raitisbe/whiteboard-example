import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {
  HsCompositionsParserService,
  HsDrawService,
  HsEventBusService,
  HsLayerEditorService,
  HsMapService,
  HsSaveMapService,
  HsStylerService,
} from 'hslayers-ng';
import {Injectable} from '@angular/core';
import {MapWhiteboard} from 'map-whiteboard-lib';
import {PmToastService} from '../toast/toast.service';
import {mapWhiteboard} from 'map-whiteboard-lib/src/types';
import {AppService} from '../app.service';

export type Credentials = {
  email: string;
  password?: string;
};

@Injectable({
  providedIn: 'root',
})
export class PmWhiteboardService {
  whiteboard: MapWhiteboard;
  constructor(
    public HsMapService: HsMapService,
    public HsSaveMapService: HsSaveMapService,
    public HsCompositionsParserService: HsCompositionsParserService,
    public HsLayerEditorService: HsLayerEditorService,
    public HsDrawService: HsDrawService,
    public PmToastService: PmToastService,
    public HsEventBusService: HsEventBusService,
    public HsStylerService: HsStylerService,
    public AppService: AppService
  ) {
    this.AppService.connected.subscribe(({mapComposition, email}) => {
      this.init({mapComposition, email});
    })
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#clearMap
   * @public
   * @description Clears map before loading a new map composition
   */
  clearMap(): void {
    const layers = this.HsMapService.map.getLayers().getArray();
    for (const layer of layers) {
      if (layer.get('from_composition') == true) {
        this.HsMapService.map.removeLayer(layer);
      }
    }
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#deleteMapComposition
   * @public
   * @description Deletes map composition, when called
   */
  deleteMapComposition(): void {
    this.whiteboard.deleteMapComposition();
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#grantUserAccessRights
   * @public
   * @param {string} userId User id
   * @param {string} right Read or Write value
   * @description Grants user access rights for map-whiteboard interactions
   */
  async grantUserAccessRights(userId: string, right: string): Promise<void> {
    await this.whiteboard.grantAccessRights(userId, right);
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#init
   * @public
   * @description Calls initial functions to communicate with map-whiteboard application
   */
  async init({mapComposition, email}): Promise<void> {
    await this.setupServer({
      email: email,
      password: '',
    });
    await this.whiteboard.waitAuth();
      this.whiteboard.getMapCompositions();
      this.HsMapService.map.getLayers().on('add', (e) => {
        //This is needed so the layer is removed when map is reset
        //TODO: Implement this also in whiteboard-lib but with collection rather then key-value pair on layer object
        e.element.set('from_composition', true);
      });
      if (mapComposition == undefined || mapComposition == '') {
        await this.publishComposition();
      } else {
        await this.loadCompositionForTree(mapComposition);
      }
      this.watchDrawingLayerChanges();
      this.watchForLayerChanges();
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#loadComposition
   * @public
   * @param {string} mapComposition Map composition for selected model
   * @param {boolean} setAllEditable If true, sets all map compostions layers as editable
   * @description Loads map composition when called
   */
  async loadComposition(
    mapComposition: string,
    setAllEditable: boolean
  ): Promise<void> {
    this.whiteboard.deactivate();
    this.clearMap();
    const compositionObj = await this.whiteboard.getMapComposition(
      mapComposition
    );
    this.HsCompositionsParserService.loadCompositionObject(
      compositionObj,
      true
    );
    this.whiteboard.activate();
    if (setAllEditable) {
      this.whiteboard.fillFeaturesForEditableLayers();
    }
    for (const layer of this.whiteboard.getVectorLayers()) {
      if (layer.get('title') != 'Results') {
        layer.set('popUp', {
          attributes: ['name'],
        });
        layer.set('editor', {
          editable: true,
        });
      }
    }
    this.HsDrawService.selectedLayer = null;
    this.HsDrawService.fillDrawableLayers();
  }
  /**
   * @param tree Selected tree
   * @ngdoc method
   * @name PmWhiteboardService#loadCompositionForTree
   * @private
   * @description Loads map composition for model
   */
  private async loadCompositionForTree(compositionId): Promise<void> {
    await this.loadComposition(compositionId, true);
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#publishComposition
   * @private
   * @param {PmTree} tree New model created
   * @description Publishes a new map composition to newly created model (tree)
   */
  private async publishComposition() {
    const layersToExclude = [];
    if (this.whiteboard?.scratchLayer) {
      layersToExclude.push({
        layer: this.whiteboard.scratchLayer,
        checked: false,
      });
    }
    if (this.whiteboard?.cursorLayer) {
      layersToExclude.push({
        layer: this.whiteboard.cursorLayer,
        checked: false,
      });
    }
    const compositionObj = this.HsSaveMapService.map2json(
      this.HsMapService.map,
      {
        layers: layersToExclude,
        title: '<composition_title>',
        abstract: '<composition_abstract>',
      },
      {},
      {}
    );
    const response = await this.whiteboard.publishMapComposition(
      compositionObj
    );
    this.AppService.compositionId = response._id;
    await this.loadComposition(response._id, true);
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#setEditLayer
   * @private
   * @param {VectorLayer} layer layer selected
   * @param {boolean} getFeatures (Optional) Get layer features if true
   * @description Sets selected layer for editing from the map-whiteboard server
   */
  private setEditLayer(layer: VectorLayer, getFeatures?: boolean): void {
    this.whiteboard.setEditableLayer(layer, getFeatures);
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#setupServer
   * @public
   * @param {Credentials} credentials Logged in user
   * @description Sets up a new user session for map-whiteboard application
   */
  async setupServer(credentials: Credentials): Promise<any> {
    class manipulators {
      HsSaveMapService: HsSaveMapService;
      constructor(HsSaveMapService) {
        this.HsSaveMapService = HsSaveMapService;
      }
      serializeLayer(layer) {
        return this.HsSaveMapService.layer2json(layer);
      }
    }

    const map = await this.HsMapService.loaded();
    this.whiteboard = new MapWhiteboard({
      map,
      controlPosition: 'hidden',
      activate: true,
      serverUrl: new URL(
        window.location.hostname.indexOf('dih.bosc.lv') == -1
          ? 'https://local.polirural-mb.lv/map-whiteboard/'
          : 'https://dih.bosc.lv/map-whiteboard-demo/map-whiteboard/'
      ),
      credentials: {
        provider: '',
        username: credentials.email,
        password: '',
      },
      manipulation: new manipulators(this.HsSaveMapService),
    });
    this.whiteboard.scratchLayer.set('title', 'Scratch layer');
    this.whiteboard.cursorLayer.set('title', 'Cursor layer');
    this.whiteboard.onSync().subscribe((result: mapWhiteboard.SyncResult) => {
      if (result?.error && result.layer.name != 'cursor') {
        console.error(
          'Some error occurred',
          result.error,
          result.featureId,
          result.layer
        );
      }
    });
    //NOTE: Temporary because editLayer is not public yet
    //this.whiteboard.editLayer.set('title', 'Edit layer');
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#watchDrawingLayerChanges
   * @private
   * @description Listens for any new features drawn in the selected layer
   */
  private watchDrawingLayerChanges(): void {
    if (this.HsDrawService.selectedLayer) {
      this.setEditLayer(this.HsDrawService.selectedLayer, true);
    }

    this.HsDrawService.drawingLayerChanges.subscribe(
      (current: {layer: BaseLayer; source: VectorSource}) => {
        setTimeout(() => {
          this.setEditLayer(current.layer);
        }, 0);
      }
    );

    this.HsEventBusService.vectorQueryFeatureSelection.subscribe(
      ({feature, selector}) => {
        const layer = this.HsMapService.getLayerForFeature(feature);
        if (layer) {
          this.setEditLayer(layer, false);
        }
      }
    );
  }
  /**
   * @ngdoc method
   * @name PmWhiteboardService#watchForLayerChanges
   * @private
   * @description Listens for any user created changes in current compositions layers or features
   */
  private watchForLayerChanges(): void {
    this.HsLayerEditorService.layerTitleChange.subscribe(
      async (e: {newTitle: string; layer: VectorLayer}) => {
        if (e.newTitle === '') {
          this.PmToastService.show('Layer title cannot be empty!', {
            header: 'Error',
            delay: 6000,
            autohide: true,
            classname: 'bg-danger text-light',
          });
        } else {
          if (e?.newTitle && e?.layer?.get('metadata').id) {
            const layerId = e.layer.get('metadata').id;
            const response = await this.whiteboard.renameLayer(
              e.newTitle,
              layerId
            );
            if (response.status == 403) {
              this.PmToastService.show(
                'This layer cannot be renamed for the composition!',
                {
                  header: 'Error',
                  delay: 6000,
                  autohide: true,
                  classname: 'bg-danger text-light',
                }
              );
            }
          }
        }
      }
    );
    this.HsStylerService.newLayerStyleSet.subscribe(
      async (layer: VectorLayer) => {
        if (layer?.get('metadata').id) {
          const layerId = layer.get('metadata').id;
          if (layer.get('hsOriginalStyle')) {
            const style = this.HsStylerService.getLayerStyleObject(layer);
            if (style !== undefined) {
              layer.setStyle(style);
            }
          }
          await this.whiteboard.styleLayer(layerId, layer);
        }
      }
    );
  }
}
