const CORRECT_CODE = "1102";
let entered = "";

const boxes = [
  document.getElementById("dot0"),
  document.getElementById("dot1"),
  document.getElementById("dot2"),
  document.getElementById("dot3")
];

const message = document.getElementById("message");
const keypad = document.querySelector(".keypad");
const clearBtn = document.getElementById("clearBtn");
const backBtn = document.getElementById("backBtn");
const enterBtn = document.getElementById("enterBtn");
const mainScreen = document.querySelector(".screen");
const secretPage = document.getElementById("secretPage");
const backToLock = document.getElementById("backToLock");

function updateBoxes() {
  boxes.forEach((box, index) => {
    box.textContent = index < entered.length ? "•" : "*";
  });
}

function clearMessage() {
  message.textContent = "";
}

function addDigit(value) {
  clearMessage();
  if (entered.length >= 4) return;

  // Only numbers count toward the four-digit passcode.
  if (!/^\d$/.test(value)) return;

  entered += value;
  updateBoxes();

  // Automatically check after four digits.
  if (entered.length === 4) {
    setTimeout(checkCode, 180);
  }
}

function deleteLast() {
  clearMessage();
  entered = entered.slice(0, -1);
  updateBoxes();
}

function clearAll() {
  clearMessage();
  entered = "";
  updateBoxes();
}

function checkCode() {
  if (entered === CORRECT_CODE) {
    message.textContent = "";
    mainScreen.hidden = true;
    secretPage.hidden = false;
    window.scrollTo(0, 0);
  } else {
    message.textContent = "Incorrect passcode — try again";
    entered = "";
    updateBoxes();
  }
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest(".key");
  if (!button) return;
  addDigit(button.dataset.key);
});

clearBtn.addEventListener("click", clearAll);
backBtn.addEventListener("click", deleteLast);
enterBtn.addEventListener("click", checkCode);

document.addEventListener("keydown", (event) => {
  if (/^\d$/.test(event.key)) addDigit(event.key);
  if (event.key === "Backspace") deleteLast();
  if (event.key === "Escape") clearAll();
  if (event.key === "Enter") checkCode();
});

backToLock.addEventListener("click", () => {
  secretPage.hidden = true;
  mainScreen.hidden = false;
  clearAll();
});
