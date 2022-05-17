import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];

  public allFotosFeas;
  public allFotosLindas;
  basePath = '/images';                       
  downloadableURL = '';                      
  task!: AngularFireUploadTask;
  progressValue!: Observable<any>;


  constructor(public router: Router, public firestore:AngularFirestore, public authService: AuthService, public fireStorage: AngularFireStorage) 
  {
    console.log("en servicio "+this.authService.userData.email);
    this.allFotosFeas = this.firestore.collection("fotosFeas", ref => ref.orderBy('fecha')).snapshotChanges();
    this.allFotosLindas = this.firestore.collection("fotosLindas", ref => ref.orderBy('fecha')).snapshotChanges();
   }


   guardarFoto(usuarioEmail:string,img:string,votos:number, nameCollection:string, fecha:string) {
    this.firestore.collection(nameCollection).add({
      usuarioEmail : usuarioEmail,
      imagen: img,
      votos:votos,
      fecha:fecha,
      usuariosQueVotaron:''
    });
  }

  public async addNewToGallery(nameColeccion:string) {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 50
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });

    var number = this.getRandomArbitrary(0,9999999);//creo un ramdon para que tenga nombre la foto, sino se pisa
    const filePath = `${this.basePath}/${number}`;

    const file: any = this.base64ToImage(capturedPhoto.dataUrl); 
     // path at which image will be stored in the firebase storage
    this.task = this.fireStorage.upload(filePath, file);    // upload task

    this.progressValue = this.task.percentageChanges();       // <<<<< Percentage of uploading is given
     return (await this.task).ref.getDownloadURL()
     //.then(url => 
    //   { this.downloadableURL = url;
    //     this.guardarFoto(this.authService.userData.email,this.downloadableURL,0,nameColeccion, new Date().toLocaleString());
    //     this.router.navigate(['misFotos']);
    //   });  // <<< url is found here

   
  }


  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  UpdateVotosFoto(id:string, votos:number,usuariosQueVotaron:string, coleccion:string)
  {
    console.log(id +" "+ votos +" "+coleccion+" "+usuariosQueVotaron);
    this.firestore.collection(coleccion).doc(id).update({votos:votos,usuariosQueVotaron:usuariosQueVotaron});
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}




