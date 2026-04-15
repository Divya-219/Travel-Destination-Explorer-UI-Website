const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");

let destinations = [];

fetch("data/destinations.json")
  .then(res => res.json())
  .then(data => {
    destinations = data;
    renderCards(destinations);
  })
  .catch(err => {
    console.error("Error:", err);
    container.innerHTML = "<p>Failed to load data</p>";
  });


function renderCards(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No destinations found</p>";
    return;
  }

  list.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      <div class="card-content">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button>View</button>
      </div>
    `;

    container.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = destinations.filter(place =>
    place.name.toLowerCase().includes(value) ||
    place.category.toLowerCase().includes(value) ||
    place.description.toLowerCase().includes(value)
  );

  renderCards(filtered);
});