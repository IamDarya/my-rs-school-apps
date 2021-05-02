/* sliders HOW IT WORKS */
const state = {};
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function(event) {
    var newActive = event.target;
    var isItem = newActive.closest('.carousel__item');

    if (!isItem || newActive.classList.contains('carousel__item_active')) {
        return;
    };

    update(newActive);
});

const update = function(newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const first = elems.find((elem) => elem.dataset.pos == -2);
    const last = elems.find((elem) => elem.dataset.pos == 2);

    current.classList.remove('carousel__item_active');

    [current, prev, next, first, last].forEach(item => {
        var itemPos = item.dataset.pos;

        item.dataset.pos = getPos(itemPos, newActivePos)
    });
};

const getPos = function(current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 2) {
        return -current
    }

    return diff;
}

//*sliders PETS IN ZOO*//

// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "grid";  
// }

// const next = document.getElementById("slider-right");
// const prev = document.getElementById("slider-left");

// next.addEventListener("click", e => {
// plusSlides(1);
//      });
//      prev.addEventListener("click", e => {
// plusSlides(-1);
//      });

     //////////////////////////////////////////////

     let items = document.querySelectorAll('.carousel-pets-in-zoo .item');
     let currentItem = 0;
     let isEnabled = true;
     
     function changeCurrentItem(n) {
         currentItem = (n + items.length) % items.length;
     }
     
     function hideItem(direction) {
         isEnabled = false;
         items[currentItem].classList.add(direction);
         items[currentItem].addEventListener('animationend', function() {
             this.classList.remove('active', direction);
         });
     }
     
     function showItem(direction) {
         items[currentItem].classList.add('next', direction);
         items[currentItem].addEventListener('animationend', function() {
             this.classList.remove('next', direction);
             this.classList.add('active');
             isEnabled = true;
         });
     }
     
     function nextItem(n) {
         hideItem('to-left');
         changeCurrentItem(n + 1);
         showItem('from-right');
     }
     
     function previousItem(n) {
         hideItem('to-right');
         changeCurrentItem(n - 1);
         showItem('from-left');
     }
     
     document.getElementById('slider-left').addEventListener('click', function() {
         if (isEnabled) {
             previousItem(currentItem);
         }
     });
     
     document.getElementById('slider-right').addEventListener('click', function() {
         if (isEnabled) {
             nextItem(currentItem);
         }
     });
     
     const swipedetect = (el) => {
       
         let surface = el;
         let startX = 0;
         let startY = 0;
         let distX = 0;
         let distY = 0;
         let startTime = 0;
         let elapsedTime = 0;
     
         let threshold = 150;
         let restraint = 100;
         let allowedTime = 300;
     
         surface.addEventListener('mousedown', function(e){
             startX = e.pageX;
             startY = e.pageY;
             startTime = new Date().getTime();
             e.preventDefault();
         }, false);
     
         surface.addEventListener('mouseup', function(e){
             distX = e.pageX - startX;
             distY = e.pageY - startY;
             elapsedTime = new Date().getTime() - startTime;
             if (elapsedTime <= allowedTime){
                 if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                     if ((distX > 0)) {
                         if (isEnabled) {
                             previousItem(currentItem);
                         }
                     } else {
                         if (isEnabled) {
                             nextItem(currentItem);
                         }
                     }
                 }
             }
             e.preventDefault();
         }, false);
     
         surface.addEventListener('touchstart', function(e){
             if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
                 if (e.target.classList.contains('left')) {
                     if (isEnabled) {
                         previousItem(currentItem);
                     }
                 } else {
                     if (isEnabled) {
                         nextItem(currentItem);
                     }
                 }
             }
                 var touchobj = e.changedTouches[0];
                 startX = touchobj.pageX;
                 startY = touchobj.pageY;
                 startTime = new Date().getTime();
                 e.preventDefault();
         }, false);
     
         surface.addEventListener('touchmove', function(e){
                 e.preventDefault();
         }, false);
     
         surface.addEventListener('touchend', function(e){
                 var touchobj = e.changedTouches[0];
                 distX = touchobj.pageX - startX;
                 distY = touchobj.pageY - startY;
                 elapsedTime = new Date().getTime() - startTime;
                 if (elapsedTime <= allowedTime){
                         if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                                 if ((distX > 0)) {
                                     if (isEnabled) {
                                         previousItem(currentItem);
                                     }
                                 } else {
                                     if (isEnabled) {
                                         nextItem(currentItem);
                                     }
                                 }
                         }
                 }
                 e.preventDefault();
         }, false);
     }
     
     var el = document.querySelector('.carousel');
     swipedetect(el);

// const gap = 20;

// const carousel = document.getElementById("carousel"),
//   content = document.getElementById("content"),
//   next = document.getElementById("slider-right"),
//   prev = document.getElementById("slider-left");

// next.addEventListener("click", e => {
//   carousel.scrollBy(width + gap, 0);
//   if (carousel.scrollWidth !== 0) {
//           prev.style.opacity = "1";
//   }
//   if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
//     next.style.opacity = "0";
//   }
// });
// prev.addEventListener("click", e => {
//   carousel.scrollBy(-(width + gap), 0);
//   if (carousel.scrollLeft - width - gap <= 0) {
//     prev.style.opacity = "0";
//   }
//   if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
//           next.style.opacity = "1";
//   }
// });

