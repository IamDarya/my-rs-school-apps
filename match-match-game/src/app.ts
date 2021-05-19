import { About } from './components/about/about';
import { BestScore } from './components/best-score/best-score';
import { Cover } from './components/cover/cover';
import { Footer } from './components/footer/footer';
import { Settings } from './components/game-sitting/game-setting';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Registration } from './components/registration/registration';
import { ImageCategoryModel } from './models/image-category-model';

export class App {
  private readonly game: Game;

  private readonly header: Header;

  private readonly footer: Footer;

  private readonly about: About;

  private readonly bestScore: BestScore;

  private readonly settings: Settings;

  private readonly registration: Registration;

  private readonly cover:Cover;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);

    this.game = new Game();
    this.rootElement.appendChild(this.game.element);

    this.about = new About();
    this.rootElement.appendChild(this.about.element);

    this.bestScore = new BestScore();
    this.rootElement.appendChild(this.bestScore.element);

    this.settings = new Settings();
    this.rootElement.appendChild(this.settings.element);

    this.registration = new Registration();
    this.rootElement.appendChild(this.registration.element);

    this.cover = new Cover();
    this.rootElement.appendChild(this.cover.element);

    this.footer = new Footer();
    this.rootElement.appendChild(this.footer.element);
  }

  async start():Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
