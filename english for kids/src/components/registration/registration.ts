import { AdminPage } from '../admin-page/admin-page';
import { BaseComponent } from '../base-component';
import { CardView } from '../card-view/card-view';
import { Overlay } from '../grid-btn/overlay';
import { NewRout } from '../routing/newRouting';
import './registration.scss';

export class Registration extends BaseComponent {
  overlay: Overlay;

  inputLogin: HTMLElement;

  inputPassword: HTMLElement;

  cancelBtn: HTMLElement;

  loginBtn: HTMLButtonElement;

  adminPage: AdminPage;

  newRout: NewRout;

  constructor(overlay: Overlay, adminPage: AdminPage, newRout: NewRout) {
    super('div', ['pop-up-registr-wrapper', 'hidden']);
    this.adminPage = adminPage;
    this.newRout = newRout;
    this.overlay = overlay;
    this.inputLogin = document.createElement('input');
    this.inputPassword = document.createElement('input');

    const infoInputLogin = document.createElement('p');
    const infoInputPassw = document.createElement('p');
    infoInputLogin.innerText = 'Enter Login: login';
    infoInputPassw.innerText = 'Enter Password: password';

    this.inputLogin.classList.add('input-login');
    this.inputPassword.classList.add('input-password');
    const eye = document.createElement('i');
    eye.id = 'icon';
    eye.classList.add('far', 'fa-eye');
    this.element.appendChild(eye);

    this.inputLogin.setAttribute('type', 'email');
    this.inputPassword.setAttribute('type', 'password');
    this.inputLogin.classList.add('input-login');
    this.inputPassword.classList.add('input-password');
    this.element.appendChild(infoInputLogin);
    this.element.appendChild(this.inputLogin);
    this.element.appendChild(infoInputPassw);
    this.element.appendChild(this.inputPassword);

    this.loginBtn = document.createElement('button');
    this.loginBtn.innerText = 'Login';
    this.loginBtn.disabled = true;
    this.loginBtn.classList.add('login-btn-popup', 'disabled');
    this.element.appendChild(this.loginBtn);
    this.cancelBtn = document.createElement('button');
    this.cancelBtn.innerText = 'Cancel';
    this.cancelBtn.classList.add('cancel-btn-popup');
    this.element.appendChild(this.cancelBtn);

    this.inputLogin.addEventListener('input', (e:Event) => {
      const input = e.target as HTMLInputElement;
      if (input.value === 'login') {
        input.classList.add('valid');
        this.validatedLoginPassword();
      }
    });
    this.inputPassword.addEventListener('input', (e:Event) => {
      const input = e.target as HTMLInputElement;
      if (input.value === 'password') {
        input.classList.add('valid');
        this.validatedLoginPassword();
      }
    });

    eye.addEventListener('click', () => {
      if (eye.classList.contains('fa-eye')) {
        this.inputPassword.classList.toggle('fa-eye-slash');
        this.inputPassword.classList.toggle('fa-eye');
        this.inputPassword.removeAttribute('type');
        this.inputPassword.setAttribute('type', 'text');
      } else {
        this.inputPassword.removeAttribute('type');
        this.inputPassword.setAttribute('type', 'password');
        this.inputPassword.classList.toggle('fa-eye');
        this.inputPassword.classList.toggle('fa-eye-slash');
      }
    });
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

  validatedLoginPassword(): void {
    if (this.inputLogin.classList.contains('valid') && this.inputPassword.classList.contains('valid')) {
      this.loginBtn.disabled = false;
      this.loginBtn.classList.remove('disabled');
      this.loginBtn.addEventListener('click', () => {
        this.cancelRegistrPopUp();
        this.newRout.navigate('categories');
        // this.adminPage.drawAllCategories();
      });
    }
  }
}
