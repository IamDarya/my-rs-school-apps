import { BaseComponent } from "../base-component";
import './game.scss';
import { CardView } from "../card-view/card-view";
import errorAud from "../../assets/error.mp3";
import { ImageCategoryModel } from "../image-category-models/image-category-models";

export class Game extends BaseComponent {

  cardView: CardView | undefined;

  allAudios: String[];

  currentAuodio: String;

  errorAudio: HTMLAudioElement;

  constructor() {
    super();
    this.allAudios = [];
    this.currentAuodio = '';
    this.errorAudio = new Audio(errorAud);
  }

  startGame(category: ImageCategoryModel, cardView: CardView[]){
    category.cardsContent.forEach((el) => {
      this.allAudios.push(el.audioSrc);
    })

      let randomAudio = new Audio(`${this.allAudios[Math.floor(Math.random()*this.allAudios.length)]}`);
      randomAudio.play();

      cardView.forEach((el)=>{
        el.element.addEventListener('click', ()=>{
          if(el.element.firstElementChild?.getAttribute('src') === randomAudio.getAttribute('src')){
            if(randomAudio.getAttribute('src') !== null){
             this.allAudios =  this.allAudios.filter(aud => aud !== randomAudio.getAttribute('src'))

              el.element.classList.add('inactive-card');
             cardView =  cardView.filter(card=>card !== el);


              randomAudio = new Audio(`${this.allAudios[Math.floor(Math.random()*this.allAudios.length)]}`);
              randomAudio.play();

              console.log(this.allAudios,'_________', cardView);
            }
          }
          else{
            this.errorAudio.play();
            console.log('no')
          }
        })
      })
  }
}
