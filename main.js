let arr = [];
let myArr = [];
let tmpArr = [];
let statsArr = [];
let hits = 0;
let games = 0;
let oneNumber = 0;
let twoNumbers = 0;
let threeNumbers = 0;
let fourNumbers = 0;
let fiveNumbers = 0;
let sixNumbers = 0;
let accountValue = 0;
let incomeValue = 0;
let sortedStatsArr;

const btn = document.querySelector("button.startRandom");
const btnAdd = document.querySelector("button.addNumbers");
const btnRand = document.querySelector("button.randomNumbers");
const divResult = document.querySelector("div#lottoResult ul");
const input = document.querySelector("input");
const yourNumbers = document.querySelector("div span");

const gamesCounter = document.querySelector("div#games span");
const oneNumberWin = document.querySelector("div#one span");
const twoNumbersWin = document.querySelector("div#two span");
const threeNumbersWin = document.querySelector("div#three span");
const fourNumbersWin = document.querySelector("div#four span");
const fiveNumbersWin = document.querySelector("div#five span");
const sixNumbersWin = document.querySelector("div#six span");
const account = document.querySelector("div#account span");
const income = document.querySelector("div#income span");
const span = document.createElement("span");
const divLottoStats = document.querySelector("div#popularNumbers span");
const lottoStats = document.getElementById("popularNumbers");
const reserBtn = document.querySelector("button.reset");

account.textContent = accountValue;

function losowanieLotto(max, min) {
  let liczba = Math.floor(Math.random() * (max - min + 1) + min);
  return liczba;
}

function checkResult() {
  tmpArr = [...arr];
  let hitsNumber = [];
  hits = 0;
  yourNumbers.appendChild(span);

  for (let j = 0; j < myArr.length; j++) {
    for (let i = 0; i < tmpArr.length; i++) {
      if (tmpArr[i] == myArr[j]) {
        hitsNumber.push(i);

        console.log("trafiona");
        hits = hitsNumber.length;

        yourNumbers.style.color = "red";
      }
      span.innerText = ` 
      Trafione liczby: ${hits}`;
    }
  }
  if (hits === 1) {
    oneNumber++;
    oneNumberWin.textContent = oneNumber;
  } else if (hits === 2) {
    twoNumbers++;
    twoNumbersWin.textContent = twoNumbers;
  } else if (hits === 3) {
    threeNumbers++;
    threeNumbersWin.textContent = threeNumbers;
    incomeValue += 10;
  } else if (hits === 4) {
    fourNumbers++;
    fourNumbersWin.textContent = fourNumbers;
    incomeValue += 200;
  } else if (hits === 5) {
    fiveNumbers++;
    fiveNumbersWin.textContent = fiveNumbers;
    incomeValue += 5000;
  } else if (hits === 6) {
    sixNumbers++;
    sixNumbersWin.textContent = sixNumbers;
    incomeValue += 2000000;
  }
  income.innerText = incomeValue + " zł";
  income.style.color = "green";
}

function chybilTrafil() {
  if (myArr.length !== 6) {
    this.textContent = "Zmień liczby";
    for (let i = 0; i < 6; i++) {
      let liczba = losowanieLotto(49, 1);
      console.log(liczba);
      for (let j = 0; j < myArr.length; j++) {
        if (liczba === myArr[j]) {
          liczba = losowanieLotto(49, 1);
        }
      }
      myArr.push(liczba);
    }
    yourNumbers.textContent = myArr.join(" - ");
  } else {
    this.textContent = "Chybił trafił";
    myArr.length = 0;
    yourNumbers.textContent = "";
    arr = [];
  }
}

function addYourNumber() {
  const liczba = Math.floor(input.value);
  if (myArr.length !== 6) {
    if (typeof liczba === "number" && liczba <= 49 && liczba >= 1) {
      for (let i = 0; i < myArr.length; i++) {
        if (liczba === myArr[i]) return alert("Juz taka jest");
      }
      myArr.push(liczba);
      yourNumbers.textContent += input.value + " ";
      input.value = "";
    } else {
      alert("Wpisz poprawną wartość");
    }
  } else {
    alert("Mamy juz wszystkie liczby, mozesz losować");
  }
}

function startLotto() {
  if (myArr.length == 6) {
    if (divResult.innerHTML == "") {
      games++;
      gamesCounter.textContent = games;
      accountValue += 3;
      account.textContent = accountValue + " zł";
      account.style.color = "red";
      yourNumbers.style.color = "inherit";
      for (let i = 0; i < 6; i++) {
        let liczba = losowanieLotto(49, 1);
        console.log(liczba);
        for (let j = 0; j < arr.length; j++) {
          if (liczba === arr[j]) {
            liczba = losowanieLotto(49, 1);
          }
        }
        liResult = document.createElement("li");
        liResult.textContent = liczba;

        liResult.style.display = "inline-block";
        liResult.style.width = "30px";
        liResult.style.height = "30px";
        liResult.style.backgroundColor = "yellow";
        liResult.style.letterSpacing = "2px";
        liResult.style.borderRadius = "50%";
        liResult.style.padding = "15px";
        liResult.style.margin = "3px";
        liResult.style.fontSize = "26px";

        liResult.style.fontFamily = "monospace";
        liResult.style.fontWeight = "bold";
        liResult.style.border = "4px solid #000";

        divResult.appendChild(liResult);

        arr.push(liczba);
        statsArr.push(liczba);
      }
    } else {
      divResult.innerHTML = "";
      startLotto();
    }

    checkResult();
    count();

    arr = [];
  } else alert("Podaj swoje liczy lub postaw na chybił trafił");
}

function count() {
  let count = {};

  statsArr.forEach(function(i) {
    count[i] = (count[i] || 0) + 1;
  });

  console.log(count);

  sortedStatsArr = {};
  sortedStatsArr = Object.keys(count).sort(function(a, b) {
    return count[b] - count[a];
  });

  console.log(sortedStatsArr.slice(0, 6));
  divLottoStats.textContent = sortedStatsArr.slice(0, 6).join(" - ");
}

function refreshPage() {
  window.location.reload();
}

btnRand.addEventListener("click", chybilTrafil);

btn.addEventListener("click", startLotto);

btnAdd.addEventListener("click", addYourNumber);

reserBtn.addEventListener("click", refreshPage);
