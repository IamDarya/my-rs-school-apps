import { BaseComponent } from '../base-component';
import { Overlay } from '../grid-btn/overlay';
import './registration.scss';

export class Registration extends BaseComponent {
  overlay: Overlay;

  inputLogin: HTMLElement;

  inputPassword: HTMLElement;

  cancelBtn: HTMLElement;

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

    const loginBtn = document.createElement('button');
    loginBtn.innerText = 'Login';
    loginBtn.classList.add('login-btn-popup');
    this.element.appendChild(loginBtn);
    this.cancelBtn = document.createElement('button');
    this.cancelBtn.innerText = 'Cancel';
    this.cancelBtn.classList.add('cancel-btn-popup');
    this.element.appendChild(this.cancelBtn);
  }

  drawRegistrPopUp(): void {
    this.overlay.overlayON();
    this.element.classList.remove('hidden');
    this.cancelBtn.addEventListener('click', () => {
      this.cancelRegistrPopUp();
    });
    this.overlay.element.addEventListener('click', () => {
      this.cancelRegistrPopUp();
    });
  }

  cancelRegistrPopUp(): void {
    this.overlay.overlayOFF();
    this.element.classList.add('hidden');
  }
}
