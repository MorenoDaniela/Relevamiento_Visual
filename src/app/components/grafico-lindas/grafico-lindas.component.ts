import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { Foto } from '../mis-fotos/mis-fotos.component';

@Component({
  selector: 'app-grafico-lindas',
  templateUrl: './grafico-lindas.component.html',
  styleUrls: ['./grafico-lindas.component.scss'],
})
export class GraficoLindasComponent implements AfterViewInit, OnInit {
  public misFotosLindas:any[]=[];
  public labels:string[] =[];
  public votos:number[] =[];
  public images:string[] =[];
  public selectedNiceImage;

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(public photoService:PhotoService) {
    this.cargarFotosLindas();
    setTimeout(()=>{
      this.doughnutChartMethod();
    },1000)
   }
  async ngOnInit() 
  {
    
  }
  async cargarFotosLindas(){

    // await this.photoService.allFotosLindas.pipe(
    //   map((data: any) => {
    //     // this.misFotosLindas = new Array<Foto>();
    //     data.map((foto: any) =>{
    //       var fotoCargada: Foto= new Foto();

    //       fotoCargada.imagen = foto.payload.doc.data().imagen;
    //       fotoCargada.votos = foto.payload.doc.data().votos;
    //       fotoCargada.usuarioEmail = foto.payload.doc.data().usuarioEmail;
    //       fotoCargada.fecha = foto.payload.doc.data().fecha;
    //       fotoCargada.usuariosQueVotaron = foto.payload.doc.data().usuariosQueVotaron;
    //       fotoCargada.id = foto.payload.doc.id;
    //       this.misFotosLindas.push(fotoCargada);
    //        var label = fotoCargada.usuarioEmail;
    //       this.labels.push(label);
    //       this.votos.push(fotoCargada.votos);
    //       this.images.push(fotoCargada.imagen);     
    //     })
    //   })
    // ).subscribe((datos: any) => {
      
    // });
    
    this.photoService.allFotosLindas.subscribe((resp: any) => 
    {
      resp.map((foto:any)=>{
        var fotoCargada: Foto= new Foto();

          fotoCargada.imagen = foto.payload.doc.data().imagen;
          fotoCargada.votos = foto.payload.doc.data().votos;
          fotoCargada.usuarioEmail = foto.payload.doc.data().usuarioEmail;
          fotoCargada.fecha = foto.payload.doc.data().fecha;
          fotoCargada.usuariosQueVotaron = foto.payload.doc.data().usuariosQueVotaron;
          fotoCargada.id = foto.payload.doc.id;
          this.misFotosLindas.push(fotoCargada);
          this.labels.push(fotoCargada.usuarioEmail);
          this.votos.push(fotoCargada.votos);
          this.images.push(fotoCargada.imagen);     
      });
    });
    
  }

  async ngAfterViewInit() {
    
   
  }


  doughnutChartMethod() {
  
   

    this.selectedNiceImage = '';
    
    this.misFotosLindas.sort((a,b) => (a.votos > b.votos) ? -1 : (b.votos> a.votos) ? 1:0);
  //  console.log(this.misFotosLindas);
  //  var img = this.misFotosLindas.;
  //  console.log(img);
  //   this.selectedNiceImage = img.imagen;
 
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of Votes',
          data: this.votos,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }],
       
      },
      options: {
        responsive: true,
       
        onClick: (e) => {
          const activePoints = this.doughnutChart.getElementsAtEvent(e);
          if (activePoints.length > 0) {
            
            var clickedElementindex = activePoints[0]["_index"];
            var label = this.doughnutChart.data.labels[clickedElementindex];
            this.selectedNiceImage = this.images[clickedElementindex];
          }
        }
      }
    });
  }



}