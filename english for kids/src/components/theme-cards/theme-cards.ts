import { BaseComponent } from "../base-component";
import { ImageCategoryModel } from "../image-category-models/image-category-models";
import picForFlip from '../../assets/rotate.svg';
import './theme-cards.scss';
import { MainPage } from "../main-page/main-page";
import { Card } from "../image-category-models/card";

export class ThemeCards extends BaseComponent {
  mainPage: MainPage;
  train: boolean;
  activeTheme: string| null;
  isFlipped: boolean;

  constructor(mainPage: MainPage) {
    super('div', ['themes-block']);
    this.train = true;
    this.activeTheme = '';
    this.mainPage = mainPage;
    this.isFlipped = false;
    this.drawThemes();
  }

  async drawThemes() {
    this.element.innerHTML = ``;
    const allThemesJson = await fetch('./cards.json');
    const amountOfThemes = 7;
    const categories: ImageCategoryModel[] = await allThemesJson.json();
    for(let i = 0; i <= amountOfThemes; i++) {
      const divWithTheme = document.createElement('div');
      divWithTheme.classList.add('one-theme-block', 'front');
      divWithTheme.innerText = `${categories[i].category}`;
      divWithTheme.setAttribute("style", `background-image:url('${categories[i].cardsContent[0].image}');`);

      this.element.appendChild(divWithTheme);
    }

    this.element.addEventListener('click', (e: Event)=>{
      this.checkActiveTheme(e, categories);
     });

     document.getElementById('menu')?.addEventListener('click', (e:Event)=>{
      this.checkActiveTheme(e, categories);
     })
  }

  checkActiveTheme(e: Event, categories: ImageCategoryModel[]){
    let selectedThemeHTML = e.target as HTMLElement;
    this.activeTheme = selectedThemeHTML.textContent;
    console.log(this.activeTheme?.toString());
    if(this.mainPage.train === true && this.activeTheme !== 'Main Page') {
      this.drawTrain(categories);
    }
    if(this.activeTheme === 'Main Page') {
      this.drawThemes();
    }
  }

  drawTrain(categories: ImageCategoryModel[]){
    let activeThemeObj = categories.find(el => el.category === this.activeTheme);
    let themeBlocksArr = document.getElementsByClassName('one-theme-block');
      if(activeThemeObj?.cardsContent.length !== undefined) {
      for(let i = 0; i < activeThemeObj.cardsContent.length; i++) {
        let divWithPicToFlipCard = document.createElement('img');
        let back = document.createElement('div');
        let audio = document.createElement('audio');
        back.classList.add('back');
        back.innerText = `${activeThemeObj.cardsContent[i].translation}`;
        audio.setAttribute('src', `${activeThemeObj.cardsContent[i].audioSrc}`)
        back.setAttribute("style", `background-image:url('${activeThemeObj.cardsContent[i].image}');`);
        divWithPicToFlipCard.setAttribute('src', picForFlip);
        divWithPicToFlipCard.classList.add('flip-pic');
        themeBlocksArr[i].setAttribute("style", `background-image:url('${activeThemeObj.cardsContent[i].image}');`);
        themeBlocksArr[i].innerHTML = `${activeThemeObj.cardsContent[i].word}`;
        themeBlocksArr[i].appendChild(divWithPicToFlipCard);
        themeBlocksArr[i].appendChild(back);
        themeBlocksArr[i].appendChild(audio);

        themeBlocksArr[i].addEventListener('click', (e: Event)=>{
          let clickOnCard = e.target as HTMLElement;
          if(clickOnCard.classList.contains('back')){
            this.playAudio(clickOnCard);
          }
          else {
            this.flippCard(clickOnCard);
          }
        })
      }
    }
  }

  playAudio(clickOnCard: HTMLElement){
     console.log(clickOnCard);
     let audio = clickOnCard.nextElementSibling as HTMLAudioElement;
    // let wordOnCard = clickOnCard.textContent;
    // console.log(selectedCardToPlayAud);
    // let audio =  selectedCardToPlayAud.cardsContent[i].audioSrc as unknown as HTMLAudioElement;
      audio.play();
  }

  flippCard(selectedCardFlipPic: HTMLElement){
    let wholeCard = selectedCardFlipPic.parentElement;
    if (wholeCard !== null){
      wholeCard.classList.add('flipp');
      wholeCard.addEventListener('mouseleave', ()=>{if(wholeCard !== null){wholeCard.classList.remove('flipp')}})
    }
  }
}
