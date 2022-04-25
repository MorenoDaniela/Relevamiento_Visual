import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {}

  misFotos()
  {
    this.router.navigate(['misFotos']);
  }

  cosasLindas(){
    this.router.navigate(['sacarFotoLinda']);
  }

  cosasFeas(){
    this.router.navigate(['sacarFotoFea']);
  }
  listado()
  {
    this.router.navigate(['todasFotos']);
  }

}
