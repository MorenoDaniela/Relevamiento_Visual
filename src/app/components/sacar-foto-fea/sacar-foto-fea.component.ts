import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-sacar-foto-fea',
  templateUrl: './sacar-foto-fea.component.html',
  styleUrls: ['./sacar-foto-fea.component.scss'],
})
export class SacarFotoFeaComponent implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery('fotosFeas');
  }
}
