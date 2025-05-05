//ÁREA DOS IMPORTS;

//módulos principais para o funcionamento;
import { Component } from '@angular/core'; //import do componente;
import { Router, RouterLink } from '@angular/router'; //import da declaração de rota;
import { Preferences } from '@capacitor/preferences'; //import das preferencias do usuário;
import { CommonModule } from '@angular/common'; //import dos pipes básicos. ex: "*ngFor" utilizado na tela principal;

//módulos que fazem os elementos do HTML funcionar;
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonButtons, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, AlertController} from '@ionic/angular/standalone'; 

//importação da biblioteca de icones;
import { addIcons } from 'ionicons'; //import da biblioteca de icons
import { add, trash, chevronUp, personCircle, moon, settings, sunny, create } from 'ionicons/icons'; //import dos icones em específico;

//import do database para essa página (home);
import { RealtimeDatabaseService } from '../firebase/realtime-database.service'; 

//FIM DA ÁREA DOS IMPORTS;


//-------------------------------------------//


//ÁREA DA DECLARAÇÃO DO COMPONENTE DA PÁGINA;
@Component({
  //seleção da página;
  selector: 'app-home',
  //import do HTML 
  templateUrl: 'home.page.html',
  //import scss da página principal;
  styleUrls: ['home.page.scss'],
  //import dos elementos que serão usados no HMTL;
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, RouterLink, IonButtons, IonButton, IonCard, IonGrid, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRow, IonCol, CommonModule],
  //importação do template do button;
  template: `<ion-button (click)="changeIcon()"> 
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

            </ion-card>`
})
//FIM DA DECLARAÇÃO DO COMPONENTE;

//-------------------------------------------//

//ÁREA DE EXECUÇÃO DAS FUNCTIONS DA PÁGINA;
export class HomePage {

  //ÁREA DA DECLARAÇÃO DE VARIÁVEIS DO CÓDIGO;

  public dados: Array<any> = [];

  iconName: string = '';

  darkMode = false;

  currentTime: string = '';

  private timeInterval: any;
  
  //FIM DA ÁREA DE DECLARAÇÃO DE VARIÁVEIS;



  //-------------------------------------------//



  //ÁREA DAS FUNCTIONS QUE NÃO TEM NADA A VER COM O DATABASE



  //método construtor;
  constructor(
      public rt: RealtimeDatabaseService, //declara o serviço do realtime-database no construtor da página;
      public alertController: AlertController, //declara a function que cria alerts no construtor da página;
      public router: Router //declara o router que enviará para outra rota no construtor da página;
    ) {

    addIcons({ add, trash, chevronUp, personCircle, moon, settings, sunny, create }); //declaração dos icones que estão presentes no html
    this.updateTime(); //inicializa imediatamente a hora local

  }

  //-------------------------------------------//

