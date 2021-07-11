(()=>{"use strict";var t={753:(t,e,i)=>{i.r(e)},336:(t,e,i)=>{i.r(e)},957:(t,e,i)=>{i.r(e)},420:(t,e,i)=>{i.r(e)},783:(t,e,i)=>{i.r(e)},337:(t,e,i)=>{i.r(e)},410:(t,e,i)=>{i.r(e)},373:(t,e,i)=>{i.r(e)},752:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(a,n){function r(t){try{d(s.next(t))}catch(t){n(t)}}function o(t){try{d(s.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?a(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}d((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0;const a=i(859),n=i(977),r=i(485),o=i(229),d=i(59),c=i(69),l=i(861),h=i(359),u=i(789),p=i(598);e.App=class{constructor(t){this.rootElement=t,this.overlay=new u.Overlay,this.newRout=new a.NewRout,this.dataBaseDarya=new d.DatabaseDarya,this.game=new o.Game(this.dataBaseDarya),this.gridBtn=new r.GridBtn(this.game,this.dataBaseDarya,this.overlay),this.adminPage=new p.AdminPage(this.dataBaseDarya,this.overlay),this.registration=new h.Registration(this.overlay,this.adminPage,this.newRout),this.header=new n.Header(this.gridBtn,this.newRout,this.registration),this.statistics=new l.Statistics(this.dataBaseDarya)}start(){return s(this,void 0,void 0,(function*(){this.newRout.add("statistics",(()=>{this.statistics.show(),this.gridBtn.hide(),this.statistics.statisticShow(),this.adminPage.hide()})),this.newRout.add("",(()=>{this.statistics.hide(),this.gridBtn.show(),this.header.show(),this.adminPage.hide()})),this.newRout.add("categories",(()=>{this.statistics.hide(),this.gridBtn.hide(),this.header.hide(),this.adminPage.drawAllCategories(),this.adminPage.show()})),yield this.dataBaseDarya.load();const t=yield fetch("./cards.json"),e=yield t.json();this.header.drawHeader(e),this.gridBtn.categories=e,this.adminPage.categories=e,this.adminPage.drawAllCategories(),this.rootElement.appendChild(this.registration.element),this.rootElement.appendChild(this.header.element),this.rootElement.appendChild(this.gridBtn.element),this.rootElement.appendChild(this.statistics.element),this.rootElement.appendChild(this.adminPage.element),this.rootElement.appendChild(this.overlay.element);const i=document.createElement("footer");i.innerHTML='<a href="https://rs.school/js/" target="_blank">The Rolling Scopes|</a>\n    <img src =\'https://rs.school/images/rs_school_js.svg\'>\n    <p>|2021|</p>\n    <a href="https://github.com/IamDarya" target="_blank">My github</a>',this.rootElement.appendChild(i),this.gridBtn.drawAllCategories();for(let t=0;t<e.length;t++)for(let i=0;i<e[t].cardsContent.length;i++)if(void 0===(yield this.dataBaseDarya.getWord(e[t].category+e[t].cardsContent[i].word+e[t].cardsContent[i].translation))){const s=new c.WordStatistic(e[t].category,e[t].cardsContent[i].word,e[t].cardsContent[i].translation,0,e[t].category+e[t].cardsContent[i].word+e[t].cardsContent[i].translation,0,0,0);yield this.dataBaseDarya.transaction(s)}}))}}},660:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(a,n){function r(t){try{d(s.next(t))}catch(t){n(t)}}function o(t){try{d(s.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?a(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}d((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.AdminPageCardView=void 0,i(783),i(753);const a=i(583);class n extends a.BaseComponent{constructor(t,e,i,s){super("div",["one-theme-block","front"]),this.callBacks=[],this.cardState=t,this.cardObj=e,this.category=i,this.dataBaseDarya=s,this.audio=new Audio,"OneTheme"===this.cardState&&this.drawOneTheme(),this.cardState,"Themes"===this.cardState&&this.drawThemesAdmin()}drawThemesAdmin(){this.element.innerHTML="",this.element.classList.add("one-theme-block-admin");const t=document.createElement("button");t.classList.add("close-card"),t.innerText="x";const e=document.createElement("span");e.innerText=`${this.category}`,this.element.appendChild(e),this.element.appendChild(t),this.element.setAttribute("data-topic",`${this.category}`);const i=document.createElement("p");i.innerText=`WORDS: ${this.category.length}`,this.element.appendChild(i);const s=document.createElement("button");s.innerText="Update",s.classList.add("update-btn");const a=document.createElement("button");a.innerText="Add word",a.classList.add("add-word-btn"),this.element.appendChild(s),this.element.appendChild(a),this.element.addEventListener("click",(()=>{this.callBacks.forEach((t=>t()))}))}drawOneTheme(){this.element.innerHTML="";const t=document.createElement("button");this.element.appendChild(t),t.classList.add("close-card"),t.innerText="x",this.audio=document.createElement("audio");const e=document.createElement("div");e.classList.add("card-content"),e.innerHTML=`<p>Word: ${this.cardObj.word}</p>\n    <p>Translation: ${this.cardObj.translation}</p>\n    <p>Sound: ${this.cardObj.audioSrc}</p>\n    <p>Image:</p>\n    `,this.element.appendChild(e),this.audio.setAttribute("src",`${this.cardObj.audioSrc}`),this.element.classList.add("one-theme-block-admin","one-theme"),this.element.removeAttribute("data-topic"),this.element.setAttribute("data-topic",`${this.category}`);const i=document.createElement("div");i.classList.add("picture"),this.element.appendChild(i),i.setAttribute("style",`background-image:url('${this.cardObj.image}');`),this.element.appendChild(this.audio);const a=document.createElement("button");a.innerText="Change",a.classList.add("change-btn"),this.element.appendChild(a),this.element.addEventListener("click",(t=>s(this,void 0,void 0,(function*(){this.category,this.cardObj.word,this.cardObj.translation,t.target.classList.contains("flip-pic")}))))}onClickTheme(t){this.callBacks.push(t)}}e.AdminPageCardView=n},598:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.AdminPage=e.StateToDraw=void 0,i(753);const s=i(583),a=i(660);var n;!function(t){t.OneTheme="OneTheme",t.OneWord="OneWord",t.Themes="Themes"}(n=e.StateToDraw||(e.StateToDraw={}));class r extends s.BaseComponent{constructor(t,e){super("div",["admin-page-wrapper"]),this.drawHeaderAdmin(),this.overlay=e,this.themesBlock=document.createElement("div"),this.overlayContent=document.createElement("div"),this.categories=[],this.activeCategoryObj=void 0,this.activeCategory=void 0,this.arrayOfCardDivs=[],this.dataBaseDarya=t,this.themesBlock.classList.add("themes-block"),this.element.appendChild(this.themesBlock),this.overlayContent.classList.add("content"),this.element.appendChild(this.overlayContent)}drawAllCategories(){this.themesBlock.innerHTML="",this.activeCategory=void 0,this.activeCategoryObj=void 0;for(let t=0;t<this.categories.length;t++){const e=new a.AdminPageCardView(n.Themes,this.categories[t].cardsContent[3],this.categories[t].category,this.dataBaseDarya);this.themesBlock.appendChild(e.element),e.onClickTheme((()=>{this.drawCategory(this.categories[t].category)}))}this.createNewCategoryCard()}drawCategory(t){var e,i;if(this.themesBlock.innerHTML="",this.arrayOfCardDivs=[],this.activeCategoryObj=this.categories.find((e=>e.category===t)),this.activeCategory=null===(e=this.activeCategoryObj)||void 0===e?void 0:e.category,void 0!==this.activeCategoryObj)for(let t=0;t<(null===(i=this.activeCategoryObj)||void 0===i?void 0:i.cardsContent.length);t++){const e=new a.AdminPageCardView(n.OneTheme,this.activeCategoryObj.cardsContent[t],this.activeCategoryObj.category,this.dataBaseDarya);this.arrayOfCardDivs.push(e),this.themesBlock.appendChild(e.element)}this.createNewWordCard()}createNewCategoryCard(){const t=document.createElement("div");t.classList.add("one-theme-block","create-new-category-card","one-theme-block-admin");const e=document.createElement("span");t.appendChild(e);const i=document.createElement("p");i.innerText="Create new Category",t.appendChild(i);const s=document.createElement("button");s.innerText="+",s.classList.add("add-category-btn"),t.appendChild(s),this.themesBlock.appendChild(t),s.addEventListener("click",(()=>{}))}createNewWordCard(){const t=document.createElement("div");t.classList.add("one-theme-block","create-new-category-card","one-theme-block-admin");const e=document.createElement("span");t.appendChild(e);const i=document.createElement("p");i.innerText="Add new Word",t.appendChild(i);const s=document.createElement("button");s.innerText="+",s.classList.add("add-category-btn"),t.appendChild(s),this.themesBlock.appendChild(t),s.addEventListener("click",(()=>{}))}drawHeaderAdmin(){const t=document.createElement("header");t.innerHTML='\n    <ul class="header">\n    <li class="text"><a href="#">Categories</a></li>\n    <li class="text"><a href="#">Words</a></li>\n    <li class="text"><a href="#"><button class="logout-btn">Logout</button></a></li>\n  </ul>\n    ',this.element.appendChild(t)}}e.AdminPage=r},583:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BaseComponent=void 0,e.BaseComponent=class{constructor(t="div",e=[]){this.element=document.createElement(t),this.element.classList.add(...e)}show(){this.element.classList.remove("hidden")}hide(){this.element.classList.add("hidden")}}},311:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(a,n){function r(t){try{d(s.next(t))}catch(t){n(t)}}function o(t){try{d(s.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?a(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}d((s=s.apply(t,e||[])).next())}))},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.CardView=void 0,i(783);const n=a(i(615)),r=i(583);class o extends r.BaseComponent{constructor(t,e,i,s){super("div",["one-theme-block","front"]),this.callBacks=[],this.cardState=t,this.cardObj=e,this.category=i,this.dataBaseDarya=s,this.audio=new Audio,"Train"===this.cardState&&this.drawTrain(),"Play"===this.cardState&&this.drawPlay(),"Themes"===this.cardState&&this.drawThemes()}drawPlay(){this.element.innerHTML="",this.audio=document.createElement("audio"),this.audio.setAttribute("src",`${this.cardObj.audioSrc}`),this.element.classList.add("one-theme-block","front"),this.element.removeAttribute("data-topic"),this.element.setAttribute("data-topic",`${this.category}`),this.element.setAttribute("style",`background-image:url('${this.cardObj.image}');`),this.element.appendChild(this.audio)}drawTrain(){this.element.innerHTML="";const t=document.createElement("img"),e=document.createElement("div");this.audio=document.createElement("audio"),e.classList.add("back","hidden");const i=document.createElement("span");e.appendChild(i),i.innerText=`${this.cardObj.translation}`,this.audio.setAttribute("src",`${this.cardObj.audioSrc}`),e.setAttribute("style",`background-image:url('${this.cardObj.image}');`),e.removeAttribute("data-topic"),e.setAttribute("data-topic",`${this.category}`),t.setAttribute("src",n.default),t.removeAttribute("data-topic"),t.setAttribute("data-topic",`${this.category}`),t.classList.add("flip-pic"),this.element.classList.add("one-theme-block","front"),this.element.removeAttribute("data-topic"),this.element.setAttribute("data-topic",`${this.category}`),this.element.setAttribute("style",`background-image:url('${this.cardObj.image}');`);const a=document.createElement("span");a.innerText=`${this.cardObj.word}`,this.element.appendChild(a),this.element.appendChild(t),this.element.appendChild(e),this.element.appendChild(this.audio),t.addEventListener("click",(t=>s(this,void 0,void 0,(function*(){const i=t.target,s=this.category+this.cardObj.word+this.cardObj.translation,a=yield this.dataBaseDarya.getWord(s);void 0!==a.click&&(a.click++,this.dataBaseDarya.update(a),e.classList.remove("hidden"),function(t){const e=t.parentElement;null!==e&&(e.classList.add("flipp"),e.addEventListener("mouseleave",(()=>{null!==e&&e.classList.remove("flipp"),setTimeout((()=>e.getElementsByClassName("back")[0].classList.add("hidden")),500)})))}(i))})))),this.element.addEventListener("click",(t=>s(this,void 0,void 0,(function*(){const e=this.category+this.cardObj.word+this.cardObj.translation,i=yield this.dataBaseDarya.getWord(e);void 0!==i.click&&(i.click++,this.dataBaseDarya.update(i)),t.target.classList.contains("flip-pic")||this.audio.play()}))))}drawThemes(){this.element.innerHTML="",this.element.classList.add("one-theme-block","front");const t=document.createElement("span");t.innerText=`${this.category}`,this.element.appendChild(t),this.element.setAttribute("data-topic",`${this.category}`),this.element.setAttribute("style",`background-image:url('${this.cardObj.image}');`),this.element.addEventListener("click",(()=>{this.callBacks.forEach((t=>t()))}))}onClickTheme(t){this.callBacks.push(t)}}e.CardView=o},59:function(t,e){var i=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(a,n){function r(t){try{d(s.next(t))}catch(t){n(t)}}function o(t){try{d(s.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?a(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}d((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.DatabaseDarya=void 0,e.DatabaseDarya=class{load(){return i(this,void 0,void 0,(function*(){return new Promise((t=>{this.request=window.indexedDB.open("IamDarya",2),this.request.onsuccess=e=>{const i=e.target;this.db=i.result,t()},this.request.onupgradeneeded=e=>{const i=e.target;this.db=i.result,this.db.createObjectStore("words",{keyPath:"id"}),t()}}))}))}transaction(t){return i(this,void 0,void 0,(function*(){return new Promise(((e,i)=>{var s;const a=null===(s=this.db)||void 0===s?void 0:s.transaction("words","readwrite"),n=null==a?void 0:a.objectStore("words"),r=null==n?void 0:n.add(t);void 0!==r&&(r.onsuccess=function(){e()},r.onerror=function(){i()})}))}))}getWord(t){return i(this,void 0,void 0,(function*(){return new Promise(((e,i)=>{var s;const a=null===(s=this.db)||void 0===s?void 0:s.transaction("words","readwrite"),n=null==a?void 0:a.objectStore("words"),r=null==n?void 0:n.get(t);void 0!==r&&(r.onsuccess=function(){e(r.result)},r.onerror=function(){i(r.error)})}))}))}update(t){return i(this,void 0,void 0,(function*(){return new Promise(((e,i)=>{var s;const a=null===(s=this.db)||void 0===s?void 0:s.transaction("words","readwrite"),n=null==a?void 0:a.objectStore("words"),r=null==n?void 0:n.put(t);void 0!==r&&(r.onsuccess=function(){e()},r.onerror=function(){i()})}))}))}getAllWords(){return i(this,void 0,void 0,(function*(){return new Promise(((t,e)=>{var i;const s=null===(i=this.db)||void 0===i?void 0:i.transaction("words","readwrite"),a=null==s?void 0:s.objectStore("words"),n=null==a?void 0:a.getAll();void 0!==n&&(n.onsuccess=function(){t(n.result)},n.onerror=function(){e(n.error)})}))}))}}},69:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.WordStatistic=void 0,e.WordStatistic=class{constructor(t,e,i,s,a,n,r,o){this.category=t,this.word=e,this.translation=i,this.click=s,this.id=t+e+i,this.correct=n,this.wrong=r,this.persOfErrors=o}}},229:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(a,n){function r(t){try{d(s.next(t))}catch(t){n(t)}}function o(t){try{d(s.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?a(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}d((s=s.apply(t,e||[])).next())}))},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Game=e.playAudio=void 0;const n=i(583);i(336);const r=a(i(849)),o=a(i(746));function d(t){setTimeout((()=>t.play()),1e3)}e.playAudio=d;class c extends n.BaseComponent{constructor(t){super(),this.callBacks=[],this.callBacksForEndGame=[],this.allAudios=[],this.currentAudio=new Audio,this.errorAudio=new Audio(r.default),this.correctAudio=new Audio(o.default),this.amountOfErrors=0,this.dataBaseDarya=t}startGame(t,e){return s(this,void 0,void 0,(function*(){this.callBacks=[],this.callBacksForEndGame=[],this.amountOfErrors=0;let i=[...t.cardsContent],a=new Audio(`${i[Math.floor(Math.random()*i.length)].audioSrc}`);d(a);let n=i.filter((t=>t.audioSrc===a.getAttribute("src"))),r=t.category+n[0].word+n[0].translation,o=yield this.dataBaseDarya.getWord(r);this.currentAudio=a,e.forEach((c=>{c.element.addEventListener("click",(()=>s(this,void 0,void 0,(function*(){var s;(null===(s=c.element.firstElementChild)||void 0===s?void 0:s.getAttribute("src"))===a.getAttribute("src")?null!==a.getAttribute("src")&&(i=i.filter((t=>t.audioSrc!==a.getAttribute("src"))),c.element.classList.add("inactive-card"),e=e.filter((t=>t!==c)),this.callBacks.forEach((t=>t("Correct"))),d(this.correctAudio),void 0!==i[Math.floor(Math.random()*i.length)]&&(a=new Audio(`${i[Math.floor(Math.random()*i.length)].audioSrc}`),this.currentAudio=a,d(a),n=i.filter((t=>t.audioSrc===a.getAttribute("src"))),r=t.category+n[0].word+n[0].translation,o=yield this.dataBaseDarya.getWord(r),void 0!==o.correct&&(o.correct++,this.dataBaseDarya.update(o),o.persOfErrors=o.correct/(o.correct+o.wrong)*100,this.dataBaseDarya.update(o)))):e.indexOf(c)>=0&&(this.callBacks.forEach((t=>t("Fail"))),d(this.errorAudio),this.amountOfErrors++,void 0!==o.wrong&&(o.wrong++,this.dataBaseDarya.update(o),o.persOfErrors=o.correct/(o.correct+o.wrong)*100,this.dataBaseDarya.update(o))),0===e.length&&this.endGame()}))))}))}))}endGame(){this.callBacksForEndGame.forEach((t=>t()))}onUserAnswer(t){this.callBacks.push(t)}onEndGame(t){this.callBacksForEndGame.push(t)}}e.Game=c},485:function(t,e,i){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.GridBtn=e.PlayMode=void 0,i(783);const a=i(583),n=i(311),r=i(229),o=s(i(937)),d=s(i(218)),c=s(i(747)),l=s(i(707)),h=s(i(432)),u=s(i(639)),p=s(i(181));var m;!function(t){t.Train="Train",t.Play="Play"}(m=e.PlayMode||(e.PlayMode={}));class g extends a.BaseComponent{constructor(t,e,i){super("div",["grid-of-img-and-switch-btn-wrapper"]),this.overlay=i,this.train=m.Train,this.themesBlock=document.createElement("div"),this.divWithFailCorrectSigns=document.createElement("div"),this.divWithBtnToStartPlay=document.createElement("div"),this.btnToStartPlay=document.createElement("button"),this.btnToRepeatAudio=document.createElement("button"),this.overlayContent=document.createElement("div"),this.categories=[],this.activeCategoryObj=void 0,this.activeCategory=void 0,this.game=t,this.arrayOfCardDivs=[],this.dataBaseDarya=e;const s=document.createElement("input");s.classList.add("toggle"),s.type="checkbox",this.element.appendChild(s),this.divWithFailCorrectSigns.classList.add("div-with-fail-correct-signs"),this.element.appendChild(this.divWithFailCorrectSigns),s.addEventListener("click",(()=>{this.train===m.Train?(this.train=m.Play,void 0!==this.activeCategory&&this.drawCategory(this.activeCategory)):(this.train=m.Train,void 0!==this.activeCategory&&this.drawCategory(this.activeCategory),this.btnToRepeatAudio.classList.add("hidden"),this.btnToStartPlay.classList.remove("hidden"),this.divWithFailCorrectSigns.innerHTML=""),this.themesBlock.classList.toggle("play-mode")})),this.themesBlock.classList.add("themes-block"),this.element.appendChild(this.themesBlock),this.divWithBtnToStartPlay.classList.add("div-with-btn-to-start-play"),this.element.appendChild(this.divWithBtnToStartPlay),this.btnToStartPlay.innerText="Start Game",this.btnToStartPlay.classList.add("btn-to-start-play"),this.divWithBtnToStartPlay.setAttribute("style","display: none;"),this.divWithBtnToStartPlay.appendChild(this.btnToStartPlay),this.btnToStartPlay.addEventListener("click",(()=>{void 0!==this.activeCategoryObj&&(this.btnToRepeatAudio=document.createElement("button"),this.btnToStartPlay.classList.add("hidden"),this.btnToRepeatAudio.classList.remove("hidden"),this.btnToRepeatAudio.classList.add("btn-to-repeat-audio","btn-to-start-play"),this.btnToRepeatAudio.setAttribute("style",`background-image: url('${c.default}');`),this.divWithBtnToStartPlay.appendChild(this.btnToRepeatAudio),this.btnToRepeatAudio.addEventListener("click",(()=>{r.playAudio(this.game.currentAudio)})),this.game.startGame(this.activeCategoryObj,this.arrayOfCardDivs),this.game.onUserAnswer((t=>{this.addCorrectFailSign(t)})),this.game.onEndGame((()=>{this.btnToRepeatAudio.classList.add("hidden"),this.btnToStartPlay.classList.remove("hidden"),this.divWithFailCorrectSigns.innerHTML="",this.ShowPopUpEndGame()})))})),this.overlayContent.classList.add("content"),this.element.appendChild(this.overlayContent)}ShowPopUpEndGame(){this.overlayContent.innerText="";const t=new Audio(u.default),e=new Audio(p.default);this.game.amountOfErrors>0?(this.overlayContent.setAttribute("style",`background-image:url('${h.default}');`),this.overlayContent.innerText=`You made ${this.game.amountOfErrors} mistake(s). Train more.`,r.playAudio(e)):(this.overlayContent.setAttribute("style",`background-image:url('${l.default}');`),r.playAudio(t)),this.overlay.overlayON(),this.overlayContent.classList.add("is-on"),setTimeout((()=>{this.overlayContent.classList.remove("is-on"),this.overlay.overlayOFF()}),5e3),this.drawAllCategories()}drawAllCategories(){this.themesBlock.innerHTML="",this.divWithFailCorrectSigns.innerHTML="",this.activeCategory=void 0,this.activeCategoryObj=void 0;for(let t=0;t<this.categories.length;t++){const e=new n.CardView("Themes",this.categories[t].cardsContent[3],this.categories[t].category,this.dataBaseDarya);this.themesBlock.appendChild(e.element),e.onClickTheme((()=>{this.drawCategory(this.categories[t].category)}))}this.divWithBtnToStartPlay.setAttribute("style","display: none;")}drawCategory(t){var e,i;if(this.themesBlock.innerHTML="",this.arrayOfCardDivs=[],this.activeCategoryObj=this.categories.find((e=>e.category===t)),this.activeCategory=null===(e=this.activeCategoryObj)||void 0===e?void 0:e.category,void 0!==this.activeCategoryObj)for(let t=0;t<(null===(i=this.activeCategoryObj)||void 0===i?void 0:i.cardsContent.length);t++){const e=new n.CardView(this.train,this.activeCategoryObj.cardsContent[t],this.activeCategoryObj.category,this.dataBaseDarya);this.arrayOfCardDivs.push(e),this.themesBlock.appendChild(e.element)}"Play"===this.train?this.divWithBtnToStartPlay.removeAttribute("style"):this.divWithBtnToStartPlay.setAttribute("style","display: none;")}addCorrectFailSign(t){const e=document.createElement("div");"Correct"===t&&(e.classList.add("picFailCorrect","correct"),e.setAttribute("style",`background-image:url('${o.default}');`),this.divWithFailCorrectSigns.appendChild(e)),"Fail"===t&&(e.classList.add("picFailCorrect","fail"),e.setAttribute("style",`background-image:url('${d.default}');`),this.divWithFailCorrectSigns.appendChild(e))}}e.GridBtn=g},789:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Overlay=void 0;const s=i(583);i(957);class a extends s.BaseComponent{constructor(){super("div",["overlay","hidden"])}overlayON(){this.element.classList.add("is-on"),this.element.classList.remove("hidden")}overlayOFF(){this.element.classList.remove("is-on"),this.element.classList.add("hidden")}}e.Overlay=a},977:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Header=void 0,i(783),i(420);const s=i(583);function a(t){void 0!==document.getElementsByClassName("active")[0]&&document.getElementsByClassName("active")[0].classList.remove("active"),t.target.classList.add("active")}class n extends s.BaseComponent{constructor(t,e,i){super("nav",["nav-burger"]),this.categories=[],this.newRout=e,this.gridBtn=t,this.loginBtnLi=document.createElement("li"),this.loginBtn=document.createElement("button"),this.registration=i}drawHeader(t){const e=document.createElement("div");e.id="menuToggle";const i=document.createElement("input");i.setAttribute("type","checkbox"),e.appendChild(i);for(let t=0;t<3;t++){const t=document.createElement("span");e.appendChild(t)}const s=document.createElement("ul");s.id="menu",e.appendChild(s);const n=document.createElement("a"),r=document.createElement("li");r.classList.add("active"),n.setAttribute("href","#"),r.setAttribute("data-topic","Main Page"),r.innerText="Main Page",s.appendChild(n),n.appendChild(r),r.addEventListener("click",(t=>{this.gridBtn.divWithFailCorrectSigns.innerHTML="",a(t),this.gridBtn.drawAllCategories()}));for(let e=0;e<t.length;e++){const n=document.createElement("a"),r=document.createElement("li");n.setAttribute("href","#"),r.setAttribute("data-topic",t[e].category),r.innerText=t[e].category,s.appendChild(n),n.appendChild(r),r.addEventListener("click",(t=>{this.gridBtn.divWithFailCorrectSigns.innerHTML="",a(t);const e=t.target.getAttribute("data-topic");null!==e&&"Main Page"!==e&&(this.gridBtn.drawCategory(e),i.checked=!1),"Main Page"===e&&this.gridBtn.drawAllCategories()}))}this.element.appendChild(e);const o=document.createElement("a"),d=document.createElement("li");o.setAttribute("href","#statistics"),d.setAttribute("data-topic","Statistics"),d.innerText="Statistics",s.appendChild(o),o.appendChild(d),d.addEventListener("click",(t=>{this.gridBtn.divWithFailCorrectSigns.innerHTML="",a(t)})),this.loginBtn.innerText="Login",this.loginBtn.classList.add("login-btn"),this.loginBtnLi.classList.add("login-btn-div"),this.loginBtnLi.appendChild(this.loginBtn),s.appendChild(this.loginBtnLi),this.loginBtn.addEventListener("click",(()=>{this.registration.drawRegistrPopUp()})),window.addEventListener("click",(t=>{var e;const s=t.target;"menuToggle"===(null===(e=s.parentElement)||void 0===e?void 0:e.id)&&null!==s.parentElement.id||(i.checked=!1)}))}}e.Header=n},359:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Registration=void 0;const s=i(583);i(337);class a extends s.BaseComponent{constructor(t,e,i){super("div",["pop-up-registr-wrapper","hidden"]),this.adminPage=e,this.newRout=i,this.overlay=t,this.inputLogin=document.createElement("input"),this.inputPassword=document.createElement("input");const s=document.createElement("p"),a=document.createElement("p");s.innerText="Enter Login: login",a.innerText="Enter Password: password",this.inputLogin.classList.add("input-login"),this.inputPassword.classList.add("input-password");const n=document.createElement("i");n.id="icon",n.classList.add("far","fa-eye"),this.element.appendChild(n),this.inputLogin.setAttribute("type","email"),this.inputPassword.setAttribute("type","password"),this.inputLogin.classList.add("input-login"),this.inputPassword.classList.add("input-password"),this.element.appendChild(s),this.element.appendChild(this.inputLogin),this.element.appendChild(a),this.element.appendChild(this.inputPassword),this.loginBtn=document.createElement("button"),this.loginBtn.innerText="Login",this.loginBtn.disabled=!0,this.loginBtn.classList.add("login-btn-popup","disabled"),this.element.appendChild(this.loginBtn),this.cancelBtn=document.createElement("button"),this.cancelBtn.innerText="Cancel",this.cancelBtn.classList.add("cancel-btn-popup"),this.element.appendChild(this.cancelBtn),this.inputLogin.addEventListener("input",(t=>{const e=t.target;"login"===e.value&&(e.classList.add("valid"),this.validatedLoginPassword())})),this.inputPassword.addEventListener("input",(t=>{const e=t.target;"password"===e.value&&(e.classList.add("valid"),this.validatedLoginPassword())})),n.addEventListener("click",(()=>{n.classList.contains("fa-eye")?(this.inputPassword.classList.toggle("fa-eye-slash"),this.inputPassword.classList.toggle("fa-eye"),this.inputPassword.removeAttribute("type"),this.inputPassword.setAttribute("type","text")):(this.inputPassword.removeAttribute("type"),this.inputPassword.setAttribute("type","password"),this.inputPassword.classList.toggle("fa-eye"),this.inputPassword.classList.toggle("fa-eye-slash"))}))}drawRegistrPopUp(){this.overlay.overlayON(),this.element.classList.remove("hidden"),this.cancelBtn.addEventListener("click",(()=>{this.cancelRegistrPopUp()})),this.overlay.element.addEventListener("click",(()=>{this.cancelRegistrPopUp()}))}cancelRegistrPopUp(){this.overlay.overlayOFF(),this.element.classList.add("hidden")}validatedLoginPassword(){this.inputLogin.classList.contains("valid")&&this.inputPassword.classList.contains("valid")&&(this.loginBtn.disabled=!1,this.loginBtn.classList.remove("disabled"),this.loginBtn.addEventListener("click",(()=>{this.cancelRegistrPopUp(),this.newRout.navigate("categories")})))}}e.Registration=a},859:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.NewRout=void 0;class i{constructor(){this.routes=[],this.root="/",this.current=this.root,this.listenForChanges()}add(t,e){return this.routes.push({path:t,cb:e}),this}static clearSlashes(t){return t.toString().replace(/\/$/,"").replace(/^\//,"")}static getFragment(){let t="";const e=window.location.href.match(/#(.*)$/);return t=e?e[1]:"",i.clearSlashes(t)}navigate(t=""){return window.location.href=`${window.location.href.replace(/#(.*)$/,"")}#${t}`,this}listenForChanges(){setInterval((()=>this.interval()),50)}interval(){this.current!==i.getFragment()&&(this.current=i.getFragment(),this.routes.some((t=>{const e=this.current===t.path;return!!e&&(t.cb.apply({}),e)})))}cleanHref(){this.navigate(""),this.current=""}}e.NewRout=i},861:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(a,n){function r(t){try{d(s.next(t))}catch(t){n(t)}}function o(t){try{d(s.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?a(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}d((s=s.apply(t,e||[])).next())}))},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Statistics=e.SortDirection=e.SortBy=void 0,i(410);const n=a(i(677)),r=i(583);var o,d;!function(t){t.Category="category",t.Word="word",t.Translation="translation",t.Clicks="click",t.Correct="correct",t.Wrong="wrong",t.CorrectPerc="correct(%)"}(o=e.SortBy||(e.SortBy={})),function(t){t.DESC="DESC",t.ASC="ASC"}(d=e.SortDirection||(e.SortDirection={}));class c extends r.BaseComponent{constructor(t){super("div",["statistics-wrapper"]),this.dataBaseDarya=t,this.allWords=[],this.divWithBtnToResetStatistic=document.createElement("div"),this.btnToReset=document.createElement("button"),this.btnToPlayHard=document.createElement("button"),this.hardWords=[],this.sortByEnum=o.Category;const e=document.createElement("h2");e.innerText="Statistic",this.element.appendChild(e),this.divWithBtnToResetStatistic.classList.add("div-with-btn-to-reset"),this.btnToReset.classList.add("btn-to-reset"),this.btnToReset.innerText="Reset",this.btnToPlayHard.classList.add("btn-to-reset"),this.btnToPlayHard.innerText="Repeat difficult words",this.element.appendChild(this.divWithBtnToResetStatistic),this.divWithBtnToResetStatistic.appendChild(this.btnToReset),this.divWithBtnToResetStatistic.appendChild(this.btnToPlayHard),this.statisticGridWrapper=document.createElement("div"),this.ulWithWordsInfoTop=document.createElement("ul"),this.statisticGridWrapper.appendChild(this.ulWithWordsInfoTop),this.ulWithWordsInfo=document.createElement("ul"),this.statisticGridWrapper.appendChild(this.ulWithWordsInfo),this.statisticGridWrapper.classList.add("statistic-grid-wrapper"),this.element.appendChild(this.statisticGridWrapper),this.topPart=document.createElement("li"),this.topPart.classList.add("topPart-li"),this.ulWithWordsInfoTop.appendChild(this.topPart);const i=Object.keys(o);for(let t=0;t<i.length;t++){const e=document.createElement("div");e.classList.add("one-category",`${o[i[t]]}-category`);const a=document.createElement("p");a.innerText=`${o[i[t]]}`,this.sortIconCategory=document.createElement("img"),this.sortIconCategory.setAttribute("data-sort",`${d.ASC}`),this.sortIconCategory.setAttribute("src",`${n.default}`),this.sortIconCategory.classList.add("icon-for-sort"),this.sortIconCategory.setAttribute("data-category",`${o[i[t]]}`),this.sortIconCategory.addEventListener("click",(t=>s(this,void 0,void 0,(function*(){const e=t.target,i=e.dataset.sort,s=e.dataset.category;e.classList.toggle("transform");const a=s;this.sortBy(i,a),i===d.ASC?e.dataset.sort=d.DESC:e.dataset.sort=d.ASC})))),e.appendChild(a),e.appendChild(this.sortIconCategory),this.topPart.appendChild(e)}this.btnToReset.addEventListener("click",(()=>{this.resetStatistic()})),this.btnToPlayHard.addEventListener("click",(()=>{}))}sortBy(t,e){this.allWords=this.allWords.sort(((i,s)=>{const a="correct(%)"!==e?i[e]:i.persOfErrors,n="correct(%)"!==e?s[e]:s.persOfErrors;return t===d.DESC?a<n?-1:a>n?1:0:a<n?1:a>n?-1:0})),this.statisticShowSorted()}statisticShow(){return s(this,void 0,void 0,(function*(){this.allWords=yield this.dataBaseDarya.getAllWords(),this.allWords=this.allWords.sort(((t,e)=>e.correct-t.correct)),this.statisticShowSorted()}))}statisticShowSorted(){this.ulWithWordsInfo.innerHTML="";for(let t=0;t<this.allWords.length;t++){const e=document.createElement("li");e.classList.add("word-li"),this.ulWithWordsInfo.appendChild(e);const i=document.createElement("p");i.innerText=`${this.allWords[t].category}`;const s=document.createElement("p");s.innerText=`${this.allWords[t].word}`;const a=document.createElement("p");a.innerText=`${this.allWords[t].translation}`;const n=document.createElement("p");n.innerText=`${this.allWords[t].click}`;const r=document.createElement("p");r.innerText=`${this.allWords[t].correct}`;const o=document.createElement("p");o.innerText=`${this.allWords[t].wrong}`;const d=document.createElement("p");d.innerText=`${this.allWords[t].persOfErrors.toFixed(0)}%`,t%2==0&&e.classList.add("color-line"),e.appendChild(i),e.appendChild(s),e.appendChild(a),e.appendChild(n),e.appendChild(r),e.appendChild(o),e.appendChild(d)}}resetStatistic(){for(let t=0;t<this.allWords.length;t++)this.allWords[t].click=0,this.allWords[t].correct=0,this.allWords[t].persOfErrors=0,this.allWords[t].wrong=0,this.dataBaseDarya.update(this.allWords[t]);this.statisticShow()}}e.Statistics=c},746:(t,e,i)=>{t.exports=i.p+"assets/23d0e138bca01dee202f.mp3"},849:(t,e,i)=>{t.exports=i.p+"assets/88bbaea7d58302d40a65.mp3"},181:(t,e,i)=>{t.exports=i.p+"assets/296640c6f4d1d252c1ac.mp3"},432:(t,e,i)=>{t.exports=i.p+"assets/4c363e33bc693e9b0008.png"},747:(t,e,i)=>{t.exports=i.p+"assets/847af73cbd6bdb859ff1.svg"},615:(t,e,i)=>{t.exports=i.p+"assets/d0d7e71e7a177e66aff8.png"},677:(t,e,i)=>{t.exports=i.p+"assets/27431e1055eed855bd01.png"},937:(t,e,i)=>{t.exports=i.p+"assets/b818e517af13d254e757.svg"},218:(t,e,i)=>{t.exports=i.p+"assets/9fcf9c9d45a22aa4b29f.svg"},639:(t,e,i)=>{t.exports=i.p+"assets/5f4128d4372b6a2b67a4.mp3"},707:(t,e,i)=>{t.exports=i.p+"assets/280b8c315a7475cadc2d.png"}},e={};function i(s){var a=e[s];if(void 0!==a)return a.exports;var n=e[s]={exports:{}};return t[s].call(n.exports,n,n.exports,i),n.exports}i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");s.length&&(t=s[s.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),(()=>{const t=i(752);i(373),window.onload=()=>{const e=document.getElementById("app");if(!e)throw Error("App root element not found");new t.App(e).start()}})()})();