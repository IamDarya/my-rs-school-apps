import { NewRout } from './components/routing/newRouting';
import { MainPage } from './components/main-page/main-page';
import { ThemeCards } from './components/theme-cards/theme-cards';

export class App {
  private readonly newRout: NewRout;

  private readonly mainPage: MainPage;

  private readonly themeCards: ThemeCards;

  constructor(private readonly rootElement: HTMLElement) {
    this.newRout = new NewRout();

    this.mainPage = new MainPage();

    this.themeCards = new ThemeCards(this.mainPage);

  }

  async start(): Promise<void> {
    this.rootElement.appendChild(this.mainPage.element);
    this.rootElement.appendChild(this.themeCards.element);

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
