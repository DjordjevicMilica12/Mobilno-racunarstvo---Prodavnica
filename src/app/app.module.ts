// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';
// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// // import { environment } from '../environments/environment';
// // import { AngularFireModule } from '@angular/fire/compat';
// // import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// // import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// // import { ReactiveFormsModule } from '@angular/forms';

// import { NgxWebstorageModule } from 'ngx-webstorage';
// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from './header/header.component';
// import { AuthService } from './auth.service';
// import { HttpClientModule } from '@angular/common/http';

// @NgModule({
//   declarations: [
//     AppComponent,
//     FooterComponent,
//     HeaderComponent
//   ],
//   imports: [
//     BrowserModule,
//     IonicModule.forRoot(),
//     HttpClientModule,
//     AppRoutingModule,
//     // AngularFireModule.initializeApp(environment.firebaseConfig),
//     // AngularFireAuthModule,
//     // AngularFirestoreModule,
//     // ReactiveFormsModule,
//     NgxWebstorageModule.forRoot()
//   ],
//   providers: [
//     { 
//       provide: RouteReuseStrategy, 
//       useClass: IonicRouteStrategy 
//     },
//     AuthService
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { environment } from '../environments/environment';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
