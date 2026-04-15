const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const weatherMini = document.getElementById("weatherMini");


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

  list.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      <div class="card-content">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button class="view-btn">View Details</button>
      </div>
    `;

 
    card.querySelector(".view-btn").addEventListener("click", (e) => {
      e.stopPropagation(); // prevents card click conflict
      alert(`Destination: ${place.name}`);
    });

    container.appendChild(card);
  });
}


searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = destinations.filter(place =>
    place.name.toLowerCase().includes(value) ||
    place.category.toLowerCase().includes(value)
  );

  renderCards(filtered);

  
  if (filtered.length > 0) {
    const first = filtered[0];
    getWeather(first.lat, first.lon, first.name);
  }
});


function getWeather(lat, lon, name) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const temp = data.current_weather.temperature;

      weatherMini.innerText = `${name} 🌤 ${temp}°C`;
    })
    .catch(() => {
      weatherMini.innerText = "🌤 N/A";
    });
}




window.onload = () => {
  searchInput.value = "";
getWeather(43.65, -79.38, "Toronto");
};