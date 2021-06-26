import { BaseComponent } from "../base-component";
import './game.scss';
import { CardView } from "../card-view/card-view";
import { ImageCategoryModel } from "../image-category-models/image-category-models";
import errorAud from "../../assets/error.mp3";

export class Game extends BaseComponent {

  cardView: CardView | undefined;

  allAudios: String[];

  currentAuodio: String;

  errorAudio: HTMLAudioElement;

  callBacks: ((str: string) => void)[];

  constructor() {
    super();
    this.callBacks = [];
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
             cardView = cardView.filter(card=>card !== el);

             this.callBacks.forEach(el=> el('Correct'));

              randomAudio = new Audio(`${this.allAudios[Math.floor(Math.random()*this.allAudios.length)]}`);
              randomAudio.play();
            }
          }
          else{
            if(cardView.indexOf(el)>=0){

              this.callBacks.forEach(el=> el('Fail'));

              this.errorAudio.play();
            }
          }
        })
      })
  }

  onUserAnswer(callBack: ((str: string) => void)){
    this.callBacks.push(callBack);
  }
}
