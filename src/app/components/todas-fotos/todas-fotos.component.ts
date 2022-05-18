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
  spinner:boolean=true;
  public misFotosLindas:any=new Array<any>();
  public misFotosFeas:any=new Array<any>();
  public misFotosParasubir:string[]=[];
  constructor(public photoService: PhotoService, public authService: AuthService) {
   
   }

  async ngOnInit() 
  {
    await this.cargarFotosLindas();

    
  }
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
      this.spinner=false;
    });
  }
  


  UpdateLinda(id:string,votos:number, usuariosQueVotaron:string){
    var votosNuevo;
    if(usuariosQueVotaron.includes(this.authService.userData.email)){
      if (votos>0){
        votosNuevo=votos-1;
      }else{
        votosNuevo=0;
      }
      
      var replace = usuariosQueVotaron.replace("/"+this.authService.userData.email,"");
      console.log(replace);
      this.photoService.UpdateVotosFoto(id,votosNuevo,replace,'fotosLindas');
      //this.authService.presentToast("Ya ha votado esta foto.",2000,'bottom','danger','text-center');
    }else{
      votosNuevo=votos+1;
      var usuariosVotaron = usuariosQueVotaron + '/'+this.authService.userData.email;
      this.photoService.UpdateVotosFoto(id,votosNuevo,usuariosVotaron,'fotosLindas');
    }

  }



  Contiene(usuariosQueVotaron:string)
  {
    if(usuariosQueVotaron.includes(this.authService.userData.email))
    {
      return true;
    }
    return false;
  }
  addPhotoToGallery() {
    this.spinner=true;
    this.photoService.addNewToGallery('fotosLindas').then(url => 
      { 
        this.misFotosParasubir.push(url);
        this.spinner=false;
        // this.router.navigate(['misFotos']);
      });  // <<< url is found here
    
  }
  guardarFotos(){
    this.misFotosParasubir.forEach(fotito =>{
      this.photoService.guardarFoto(this.authService.userData.email,fotito,0,"fotosLindas", new Date().toLocaleString());
    });
    this.misFotosParasubir = [];
  }
}
