document.addEventListener("DOMContentLoaded", () => {

  /* GET TRACKERS */

  const allTrackers =
  JSON.parse(localStorage.getItem("trackers")) || [];

  /* GET CURRENT TRACKER ID */

  const currentTrackerId =
  parseInt(localStorage.getItem("currentTrackerId"));

  /* FIND CURRENT TRACKER */

  const currentTracker =
  allTrackers.find(tracker =>
    tracker.id === currentTrackerId
  );

  /* SAFETY CHECK */

  if(!currentTracker) {

    alert("Tracker not found");

    return;

  }

  /* ELEMENTS */

  const trackerGrid =
  document.querySelector(".tracker-grid");

  const keyContainer =
  document.querySelector(".key-container");

  const trackerTitle =
  document.querySelector(".tracker-title");

  const notesInput =
  document.querySelector(".tracker-notes");

  /* TITLE */

  trackerTitle.textContent =
  currentTracker.name;

  /* LOAD NOTES */

  notesInput.value =
  currentTracker.notes || "";

  /* SAVE NOTES */

  notesInput.addEventListener("input", () => {

    currentTracker.notes =
    notesInput.value;

    localStorage.setItem(
      "trackers",
      JSON.stringify(allTrackers)
    );

  });

  /* SELECT COLOR */

  let selectedColor = "";

  /* SAVED DAYS */

  const savedDays =
  currentTracker.savedDays || {};

  /* CREATE GRID */

  for(let i = 1; i <= currentTracker.days; i++) {

    const dayBox =
    document.createElement("div");

    dayBox.classList.add("day-box");

    dayBox.dataset.day = i;

    /* LOAD SAVED COLORS */

    if(savedDays[i]) {

      dayBox.style.background =
      savedDays[i];

    }

    trackerGrid.appendChild(dayBox);

  }

  /* CREATE COLOR KEY */

  currentTracker.colors.forEach(item => {

    const keyItem =
    document.createElement("div");

    keyItem.classList.add("key-item");

    keyItem.innerHTML = `

      <div
        class="key-color"
        style="background:${item.color}"
      ></div>

      <span>${item.meaning}</span>

    `;

    keyItem.addEventListener("click", () => {

      selectedColor = item.color;

    });

    keyContainer.appendChild(keyItem);

  });

  /* COLOR DAYS */

  const dayBoxes =
  document.querySelectorAll(".day-box");

  dayBoxes.forEach(box => {

    box.addEventListener("click", () => {

      if(selectedColor !== "") {

        box.style.background =
        selectedColor;

        currentTracker.savedDays[
          box.dataset.day
        ] = selectedColor;

        localStorage.setItem(
          "trackers",
          JSON.stringify(allTrackers)
        );

      }

    });

  });

});