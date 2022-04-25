import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { Foto } from '../mis-fotos/mis-fotos.component';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-todas-fotos',
  templateUrl: './todas-fotos.component.html',
  styleUrls: ['./todas-fotos.component.scss'],
})
export class TodasFotosComponent implements OnInit {
  public misFotosLindas:any=new Array<any>();
  public misFotosFeas:any=new Array<any>();
  constructor(public photoService: PhotoService, public authService: AuthService) {
    console.log("en todas fotos "+this.authService.userData.email);
    this.cargarFotosLindas();
    this.cargarFotosFeas();
   }

  ngOnInit() {}
  cargarFotosLindas(){

    this.photoService.allFotosLindas.pipe(
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
    });
  }
  
  cargarFotosFeas(){
  
    this.photoService.allFotosFeas.pipe(
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

  UpdateLinda(id:string,votos:number, usuariosQueVotaron:string){
    var votosNuevo = votos+1;
    if(usuariosQueVotaron.includes(this.authService.userData.email)){
      this.authService.presentToast("Ya ha votado esta foto.",2000,'bottom','danger','text-center');
    }else{
      var usuariosVotaron = usuariosQueVotaron + '/'+this.authService.userData.email;
      this.photoService.UpdateVotosFoto(id,votosNuevo,usuariosVotaron,'fotosLindas');
    }

  }

  UpdateFea(id:string,votos:number,usuariosQueVotaron:string){
    var votosNuevo = votos+1;
    if(usuariosQueVotaron.includes(this.authService.userData.email)){
      this.authService.presentToast("Ya ha votado esta foto.",2000,'bottom','danger','text-center');
    }else{
      var usuariosVotaron = usuariosQueVotaron + '/'+this.authService.userData.email;
      this.photoService.UpdateVotosFoto(id,votosNuevo,usuariosVotaron,'fotosFeas');
    }

  }
}
