import './main-page.scss';
import '../grid-btn/theme-cards.scss';
import { BaseComponent } from '../base-component';
import { GridBtn } from '../grid-btn/grid-btn';
import { ImageCategoryModel } from '../image-category-models/image-category-models';
import { NewRout } from '../routing/newRouting';

export class Header extends BaseComponent {
  categories: ImageCategoryModel[];

  gridBtn: GridBtn;

  newRout: NewRout;

  constructor(gridBtn: GridBtn, newRout: NewRout) {
    super('nav', ['nav-burger']);
    this.categories = [];
    this.newRout = newRout;
    this.gridBtn = gridBtn;
  }

  drawHeader(categories: ImageCategoryModel[]): void {
    const menuToggle = document.createElement('div');
    menuToggle.id = 'menuToggle';

    const inputCheckBox = document.createElement('input');
    inputCheckBox.setAttribute('type', 'checkbox');
    menuToggle.appendChild(inputCheckBox);

    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      menuToggle.appendChild(span);
    }

    const ulOfTopics = document.createElement('ul');
    ulOfTopics.id = 'menu';
    menuToggle.appendChild(ulOfTopics);

    const linkTopcMainPage = document.createElement('a');
    const liTopicMainPage = document.createElement('li');
    linkTopcMainPage.setAttribute('href', '#');
    liTopicMainPage.setAttribute('data-topic', 'Main Page');
    liTopicMainPage.innerText = 'Main Page';
    ulOfTopics.appendChild(linkTopcMainPage);
    linkTopcMainPage.appendChild(liTopicMainPage);
    liTopicMainPage.addEventListener('click', () => {
      this.gridBtn.drawAllCategories();
    });

    for (let i = 0; i < categories.length; i++) {
      const linkTopc = document.createElement('a');
      const liTopic = document.createElement('li');
      linkTopc.setAttribute('href', '#');
      liTopic.setAttribute('data-topic', categories[i].category);
      liTopic.innerText = categories[i].category;
      ulOfTopics.appendChild(linkTopc);
      linkTopc.appendChild(liTopic);

      liTopic.addEventListener('click', (e: Event) => {
        const activeTheme = (e.target as HTMLElement).getAttribute(
          'data-topic',
        );
        if (activeTheme !== null && activeTheme !== 'Main Page') {
          this.gridBtn.drawCategory(activeTheme);
          inputCheckBox.checked = false;
        }
        if (activeTheme === 'Main Page') {
          this.gridBtn.drawAllCategories();
        }
      });
    }

    this.element.appendChild(menuToggle);

    const linkToStatistics = document.createElement('a');
    const liToStatistics = document.createElement('li');
    linkToStatistics.setAttribute('href', '#statistics');
    liToStatistics.setAttribute('data-topic', 'Statistics');
    liToStatistics.innerText = 'Statistics';
    ulOfTopics.appendChild(linkToStatistics);
    linkToStatistics.appendChild(liToStatistics);

    window.addEventListener('click', (e) => {
      const eventWindow = e.target as HTMLElement;
      if (
        eventWindow.parentElement?.id !== 'menuToggle'
        || eventWindow.parentElement.id === null
      ) {
        inputCheckBox.checked = false;
      }
    });
  }
}
