 
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#resetbtn");
    const newGameBtn = document.querySelector("#new-btn");
    const msgContainer = document.querySelector(".msg-container");
    const msg = document.querySelector("#msg");
    const turnDisplay = document.querySelector("#turnDisplay");
    const scoreX = document.querySelector("#scoreX");
    const scoreO = document.querySelector("#scoreO");
    const overlay = document.querySelector(".overlay");

    let turnX = true;
    let playerXScore = 0;
    let playerOScore = 0;

    const winPatterns = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]
    ];

    const resetGame = () => {
      turnX = true;
      turnDisplay.innerText = "Player X's Turn";
      enableBoxes();
      msgContainer.classList.add("hide");
      msg.classList.remove("blink");
      hideOverlay();
    };

    const enableBoxes = () => {
      boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#ffffc7";
        box.style.color = "#000";
        box.classList.remove("winning-box");
      });
    };

    const disableBoxes = () => {
      boxes.forEach((box) => {
        box.disabled = true;
      });
    };

    const showOverlay = () => {
      overlay.classList.remove("hide");
    };

    const hideOverlay = () => {
      overlay.classList.add("hide");
    };

    const showWinner = (winner, pattern) => {
      msg.innerText = `🎉 Congratulation\nwinner is Player ${winner}`;
      msg.classList.add("blink");
      msgContainer.classList.remove("hide");

      pattern.forEach((i) => {
        boxes[i].style.backgroundColor = "#10a370";
        boxes[i].classList.add("winning-box");
      });

      if (winner === "X") {
        playerXScore++;
        scoreX.innerText = `Player X: ${playerXScore}`;
      } else {
        playerOScore++;
        scoreO.innerText = `Player O: ${playerOScore}`;
      }

      disableBoxes();
      playSound("win");
      showOverlay();
    };

    const showDraw = () => {
      msg.innerText = "It's a Draw!😎";
      msg.classList.add("blink");
      msgContainer.classList.remove("hide");
      disableBoxes();
      playSound("draw");
      showOverlay();
    };

    const checkWinner = () => {
      for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
          showWinner(val1, pattern);
          return;
        }
      }

      let allFilled = [...boxes].every(box => box.innerText !== "");
      if (allFilled) showDraw();
    };

    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        box.innerText = turnX ? "X" : "O";
        box.style.color = turnX ? "#b0413e" : "#1e4cb3";
        box.disabled = true;
        turnX = !turnX;
        turnDisplay.innerText = `Player ${turnX ? "X" : "O"}'s Turn`;

        checkWinner();
      });
    });

    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);

    const playSound = (type) => {
      const sound = new Audio(type === "win" ? "new-years-eve-in-peru-fireworks-fire-crackers-and-rockets-to-celebrate-the-new-year-pisco-peru-2012-17692.mp3" :  "congratulations-message-notification-sound-sfx-1-334724.mp3");
      sound.play();
    };
  