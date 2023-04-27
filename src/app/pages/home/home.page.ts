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
  loading = true;

  constructor(
    private http: HttpService,
  ) {}

  async ngOnInit() {
    setTimeout(async () => {
      await this.loadPokemon();
    }, 500);
    //await this.loadPokemon();
  }

  async loadPokemon() {
    await this.http.getPokemon().then((result: any) => {
      this.loading = false;
      this.pokemon = result.results;
      this.filterPokemon = result.results;
      this.pokemon.forEach(pokemon => {
        const index = this.pokemon.findIndex(p => p.name === pokemon.name);
        pokemon.id = index+1;
        pokemon.image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+(index+1)+'.png';
      });
      console.log(result.results);
    });

  }

  filterList(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.loading = true;
    if(event.detail.value !== ''){
        this.filterPokemon = this.pokemon.filter(item => {
          return item.name.toLowerCase().indexOf(searchTerm) > -1;
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
      console.log(resultById);

      /*const modal = await this.modalCtrl.create({
        component: MovieAboutComponent,
        cssClass: 'radioModal',
        componentProps: {
          resultApiId: resultId
        },
        backdropDismiss: true,
      });*/
    });
  }
}
