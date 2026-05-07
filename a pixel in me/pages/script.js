document.addEventListener("DOMContentLoaded", () => {

  const colorsContainer = document.querySelector(".colors-container");

  const addColorBtn =
  document.getElementById("add-color-btn");

  const createTrackerBtn =
  document.getElementById("create-tracker-btn");

  const trackerColors = [];

  /* CREATE COLOR PICKER */

  function createColorPicker() {

    const colorRow =
    document.createElement("div");

    colorRow.classList.add("color-row");

    /* COLOR INPUT (HIDDEN) */

    const hiddenInput =
    document.createElement("input");

    hiddenInput.type = "color";
    hiddenInput.classList.add("hidden-color");
    hiddenInput.value = "#ffffff";

    /* COLOR BOX */

    const colorBox =
    document.createElement("div");

    colorBox.classList.add("color-box");
    colorBox.style.background = "#ffffff";

    /* IMPORTANT FIX (click only on box) */

    colorBox.addEventListener("click", (e) => {

      e.stopPropagation();

      hiddenInput.click();

    });

    hiddenInput.addEventListener("input", () => {

      colorBox.style.background =
      hiddenInput.value;

    });

    /* MEANING INPUT */

    const meaningInput =
document.createElement("input");

meaningInput.type = "text";
meaningInput.placeholder = "Color Meaning:";
meaningInput.classList.add("meaning-input");

/* IMPORTANT FIX */

meaningInput.addEventListener("click", (e) => {
  e.stopPropagation();
});
    /* APPEND */

    colorRow.appendChild(hiddenInput);
    colorRow.appendChild(colorBox);
    colorRow.appendChild(meaningInput);

    colorsContainer.appendChild(colorRow);

  }

  /* ADD COLOR BUTTON */

  addColorBtn.addEventListener(
    "click",
    createColorPicker
  );

  /* DEFAULT ROW */

  createColorPicker();

  /* CREATE TRACKER */

  createTrackerBtn.addEventListener("click", () => {

    const trackerName =
    document.getElementById("tracker-name").value;

    const trackerDays =
    document.getElementById("tracker-days").value;

    trackerColors.length = 0;

    document.querySelectorAll(".color-row")
    .forEach(row => {

      const color =
      row.querySelector(".hidden-color").value;

      const meaning =
      row.querySelector(".meaning-input").value;

      trackerColors.push({
        color,
        meaning
      });

    });

    const newTracker = {

      id: Date.now(),

      name: trackerName,

      days: trackerDays,

      colors: [...trackerColors],

      savedDays: {},

      notes: ""

    };

    const allTrackers =
    JSON.parse(localStorage.getItem("trackers")) || [];

    allTrackers.push(newTracker);

    localStorage.setItem(
      "trackers",
      JSON.stringify(allTrackers)
    );

    localStorage.setItem(
      "currentTrackerId",
      newTracker.id
    );

    window.location.href =
    "../tracker/Tracker.html";

  });

});