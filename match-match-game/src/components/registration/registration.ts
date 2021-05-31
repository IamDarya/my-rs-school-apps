import './registration.scss';
import { BaseComponent } from '../base-component';
import { DatabaseIamDarya } from '../database/database';
import { User } from '../antities/user';
import { Game } from '../game/game';
import { Header } from '../header/header';
import ninja from '../../assets/ninja.png';

export class Registration extends BaseComponent {
  database: DatabaseIamDarya;

  game: Game;

  avatar: string | ArrayBuffer | null | undefined;

  header: Header;

  constructor(database: DatabaseIamDarya, game: Game, header: Header) {
    super('div', ['registration', 'hidden']);
    this.game = game;
    this.database = database;
    this.header = header;
    this.element.innerHTML = `
    <h2 class="regist-h2">Register new player</h2>
    <div class="forms">
    <div class="profile-pic">
        <div id="list">
        <span class="pic-box">
        <img class="thumb" src="${ninja}">
        </span>
        </div>
        <input type="file" class="files" id="files">
        <p>Profile picture. Selecting big images (&gt; 2MB) can crash your browser.</p>
    </div>
      <form action class="contact-form">
      <label class="contact-form__label" for="firstName" >First name</label>
      <input type="text" pattern="^(?![0-9]*$)[&bsol;p{L}0-9&bsol;s]+$" class="contact-form__input first-name"
      maxlength=30 placeholder="First name" required>
      <label class="contact-form__label" for="lastName" placeholder="Last name">Last name</label>
      <input type="text" pattern="^(?![0-9]*$)[&bsol;p{L}0-9&bsol;s]+$" class="contact-form__input last-name"
      maxlength=30 placeholder="Last name" required>
      <label class="contact-form__label" for="email" placeholder="email">email</label>
      <input type="email" class="contact-form__input email" maxlength=30 placeholder="your@email.com" required>
      <button class="btn btn-add-user validate unactive_btn" type="submit">ADD USER</button>
      <button class="btn btn-cansel" type="button">CANCEL</button>
  </div>
    `;

    this.element
      .getElementsByClassName('files')[0]
      .addEventListener('change', (ev) => this.handleFileSelect(ev), false);

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
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function resetInputs() {
      document.getElementById('app')?.classList.toggle('blured');
      document.getElementsByClassName('cover')[0].classList.toggle('hidden');
      fName.classList.remove('not-validated-input');
      fName.classList.remove('validated-input');
      lName.classList.remove('not-validated-input');
      lName.classList.remove('validated-input');
      email.classList.remove('not-validated-input');
      email.classList.remove('validated-input');
      addUserBtn.classList.add('unactive_btn');
      document
        .getElementsByClassName('regictration-btn')[0]
        .classList.remove('active');
      fName.value = '';
      lName.value = '';
      email.value = '';
      const profPic = document.getElementsByClassName(
        'thumb',
      )[0] as HTMLImageElement;
      profPic.src = `${ninja}`;
    }

    function closeRegist() {
      document
        .getElementsByClassName('registration')[0]
        .classList.toggle('hidden');
      resetInputs();
    }

    const validateInput = () => {
      if (fName.validity.valid && lName.validity.valid && validEmail) {
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
      const user = new User(
        email.value,
        fName.value,
        lName.value,
        0,
        email.value + fName.value + lName.value,
        this.avatar,
      );
      if ((await database.getUser(email.value + fName.value + lName.value)) === undefined) {
        await database.transaction(user);
        game.activeUser = user;
      } else {
        game.activeUser = user;
        await database.update(game.activeUser);
      }
      document
        .getElementsByClassName('registration')[0]
        .classList.toggle('hidden');
      document
        .getElementsByClassName('regictration-btn')[0]
        .classList.add('hidden');
      document
        .getElementsByClassName('start-game-btn')[0]
        .classList.remove('hidden');
      header.addProfPic();
      document
        .getElementsByClassName('log-out_btn')[0]
        .classList.remove('hidden');
      resetInputs();
    });
  }

  static displayImgData(
    imgData: string | ArrayBuffer | null | undefined,
  ): void {
    const profPic = document.getElementsByClassName(
      'thumb',
    )[0] as HTMLImageElement;
    profPic.src = `${imgData}`;
    document
      .getElementById('list')!
      .insertBefore(document.getElementsByClassName('pic-box')[0], null);
  }

  handleFileSelect(evt: Event): void {
    const ev = evt.target as HTMLInputElement;
    const { files } = ev; // FileList object

    // Only process image files.
    if (!files![0].type.match('image.*')) {
      alert('Please select an image file!');
      return;
    }

    const reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (e: ProgressEvent<FileReader>) => {
      Registration.displayImgData(e.target?.result);
      this.avatar = e.target?.result;
    };

    reader.readAsDataURL(files![0]);
  }
}
