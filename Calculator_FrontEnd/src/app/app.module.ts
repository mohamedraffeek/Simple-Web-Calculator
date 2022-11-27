import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DisplayComponent } from './frame/display/display.component';
import { ButtonsComponent } from './frame/buttons/buttons.component';
import { FrameComponent } from './frame/frame.component';


@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    ButtonsComponent,
    FrameComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
