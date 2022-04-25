import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-sacar-foto-linda',
  templateUrl: './sacar-foto-linda.component.html',
  styleUrls: ['./sacar-foto-linda.component.scss'],
})
export class SacarFotoLindaComponent implements OnInit {
  public user:any;
  constructor(public photoService: PhotoService, public authService: AuthService) 
  {
    this.user= authService.userData;
    console.log(this.user.email);
   }

  ngOnInit() {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery('fotosLindas');
    
  }

}
