import { Router } from './components/router/router';
import { BestResult } from './components/best-result/best-result';
import { Garage } from './components/garage/garage';
import { API } from './components/api';

export class App {
  private readonly router = new Router();

  private readonly bestResult = new BestResult(this.router);

  private readonly api = new API();

  private readonly garage = new Garage(this.router, this.bestResult, this.api);

  constructor(private readonly rootElement: HTMLElement) {
  }

  async start(): Promise<void> {
    this.rootElement.appendChild(this.garage.element);
    this.rootElement.appendChild(this.bestResult.element);

    this.router.add('garage', () => { });

    this.router.add('', () => { });

    this.router.add('best-score', () => { });
  }
}
