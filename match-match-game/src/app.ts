import { About } from './components/about/about';
import { BestScore } from './components/best-score/best-score';
import { Cover } from './components/cover/cover';
import { DatabaseIamDarya } from './components/database/database';
import { Footer } from './components/footer/footer';
import { Settings } from './components/game-sitting/game-setting';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { PopUpWin } from './components/pop-up-win/pop-up-win';
import { Registration } from './components/registration/registration';
import { NewRout } from './components/routing/newRouting';
import { Router } from './components/routing/routing';

export class App {
  private readonly router: Router;

  private readonly newRout: NewRout;

  private readonly game: Game;

  private readonly header: Header;

  private readonly footer: Footer;

  private readonly about: About;

  private readonly bestScore: BestScore;

  private readonly settings: Settings;

  private readonly registration: Registration;

  private readonly popUpWin: PopUpWin;

  private readonly cover: Cover;

  private readonly dataBaseIamDarya: DatabaseIamDarya;

  constructor(private readonly rootElement: HTMLElement) {
    this.dataBaseIamDarya = new DatabaseIamDarya();
    this.router = new Router();
    this.newRout = new NewRout();
    this.about = new About();
    this.bestScore = new BestScore(this.dataBaseIamDarya);
    this.settings = new Settings();
    this.game = new Game(this.dataBaseIamDarya, this.newRout);
    this.header = new Header(this.game, this.router, this.bestScore, this.newRout);
    this.registration = new Registration(this.dataBaseIamDarya, this.game, this.header);
    this.popUpWin = new PopUpWin(this.bestScore, this.newRout);
    this.cover = new Cover();
    this.footer = new Footer();
  }

  async start(): Promise<void> {
    await this.dataBaseIamDarya.load();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.game.element);
    this.rootElement.appendChild(this.about.element);
    this.rootElement.appendChild(this.bestScore.element);
    this.rootElement.appendChild(this.settings.element);
    this.rootElement.appendChild(this.registration.element);
    this.rootElement.appendChild(this.popUpWin.element);
    this.rootElement.appendChild(this.cover.element);
    this.rootElement.appendChild(this.footer.element);
    // Router.start();
    this.newRout.add('about-game', () => {
      this.game.hide();
      document.getElementById('about')?.classList.add('active');
      this.about.show();
      document.getElementById('best-score')?.classList.remove('active');
      this.bestScore.hide();
      document.getElementById('game-setting')?.classList.remove('active');
      this.settings.hide();
    });

    this.newRout.add('', () => {
      this.game.hide();
      document.getElementById('about')?.classList.add('active');
      this.about.show();
      document.getElementById('best-score')?.classList.remove('active');
      this.bestScore.hide();
      document.getElementById('game-setting')?.classList.remove('active');
      this.settings.hide();
    });

    this.newRout.add('best-score', () => {
      this.game.hide();
      document.getElementById('best-score')?.classList.add('active');
      this.bestScore.show();
      this.bestScore.bestScoreShow();
      document.getElementById('about')?.classList.remove('active');
      this.about.hide();
      document.getElementById('game-setting')?.classList.remove('active');
      this.settings.hide();
    });

    this.newRout.add('game-setting', () => {
      this.game.hide();
      document.getElementById('game-setting')?.classList.add('active');
      this.settings.show();
      document.getElementById('best-score')?.classList.remove('active');
      this.bestScore.hide();
      document.getElementById('about')?.classList.remove('active');
      this.about.hide();
    });
  }
}
