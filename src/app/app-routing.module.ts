import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SplashComponent } from './components/splash/splash.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SacarFotoLindaComponent } from './components/sacar-foto-linda/sacar-foto-linda.component';
import { SacarFotoFeaComponent } from './components/sacar-foto-fea/sacar-foto-fea.component';
import { MisFotosComponent } from './components/mis-fotos/mis-fotos.component';
import { TodasFotosComponent } from './components/todas-fotos/todas-fotos.component';
import { TodasFotosFeasComponent } from './components/todas-fotos-feas/todas-fotos-feas.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {path: 'splash', component:SplashComponent},
  {path: 'inicio', component:InicioComponent},
  {path: 'sacarFotoLinda', component:SacarFotoLindaComponent},
  {path: 'sacarFotoFea', component:SacarFotoFeaComponent},
  {path: 'misFotos', component:MisFotosComponent},
  {path: 'todasFotos', component:TodasFotosComponent},
  {path: 'todasFotosFeas', component:TodasFotosFeasComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
