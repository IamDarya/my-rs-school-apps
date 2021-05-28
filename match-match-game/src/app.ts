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
import { Router } from './components/routing/routing';

export class App {
  private readonly router: Router;

  private readonly game: Game;

  private readonly header: Header;

  private readonly footer: Footer;

  private readonly about: About;

  private readonly bestScore: BestScore;

  private readonly settings: Settings;

  private readonly registration: Registration;

  private readonly popUpWin: PopUpWin;

  private readonly cover:Cover;

  private readonly dataBaseIamDarya: DatabaseIamDarya;

  constructor(private readonly rootElement: HTMLElement) {
    this.dataBaseIamDarya = new DatabaseIamDarya();
    this.router = new Router();
    this.about = new About();
    this.bestScore = new BestScore(this.dataBaseIamDarya);
    this.settings = new Settings();
    this.game = new Game(this.dataBaseIamDarya);
    this.header = new Header(this.game, this.router, this.bestScore);
    this.registration = new Registration(this.dataBaseIamDarya, this.game);
    this.popUpWin = new PopUpWin(this.bestScore);
    this.cover = new Cover();
    this.footer = new Footer();
  }

  async start():Promise<void> {
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.game.element);
    this.rootElement.appendChild(this.about.element);
    this.rootElement.appendChild(this.bestScore.element);
    this.rootElement.appendChild(this.settings.element);
    this.rootElement.appendChild(this.registration.element);
    this.rootElement.appendChild(this.popUpWin.element);
    this.rootElement.appendChild(this.cover.element);
    this.rootElement.appendChild(this.footer.element);
    Router.start();
  }
}
