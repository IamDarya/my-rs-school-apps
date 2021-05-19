import './style.scss';
import { App } from './app';

window.onload = () => {
  const appElement = document.getElementById('app');

  if (!appElement) throw Error('App root element not found');
  new App(appElement).start();
};
// document.getElementById('about')?.classList.remove('active');
// document.getElementsByClassName('about')[0].classList.add('hidden');
