const cards = document.querySelector(".container ");
const card = document.querySelectorAll(".container div ");
const moveCount = document.querySelector(".moves");
const restart = document.querySelector(".play-again");
const win = document.querySelector(".end");

let clickedNum = 0;
let randomIndex = [];
let randomIndexClone = [];
let lastClicked;
let moves = 0;
let isPressed = false;
let move1;
let move2;
let fliped = false;
let matchCount = 0;

const pairing = ["pair1", "pair2", "pair3", "pair4", "pair5"];

card.forEach((element) => {
  element.addEventListener("click", flip);
});

pushRandomNum();
pushRandomNumClone();
addClass(addData);

//funtions

function flip(e) {
  if (fliped) return;
  if (this === move1) return;

  this.classList.add("clicked");

  if (!isPressed) {
    move1 = this;
    isPressed = true;
  } else {
    move2 = this;
    isPressed = false;
    moves++;

    if (move1.dataset.key === move2.dataset.key) {
      move1.removeEventListener("click", flip);
      move2.removeEventListener("click", flip);
      move1.classList.add("match");
      move2.classList.add("match");
      matchCount++;

      setTimeout(() => {
        if (matchCount === 5) {
          win.style.display = "flex";
          moveCount.innerHTML = moves;
          restart.addEventListener("click", reset);
        }
      }, 50);
    } else {
      fliped = true;
      setTimeout(() => {
        move1.classList.remove("clicked");
        move2.classList.remove("clicked");
        fliped = false;
      }, 1000);
    }
  }
}

function reset() {
  window.location.reload();
}

function generateUniqueRandom(maxNr) {
  //Generate random number
  let random = Math.floor(Math.random() * maxNr + 0);

  if (!randomIndex.includes(random)) {
    randomIndex.push(random);
    return random;
  } else {
    if (randomIndex.length < maxNr) {
      return generateUniqueRandom(maxNr);
    }
  }
}

function addData() {
  card.forEach((e) => {
    if (e.classList.contains("pair1")) {
      e.dataset.key = 1;
    }
    if (e.classList.contains("pair2")) {
      e.dataset.key = 2;
    }
    if (e.classList.contains("pair3")) {
      e.dataset.key = 3;
    }
    if (e.classList.contains("pair4")) {
      e.dataset.key = 4;
    }
    if (e.classList.contains("pair5")) {
      e.dataset.key = 5;
    }
  });
}

function generateUniqueRandomClone(maxNr) {
  let random = Math.floor(Math.random() * maxNr + 5);

  if (!randomIndexClone.includes(random)) {
    randomIndexClone.push(random);
    return random;
  } else {
    if (randomIndexClone.length < maxNr) {
      return generateUniqueRandomClone(maxNr);
    }
  }
}

function addClass(addData) {
  for (let i = 0; i < randomIndex.length; i++) {
    card[i].className = pairing[randomIndex[i]];
    card[randomIndexClone[i]].className = pairing[randomIndex[i]];
  }
  addData();
}

function pushRandomNum() {
  for (let i = 0; i < cards.childElementCount / 2; i++) {
    generateUniqueRandom(cards.childElementCount / 2);
  }
}

function pushRandomNumClone() {
  for (let i = 0; i < cards.childElementCount; i++) {
    generateUniqueRandomClone(cards.childElementCount / 2);
  }
}
