

const plank = document.getElementById('plank');
const leftWeightDisplay = document.getElementById('left_weight');
const rightWeightDisplay = document.getElementById('right_weight');
const resetButton = document.getElementById('reset-button');
const next_weight = document.getElementById('next_weight');
const torqdiff_display = document.getElementById('tork_diff');
const pasueButton = document.getElementById('pause-button');
const notifCont = document.getElementById('notification-container');

let objects = [];
let notifList = [];
let notifListLength = 1;
let plankWidth = plank.clientWidth;

let nextWeightValues = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
let isPause = false;

let sound = new Audio("ball_drop.mp3");
let clickSound = new Audio("click.mp3");

// Update seesaw based on weights and their positions
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

    if (isPause) {
        return;
    }

    if (Math.abs(torqdiff * 0.005) > 30) {
        plank.style.transform = `translateX(-50%) rotate(${torqdiff > 0 ? 30 : -30}deg)`;
        return;
    }


    plank.style.transform = `translateX(-50%) rotate(${torqdiff * 0.005}deg)`;
}

// Create and display a weight element on the plank
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

    sound.play();
    sound.currentTime = 0;
    let side = '';

    if (clickPosition - plankWidth / 2 < 0) {
        side = 'left';
    } else {
        side = 'right';
    }

    notifList.push(`${notifListLength}. Added weight: ${newWeight} at position: ${Math.abs(clickPosition - plankWidth / 2)} px away from center on ${side} side.`);
    if (notifList.length > 5) {
        notifList.shift();
    }
    notifListLength += 1;

    notifCont.innerHTML = '';
    for (let i = 0; i < notifList.length; i++) {
        const notifelemeent = document.createElement('div');
        notifelemeent.className = 'notif_element';

        notifelemeent.textContent = notifList[i];

        notifCont.appendChild(notifelemeent);
    }

    updateSeesaw();
}

function resetWeights() {

    isPause = false;
    pasueButton.classList.remove('paused');
    pasueButton.textContent = 'Pause';

    objects = [];
    plank.innerHTML = '';

    notifList = [];
    notifListLength = 1;
    notifCont.innerHTML = '';


    clickSound.play();
    clickSound.currentTime = 0;

    updateSeesaw();
}

function pauseGame() {

    isPause = !isPause;

    clickSound.play();
    clickSound.currentTime = 0;

    if (isPause) {
        pasueButton.classList.add('paused');
        pasueButton.textContent = 'Resume';
    } else {
        pasueButton.classList.remove('paused');
        pasueButton.textContent = 'Pause';
    }

    updateSeesaw();
}


function init() {
    resetButton.addEventListener('click', resetWeights);
    plank.addEventListener('click', addWeight);
    pasueButton.addEventListener('click', pauseGame);

    next_weight.textContent = nextWeightValues[0];
}


init();