// let width = carousel.offsetWidth;
// window.addEventListener("resize", e => (width = carousel.offsetWidth));




// let slideType = 'all';
// let slideIndex = 0;
// let slideCoefficient = 4;
// let videoWidth = document.getElementById('content').offsetWidth;
// window.addEventListener('resize', (e) => {
//   width = carousel.offsetWidth;
//   videoWidth = document.querySelector('img').offsetWidth;
// });

//   const slideFunc = () => {
//     slideIndex += slideType === 'all' ? slideCoefficient : 1;
//     if (slideIndex > 0) {
//         prev.style.opacity = "1";
//     }
//     if (slideIndex >= 4) {
//       next.style.opacity = '0';
//     }
//     if (slideIndex > 4) {
//       if (!(slideIndex < 8 && slideType === 'all')) {
//         slideIndex = 0;
//       }
//       prev.style.opacity = "0";
//       next.style.opacity = '1';
//     }
//     carousel.scrollTo((videoWidth + gap) * slideIndex, 0);
//   }
  
//   let autoSlideInterval = setInterval(slideFunc, 3000);
//   let autoSlideTimeout = null;
  
//   const delayAutoSliding = () => {
//     clearTimeout(autoSlideTimeout);
//     clearInterval(autoSlideInterval);
//     autoSlideInterval = null;
  
//     autoSlideTimeout = setTimeout(() => {
//       clearInterval(autoSlideInterval);
//       autoSlideInterval = setInterval(slideFunc, 3000);
//     }, 6000);
//   }
  
//   carousel.addEventListener('click', delayAutoSliding);

// *****POP UPS*****

const coverElem = document.getElementById('cover');
const formElem = document.getElementById('form-feedback');
const donateButton = document.querySelector('.button4');
const sendButton = document.getElementById('send');
const amountField = document.getElementById('amount');
const textField = document.getElementById('text-feedback');
const exitButton = document.getElementById('close');

const cardInfo = document.getElementById('card-info');

const validate = () => {
    if (
        amountField.validity.valid &&
        textField.validity.valid
    ) {
        sendButton.classList.remove('invalid');
    } else {
        sendButton.classList.add('invalid');
    }
}

exitButton.addEventListener('click', () => {
    document.body.classList.remove('notScrollable');
    document.querySelector('.all').classList.remove('blur');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');
});

donateButton.addEventListener('click', () => {
    document.body.classList.add('notScrollable');
    document.querySelector('.all').classList.add('blur');
    coverElem.classList.remove('hidden');
    formElem.classList.remove('hidden');
});

coverElem.addEventListener('click', () => {
    document.body.classList.remove('notScrollable');
    document.querySelector('.all').classList.remove('blur');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');
    cardInfo.classList.add('hidden');
});

sendButton.addEventListener('click', (e) => {
    if (sendButton.classList.contains('invalid')) return;
    e.preventDefault();
    formElem.classList.add('hidden');
    cardInfo.classList.remove('hidden');
});

amountField.addEventListener('input', () => {
  if(amountField.value.match(reg)) {
    validateCard();
  }
  else {
    amountField.value = amountField.value.slice(0, -1);
  }
});

textField.addEventListener('input', () => {
    validate();
});

const cardNumber = document.getElementById('card-number');
const mm = document.getElementById('mm');
const yy = document.getElementById('yy');
const cardholdName = document.getElementById('cardholder-name');
const cvc = document.getElementById('cvc');
const closeCard = document.getElementById('close-card');
const sendCard = document.getElementById('send-card');
const reg = new RegExp('^\\d+$');

closeCard.addEventListener('click', () => {
  document.body.classList.remove('notScrollable');
  document.querySelector('.all').classList.remove('blur');
  coverElem.classList.add('hidden');
  cardInfo.classList.add('hidden');
});

const validateCard = () => {
  if (
      cardNumber.validity.valid &&
      mm.validity.valid &&
      yy.validity.valid &&
      cardholdName.validity.valid &&
      cvc.validity.valid
  ) {
      sendCard.classList.remove('invalid');
  } else {
      sendCard.classList.add('invalid');
  }
}

cardNumber.addEventListener('input', () => {
  if(cardNumber.value.match(reg)) {
    validateCard();
  }
  else {
    cardNumber.value = cardNumber.value.slice(0, -1);
  }
});

mm.addEventListener('input', () => {
    validateCard();
});

yy.addEventListener('input', () => {
    validateCard();
});

cardholdName.addEventListener('input', () => {
    validateCard();
});

cvc.addEventListener('input', () => {
  if(cvc.value.match(reg)) {
    validateCard();
  }
  else {
    console.log(cvc.value);
    cvc.value = cvc.value.slice(0, -1);
  }
});

sendCard.addEventListener('click', (s) => {
  if (sendCard.classList.contains('invalid')) return;
  s.preventDefault();
  document.body.classList.remove('notScrollable');
  cardInfo.classList.add('hidden');
  coverElem.classList.add('hidden');
  document.querySelector('.all').classList.remove('blur');
  setTimeout(function(){ alert("Thank you for your generous donation!"); }, 500);
});
// ****CHOOSE ANIMAL FOR DONATION*****

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

// ****CURRENCY SELECTOR****