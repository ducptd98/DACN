import { ApiErrorService } from './utilities/api-error.service';
import { ResponseInterceptorService } from './utilities/response-interceptor.service';
import { AlertProvider } from './utilities/alert.provider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { FeaturedModule } from './pages/featured/featured.module';
import { SharedModule } from './shared/shared.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { registerLocaleData } from '@angular/common';
// import en from '@angular/common/locales/en';

// registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FeaturedModule,
    SharedModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  // providers: [{ provide: NZ_I18N, useValue: en_US }],
  providers: [
    AlertProvider,
    ApiErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
