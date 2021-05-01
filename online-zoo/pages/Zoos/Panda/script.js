// *******INFO BLOCK(COLLAPSIBLE)********
const textToClick = document.querySelectorAll('.collapsible');

function hideOrOpenInfo(event) {
    let e = event.target.id;
    console.log(document.getElementById(`slider-${e.slice(0, e.length -8)}`));
    if(document.getElementById(`content-${e.slice(0, e.length-8)}`).classList.contains('hidden')) {
        document.getElementById(`content-${e.slice(0, e.length-8)}`).classList.remove('hidden');
        document.getElementById(`slider-${e.slice(0, e.length -8)}`).classList.add('transform');
    }
    else {
        document.getElementById(`content-${e.slice(0,e.length-8)}`).classList.add('hidden');
        document.getElementById(`slider-${e.slice(0, e.length -8)}`).classList.remove('transform');
    }
}

textToClick.forEach(event => event.addEventListener('click', hideOrOpenInfo));




// *****POP UPS*****

const coverElem = document.getElementById('cover');
const formElem = document.getElementById('form-feedback');
const donateButton = document.getElementById('button4');
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