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

  fName: HTMLInputElement;

  lName: HTMLInputElement;

  email: HTMLInputElement;

  addUserBtn: Element;

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
        <form class="file">
        <input type="file" class="files" id="files">
        </form>
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
    this.fName = this.element.getElementsByClassName(
      'first-name',
    )[0] as HTMLInputElement;
    this.lName = this.element.getElementsByClassName(
      'last-name',
    )[0] as HTMLInputElement;
    this.email = this.element.getElementsByClassName(
      'email',
    )[0] as HTMLInputElement;
    this.addUserBtn = this.element.getElementsByClassName('validate')[0] as Element;
    let validEmail = false;
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateInput = () => {
      if (
        this.fName.validity.valid
        && this.lName.validity.valid
        && validEmail
      ) {
        this.addUserBtn?.classList.remove('unactive_btn');
      } else {
        this.addUserBtn?.classList.add('unactive_btn');
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

    this.fName.addEventListener('input', () => {
      if (this.fName.validity.valid) {
        validatedStyles(this.fName);
      } else {
        notValidatedStyles(this.fName);
      }
      validateInput();
    });

    this.lName.addEventListener('input', () => {
      if (this.lName.validity.valid) {
        validatedStyles(this.lName);
      } else {
        notValidatedStyles(this.lName);
      }
      validateInput();
    });

    this.email.addEventListener('input', () => {
      if (this.email.value.match(reg)) {
        validatedStyles(this.email);
        validEmail = true;
        validateInput();
      } else {
        validEmail = false;
        notValidatedStyles(this.email);
        validateInput();
      }
    });

    closeBtn?.addEventListener('click', () => {
      document
        .getElementsByClassName('registration')[0]
        .classList.toggle('hidden');
      this.resetInputs();
    });

    this.addUserBtn.addEventListener('click', async (s) => {
      if (this.addUserBtn.classList.contains('unactive_btn')) return;
      s.preventDefault();
      const user = new User(
        this.email.value,
        this.fName.value,
        this.lName.value,
        0,
        this.email.value + this.fName.value + this.lName.value,
        this.avatar,
      );
      if (
        (await database.getUser(
          this.email.value + this.fName.value + this.lName.value,
        )) === undefined
      ) {
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
      this.resetInputs();
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

  resetInputs(): void {
    document.getElementById('app')?.classList.toggle('blured');
    document.getElementsByClassName('cover')[0].classList.toggle('hidden');
    this.fName.classList.remove('not-validated-input');
    this.fName.classList.remove('validated-input');
    this.lName.classList.remove('not-validated-input');
    this.lName.classList.remove('validated-input');
    this.email.classList.remove('not-validated-input');
    this.email.classList.remove('validated-input');
    this.addUserBtn.classList.add('unactive_btn');
    document
      .getElementsByClassName('regictration-btn')[0]
      .classList.remove('active');
    this.fName.value = '';
    this.lName.value = '';
    this.email.value = '';
    const profPic = document.getElementsByClassName(
      'thumb',
    )[0] as HTMLImageElement;
    profPic.src = `${ninja}`;
    profPic.innerHTML = '';
    const formProfPic = document.getElementsByClassName(
      'file',
    )[0] as HTMLFormElement;
    formProfPic.reset();
    this.avatar = ninja;
  }
}
