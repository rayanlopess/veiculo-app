import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonText, IonDatetime, IonGrid, IonRow, IonCol, IonLabel, IonDatetimeButton, IonModal} from '@ionic/angular/standalone';




import { addIcons } from 'ionicons';
import { add, trash, chevronUp, personCircle, moon, settings, sunny, create} from 'ionicons/icons';

@Component({
  selector: 'app-adicionar-veiculo',
  templateUrl: './adicionar-veiculo.page.html',
  styleUrls: ['./adicionar-veiculo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonText, IonDatetime, IonGrid, IonRow, IonCol, IonLabel, IonDatetimeButton, IonModal]
})
export class AdicionarVeiculoPage implements OnInit {

  constructor() { 

    addIcons({ add, trash, chevronUp, personCircle, moon, settings, sunny, create });

  }

  ngOnInit() {
  }

  
}



