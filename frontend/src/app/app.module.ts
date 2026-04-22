import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ProgrammingTabComponent } from './programming-tab/programming-tab.component';
import { SolvingTabComponent } from './solving-tab/solving-tab.component';
import { HomeTabComponent } from './home-tab/home-tab.component';
import { MainTabComponent } from './main-tab/main-tab.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CreateAccountComponent,
    ProgrammingTabComponent,
    SolvingTabComponent,
    HomeTabComponent,
    MainTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
