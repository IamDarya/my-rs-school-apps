import { NewRout } from './components/routing/newRouting';
import { MainPage } from './components/main-page/main-page';

export class App {
  private readonly newRout: NewRout;

  private readonly mainPage: MainPage;

  constructor(private readonly rootElement: HTMLElement) {
    this.newRout = new NewRout();

    this.mainPage = new MainPage();
  }

  async start(): Promise<void> {
    this.rootElement.appendChild(this.mainPage.element);
    // this.rootElement.appendChild(this.game.element);
    // this.rootElement.appendChild(this.about.element);
    // this.rootElement.appendChild(this.bestScore.element);
    // this.rootElement.appendChild(this.settings.element);
    // this.rootElement.appendChild(this.registration.element);
    // this.rootElement.appendChild(this.popUpWin.element);
    // this.rootElement.appendChild(this.cover.element);
    // this.rootElement.appendChild(this.footer.element);
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

    // this.newRout.add('best-score', () => {
    //   this.game.hide();
    //   document.getElementById('best-score')?.classList.add('active');
    //   this.bestScore.show();
    //   this.bestScore.bestScoreShow();
    //   document.getElementById('about')?.classList.remove('active');
    //   this.about.hide();
    //   document.getElementById('game-setting')?.classList.remove('active');
    //   this.settings.hide();
    // });

    // this.newRout.add('game-setting', () => {
    //   this.game.hide();
    //   document.getElementById('game-setting')?.classList.add('active');
    //   this.settings.show();
    //   document.getElementById('best-score')?.classList.remove('active');
    //   this.bestScore.hide();
    //   document.getElementById('about')?.classList.remove('active');
    //   this.about.hide();
    // });
  }
}
