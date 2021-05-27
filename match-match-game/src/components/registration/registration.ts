import './registration.scss';
import { BaseComponent } from '../base-component';
import { DatabaseIamDarya } from '../database/database';
import { User } from '../antities/user';
import { Game } from '../game/game';

export class Registration extends BaseComponent {
  database: DatabaseIamDarya;

  game: Game;

  constructor(database: DatabaseIamDarya, game: Game) {
    super('div', ['registration', 'hidden']);
    this.game = game;
    this.database = database;
    this.element.innerHTML = `
    <h2>Register new player</h2>
    <div class="forms">
      <form action class="contact-form">
        <label class="contact-form__label" for="firstName" >First name</label>
        <input type="text" class="contact-form__input first-name" maxlength=30 placeholder="First name" required>
        <label class="contact-form__label" for="lastName" placeholder="Last name">Last name</label>
        <input type="text" class="contact-form__input last-name" maxlength=30 placeholder="Last name" required>
        <label class="contact-form__label" for="email" placeholder="email">email</label>
        <input type="email" class="contact-form__input email" maxlength=30 placeholder="your@email.com" required>
        <button class="btn btn-add-user validate unactive_btn" type="submit">ADD USER</button>
        <button class="btn btn-cansel" type="button">CANCEL</button>
    </div>
    `;

    const closeBtn = this.element.getElementsByClassName('btn-cansel')[0];
    const fName = this.element.getElementsByClassName('first-name')[0] as HTMLInputElement;
    const lName = this.element.getElementsByClassName('last-name')[0] as HTMLInputElement;
    const email = this.element.getElementsByClassName('email')[0] as HTMLInputElement;
    const addUserBtn = this.element.getElementsByClassName('validate')[0];
    const reg = /^(?![0-9]*$)[a-zA-Z0-9]+$/;

    function closeRegist() {
      document.getElementById('app')?.classList.toggle('blured');
      document.getElementsByClassName('registration')[0].classList.toggle('hidden');
      document.getElementsByClassName('cover')[0].classList.toggle('hidden');
      document.getElementsByClassName('regictration-btn')[0].classList.toggle('active');

      fName.value = '';
      lName.value = '';
      email.value = '';
    }

    const validateInput = () => {
      if (
        fName.validity.valid
      && lName.validity.valid
      && email.validity.valid
      ) {
        addUserBtn?.classList.remove('unactive_btn');
      } else {
        addUserBtn?.classList.add('unactive_btn');
      }
    };

    fName.addEventListener('input', () => {
      if (fName.value.match(reg)) {
        validateInput();
      } else {
        validateInput();
      }
    });

    lName.addEventListener('input', () => {
      if (lName.value.match(reg)) {
        validateInput();
      } else {
        validateInput();
      }
    });

    email.addEventListener('input', () => {
      validateInput();
    });

    closeBtn?.addEventListener('click', closeRegist);

    addUserBtn.addEventListener('click', async (s) => {
      if (addUserBtn.classList.contains('unactive_btn')) return;
      s.preventDefault();
      const user = new User(email.value, fName.value, lName.value, 0);
      if (await database.getUser(email.value) === undefined) {
        await database.transaction(user);
      }
      game.activeUser = user;
      setTimeout(() => { alert(`Hello ${fName.value}, let's play a game!`); }, 500);

      document.getElementsByClassName('cover')[0].classList.toggle('hidden');
      document.getElementsByClassName('registration')[0].classList.toggle('hidden');
      document.getElementsByClassName('regictration-btn')[0].classList.add('hidden');
      document.getElementsByClassName('start-game-btn')[0].classList.remove('hidden');
    });
  }
}
