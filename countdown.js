let timeleft = 10;
let problemTimer = setInterval(() => {
    if(timeleft <= 0){
        clearInterval(problemTimer);
        document.querySelector(".countdown").textContent = "Finished";
        alert('nani?!');
        //@wip lol
      } else {
        document.querySelector(".countdown").textContent = timeleft + " seconds remaining";
      }
      timeleft -= 1;
}, 1000);