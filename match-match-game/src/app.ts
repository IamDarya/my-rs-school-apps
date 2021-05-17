import { Footer } from './components/footer/footer';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { ImageCategoryModel } from './models/image-category-model';

export class App {
  private readonly game: Game;

  private readonly header: Header;

  private readonly footer: Footer;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);

    this.game = new Game();
    this.rootElement.appendChild(this.game.element);

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
