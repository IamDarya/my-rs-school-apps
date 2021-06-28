import { NewRout } from './components/routing/newRouting';
import { Header } from './components/header/header';
import { GridBtn } from './components/grid-btn/grid-btn';
import { Game } from './components/game/game';
import { DatabaseIamDarya } from './components/database/database';
import { WordStatistic } from './components/database/word-statist';

export class App {
  private readonly newRout: NewRout;

  private readonly header: Header;

  private readonly gridBtn: GridBtn;

  game: Game;

  dataBaseIamDarya: DatabaseIamDarya;

  constructor(private readonly rootElement: HTMLElement) {
    this.newRout = new NewRout();

    this.game = new Game();

    this.gridBtn = new GridBtn(this.game);

    this.header = new Header(this.gridBtn);

    this.dataBaseIamDarya = new DatabaseIamDarya();

  }

  async start(): Promise<void> {
    await this.dataBaseIamDarya.load();
    const allThemesJson = await fetch('./cards.json');
    const categories = await allThemesJson.json();
    this.header.drawHeader(categories);
    this.gridBtn.categories = categories;
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.gridBtn.element);
    // this.rootElement.appendChild(this.mainPage.element);
    this.gridBtn.drawAllCategories();

    for(let i=0;i<categories.length;i++){
      for(let j=0;j<categories[i].cardsContent.length;j++){
        if(this.dataBaseIamDarya.getWord(categories[i].category+categories[i].cardsContent[j].word+categories[i].cardsContent[j].translation) === undefined){
          const wordStatistic = new WordStatistic(
            categories[i].category,
            categories[i].cardsContent[j].word,
            categories[i].cardsContent[j].translation,
            0,
            categories[i].category+categories[i].cardsContent[j].word+categories[i].cardsContent[j].translation,
            0,
            0,
            0,
            );
            await this.dataBaseIamDarya.transaction(wordStatistic);
        }
      }
    }

    // Router.start();
    // this.newRout.add('about-game', () => {
    //   this.game.hide();
    //   document.getElementById('about')?.classList.add('active');
    //   this.about.show();
    //   document.getElementById('best-score')?.classList.remove('active');
    //   this.bestScore.hide();
    //   document.getElementById('game-setting')?.classList.remove('active');
    //   this.settings.hide();
    // });

    // this.newRout.add('', () => {
    //   this.game.hide();
    //   document.getElementById('about')?.classList.add('active');
    //   this.about.show();
    //   document.getElementById('best-score')?.classList.remove('active');
    //   this.bestScore.hide();
    //   document.getElementById('game-setting')?.classList.remove('active');
    //   this.settings.hide();
    // });

    this.newRout.add('', () => {
    //  this.mainPage.show();
    //   document.getElementById('best-score')?.classList.add('active');
    //   this.bestScore.show();
    //   this.bestScore.bestScoreShow();
    //   document.getElementById('about')?.classList.remove('active');
    //   this.about.hide();
    //   document.getElementById('game-setting')?.classList.remove('active');
    //   this.settings.hide();
    });

    this.newRout.add('cards', () => {
    //    this.mainPage.hide();
    //   document.getElementById('game-setting')?.classList.add('active');
    //   this.settings.show();
    //   document.getElementById('best-score')?.classList.remove('active');
    //   this.bestScore.hide();
    //   document.getElementById('about')?.classList.remove('active');
    //   this.about.hide();
    });
  }
}
