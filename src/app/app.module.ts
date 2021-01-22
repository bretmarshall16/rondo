import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CounterComponent } from './components/counter/counter.component';
import { MaterialModule } from './material.module';
import { ReportPopUpComponent } from './components/report-pop-up/report-pop-up.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { services } from './services';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ReportPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
