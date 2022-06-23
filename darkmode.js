const button - document.getElementById("DB");
const body = document.body;

const colors - ['white', 'black']

button.addEventListener('click', changeBackground)

function changeBackground(){
    const colorsIndex - Math.floor(math.random()*colors.length)
    body.style.backgroundcolor = colors[colorsIndex]
}