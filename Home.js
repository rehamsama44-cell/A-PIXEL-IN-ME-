const createBtn = document.getElementById("create-btn");

createBtn.addEventListener("click", () => {

   
  window.location.href = "pages/create.html";
});

const colorButtons = document.querySelectorAll(".color-btn");

colorButtons.forEach(button => {

  button.addEventListener("click", () => {

    const selectedColor = button.dataset.color;

    document.body.style.background = selectedColor;

  });

});
const oldBtn =
document.getElementById("old-btn");

oldBtn.addEventListener("click", () => {

  const allTrackers =
  JSON.parse(localStorage.getItem("trackers")) || [];

  if(allTrackers.length > 0) {

    window.location.href =
    "./previous/previous.html";

  }

  else {

    alert("No saved trackers yet");

  }

});