import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Projecte/Components/login/login.component';
import { SignupComponent } from './Projecte/Components/signup/signup.component';
import { CalendariComponent } from './Projecte/Components/calendari/calendari.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { } from '@fullcalendar/interaction';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CalendariComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
