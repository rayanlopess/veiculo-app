import { Component, OnInit, model} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonButtons, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, AlertController} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, trash, chevronUp, personCircle, moon, settings, sunny, create} from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, RouterLink, IonButtons, IonButton, IonCard, IonGrid, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRow, IonCol],
  template: `
  <ion-button (click)="changeIcon()">
  <ion-icon [name]="iconName"></ion-icon>
</ion-button>

<ion-card class="cards" onclick="rodape()">

<ion-card-header>
  <div class="grid-apresentacao">

    <ion-card-title>Corsa</ion-card-title>
    <ion-buttons lot="end">
      <ion-button>
        <ion-icon id="editar" name="create"></ion-icon>
      </ion-button>
      <ion-button>
        <ion-icon name="trash" color="danger"></ion-icon>
      </ion-button>
    </ion-buttons>
    
  </div>
</ion-card-header>
</ion-card>
`,

})
export class HomePage {

  

  iconName: string = '';
  darkMode = false;

  currentTime: string = '';
  private timeInterval: any;



  constructor(
    public alertController: AlertController,
    private router: Router
    ) {
    addIcons({ add, trash, chevronUp, personCircle, moon, settings, sunny, create });
    this.updateTime(); // Inicializa imediatamente
  }
  ngOnInit(): void{
    //checa a cor do app
    this.checkAppMode();

    //funcao da hora
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }
  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  async checkAppMode(){
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    checkIsDarkMode?.value == 'true'
    ? (this.darkMode = true, this.iconName = 'sunny')
    : (this.darkMode = false, this.iconName = 'moon');
   document.body.classList.toggle('dark', this.darkMode);
  }
 
  toggleDarkMode(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode){
      Preferences.set({key: 'darkModeActivated', value: 'true'});
      this.iconName = 'sunny'
    }
    else{
      Preferences.set({key: 'darkModeActivated', value: 'false'});
      this.iconName = 'moon'
    }
  }







  public marca:string = 'Chevrolet';
  public modelo:string = 'Corsa';
  public ano:number = 2007;

  async mostrarInformacao(){
    
    const alert = await this.alertController.create({
      header: 'Informações do Veículo:',
      message: `Marca: ${this.marca} \n Modelo: ${this.modelo} \n Ano: ${this.ano}`,
      buttons: [{
        text: 'OK',
        role: 'confirm',
        cssClass: 'agree',
        handler: () => {
          
        }
      }]
    });

    await alert.present();
  }










  async editar(){
    const alert = await this.alertController.create({
      header: 'Deseja realmente editar?',
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
          this.editor();
        },
      }]
    })

    await alert.present();
  }

  async editor(){
    const alert = await this.alertController.create({
      header: `Editando ${this.modelo}:`,
      message: 'Preencha os campos.',
      cssClass: 'titulo-alert',
      inputs: [
        {
          placeholder: `"${this.marca}"`,
        },
        {
          placeholder: `"${this.modelo}"`,
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: `"${this.ano}"`,
          min: 1970,
          max: 2025,
        }
      ],
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
          
        },
      }]
    })

    await alert.present();
  }










  async deletar(){
    const alert = await this.alertController.create({
      header: 'Deseja realmente deletar?',
      cssClass: 'titulo-alert',
      buttons:[{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'agree',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'deletar',
        role: 'confirm',
        cssClass: 'secondary',
        handler: () => {
          this.alertDelete();
        },
      }]
    })

    await alert.present();
  }




  atualizar() {

    
    
    
  }
   
  

  async deletarTudo(){
    const alert = await this.alertController.create({
      header: 'Deseja realmente deletar tudo?',
      buttons: [{
          text: 'Cancelar',
          handler: () => {
            console.log('cancelado')
          }
        },{
          text: 'Deletar',
          cssClass: 'secondary', 
          
          handler: () => {
            
           this.alertDelete();
  
           
          }
        }
      
      ]
    });
    (await alert).present();
    let result = await alert.onDidDismiss();
    console.log(result);
    
  }

  async alertDelete(){

    const alert = this.alertController.create({
      header: 'Deletado com sucesso!',
      buttons: [{
        text: 'Ok', 
        handler: ()=>{
          this.atualizar();
          
      }}]
    });
  
    (await alert).present();
    let result1 = (await alert).onDidDismiss();
    console.log(result1);
  }
  




}



