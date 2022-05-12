import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.component.html',
  styleUrls: ['./mis-fotos.component.scss'],
})
export class MisFotosComponent implements OnInit {
  spinner:boolean=false;
  public fotosLindas;
  public fotosFeas;
  public misFotosLindas:any=new Array<any>();
  public misFotosFeas:any=new Array<any>();

  constructor(public photoService: PhotoService, public authService: AuthService, public firestore:AngularFirestore) 
  { 
    this.spinner=true;
    this.fotosLindas = this.firestore.collection("fotosLindas", ref => ref.where('usuarioEmail', '==', this.authService.userData.email)).snapshotChanges();
    this.fotosFeas = this.firestore.collection("fotosFeas", ref => ref.where('usuarioEmail', '==', this.authService.userData.email)).snapshotChanges();
    this.cargarFotosLindas();
    this.cargarFotosFeas();
   
  }

  ngOnInit() {}
cargarFotosLindas(){

  this.fotosLindas.pipe(
    map((data: any) => {
      this.misFotosLindas = new Array<Foto>();
      data.map((foto: any) =>{
        var fotoCargada: Foto= new Foto();
        // especialidad2.fecha = especialidad.payload.doc.data().fecha;
        fotoCargada.imagen = foto.payload.doc.data().imagen;
        fotoCargada.votos = foto.payload.doc.data().votos;
        fotoCargada.usuarioEmail = foto.payload.doc.data().usuarioEmail;
        fotoCargada.fecha = foto.payload.doc.data().fecha;
        fotoCargada.usuariosQueVotaron = foto.payload.doc.data().usuariosQueVotaron;
        fotoCargada.id = foto.payload.doc.id;
        this.misFotosLindas.push(fotoCargada);
                  
      })
    })
  ).subscribe((datos: any) => {
    this.spinner=false;
  });
}

cargarFotosFeas(){

  this.fotosFeas.pipe(
    map((data: any) => {
      this.misFotosFeas = new Array<Foto>();
      data.map((foto: any) =>{
        var fotoCargada: Foto= new Foto();
        // especialidad2.fecha = especialidad.payload.doc.data().fecha;
        fotoCargada.imagen = foto.payload.doc.data().imagen;
        fotoCargada.votos = foto.payload.doc.data().votos;
        fotoCargada.usuarioEmail = foto.payload.doc.data().usuarioEmail;
        fotoCargada.fecha = foto.payload.doc.data().fecha;
        fotoCargada.usuariosQueVotaron = foto.payload.doc.data().usuariosQueVotaron;
        fotoCargada.id = foto.payload.doc.id;
        this.misFotosFeas.push(fotoCargada);
                  
      })
    })
  ).subscribe((datos: any) => {
    
  });
}
}

export class Foto{
  imagen: string;
  fecha: string;
  votos:number;
  usuarioEmail:string;
  id:string;
  usuariosQueVotaron:string;
}
