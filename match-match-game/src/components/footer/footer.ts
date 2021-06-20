import './footer.scss';
import { BaseComponent } from '../base-component';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
    this.element.innerHTML = 'RS School 2021 Q1';
  }
}
