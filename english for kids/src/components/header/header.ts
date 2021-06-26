import './main-page.scss';
import '../grid-btn/theme-cards.scss';
import { BaseComponent } from '../base-component';
import { GridBtn } from '../grid-btn/grid-btn';
import { ImageCategoryModel } from '../image-category-models/image-category-models';

export class Header extends BaseComponent {
  categories: ImageCategoryModel[];

  gridBtn: GridBtn;

  constructor(gridBtn: GridBtn) {
    super('nav', ['nav-burger']);
    this.categories = [];
    this.gridBtn = gridBtn;
  }

  drawHeader(categories: ImageCategoryModel[]) {
    let menuToggle = document.createElement('div');
    menuToggle.id = 'menuToggle';

    let inputCheckBox = document.createElement('input');
    inputCheckBox.setAttribute('type', 'checkbox');
    menuToggle.appendChild(inputCheckBox);

    for (let i = 0; i < 3; i++) {
      let span = document.createElement('span');
      menuToggle.appendChild(span);
    }

    let ulOfTopics = document.createElement('ul');
    ulOfTopics.id = 'menu';
    menuToggle.appendChild(ulOfTopics);

    let linkTopcMainPage = document.createElement('a');
    let liTopicMainPage = document.createElement('li');
    linkTopcMainPage.setAttribute('href', '#');
    liTopicMainPage.setAttribute('data-topic', `Main Page`);
    liTopicMainPage.innerText = `Main Page`;
    ulOfTopics.appendChild(linkTopcMainPage);
    linkTopcMainPage.appendChild(liTopicMainPage);
    liTopicMainPage.addEventListener('click', () => {
      this.gridBtn.drawAllCategories();
    });

    for (let i = 0; i < categories.length; i++) {
      let linkTopc = document.createElement('a');
      let liTopic = document.createElement('li');
      linkTopc.setAttribute('href', '#');
      liTopic.setAttribute('data-topic', categories[i].category);
      liTopic.innerText = categories[i].category;
      ulOfTopics.appendChild(linkTopc);
      linkTopc.appendChild(liTopic);

      liTopic.addEventListener('click', (e: Event) => {
        let activeTheme = (e.target as HTMLElement).getAttribute('data-topic');
        if (activeTheme !== null && activeTheme !== 'Main Page') {
          this.gridBtn.drawCategory(activeTheme);
        }
        if (activeTheme === 'Main Page') {
          this.gridBtn.drawAllCategories();
        }
      });
    }

    this.element.appendChild(menuToggle);

    if (inputCheckBox.checked === true) {
      debugger;
      window.addEventListener('click', (e: Event) => {
        let event = e.target as HTMLElement;
        if (
          event.tagName === 'LI' ||
          event.parentElement?.id !== 'menuToggle'
        ) {
          inputCheckBox.checked === true;
        }
      });
    }
  }
}
