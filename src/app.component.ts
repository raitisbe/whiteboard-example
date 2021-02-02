import {AppService} from './app.service';
import {Component} from '@angular/core';
import {HsLayoutService} from 'hslayers-ng';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  block = 'hsMap';
  email = '';
  constructor(
    public HsLayoutService: HsLayoutService,
    public AppService: AppService
  ) {
    this.HsLayoutService.sidebarButtons = true;
    this.HsLayoutService.setDefaultPanel('layermanager');
    this.HsLayoutService.sidebarExpanded = false;
    this.AppService.init();
  }

  connect(){
    this.AppService.connected.next({mapComposition: this.AppService.compositionId, email: this.email})
  }
}
