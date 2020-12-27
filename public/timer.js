
let text = document.querySelector(".circle");
let button = document.querySelector(".buy-button");
console.log(button);

button.addEventListener("click", async function (event) {
  console.log(event);
  let secs = 4;
  let timer = setInterval(tick, 1000);
  async function tick() {
    button.disabled = true;
    console.log("Осталось " + --secs + " секунд");
    if (secs === 0) {
      button.disabled = false;
      clearInterval(timer);
      text.innerText = 'Время вышло';
      const response = await fetch('/user/marathon/addpoints')
      let constresult = await response.json()
      console.log(constresult)
      location.href = '/user/marathon/exercisepage/razminka'
    } else {
      text.innerText = secs;
    }
  }
});
