import './cover.scss';
import { BaseComponent } from '../base-component';

export class Cover extends BaseComponent {
  constructor() {
    super('div', ['cover', 'hidden']);
    // this.element.innerHTML = ``;
  }
}
