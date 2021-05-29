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
    <h2 class="regist-h2">Register new player</h2>
    <div class="forms">
      <form action class="contact-form">
        <label class="contact-form__label" for="firstName" >First name</label>
        <input type="text" pattern="^(?![0-9]*$)[a-zA-Zа-яА-Я0-9&bsol;s]+$" class="contact-form__input first-name"
        maxlength=30 placeholder="First name" required>
        <label class="contact-form__label" for="lastName" placeholder="Last name">Last name</label>
        <input type="text" pattern="^(?![0-9]*$)[a-zA-Zа-яА-Я0-9&bsol;s]+$" class="contact-form__input last-name"
        maxlength=30 placeholder="Last name" required>
        <label class="contact-form__label" for="email" placeholder="email">email</label>
        <input type="email" class="contact-form__input email" maxlength=30 placeholder="your@email.com" required>
        <button class="btn btn-add-user validate unactive_btn" type="submit">ADD USER</button>
        <button class="btn btn-cansel" type="button">CANCEL</button>
    </div>
    `;

    const closeBtn = this.element.getElementsByClassName('btn-cansel')[0];
    const fName = this.element.getElementsByClassName(
      'first-name',
    )[0] as HTMLInputElement;
    const lName = this.element.getElementsByClassName(
      'last-name',
    )[0] as HTMLInputElement;
    const email = this.element.getElementsByClassName(
      'email',
    )[0] as HTMLInputElement;
    const addUserBtn = this.element.getElementsByClassName('validate')[0];
    let validEmail = false;
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function closeRegist() {
      document.getElementById('app')?.classList.toggle('blured');
      document
        .getElementsByClassName('registration')[0]
        .classList.toggle('hidden');
      document.getElementsByClassName('cover')[0].classList.toggle('hidden');
      document
        .getElementsByClassName('regictration-btn')[0]
        .classList.toggle('active');
      fName.classList.remove('not-validated-input');
      fName.classList.remove('validated-input');
      lName.classList.remove('not-validated-input');
      lName.classList.remove('validated-input');
      email.classList.remove('not-validated-input');
      email.classList.remove('validated-input');
      fName.value = '';
      lName.value = '';
      email.value = '';
    }

    const validateInput = () => {
      if (
        fName.validity.valid
        && lName.validity.valid
        && validEmail
      ) {
        addUserBtn?.classList.remove('unactive_btn');
      } else {
        addUserBtn?.classList.add('unactive_btn');
      }
    };

    function validatedStyles(input: HTMLInputElement) {
      input.classList.remove('not-validated-input');
      input.classList.add('validated-input');
    }

    function notValidatedStyles(input: HTMLInputElement) {
      input.classList.add('not-validated-input');
      input.classList.remove('validated-input');
    }

    fName.addEventListener('input', () => {
      if (fName.validity.valid) {
        validatedStyles(fName);
      } else {
        notValidatedStyles(fName);
      }
      validateInput();
    });

    lName.addEventListener('input', () => {
      if (lName.validity.valid) {
        validatedStyles(lName);
      } else {
        notValidatedStyles(lName);
      }
      validateInput();
    });

    email.addEventListener('input', () => {
      if (email.value.match(reg)) {
        validatedStyles(email);
        validEmail = true;
        validateInput();
      } else {
        validEmail = false;
        notValidatedStyles(email);
        validateInput();
      }
    });

    closeBtn?.addEventListener('click', closeRegist);

    addUserBtn.addEventListener('click', async (s) => {
      if (addUserBtn.classList.contains('unactive_btn')) return;
      s.preventDefault();
      const user = new User(email.value, fName.value, lName.value, 0);
      if ((await database.getUser(email.value)) === undefined) {
        await database.transaction(user);
      }
      game.activeUser = user;
      setTimeout(() => {
        alert(`Hello ${fName.value}, let's play a game!`);
      }, 500);

      document.getElementsByClassName('cover')[0].classList.toggle('hidden');
      document
        .getElementsByClassName('registration')[0]
        .classList.toggle('hidden');
      document
        .getElementsByClassName('regictration-btn')[0]
        .classList.add('hidden');
      document
        .getElementsByClassName('start-game-btn')[0]
        .classList.remove('hidden');
    });
  }
}
