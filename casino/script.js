(function () {
  "use strict";

  const content = {
    entities: [
      "The AEC",
      "Leonardo Puglisi",
      "Dan Andrews",
      "The ABC",
      "The Greens party",
      "The Labor party",
      "The Guardian",
      "Pfizer",
      "Scott Morrison",
      "Peter Dutton",
      "Dave Miblo",
      "Moderna",
      "Leigh Sales",
      "Laura Tingle",
      "The Wiggles",
      "AstraZeneca",
      "The Unofficial Chaser Discord Server",
      "The Great Mouse Plague of 2021",
      "The Chaser",
      "The Shovel",
      "The Betoota Advocate",
      "Antony Green"
    ],
    problems: [
      "right wing",
      "problematic",
      "a liberal front",
      "run by a Lib/Nat staffer",
      "generally crap",
      "even worse than the LNP",
      "not even slightly impartial",
      "a front for Nazis",
      "perpetuating cancel culture",
      "spreading fake news",
      "a far-left plant",
      "founded ANTIFA",
      "a crisis actor"
    ],
    reasons: [
      "I'm secretly a Nazi",
      "they criticised Labor",
      "they criticised Albo",
      "PRGuy said so",
      "my friend's cousins ballsack tripled in size",
      "they're pink",
      "they steal votes from Labor",
      "they dared remind us that preferential voting exists",
      "they're a loaf of milk",
      "a fact check hurt my fee fees",
      "the UAP showed me the truth",
      "the frogs turned gay",
      "they need to smile more",
      "we don't have free RATs",
      "they defamed me on Twitter",
      "I couldn't purchase soft serve today",
      "I sent a spicy text message",
      "the milkshake did not consent",
      "they went woke",
      "they fondled a lump of coal",
      "they texted me like a cringy ex",
      "they are a Rupert Murdoch simp"
    ]
  };

  const slotOne = document.getElementById("Slot-One");
  const slotTwo = document.getElementById("Slot-Two");
  const slotThree = document.getElementById("Slot-Three");

  const doors = [slotOne, slotTwo, slotThree];

  document.querySelector("#spinner").addEventListener("click", spin);
  async function spin() {
    init(true, 4, 3, true);
    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = "translateY(0)";
      await new Promise(resolve => setTimeout(resolve, duration * 100));
    }
  }

  function init(firstInit = true, groups = 1, duration = 1, shouldAnimate = true) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");

      const boxesClone = boxes.cloneNode(false);
      if (shouldAnimate) {
        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            this.querySelectorAll(".box").forEach(box => {
              box.style.filter = "blur(1px)";
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)";
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }
      console.log(firstInit, door.dataset.spinned, door.dataset.loaded);
      const visibleBox = door.querySelector(".boxes .box");
      const firstText = visibleBox ? visibleBox.textContent : "?";
      const pool = [firstText, ...shuffle(content[door.attributes.data.value])];
      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        // box.style.color = shuffle(["red", "blue", "green"])[0];
        door.dataset.loaded = true;
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }

      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;

      door.replaceChild(boxesClone, boxes);
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();
