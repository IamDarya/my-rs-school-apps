import { NewRout } from './components/routing/newRouting';
import { Header } from './components/header/header';
import { GridBtn } from './components/grid-btn/grid-btn';
import { Game } from './components/game/game';
import { DatabaseDarya } from './components/database/database';
import { WordStatistic } from './components/database/word-statist';
import { Statistics } from './components/statistics/statistics';
import { Registration } from './components/registration/registration';
import { Overlay } from './components/grid-btn/overlay';

export class App {
  private readonly newRout: NewRout;

  private readonly header: Header;

  private readonly gridBtn: GridBtn;

  private readonly registration: Registration;

  overlay: Overlay;

  game: Game;

  dataBaseDarya: DatabaseDarya;

  private readonly statistics: Statistics;

  constructor(private readonly rootElement: HTMLElement) {
    this.overlay = new Overlay();

    this.newRout = new NewRout();

    this.dataBaseDarya = new DatabaseDarya();

    this.game = new Game(this.dataBaseDarya);

    this.gridBtn = new GridBtn(this.game, this.dataBaseDarya, this.overlay);

    this.registration = new Registration(this.overlay);

    this.header = new Header(this.gridBtn, this.newRout, this.registration);

    this.statistics = new Statistics(this.dataBaseDarya);
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

    await this.dataBaseDarya.load();
    const allThemesJson = await fetch('./cards.json');
    const categories = await allThemesJson.json();
    this.header.drawHeader(categories);
    this.gridBtn.categories = categories;
    this.rootElement.appendChild(this.registration.element);
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.gridBtn.element);
    this.rootElement.appendChild(this.statistics.element);
    this.rootElement.appendChild(this.overlay.element);
    // this.rootElement.appendChild(this.mainPage.element);
    this.gridBtn.drawAllCategories();

    // const rez = [];
    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categories[i].cardsContent.length; j++) {
        if (
          (await this.dataBaseDarya.getWord( // eslint-disable-line no-await-in-loop
            categories[i].category
              + categories[i].cardsContent[j].word
              + categories[i].cardsContent[j].translation,
          )) === undefined
        ) {
          const wordStatistic = new WordStatistic(
            categories[i].category,
            categories[i].cardsContent[j].word,
            categories[i].cardsContent[j].translation,
            0,
            categories[i].category
              + categories[i].cardsContent[j].word
              + categories[i].cardsContent[j].translation,
            0,
            0,
            0,
          );
          await this.dataBaseDarya.transaction(wordStatistic); // eslint-disable-line no-await-in-loop
          // rez.push(wordStatistic);
        }
      }
    }
    // await Promise.all(rez);
    // for (let i = 0; i < rez.length; i++) {
    //   this.dataBaseDarya.transaction(rez[i]);
    // }
  }
}
