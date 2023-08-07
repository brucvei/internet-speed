let start, end;
let imageSize = "";
let img = new Image();
const bit = document.querySelector("#bits span"),
    kb = document.querySelector("#kbs span"),
    mb = document.querySelector("#mbs span"),
    info = document.querySelector("#info span");

let totalBitSpeed = 0,
    totalKbSpeed = 0,
    totalMbSpeed = 0,
    numTests = 3,
    completedTests = 0;

let imageApi = "https://source.unsplash.com/random/1920x1080";

img.onload = async function () {
  end = new Date().getTime();

  await fetch(imageApi).then(response => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
  });
}

function calculateSpeed() {
  let time = (end - start) / 1000;
  let bitSpeed = imageSize * 8 / time;
  let kbSpeed = bitSpeed / 1024;
  let mbSpeed = kbSpeed / 1024;

  totalBitSpeed += bitSpeed;
  totalKbSpeed += kbSpeed;
  totalMbSpeed += mbSpeed;
  completedTests++;

  if (completedTests === numTests) {
    let avarageBps = (totalBitSpeed / numTests).toFixed(2);
    let avarageKbps = (totalKbSpeed / numTests).toFixed(2);
    let avarageMbps = (totalMbSpeed / numTests).toFixed(2);

    bit.innerHTML = avarageBps;
    kb.innerHTML = avarageKbps;
    mb.innerHTML = avarageMbps;
    info.innerHTML = `${numTests} tests completed!`;
  } else {
    start = new Date().getTime();
    img.src = imageApi;
  }
}

const init = async () => {
  info.innerHTML = `Testing...`;
  start = new Date().getTime();
  img.src = imageApi;
}

window.onload = () => {
  for (let i = 0; i < numTests; i++) {
    init();
  }
};
