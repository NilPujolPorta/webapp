import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './Projecte/Components/calendar/calendar.component';
import { LoginComponent } from './Projecte/Components/login/login.component';
import { SignupComponent } from './Projecte/Components/signup/signup.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
