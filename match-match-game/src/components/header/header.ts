import './header.scss';
import { BaseComponent } from '../base-component';
import { Game } from '../game/game';
import { ImageCategoryModel } from '../../models/image-category-model';
import { Router } from '../routing/routing';

export class Header extends BaseComponent {
  game: Game;
  router: Router;

  constructor(game: Game, router: Router) {
    super('header', ['header']);
    this.element.innerHTML = `
  <header id="header">
    <div class="logo"><div class="logo-pic"></div><p>Match<br>Match<br>Game</p>
    </div>
    <div>
      <ul class="header-list">
        <li><button type="button" id="about" class="btn about-btn active">About Game</button></li>
        <li><button type="button" id="best-score" class="btn best-score-btn">Best Score</button></li>
        <li><button type="button" id="game-setting" class="btn game-setting-btn">Game Setting</button></li>
      </ul>
    </div>
    <div>
      <button type="button" class="regictration-btn btn">Register New Player</button>
      <button type="button" class="start-game-btn btn hidden">Start Game</button>
      <button type="button" id="stop-game-btn" class="stop-game-btn btn hidden">Stop Game</button>
    </div>
  </header>`;

    this.router = router;

    this.game = game;
    const headerList = this.element.getElementsByClassName('header-list')[0];
    const regist = this.element.getElementsByClassName('regictration-btn')[0];
    const startBtn = this.element.getElementsByClassName('start-game-btn')[0];
    const stopBtn = this.element.getElementsByClassName('stop-game-btn')[0];

    function newPage(event: Event) {
      const t = event.target as HTMLElement;
      if (t.id === 'stop-game-btn') {
        document.getElementsByClassName('main')[0].classList.add('hidden');
        document.getElementById('about')?.classList.add('active');
        document.getElementsByClassName('about')[0].classList.remove('hidden');
        document.getElementById('best-score')?.classList.remove('active');
        document.getElementsByClassName('best-score')[0].classList.add('hidden');
        document.getElementById('game-setting')?.classList.remove('active');
        document.getElementsByClassName('game-setting')[0].classList.add('hidden');
        stopBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
      }
      if (t.id === 'about') {
        window.history.pushState(null, 'about-game', 'about-game');
        router.newPage('/about-game');
        stopBtn.classList.add('hidden');
        if(regist.classList.contains('hidden')) {
          startBtn.classList.remove('hidden');
        }
        // startBtn.classList.add('hidden');
      }
      if (t.id === 'best-score') {
        window.history.pushState(null, 'best-score', 'best-score');
        router.newPage('/best-score');
        stopBtn.classList.add('hidden');
        // startBtn.classList.add('hidden');
        if(regist.classList.contains('hidden')) {
          startBtn.classList.remove('hidden');
        }
      }
      if (t.id === 'game-setting') {
        window.history.pushState(null, 'game-setting', 'game-setting');
        router.newPage('/game-setting');
        stopBtn.classList.add('hidden');
        // startBtn.classList.add('hidden');
        if(regist.classList.contains('hidden')) {
          startBtn.classList.remove('hidden');
        }
      }
    }

    function registratison() {
      document.getElementById('app')?.classList.toggle('blured');
      regist.classList.toggle('active');
      document.getElementsByClassName('registration')[0].classList.toggle('hidden');
      document.getElementsByClassName('cover')[0].classList.toggle('hidden');
    }

    headerList?.addEventListener('click', newPage);
    regist.addEventListener('click', registratison);

    stopBtn.addEventListener('click', newPage);

    startBtn.addEventListener('click', async () => {
      const res = await fetch('./food.json');
      const categories: ImageCategoryModel[] = await res.json();
      const cat = categories[0];
      const images = cat.images.map((name) => `${cat.category}/${name}`);
      this.game.newGame(images);
    });
  }
}
