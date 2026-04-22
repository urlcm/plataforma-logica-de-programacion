import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeTabComponent } from './home-tab/home-tab.component';
import { SolvingTabComponent } from './solving-tab/solving-tab.component';
import { LoginComponent } from './login/login.component';
import { ProgrammingTabComponent } from './programming-tab/programming-tab.component';
import { MainTabComponent } from './main-tab/main-tab.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'home', component: HomeTabComponent},
  { path: 'programming-tab', component: ProgrammingTabComponent },
  { path: 'solving-tab', component: SolvingTabComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
