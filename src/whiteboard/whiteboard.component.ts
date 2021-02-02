import {Component} from '@angular/core';
import {PmWhiteboardService} from './whiteboard.service';

@Component({
  selector: 'pm-whiteboard',
  templateUrl: './whiteboard.html',
})
export class PmWhiteboardComponent {
  email: any;
  password: any;

  constructor(
    public PmAuthService: PmWhiteboardService // In template
  ) {}
}
