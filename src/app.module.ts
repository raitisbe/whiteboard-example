import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HslayersModule} from 'hslayers-ng';
import {NgModule} from '@angular/core';
import {PmNavBarComponent} from './nav-bar.component';
import {PmToastComponent} from './toast/toast.component';
import {PmToastModule} from './toast/toast.module';
import {PmWhiteboardComponent} from './whiteboard/whiteboard.component';
import {PmWhiteboardModule} from './whiteboard/whiteboard.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HslayersModule,
    PmToastModule,
    PmWhiteboardModule,
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  declarations: [AppComponent, PmNavBarComponent],
  entryComponents: [
    AppComponent,
    PmNavBarComponent,
    PmToastComponent,
    PmWhiteboardComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
