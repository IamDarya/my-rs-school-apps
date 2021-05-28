import './game-setting.scss';
import { BaseComponent } from '../base-component';

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['app', 'game-setting', 'hidden']);
    this.element.innerHTML = `
    <h2>Game settings</h2>
    <div class="settings">
    <form>
      <span class="title">Game cards</span>
         <div class="select-cards">
            <select id="select-cards">
              <option selected="selected" value="select">Select game cards type</option>
              <option value="food">Food</option>
              <option value="animals">Animals</option>
              <option value="art">Art</option>
            </select>
          </div>
   </form>
   <form>
   <span class="title">Difficulty</span>
      <div class="difficulty">
         <select id="difficulty">
           <option selected="selected" value="select">Select game type</option>
           <option value="piece-of-cake">Piece of Cake</option>
           <option value="normal">Normal</option>
           <option value="nightmare">Nightmare!</option>
         </select>
       </div>
       </div>
</form>`;
  }
}
