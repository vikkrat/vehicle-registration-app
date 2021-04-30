import { CustomValidator } from './services/custom.validator';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCarOwnersService } from './utilities/in-memory-data-service';
import { CarOwnersService } from './services/car-owners-service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { environment } from 'src/environments/environment';
import { ErrorMessagesHandlerService } from './services/error-messages-handler.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ?
    [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryCarOwnersService, { delay: 1000 }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [CarOwnersService, CustomValidator, ErrorMessagesHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
