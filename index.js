const pages = document.querySelectorAll(".page");

const feedBtn = document.getElementById("feedBtn");
const decideBtn = document.getElementById("decideBtn");
const savedBtn = document.getElementById("savedBtn");

const feedList = document.getElementById("feedList");
const savedList = document.getElementById("savedList");
const result = document.getElementById("result");

const places = [
  { name: "Johannesburg", desc: "City of gold" },
  { name: "Cape Town", desc: "Beaches and mountains" },
  { name: "Durban", desc: "Warm weather and ocean vibes" },
];

function showPage(pageId) {
  pages.forEach((page) => page.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

feedBtn.onclick = () => showPage("feed");
decideBtn.onclick = () => showPage("decide");
savedBtn.onclick = () => {
  showPage("saved");
  loadSaved();
};

function loadFeed() {
  feedList.innerHTML = "";
  places.forEach((place) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${place.name}</h3>
      <p>${place.desc}</p>
      <button onclick="savePlace('${place.name}')">Save</button>
    `;
    feedList.appendChild(div);
  });
}

document.getElementById("decideMe").onclick = () => {
  const random = places[Math.floor(Math.random() * places.length)];
  result.textContent = `You should go to ${random.name}!`;
};

function savePlace(name) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  if (!saved.includes(name)) {
    saved.push(name);
    localStorage.setItem("saved", JSON.stringify(saved));
    alert("Saved!");
  }
}

function loadSaved() {
  savedList.innerHTML = "";
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved.forEach((place) => {
    const li = document.createElement("li");
    li.textContent = place;
    savedList.appendChild(li);
  });
}

loadFeed();
