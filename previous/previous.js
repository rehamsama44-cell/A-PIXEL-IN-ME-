document.addEventListener("DOMContentLoaded", () => {

  const trackersContainer =
  document.querySelector(".trackers-container");

  const allTrackers =
  JSON.parse(localStorage.getItem("trackers")) || [];

  allTrackers.forEach(tracker => {

    const trackerCard =
    document.createElement("div");

    trackerCard.classList.add("tracker-card");

    trackerCard.innerHTML = `

      <h2>${tracker.name}</h2>

      <p>${tracker.days} days</p>

      <button class="open-btn">
        Open
      </button>

      <button class="delete-btn">
        Delete
      </button>

    `;

    /* OPEN TRACKER */

    trackerCard
    .querySelector(".open-btn")
    .addEventListener("click", () => {

      localStorage.setItem(
        "currentTrackerId",
        tracker.id
      );

      window.location.href =
      "../tracker/Tracker.html";

    });

    /* DELETE TRACKER */

    trackerCard
    .querySelector(".delete-btn")
    .addEventListener("click", () => {

      const updatedTrackers =
      allTrackers.filter(item =>
        item.id !== tracker.id
      );

      localStorage.setItem(
        "trackers",
        JSON.stringify(updatedTrackers)
      );

      location.reload();

    });

    trackersContainer.appendChild(trackerCard);

  });

});