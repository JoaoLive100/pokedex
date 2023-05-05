import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalController } from '@ionic/angular';
import { DetailsModalComponent } from 'src/app/components/details-modal/details-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokemon!: any[];
  filterPokemon!: any[];
  searchQuery: string = '';
  selectedOption: any = '1';
  loading = true;
  offset: any;
  limit: any;

  constructor(
    private http: HttpService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.loadPokemon();
  }

  async loadPokemon() {
    switch (Number(this.selectedOption)) {
      case 1:
        this.offset = 0;
        this.limit = 151;
        break;
      case 2:
        this.offset = 151;
        this.limit = 100;
        break;
      case 3:
        this.offset = 251;
        this.limit = 135;
        break;
      case 4:
        this.offset = 386;
        this.limit = 107;
        break;
      case 5:
        this.offset = 493;
        this.limit = 156;
        break;
      case 6:
        this.offset = 649;
        this.limit = 72;
        break;
      case 7:
        this.offset = 721;
        this.limit = 88;
        break;
      case 8:
        this.offset = 809;
        this.limit = 89;
        break;
      case 9:
        this.offset = 898;
        this.limit = 84;
        break;
      default:
        this.offset = 0;
        this.limit = 151;
        break;
    }

    await this.http.getPokemon(this.offset, this.limit).then((result: any) => {
      this.loading = false;
      this.pokemon = result.results;
      this.filterPokemon = result.results;
      this.pokemon.forEach(pokemon => {
        const index = this.pokemon.findIndex(p => p.name === pokemon.name);
        pokemon.id = (new URL(pokemon.url)).pathname.split("/")[4];
        pokemon.image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+(pokemon.id)+'.png';
      });
      console.log(result.results);
    });
  };

  filterList(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.loading = true;
    if(event.detail.value !== ''){
        this.filterPokemon = this.pokemon.filter(item => {
          const nameMatch = item.name.toLowerCase().indexOf(searchTerm) > -1;
          const idMatch = item.id.toLowerCase().indexOf(searchTerm) > -1;
          return nameMatch || idMatch;
        });
        this.loading = false;
    } else {
        this.loading = false;
        this.filterPokemon = this.pokemon;
    }
  };

  async openDetailsModal(id: any) {
    await this.http.getPokemonById(id).then(async(resultById: any) =>{
      this.loading = false;
      console.log(resultById);''

      const modal = await this.modalCtrl.create({
        component: DetailsModalComponent,
        cssClass: 'radioModal',
        componentProps: {
          resultById
        },
        backdropDismiss: true,
      });
      await modal.present();
    });
  }

}
