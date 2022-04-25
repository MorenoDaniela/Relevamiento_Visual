import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {}

  cosasLindas(){
    this.router.navigate(['sacarFotoLinda']);
  }

  cosasFeas(){
    this.router.navigate(['sacarFotoFea']);
  }

}
