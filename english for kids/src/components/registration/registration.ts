import { BaseComponent } from '../base-component';
import { Overlay } from '../grid-btn/overlay';
import './registration.scss';

export class Registration extends BaseComponent {
  overlay: Overlay;

  inputLogin: HTMLElement;

  inputPassword: HTMLElement;

  constructor(overlay: Overlay) {
    super('div', ['pop-up-registr-wrapper', 'hidden']);
    this.overlay = overlay;
    this.inputLogin = document.createElement('input');
    this.inputPassword = document.createElement('input');

    this.inputLogin.classList.add('input-login');
    this.inputPassword.classList.add('input-password');

    this.inputLogin.setAttribute('type', 'email');
    this.inputPassword.setAttribute('type', 'password');
    this.inputLogin.classList.add('input-login');
    this.inputPassword.classList.add('input-password');
    this.element.appendChild(this.inputLogin);
    this.element.appendChild(this.inputPassword);
  }

  drawRegistrPopUp() {
    this.overlay.overlayON();

    this.element.classList.remove('hidden');
    const loginBtn = document.createElement('button');
    loginBtn.innerText = 'Login';
    loginBtn.classList.add('login-btn-popup');
    this.element.appendChild(loginBtn);
    const canselBtn = document.createElement('button');
    canselBtn.innerText = 'Cansel';
    canselBtn.classList.add('cansel-btn-popup');
    this.element.appendChild(canselBtn);

    canselBtn.addEventListener('click', () => {
      this.canselRegistrPopUp();
    });
    this.overlay.element.addEventListener('click', () => {
      this.canselRegistrPopUp();
    });
  }

  canselRegistrPopUp() {
    this.overlay.overlayOFF();
    this.element.classList.add('hidden');
  }
}
