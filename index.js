const container = document.querySelector(".container");
let arr = [];
let playing = false;
const init = (size = 10) => {
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 50) + 1;
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (playing) {
    return;
  }
  const size = document.querySelector("#size").value;
  const seconds = document.querySelector("#seconds").value;
  let num = Number(size);
  let speed = Number(seconds);
  if (playing) {
    document.getElementById("mybutton").style.display = "none";
  } else {
    playing = true;
  }
  if (num > 20) {
    alert("Enter size less than 20 !!");
  } else {
    arr = [];
    init(num);
    showBar();
    animateSort(bubbleSort([...arr]), speed);
  }
};

const showBar = (move) => {
  container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const barElement = document.createElement("div");
    barElement.classList.add("barElement");
    barElement.innerHTML = `<p>${arr[i]}</p>`;
    barElement.style.height = arr[i] * 8;

    if (move && move.indices.includes(i)) {
      barElement.style.backgroundColor =
        move.type == "swap" ? "rgb(173, 216, 230)" : "rgb(230, 161, 161)";
    }
    container.appendChild(barElement);
  }
};

const bubbleSort = (arr) => {
  const moves = [];
  for (let i = 0; i < arr.length; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      moves.push({
        indices: [j, j + 1],
        type: "comp",
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
        moves.push({
          indices: [j, j + 1],
          type: "swap",
        });
      }
    }
    if (!flag) {
      break;
    }
  }
  return moves;
};

const animateSort = (moves, speed = 50) => {
  if (moves.length == 0) {
    showBar();
    playing = false;
    document.getElementById("mybutton").style.removeProperty("display");
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  showBar(move);
  setTimeout(() => {
    animateSort(moves, speed);
  }, speed);
};
