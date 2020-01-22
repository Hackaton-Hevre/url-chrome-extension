import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'chrome-extension-async/chrome-extension-async';
import {AppService} from './app.service';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/typings/button';
import {MatCardModule} from '@angular/material/typings/card';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
