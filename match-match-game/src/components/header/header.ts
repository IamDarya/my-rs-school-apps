import './header.scss';
import { BaseComponent } from '../base-component';
import { Game } from '../game/game';
import { ImageCategoryModel } from '../../models/image-category-model';
import { Router } from '../routing/routing';
import { BestScore } from '../best-score/best-score';
import { NewRout } from '../routing/newRouting';
import ninja from '../../assets/ninja.png';

export class Header extends BaseComponent {
  game: Game;

  router: Router;

  private bestScore: BestScore;

  newRout: NewRout;

  constructor(
    game: Game,
    router: Router,
    bestScore: BestScore,
    newRout: NewRout,
  ) {
    super('header', ['header']);
    this.newRout = newRout;
    this.bestScore = bestScore;
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
    <div class="btn-and-prof-pic">
    <img class="pic-user">
      <button type="button" class="regictration-btn btn">Register New Player</button>
      <button type="button" class="start-game-btn btn hidden">Start Game</button>
      <button type="button" id="stop-game-btn" class="stop-game-btn btn hidden">Stop Game</button>
      <button type="button" class="log-out_btn btn hidden">Log out</button>
    </div>
  </header>`;

    this.router = router;

    this.game = game;
    const headerList = this.element.getElementsByClassName('header-list')[0];
    const regist = this.element.getElementsByClassName('regictration-btn')[0];
    const startBtn = this.element.getElementsByClassName('start-game-btn')[0];
    const stopBtn = this.element.getElementsByClassName('stop-game-btn')[0];
    const logOutBtn = this.element.getElementsByClassName('log-out_btn')[0];

    function newPage(event: Event) {
      const t = event.target as HTMLElement;
      if (t.id === 'stop-game-btn') {
        document.getElementsByClassName('main')[0].classList.add('hidden');
        document.getElementById('about')?.classList.add('active');
        document.getElementsByClassName('about')[0].classList.remove('hidden');
        document.getElementById('best-score')?.classList.remove('active');
        document
          .getElementsByClassName('best-score')[0]
          .classList.add('hidden');
        document.getElementById('game-setting')?.classList.remove('active');
        document
          .getElementsByClassName('game-setting')[0]
          .classList.add('hidden');
        stopBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
      }
      if (t.id === 'about') {
        newRout.navigate('about-game');
        stopBtn.classList.add('hidden');
        if (regist.classList.contains('hidden')) {
          startBtn.classList.remove('hidden');
        }
      }
      if (t.id === 'best-score') {
        newRout.navigate('best-score');
        stopBtn.classList.add('hidden');
        bestScore.bestScoreShow();
        if (regist.classList.contains('hidden')) {
          startBtn.classList.remove('hidden');
        }
      }
      if (t.id === 'game-setting') {
        newRout.navigate('game-setting');
        stopBtn.classList.add('hidden');
        if (regist.classList.contains('hidden')) {
          startBtn.classList.remove('hidden');
        }
      }
    }

    function registratison() {
      document.getElementById('app')?.classList.toggle('blured');
      regist.classList.toggle('active');
      document
        .getElementsByClassName('registration')[0]
        .classList.toggle('hidden');
      document.getElementsByClassName('cover')[0].classList.toggle('hidden');
    }

    headerList?.addEventListener('click', newPage);

    regist.addEventListener('click', registratison);

    stopBtn.addEventListener('click', newPage);

    logOutBtn.addEventListener('click', () => {
      stopBtn.classList.add('hidden');
      startBtn.classList.add('hidden');
      logOutBtn.classList.add('hidden');
      regist.classList.remove('hidden');
      this.game.activeUser = undefined;
      newRout.navigate('about-game');
      document.getElementsByClassName('pic-user')[0].removeAttribute('src');
    });

    startBtn.addEventListener('click', async () => {
      const cardsSelect = document.getElementById(
        'select-cards',
      ) as HTMLSelectElement;
      const result = cardsSelect.options[cardsSelect.selectedIndex].value;
      let res = await fetch('./food.json');
      if (result === 'animals') {
        res = await fetch('./animals.json');
      }
      if (result === 'art') {
        res = await fetch('./art.json');
      }
      const categories: ImageCategoryModel[] = await res.json();
      const cat = categories[0];
      const images = cat.images.map((name) => `${cat.category}/${name}`);
      this.game.newGame(images);
    });
  }

  addProfPic(): void {
    if (this.game.activeUser && this.game.activeUser.image) {
      document
        .getElementsByClassName('pic-user')[0]
        .setAttribute('src', `${this.game.activeUser.image}`);
    } else {
      document
        .getElementsByClassName('pic-user')[0]
        .setAttribute('src', `${ninja}`);
    }
  }
}
