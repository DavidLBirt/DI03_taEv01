// tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { GestionNoticiasService, INoticia } from '../servicios/gestion-noticias.service';
import { AlertController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  noticiasParaLeer: INoticia[] = [];

  constructor(private noticiasService: GestionNoticiasService, private alertController: AlertController) {}

  ngOnInit() {
    this.noticiasParaLeer = this.noticiasService.getNoticiasSeleccionadas();
  }

  // Este método se ejecuta cada vez que se entra en la página
  ionViewWillEnter() {
    // Actualizamos la variable local con el valor del array del servicio
    this.noticiasParaLeer = this.noticiasService.getNoticiasSeleccionadas();
  }

  // Método para mostrar un alert de confirmación antes de borrar una noticia
  async confirmarBorrarNoticia(noticia: INoticia) {

    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Borrar noticia?',
      buttons: [
        {
          // Si el usuario da a "CANCEL"
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Borrado cancelado');
          }
        }, {
          // Si el usuario da a "OKAY"
          text: 'OKAY',
          handler: () => {
            // Aquí puedes llamar al método que borra la noticia
            this.borrarNoticia(noticia);
          }
        }
      ]
    });

    // Presentamos el alert
    await alert.present();
  }

  // Método para abrir la noticia en el navegador
  async abrirNoticia(noticia: INoticia) {
    await Browser.open({ url: noticia.url });
  }

  // Método para borrar la noticia del array y actualizamos la variable noticiasParaLeer
  borrarNoticia(noticia: INoticia) {
    this.noticiasService.deleteNoticia(noticia);
    this.noticiasParaLeer = this.noticiasService.getNoticiasSeleccionadas();
  }
}



