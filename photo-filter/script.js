const inputs = document.querySelectorAll('.filters input');

function filterUpdate () {
  const measure = this.dataset.sizing;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + measure);
}

inputs.forEach(input => input.addEventListener('change', filterUpdate));
inputs.forEach(input => input.addEventListener('mousemove', filterUpdate));