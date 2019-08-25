import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {PostPageComponent} from './post-page/post-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostComponent} from './shared/components/post/post.component';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {registerLocaleData} from "@angular/common";
import ruLocal from "@angular/common/locales/ru";
import {ErrorLayoutComponent} from "./shared/components/error-layout/error-layout.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(ruLocal, 'ru')

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}


@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        PostPageComponent,
        HomePageComponent,
        PostComponent,
        ErrorLayoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [INTERCEPTOR_PROVIDER],
    bootstrap: [AppComponent]
})
export class AppModule {
}
