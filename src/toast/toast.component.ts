import {Component} from '@angular/core';
import {PmToastService} from './toast.service';

@Component({
  selector: 'pm-toast',
  templateUrl: './toast.html',
  styles: [
    `
      :host {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 9999;
        border-style: none;
      }
    `,
  ],
})
export class PmToastComponent {
  constructor(public PmToastService: PmToastService) {}
}
