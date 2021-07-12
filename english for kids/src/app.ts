import { NewRout } from './components/routing/newRouting';
import { Header } from './components/header/header';
import { GridBtn } from './components/grid-btn/grid-btn';
import { Game } from './components/game/game';
import { DatabaseDarya } from './components/database/database';
import { WordStatistic } from './components/database/word-statist';
import { Statistics } from './components/statistics/statistics';
import { Registration } from './components/registration/registration';
import { Overlay } from './components/grid-btn/overlay';
import { AdminPage } from './components/admin-page/admin-page';
import { LoginedAdmin } from './components/registration/logined-admin';
import { ImageCategoryModel } from './components/image-category-models/image-category-models';
import { Card } from './components/image-category-models/card';

export class App {
  private readonly newRout: NewRout;

  private readonly header: Header;

  private readonly gridBtn: GridBtn;

  private readonly registration: Registration;

  private readonly overlay: Overlay;

  private readonly game: Game;

  private readonly dataBaseDarya: DatabaseDarya;

  private readonly adminPage: AdminPage;

  private readonly statistics: Statistics;

  private readonly loginedAdmin: LoginedAdmin;

  constructor(private readonly rootElement: HTMLElement) {
    this.overlay = new Overlay();

    this.newRout = new NewRout();

    this.dataBaseDarya = new DatabaseDarya();

    this.game = new Game(this.dataBaseDarya);

    this.gridBtn = new GridBtn(this.game, this.dataBaseDarya, this.overlay);

    this.adminPage = new AdminPage(this.dataBaseDarya, this.overlay);

    this.loginedAdmin = new LoginedAdmin();

    this.registration = new Registration(this.overlay, this.adminPage, this.newRout, this.loginedAdmin);

    this.header = new Header(this.gridBtn, this.newRout, this.registration);

    this.statistics = new Statistics(this.dataBaseDarya);
  }

  async start(): Promise<void> {
    this.newRout.add('statistics', () => {
      this.statistics.show();
      this.gridBtn.hide();
      this.statistics.statisticShow();
      this.adminPage.hide();
    });

    this.newRout.add('', () => {
      this.statistics.hide();
      this.gridBtn.show();
      this.header.show();
      this.adminPage.hide();
    });

    this.newRout.add('categories', () => {
      if (this.loginedAdmin.loginedAdmin) {
        this.statistics.hide();
        this.gridBtn.hide();
        this.header.hide();
        this.adminPage.drawAllCategories();
        this.adminPage.show();
      } else {
        this.newRout.navigate('');
      }
    });

    await this.dataBaseDarya.load();

    const cards = await (await fetch('http://localhost:8000/api/cards')).json() as Card[]; // const cards = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/cards')).json() as Card[];
    const serverCategories = await (await fetch('http://localhost:8000/api/categories')).json() as ImageCategoryModel[]; // const serverCategories = await (await fetch('https://mighty-cliffs-95999.herokuapp.com/api/categories')).json() as ImageCategoryModel[]

    for (let i = 0; i < serverCategories.length; i++) {
      const cardsOfCategory = cards.filter((c) => c.categoryId === serverCategories[i].id);
      serverCategories[i].cardsContent = cardsOfCategory;
    }

    this.header.drawHeader(serverCategories);
    this.gridBtn.categories = serverCategories;
    console.log(serverCategories);
    this.adminPage.categories = serverCategories;
    this.adminPage.drawAllCategories();
    this.rootElement.appendChild(this.registration.element);
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.gridBtn.element);
    this.rootElement.appendChild(this.statistics.element);
    this.rootElement.appendChild(this.adminPage.element);
    this.rootElement.appendChild(this.overlay.element);
    const footer = document.createElement('footer');
    footer.innerHTML = `<a href="https://rs.school/js/" target="_blank">The Rolling Scopes|</a>
    <img src ='https://rs.school/images/rs_school_js.svg'>
    <p>|2021|</p>
    <a href="https://github.com/IamDarya" target="_blank">My github</a>`;
    this.rootElement.appendChild(footer);
    // this.rootElement.appendChild(this.mainPage.element);
    this.gridBtn.drawAllCategories();

    // const rez = [];
    for (let i = 0; i < serverCategories.length; i++) {
      for (let j = 0; j < serverCategories[i].cardsContent.length; j++) {
        if (
          (await this.dataBaseDarya.getWord( // eslint-disable-line no-await-in-loop
            serverCategories[i].category
              + serverCategories[i].cardsContent[j].word
              + serverCategories[i].cardsContent[j].translation,
          )) === undefined
        ) {
          const wordStatistic = new WordStatistic(
            serverCategories[i].category,
            serverCategories[i].cardsContent[j].word,
            serverCategories[i].cardsContent[j].translation,
            0,
            serverCategories[i].category
              + serverCategories[i].cardsContent[j].word
              + serverCategories[i].cardsContent[j].translation,
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
