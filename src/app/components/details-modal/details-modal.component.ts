import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent  implements OnInit {

  resultById: any;
  sprites: any;
  spritesArray!: any[];
  caption: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if (this.resultById) {
      this.sprites = {
        back_default: this.resultById.sprites.back_default,
        back_female: this.resultById.sprites.back_female,
        back_shiny: this.resultById.sprites.back_shiny,
        back_shiny_female: this.resultById.sprites.back_shiny_female,
        front_default: this.resultById.sprites.front_default,
        front_female: this.resultById.sprites.front_female,
        front_shiny: this.resultById.sprites.front_shiny,
        front_shiny_female: this.resultById.sprites.front_shiny_female,
      };
      //this.spritesArray = Object.entries(this.sprites).map(([key, value]) => ({ key, value }));
      this.spritesArray = Object.entries(this.sprites).filter(([key, value]) => value !== null).map(([key, value]) => ({ key, value }));
      this.caption = this.spritesArray[0].key;
    }
  }

  onSlideChange(event: any) {
    this.caption = this.spritesArray[event.detail[0].activeIndex].key;
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }



}