  //metodo a cada vez que recarrega a página;
  ngOnInit(): void{

     //carrega a function que mostra e cria os veículos no html;
    this.load();

    //checa a cor do app;
    this.checkAppMode();

    //function da hora (atualiza a cada 1 segundo);
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  //-------------------------------------------//

  //function que identifica a hora  local;
  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  //-------------------------------------------//

  //parte do dark e light mode;
  async checkAppMode(){
    //cria uma constante que pega as preferencias do user no dark ou white mode;
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    //se o dark mode for igual a "true", ele troca o icone para o sol, senão se for igual a "false", ele altera icone para sol;
    checkIsDarkMode?.value == 'true'
    ? (this.darkMode = true, this.iconName = 'sunny')
    : (this.darkMode = false, this.iconName = 'moon');
   document.body.classList.toggle('dark', this.darkMode);
  }
  toggleDarkMode(){
    //muda o tema para dark
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
  //final da parte do dark e light mode



  //FIM DA ÁREA DAS FUNCTIONS





  //-------------------------------------------//





  //ÁREA QUE ENVOLVE O DATABASE! (CUIDADO);
  


  //ÁREA DE MOSTRAR OS COMPONENTES NA TELA PRINCIPAL! (PARTE READ DO MÉTODO CRUD)

  //function que carrega os componentes da tela prinicipal;
  load(){
    this.rt.query('/veiculos', (snapshot:any) => {
      if(snapshot.val() !== null){
        this.dados = Object(snapshot.val()).
        map((item:any, key:any) => {
          item.id = key;
          return item;
        }).filter((item:any) => item != null);
      }
      else{
        this.dados = [];
      }
    });
  }

  //function alert que mostra os dados específicos quando o user aperta em cima do nome do veículo;
  async mostrarInformacao(id: number) { 
      const veiculo = await this.rt.getById('/veiculos', id);
  
      if (!veiculo) {
        throw new Error('Veículo não encontrado');
      }
  
      const alert = await this.alertController.create({
        header: 'Informações do Veículo:',
        message: `
          Marca: ${veiculo.marca || 'Não informada'} \n
          Modelo: ${veiculo.modelo || 'Não informado'} \n
          Ano: ${veiculo.ano || 'Não informado'}
        `,
        buttons: ['OK']
      });
  
      await alert.present();
    
  }

  //FIM DA ÁREA DE MOSTRAR OS COMPONENTES NA TELA PRINCIPAL;


  //-------------------------------------------//


  //ÁREA DE EDITAR COMPONENTES (PARTE UPDATE DO MÉTODO CRUD);

  //function confirmação editar;
  async editar(id:number){
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
          this.editor(id);
        },
      }]
    })

    await alert.present();
  }

  //function que user pode editar;
  async editor(id: number) {
    const veiculo = await this.rt.getById('/veiculos', id);
    
    if (!veiculo) {
      throw new Error('Veículo não encontrado');
    }
  
    const alert = await this.alertController.create({
      header: `Editando "${veiculo.modelo}":`,
      message: 'Preencha os campos corretamente.',
      cssClass: 'titulo-alert',
      inputs: [
        {
          name: 'marca',  // Nome para referência no handler
          placeholder: 'Marca',
          value: veiculo.marca,  // Valor pré-preenchido
          attributes: { maxlength: 20 }
        },
        {
          name: 'modelo',
          placeholder: 'Modelo',
          value: veiculo.modelo,
          attributes: { maxlength: 20 }
        },
        {
          name: 'ano',
          type: 'number',
          placeholder: 'Ano',
          value: veiculo.ano.toString() 
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Salvar',
          role: 'confirm',
          cssClass: 'agree',
          handler: async (data) => {  // "data" contém { marca: string, modelo: string, ano: string }
            // Verifica se algum campo está vazio
            if (!data.marca.trim() || !data.modelo.trim() || !data.ano.trim()) {
              this.preenchaCorretamente();  // Mostra alerta de erro
              return false;  // Impede o fechamento do Alert
            }
            const updatedData = {
              marca: data.marca.trim(),
              modelo: data.modelo.trim(),
              ano: +data.ano // Converte para número (caso seu DB espere um number)
            };
  
            // Chama o método update do serviço
            await this.rt.update('/veiculos', id, updatedData);
  
            
            return this.sucesso(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  //function para preencher os campos corretamente;
  async preenchaCorretamente() {
    const alert = await this.alertController.create({
      header: 'Preencha os campos corretamente!',
      buttons: [{ text: 'Ok' }]
    });

    await alert.present();

  }

  //function para mostrar alert que foi editado corretamente;
  async sucesso(id:number) {

    const veiculo = await this.rt.getById('/veiculos', id);
    
    if (!veiculo) {
      throw new Error('Veículo não encontrado');
    }

    const alert = await this.alertController.create({
      header: `"${veiculo.modelo}" editado com sucesso!`,
      buttons: [{ text: 'Ok' }]
    });

    await alert.present();

  }

  //FIM DA ÁREA DE EDITAR COMPONENTES;


  //-------------------------------------------//


  //ÁREA DE DELETAR COMPONENTES! (PARTE DELETE DO MÉTODO CRUD);

  //function deletar componente específico pelo id;
  async deletar(id:number){
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
        handler: async () => {
          try {
            await this.rt.removeAndReindex('/veiculos', id);
            this.alertDelete();
            this.load(); // Atualiza a lista após exclusão
          } catch (error) {
            console.error('Erro ao deletar:', error);
            // Mostrar alerta de erro para o usuário
          }
        },
      }]
    })

    await alert.present();
  }

  //function deletar tudo (CUIDADO, DELETA TUDO DO DATABASE);
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
          
          handler: async () => {
          await this.rt.deleteAll('/veiculos');
           this.alertDelete();
          }
        }
      
      ]
    });
    (await alert).present();
    let result = await alert.onDidDismiss();
    console.log(result);
    
  }

  //alert que mostra que foi deleletado corretamente;
  async alertDelete(){

    const alert = this.alertController.create({
      header: 'Deletado com sucesso!',
      buttons: [{text: 'Ok'}]
    });
  
    (await alert).present();
    let result1 = (await alert).onDidDismiss();
    console.log(result1);
  }

  //FIM DA ÁREA DE DELETAR COMPONENTES;




  ////FIM DA ÁREA QUE ENVOLVE O DATABASE;





}
//FIM DA EXECUÇÃO;


//-------------------------------------------//


//CÓDIGO FEITO POR RAYAN LOPES;
//<3