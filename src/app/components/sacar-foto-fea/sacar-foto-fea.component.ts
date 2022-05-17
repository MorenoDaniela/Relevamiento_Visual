import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-sacar-foto-fea',
  templateUrl: './sacar-foto-fea.component.html',
  styleUrls: ['./sacar-foto-fea.component.scss'],
})
export class SacarFotoFeaComponent implements OnInit {
  public esperando:boolean=false;
  constructor(public photoService: PhotoService, public authService: AuthService, public router:Router) { }

  ngOnInit() {}

  addPhotoToGallery() {
    this.esperando=true;
    this.photoService.addNewToGallery('fotosFeas').then(url => 
      {
        this.esperando=false;
        this.photoService.guardarFoto(this.authService.userData.email,url,0,"fotosFeas", new Date().toLocaleString());
        this.router.navigate(['misFotos']);
      });
  }
}
