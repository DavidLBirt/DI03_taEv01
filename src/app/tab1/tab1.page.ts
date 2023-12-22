// tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { GestionNoticiasService, INoticia } from '../servicios/gestion-noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticiasDisponibles: INoticia[] = [];

  constructor(private noticiasService: GestionNoticiasService) {}

  ngOnInit() {
    this.noticiasService.getNoticias().subscribe(noticias => {
      this.noticiasDisponibles = noticias;
    });
  }

  seleccionarNoticia(noticia: INoticia, checked: boolean) {
    if (checked) {
      this.noticiasService.addNoticia(noticia);
    } else {
      this.noticiasService.deleteNoticia(noticia);
    }
  }
}

