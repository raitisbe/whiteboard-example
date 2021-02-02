import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PmWhiteboardComponent} from './whiteboard.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [PmWhiteboardComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [PmWhiteboardComponent],
  entryComponents: [PmWhiteboardComponent],
})
export class PmWhiteboardModule {}
