import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Projecte/Components/login/login.component';
import { SignupComponent } from './Projecte/Components/signup/signup.component';
import { ListComponent } from './Projecte/Components/list/list.component';
import { ListDeleteComponent } from './Projecte/Components/list-delete/list-delete.component';
import { AdminCreateUserComponent } from './Projecte/Components/admin-create-user/admin-create-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './Projecte/Components/calendar/calendar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BottomNavBarComponent } from './Projecte/Views/bottom-nav-bar/bottom-nav-bar.component';
import { BottomNavBarAdminComponent } from './Projecte/Views/bottom-nav-bar-admin/bottom-nav-bar-admin.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { obtainHeaderWithTokens } from './Projecte/Model/api/utils/obtainHeaderWithToken';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CalendarComponent,
    BottomNavBarComponent,
    ListComponent,
    AdminCreateUserComponent,
    ListDeleteComponent,
    BottomNavBarAdminComponent
  ],
  imports: [
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CheckboxModule,
    CalendarModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    MatTableModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
