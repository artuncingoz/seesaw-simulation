

const plank = document.getElementById('plank');
const leftWeightDisplay = document.getElementById('left_weight');
const rightWeightDisplay = document.getElementById('right_weight');
const resetButton = document.getElementById('reset-button');
const next_weight = document.getElementById('next_weight');
const torqdiff_display = document.getElementById('tork_diff');

let objects = [];
let nextWeightValues = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];

function updateSeesaw() {
    let leftWeight = 0;
    let rightWeight = 0;
    let leftTorque = 0;
    let rightTorque = 0;
    const plankCenter = plank.clientWidth / 2;

    objects.forEach(obj => {
        if (obj.position < plankCenter) {
            leftWeight += obj.weight;
            leftTorque += obj.weight * (plankCenter - obj.position);
        } else {
            rightWeight += obj.weight;
            rightTorque += obj.weight * (obj.position - plankCenter);
        }
    });

    leftWeightDisplay.textContent = leftWeight;
    rightWeightDisplay.textContent = rightWeight;

    const torqdiff = -(leftTorque - rightTorque);

    torqdiff_display.textContent = torqdiff;

    if (Math.abs(torqdiff * 0.005) > 20) {
        plank.style.transform = `translateX(-50%) rotate(${torqdiff > 0 ? 20 : -20}deg)`;
        return;
    }

    plank.style.transform = `translateX(-50%) rotate(${torqdiff * 0.005}deg)`;
}


function createWeightElement(weightObject) {
    const weightElement = document.createElement('div');
    weightElement.className = 'weight';

    weightElement.style.left = `${weightObject.position}px`;

    weightElement.textContent = weightObject.weight;

    plank.appendChild(weightElement);
}


function addWeight(event) {

    const clickPosition = event.offsetX;

    // Get the next weight from the queue and delete it from the list 
    const newWeight = nextWeightValues.shift();
    nextWeightValues.push(Math.floor(Math.random() * 10) + 1);
    next_weight.textContent = nextWeightValues[0];

    let newWeightObject = {
        weight: newWeight,
        position: clickPosition,
    };

    objects.push(newWeightObject);

    createWeightElement(newWeightObject);

    updateSeesaw();
}

function resetWeights() {
    objects = [];
    plank.innerHTML = '';
    updateSeesaw();
}

function init() {
    resetButton.addEventListener('click', resetWeights);
    plank.addEventListener('click', addWeight);
    next_weight.textContent = nextWeightValues[0];
}


init();