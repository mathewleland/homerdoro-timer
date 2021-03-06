let startTimerValue = (60 * 25),
    breakTimerValue = (60 * 5),
    originalTime,
    timer,
    breakTimer,
    paused = false;
const woohoo = new Audio('http://www.richmolnar.com/Sounds/Homer%20-%20Woohoo!%20(1).wav'),
    doh = new Audio("http://www.richmolnar.com/Sounds/Homer%20-%20D'oh!%20(1).wav");

document.getElementById("addWork").addEventListener('click', () => {
  startTimerValue += 60;
  updateTimer(startTimerValue, 'timerValue');
});

document.getElementById("minusWork").addEventListener('click', () => {
  if (startTimerValue > 61) {
    startTimerValue -= 60;
  }
  updateTimer(startTimerValue, 'timerValue');
});

document.getElementById("addBreak").addEventListener('click', () => {
  breakTimerValue += 60;
  updateTimer(breakTimerValue, 'breakValue');
});

document.getElementById("minusBreak").addEventListener('click', () => {
  if (breakTimerValue > 61) {
    breakTimerValue -= 60;
    updateTimer(breakTimerValue, 'breakValue');
  }
});

document.getElementById('startTimer').addEventListener('click', runWorkTimer);

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timer);
  clearInterval(breakTimer);
  startTimerValue = 60 * 25;
  breakTimerValue = 60 * 5;
  updateTimer(startTimerValue, 'timerValue');
  updateTimer(breakTimerValue, 'breakValue');
  document.getElementById('mainImg').src = 'http://www.star2.com/wp-content/uploads/2016/05/homer-770x470.jpg';
});


function updateTimer(newTime, timerID) {
  if (newTime >= 0) {
    let minutes = Math.floor(newTime/60);
    let seconds = newTime % 60;

    seconds = (seconds > 9) ? (seconds.toString()) : ("0" + seconds.toString());
    document.getElementById(timerID).innerHTML = minutes.toString() + ":" + seconds;
  }
}

function runWorkTimer() {

  if (!paused) originalTime = startTimerValue;
  document.getElementById('mainImg').src = 'http://www.learnawesome.com/wp-content/uploads/2013/01/Homer-working.jpg';
  timer = setInterval(function() {
    paused = false;
    startTimerValue--;
    updateTimer(startTimerValue, 'timerValue');
    document.getElementById('stop').addEventListener('click', () => {
      clearInterval(timer);
      paused = true;
    });
    if (startTimerValue < 1) {
      clearInterval(timer);
      startTimerValue = originalTime;
      updateTimer(startTimerValue, 'timerValue');
      woohoo.play();
      runBreakTimer();
    }
  }, 1000);

}

function runBreakTimer() {
  if (!paused) originalTime = breakTimerValue;
  document.getElementById('mainImg').src = 'https://tstotopix.files.wordpress.com/2014/01/homer-sleeping-1.png';
  breakTimer = setInterval(() => {
    paused = false;
    breakTimerValue--;
    updateTimer(breakTimerValue, 'breakValue');
    document.getElementById('stop').addEventListener('click', () => {
      clearInterval(breakTimer);
    });
    if (breakTimerValue < 1) {
      clearInterval(breakTimer);
      breakTimerValue = originalTime;
      updateTimer(breakTimerValue, 'breakValue');
      doh.play();
      runWorkTimer();
    }
  }, 1000);
}

document.getElementById('demo').addEventListener('click', () => {
  startTimerValue = 5;
  breakTimerValue = 5;
  updateTimer(startTimerValue, 'timerValue');
  updateTimer(breakTimerValue, 'breakValue');
  runWorkTimer();
})
