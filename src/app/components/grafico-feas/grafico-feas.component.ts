import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { Foto } from '../mis-fotos/mis-fotos.component';
@Component({
  selector: 'app-grafico-feas',
  templateUrl: './grafico-feas.component.html',
  styleUrls: ['./grafico-feas.component.scss'],
})
export class GraficoFeasComponent implements AfterViewInit, OnInit {
  public misFotosLindas:any=new Array<any>();
  public labels:any =[];
  public votos:any =[];
  public images:any =[];
  public selectedNiceImage;
// Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(public photoService:PhotoService) 
  {
    this.cargarFotosFeas();
    setTimeout(()=>{
      this.barChartMethod();
    },1000)
   }
  async ngOnInit() 
  {
   
  }
  cargarFotosFeas(){

    this.photoService.allFotosFeas.subscribe((resp: any) => 
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
  
  ngAfterViewInit() {
    
  }

  barChartMethod() {
    Chart.defaults.global.legend.display = false;
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Votos',
          data: this.votos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        onClick: (e) => {
          const activePoints = this.barChart.getElementsAtEvent(e);
          if (activePoints.length > 0) {

            var clickedElementindex = activePoints[0]["_index"];


            var label = this.barChart.data.labels[clickedElementindex];

            this.selectedNiceImage = this.images[clickedElementindex];
          }
        }
      }
    });
  }


}
