import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// Auth service
import { AuthService } from "./shared/services/auth.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { MisFotosComponent } from './components/mis-fotos/mis-fotos.component';
import { SacarFotoFeaComponent } from './components/sacar-foto-fea/sacar-foto-fea.component';
import { SacarFotoLindaComponent } from './components/sacar-foto-linda/sacar-foto-linda.component';
import { MenuComponent } from './components/menu/menu.component';
import { TodasFotosComponent } from './components/todas-fotos/todas-fotos.component';
import { TodasFotosFeasComponent } from './components/todas-fotos-feas/todas-fotos-feas.component';
import { GraficoLindasComponent } from './components/grafico-lindas/grafico-lindas.component';
import { GraficoFeasComponent } from './components/grafico-feas/grafico-feas.component';

@NgModule({
  declarations: [AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    InicioComponent,
    MisFotosComponent,
    SacarFotoFeaComponent,
    SacarFotoLindaComponent,
    MenuComponent,
    TodasFotosComponent,
    TodasFotosFeasComponent,
    GraficoLindasComponent,
    GraficoFeasComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
