const inputs = document.querySelectorAll('.filters input');
const resetBtn = document.querySelector('.btn-reset');
const nextPicBtn = document.querySelector('.btn-next');
const loadBtn = document.querySelector('input[type="file"]');
const saveBtn = document.querySelector('.btn-save');
const btnContainer = document.querySelectorAll('.btn')
const canvas = document.querySelector('canvas'); 
let active = nextPicBtn;
const imgContainer = document.getElementById('default-img');

let blur = document.querySelector('input[name=blur]').value;
let invert = document.querySelector('input[name=invert]').value;
let sepia = document.querySelector('input[name=sepia]').value;
let saturate = document.querySelector('input[name=saturate]').value;
let hue = document.querySelector('input[name=hue]').value;
let contrast = document.querySelector('input[name=contrast]').value;
let brightness = document.querySelector('input[name=contrast]').value;

let calcForNextImgBtn = 0;

function filterUpdate () {
  const measure = this.dataset.sizing;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + measure);
  let outputSize = document.querySelector(`.${this.name}`);
  outputSize.value = this.value

blur = document.querySelector('input[name=blur]').value;
invert = document.querySelector('input[name=invert]').value;
sepia = document.querySelector('input[name=sepia]').value;
saturate = document.querySelector('input[name=saturate]').value;
hue = document.querySelector('input[name=hue]').value;
contrast = document.querySelector('input[name=contrast]').value;
brightness = document.querySelector('input[name=brightness]').value;
}

function changeSRC (src) {
  let arrOfImg = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'];
    if (calcForNextImgBtn === arrOfImg.length) {
      calcForNextImgBtn = 0;
      src = src.concat(`${arrOfImg[calcForNextImgBtn]}.jpg`); 
      calcForNextImgBtn++;
    }
    else {
      src = src.concat(`${arrOfImg[calcForNextImgBtn]}.jpg`); 
      calcForNextImgBtn++;
    }
    return src;
}

function drawImage() {
  const img = new Image(); 
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = document.getElementById('default-img').src;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    const coeff = canvas.height /imgContainer.height;
    ctx.filter = `blur(${coeff * blur}px) invert(${invert}%) sepia(${sepia}%) saturate(${saturate}%) hue-rotate(${hue}deg) contrast(${contrast}%) brightness(${brightness}%)`;
    console.log(`contrast(${contrast}%)`);
    ctx.drawImage(img, 0, 0);
    var link = document.createElement('a');
    link.download = "download.png";
    link.href = canvas.toDataURL('image/png')
    link.click();
    link.delete;
  }; 
}

saveBtn.addEventListener('click', function(e) {
drawImage();
ActiveStyleBtn(saveBtn);
});


nextPicBtn.addEventListener('click', function(){
  const date = new Date().getHours();
  ActiveStyleBtn(nextPicBtn);
  if(date >= 6 && date < 12) {
    document.getElementById('default-img').src = 
    changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/');
  }
  if(date >= 12 && date < 18) {
    document.getElementById('default-img').src = 
    changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/');  
  }
  if(date >= 18 && date <= 23) {
    document.getElementById('default-img').src = 
    changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/');
  }
  if(date >= 0 && date < 6) {
    document.getElementById('default-img').src = 
    changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/'); 
  }
});

loadBtn.addEventListener('change', function(e) {
  const file = loadBtn.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    ActiveStyleBtn(document.querySelector('.btn-load'));
    document.getElementById('default-img').src = reader.result;
    imgContainer.innerHTML = "";
  }
  reader.readAsDataURL(file);
  loadBtn.value = null;
});

inputs.forEach(input => input.addEventListener('change', filterUpdate));
inputs.forEach(input => input.addEventListener('mousemove', filterUpdate));

resetBtn.addEventListener('click', function(){
  ActiveStyleBtn(resetBtn);
  document.getElementById('filters').reset();
  inputs.forEach(function (input) {
    const measure = input.dataset.sizing;
    document.documentElement.style.setProperty(`--${input.name}`, input.value + measure);
  });
});

// btnContainer.forEach(btn => btn.addEventListener('mouseup', ActiveStyleBtn));

function ActiveStyleBtn(btn) {
  active.classList.remove('btn-active');
  active = btn;
  active.classList.add('btn-active');
}

// *********FULLSCREEN*********

const fullscreen = document.querySelector('.fullscreen');

fullscreen.addEventListener("click", function() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});