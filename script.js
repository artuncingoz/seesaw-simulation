

const plank = document.getElementById('plank');
const leftWeightDisplay = document.getElementById('left_weight');
const rightWeightDisplay = document.getElementById('right-weight');
const resetButton = document.getElementById('reset-button');
const next_weight = document.getElementById('next_weight');

let objects = [];

function createWeightElement(weightObject) {
    const weightElement = document.createElement('div');
    weightElement.className = 'weight';

    weightElement.style.left = `${weightObject.position}px`;

    weightElement.textContent = weightObject.weight;

    plank.appendChild(weightElement);
}


function addWeight(event) {

    const clickPosition = event.offsetX;

    const newWeight = Math.floor(Math.random() * 10) + 1;


    let newWeightObject = {
        weight: newWeight,
        position: clickPosition,
    };

    objects.push(newWeightObject);

    createWeightElement(newWeightObject);

}

function resetWeights() {
    objects = [];
    plank.innerHTML = '';
}

function init() {
    resetButton.addEventListener('click', resetWeights);
    plank.addEventListener('click', addWeight);
}


init();