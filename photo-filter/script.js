const inputs = document.querySelectorAll('.filters input');
const resetBtn = document.querySelector('.btn-reset');
const nextPicBtn = document.querySelector('.btn-next');
let calcForNextImgBtn = 0;

function filterUpdate () {
  const measure = this.dataset.sizing;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + measure);
  let outputSize = document.querySelector(`.${this.name}`);
  outputSize.value = this.value
}

inputs.forEach(input => input.addEventListener('change', filterUpdate));
inputs.forEach(input => input.addEventListener('mousemove', filterUpdate));

resetBtn.addEventListener('click', function(){
  document.getElementById('filters').reset();
  inputs.forEach(function (input) {
    const measure = input.dataset.sizing;
    document.documentElement.style.setProperty(`--${input.name}`, input.value + measure);
  });
});

nextPicBtn.addEventListener('click', function(){
  const date = new Date().getHours();
  if(date >= 6 && date < 12) {
    document.getElementById('default-img').src = changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/');
  }
  if(date >= 12 && date < 18) {
    document.getElementById('default-img').src = changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/');  
  }
  if(date >= 18 && date <= 23) {
    document.getElementById('default-img').src = changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/');
  }
  if(date >= 0 && date < 6) {
    document.getElementById('default-img').src = changeSRC('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/'); 
  }
});

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