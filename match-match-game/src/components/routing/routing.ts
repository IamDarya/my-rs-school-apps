export class Router {
  routes: Array<string> = [];

  root = '/';

  constructor() {
    this.routes = [
      '/about-game',
      '/best-score',
      '/game-setting',
      '/game',
      '/registration',
      '/win',
    ];
  }

  static start(): void {
    Router.newPage(window.location.pathname);
    window.addEventListener('popstate', () => {
      Router.newPage(window.location.pathname);
    });
  }

  static newPage(str: string): void {
    if (str === '/about-game' || str === '/') {
      document.getElementsByClassName('main')[0].classList.add('hidden');
      document.getElementById('about')?.classList.add('active');
      document.getElementsByClassName('about')[0].classList.remove('hidden');
      document.getElementById('best-score')?.classList.remove('active');
      document.getElementsByClassName('best-score')[0].classList.add('hidden');
      document.getElementById('game-setting')?.classList.remove('active');
      document
        .getElementsByClassName('game-setting')[0]
        .classList.add('hidden');
    }
    if (str === '/best-score') {
      document.getElementsByClassName('main')[0].classList.add('hidden');
      document.getElementById('best-score')?.classList.add('active');
      document.getElementsByClassName('best-score')[0].classList.remove('hidden');
      document.getElementById('about')?.classList.remove('active');
      document.getElementsByClassName('about')[0].classList.add('hidden');
      document.getElementById('game-setting')?.classList.remove('active');
      document
        .getElementsByClassName('game-setting')[0]
        .classList.add('hidden');
    }
    if (str === '/game-setting') {
      document.getElementsByClassName('main')[0].classList.add('hidden');
      document.getElementById('game-setting')?.classList.add('active');
      document.getElementsByClassName('game-setting')[0].classList.remove('hidden');
      document.getElementById('best-score')?.classList.remove('active');
      document.getElementsByClassName('best-score')[0].classList.add('hidden');
      document.getElementById('about')?.classList.remove('active');
      document.getElementsByClassName('about')[0].classList.add('hidden');
    }
  }
}
