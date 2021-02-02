import './whhg-font/css/whhg2.css';
import View from 'ol/View';
import {HsConfig, HsCoreService} from 'hslayers-ng';
import {Image as ImageLayer, Tile} from 'ol/layer';
import {Injectable} from '@angular/core';
import {OSM} from 'ol/source';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiUrl = '../admin/api';
  
  imagePathUrl = 'assets/images';
  public connected = new Subject();
  compositionId: string;

  constructor(public HsCoreService: HsCoreService, public HsConfig: HsConfig) {}
  getHostname(): string {
    const url = window.location.href;
    const urlArr = url.split('/');
    const domain = urlArr[2];
    return urlArr[0] + '//' + domain;
  }
  getImagePath(): string {
    return this.imagePathUrl;
  }
  init(): void {
    this.HsConfig.update({
      assetsPath: 'assets/hslayers-ng',
      proxyPrefix: '../proxy/',
      status_manager_url: '/wwwlibs/statusmanager2/index.php',
      searchProvider: (q) => {
        return `/proxy/search/?q=${q}`;
      },
      popUpDisplay: 'click',
      default_layers: [
        new Tile({
          source: new OSM(),
          title: 'Open street map',
          base: true,
          editor: {editable: false},
          removable: false,
        })
      ],
      project_name: 'erra/map',
      default_view: new View({
        center: [2838384.1419443055, 7837925.97841041],
        zoom: 9,
        units: 'm',
      }),
      advancedForm: true,
      datasources: [],
      hostname: {
        'default': {
          'title': 'Default',
          'type': 'default',
          'editable': false,
          'url': this.getHostname(),
        },
      },
      panelWidths: {
        feature_table: 400,
      },
      panelsEnabled: {
        language: false,
        composition_browser: false,
        legend: false,
        info: true,
        saveMap: false,
        draw: true,
        sensors: false,
        feature_crossfilter: false,
      },
      componentsEnabled: {
        basemapGallery: false,
      },
      allowAddExternalDatasets: true,
    });
  }
}
