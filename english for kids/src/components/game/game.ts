import { BaseComponent } from "../base-component";
import './game.scss';
import { CardView } from "../card-view/card-view";
import { ImageCategoryModel } from "../image-category-models/image-category-models";
import errorAud from "../../assets/error.mp3";
import correctAudio from "../../assets/correct.mp3";
import { DatabaseIamDarya } from "../database/database";
import { WordStatistic } from "../database/word-statist";

export class Game extends BaseComponent {

  databaseIamDarya: DatabaseIamDarya;

  cardView: CardView | undefined;

  allAudios: String[];

  currentAuodio: HTMLAudioElement;

  errorAudio: HTMLAudioElement;

  correctAudio: HTMLAudioElement;

  callBacks: ((str: string) => void)[];

  callBacksForEndGame: (() => void)[];

  amountOfErrors: number;

  constructor(databaseIamDarya: DatabaseIamDarya) {
    super();
    this.callBacks = [];
    this.callBacksForEndGame = [];
    this.allAudios = [];
    this.currentAuodio = new Audio();
    this.errorAudio = new Audio(errorAud);
    this.correctAudio = new Audio(correctAudio);
    this.amountOfErrors = 0;
    this.databaseIamDarya = databaseIamDarya;

  }

  startGame(category: ImageCategoryModel, cardView: CardView[]){
    this.callBacks = [];
    this.callBacksForEndGame = [];
    this.amountOfErrors = 0;
    category.cardsContent.forEach((el) => {
      this.allAudios.push(el.audioSrc);
    })

      let randomAudio = new Audio(`${this.allAudios[Math.floor(Math.random()*this.allAudios.length)]}`);
       this.playAudio(randomAudio);

       this.currentAuodio = randomAudio;

      cardView.forEach((el)=>{
        el.element.addEventListener('click', ()=>{
          let keyToWordInDB = category.category + el.cardObj.word + el.cardObj.translation;
           let currentCard = this.databaseIamDarya.getWord(keyToWordInDB);
           console.log(currentCard);

          if(el.element.firstElementChild?.getAttribute('src') === randomAudio.getAttribute('src')){
            if(randomAudio.getAttribute('src') !== null){
             this.allAudios =  this.allAudios.filter(aud => aud !== randomAudio.getAttribute('src'))

              el.element.classList.add('inactive-card');
             cardView = cardView.filter(card=>card !== el);

             this.callBacks.forEach(el=> el('Correct'));
             this.playAudio(this.correctAudio);

              randomAudio = new Audio(`${this.allAudios[Math.floor(Math.random()*this.allAudios.length)]}`);
              this.currentAuodio = randomAudio;
               this.playAudio(randomAudio);
            }
          }
          else{
            if(cardView.indexOf(el)>=0){

              this.callBacks.forEach(el=> el('Fail'));

              this.playAudio(this.errorAudio);

              this.amountOfErrors++;
            }
          }
          console.log(cardView.length,'_____', cardView)
          if(cardView.length <= 0){
             this.endGame();
          }
        })
      })
  }

   endGame() {
    this.callBacksForEndGame.forEach(el=> el());
    }

  playAudio(audio: HTMLAudioElement){
    setTimeout(()=>audio.play(), 1000);
  }

  onUserAnswer(callBack: ((str: string) => void)){
    this.callBacks.push(callBack);
  }

  onEndGame(callBacksForEndGame: (() => void)){
    this.callBacksForEndGame.push(callBacksForEndGame);
  }
}
