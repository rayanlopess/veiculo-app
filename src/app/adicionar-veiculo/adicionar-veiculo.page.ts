import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonText, IonDatetime, IonGrid, IonRow, IonCol, IonLabel, IonDatetimeButton, IonModal, IonButton, AlertController} from '@ionic/angular/standalone';

//
import { addIcons } from 'ionicons';
import { add, trash, chevronUp, personCircle, moon, settings, sunny, create } from 'ionicons/icons';

//
import { Router, ActivatedRoute} from '@angular/router';

//
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';


@Component({
  selector: 'app-adicionar-veiculo',
  templateUrl: './adicionar-veiculo.page.html',
  styleUrls: ['./adicionar-veiculo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonInput, IonText, IonDatetime, IonGrid, IonRow, IonCol, IonLabel, IonDatetimeButton, IonModal, IonButton]
})
export class AdicionarVeiculoPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public router: Router,
    private rt:RealtimeDatabaseService, 
    private ar:ActivatedRoute
  ) { 

    this.ar.params.subscribe((param:any) => {
      this.id = param.id;
    });

    addIcons({ add, trash, chevronUp, personCircle, moon, settings, sunny, create });

  }

  ngOnInit() {
   
  }



  public id:number = 0;
  public marca: string = "";
  public modelo: string = "";
  public ano: string = new Date().getFullYear().toString();

  async salvar(){

    if (!this.marca) {
      this.marcaErrada();
      return;
    } else if (!this.modelo) {
      this.modeloErrado();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Deseja realmente salvar?',
      cssClass: 'titulo-alert',
      buttons:[{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        cssClass: 'agree',
        handler: () => {

          this.rt.add('/veiculos', {
            marca: this.marca,
            modelo: this.modelo,
            ano: this.ano
          }, this.id)
          .subscribe({
            next: (res:any) => {
              console.log(res);
            },
            error: (err) => {
              console.log("Num rolou, sorry: ", err);
            }
          });

          this.salvo();
          
          
        },
      }]
    })

    await alert.present();
  }

  async salvo(){
    const alert = await this.alertController.create({
      header: 'Salvo com sucesso!',
      cssClass: 'titulo-alert',
      buttons:[
      {
        text: 'OK',
        role: 'confirm',
        cssClass: 'agree',
        handler: () => {
          this.router.navigate(['/veiculos']);
        },
      }]
    })

    await alert.present();
  }

  async marcaErrada() {
    const alert = await this.alertController.create({
      header: 'Marca não preenchida!',
      buttons: [{ text: 'Ok' }]
    });

    await alert.present();
  }

  async modeloErrado() {
    const alert = await this.alertController.create({
      header: 'Modelo não preenchido!',
      buttons: [{ text: 'Ok' }]
    });

    await alert.present();
  }
  



  
}



