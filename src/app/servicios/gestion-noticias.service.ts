// gestion-noticias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface INoticia {
  source: {id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
@Injectable({
  providedIn: 'root'
})

export class GestionNoticiasService {

  noticiasSeleccionadas: INoticia[] = []; // Aquí almacenamos las noticias seleccionadas

  constructor(private http: HttpClient) { }

  getNoticias(): Observable<INoticia[]> {
    return this.http.get('assets/datos/articulos.json').pipe(
      map(data => (data as any)!.articles as INoticia[])
    );
  }

  // Método para añadir una noticia si no está
  addNoticia(noticia: INoticia) {
    if (!this.noticiasSeleccionadas.includes(noticia)) {
      this.noticiasSeleccionadas.push(noticia);
    }
  }

  // Método para borrar una noticia si está
  deleteNoticia(noticia: INoticia) {
    this.noticiasSeleccionadas = this.noticiasSeleccionadas.filter(n => n !== noticia);
  }

  // Método para devolver las noticias seleccionadas
  getNoticiasSeleccionadas(): INoticia[] {
    return this.noticiasSeleccionadas;
  }
}

