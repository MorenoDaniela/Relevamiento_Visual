import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService, public photoService:PhotoService) { }

  ngOnInit() {}

  addPhotoToGallery1() {
    this.photoService.addNewToGallery('fotosLindas');
    
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery('fotosFeas');
  }
}
