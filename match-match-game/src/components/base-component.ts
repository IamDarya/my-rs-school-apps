export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
  }

  show(): void {
    this.element.classList.remove('hidden');
  }

  hide(): void {
    this.element.classList.add('hidden');
  }
}
