import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-sacar-foto-linda',
  templateUrl: './sacar-foto-linda.component.html',
  styleUrls: ['./sacar-foto-linda.component.scss'],
})
export class SacarFotoLindaComponent implements OnInit {
  public user:any;
  public esperando:boolean=false;
  constructor(public photoService: PhotoService, public authService: AuthService, public router:Router) 
  {
    this.user= authService.userData;
    console.log(this.user.email);
   }

  ngOnInit() {}

  addPhotoToGallery() {
    this.esperando=true;
    this.photoService.addNewToGallery('fotosLindas').then(url => 
      { 
        this.esperando=false;
        this.photoService.guardarFoto(this.authService.userData.email,url,0,"fotosLindas", new Date().toLocaleString());
        this.router.navigate(['misFotos']);
      });  // <<< url is found here
    
  }

}
