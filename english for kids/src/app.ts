import { NewRout } from './components/routing/newRouting';
import { Header } from './components/header/header';
import { GridBtn } from './components/grid-btn/grid-btn';
import { Game } from './components/game/game';
import { DatabaseIamDarya } from './components/database/database';
import { WordStatistic } from './components/database/word-statist';
import { Statistics } from './components/statistics/statistics';

export class App {
  private readonly newRout: NewRout;

  private readonly header: Header;

  private readonly gridBtn: GridBtn;

  game: Game;

  dataBaseIamDarya: DatabaseIamDarya;

  private readonly statistics: Statistics;

  constructor(private readonly rootElement: HTMLElement) {
    this.newRout = new NewRout();


    this.dataBaseIamDarya = new DatabaseIamDarya();

    this.game = new Game(this.dataBaseIamDarya);

    this.gridBtn = new GridBtn(this.game, this.dataBaseIamDarya);

    this.header = new Header(this.gridBtn, this.newRout);

    this.statistics = new Statistics(this.dataBaseIamDarya);

  }

  async start(): Promise<void> {

    this.newRout.add('statistics', () => {
      this.statistics.show();
      this.gridBtn.hide();
      this.statistics.statisticShow();
    });

    this.newRout.add('', () => {
      this.statistics.hide();
      this.gridBtn.show();
    });

    await this.dataBaseIamDarya.load();
    const allThemesJson = await fetch('./cards.json');
    const categories = await allThemesJson.json();
    this.header.drawHeader(categories);
    this.gridBtn.categories = categories;
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.gridBtn.element);
    this.rootElement.appendChild(this.statistics.element);
    // this.rootElement.appendChild(this.mainPage.element);
    this.gridBtn.drawAllCategories();

    for(let i=0;i<categories.length;i++){
      for(let j=0;j<categories[i].cardsContent.length;j++){
        if(await this.dataBaseIamDarya.getWord(categories[i].category+categories[i].cardsContent[j].word+categories[i].cardsContent[j].translation) === undefined){
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
  }
}
