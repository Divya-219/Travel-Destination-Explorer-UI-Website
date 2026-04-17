// ================= NAVIGATION =================
function goToExplore(type) {
  window.location.href = `explore.html?type=${type}`;
}

// ================= DATA =================
const destinations = [
  { name: "Paris", category: "city", description: "City of lights", image: "images/card1.jpg", lat: 48.85, lon: 2.35 },
  { name: "Bali", category: "beach", description: "Tropical paradise", image: "images/card2.jpg", lat: -8.34, lon: 115.09 },
  { name: "New York", category: "city", description: "The big city", image: "images/card3.jpg", lat: 40.71, lon: -74 },
  { name: "Tokyo", category: "city", description: "Modern culture", image: "images/card4.jpg", lat: 35.68, lon: 139.77 },
  { name: "Dubai", category: "city", description: "Luxury city", image: "images/card5.jpg", lat: 25.2, lon: 55.27 },
  { name: "Switzerland", category: "mountain", description: "Beautiful mountains", image: "images/card6.jpg", lat: 46.82, lon: 8.23 },
  { name: "Maldives", category: "beach", description: "Crystal clear water", image: "images/card7.jpg", lat: 3.2, lon: 73.2 },
  { name: "Banff National Park", category: "park", description: "Rocky mountains", image: "images/card8.jpg", lat: 51.18, lon: -115.57 }
];

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENTS =====
  const featuredContainer = document.getElementById("featuredContainer");
  const weatherMini = document.getElementById("weatherMini");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filters button");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.querySelector(".nav-links");

  let filteredData = [...destinations];

  // ================= WEATHER =================
  function getWeather(lat, lon, name) {
    if (!weatherMini) return;

    weatherMini.innerText = "Loading... 🌤";

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        if (!data.current_weather) {
          weatherMini.innerText = "Weather not available";
          return;
        }

        weatherMini.innerText =
          `${name} 🌤 ${data.current_weather.temperature}°C`;
      })
      .catch(() => {
        weatherMini.innerText = "Weather failed";
      });
  }

  // ================= RENDER =================
  function render(list) {
    if (!featuredContainer) return;

    featuredContainer.innerHTML = "";

    list.slice(0, 4).forEach(place => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${place.image}" alt="${place.name}">
        <span class="heart">♡</span>

        <div class="card-content">
          <div class="card-top">
            <h3>${place.name}</h3>
            <span class="rating">⭐ 4.5</span>
          </div>

          <p>${place.description}</p>

          <div class="card-bottom">
            <button class="view-btn" onclick="goToExplore('${place.category}')">View</button>
          </div>
        </div>
      `;

      // heart toggle
      const heart = card.querySelector(".heart");
      heart.addEventListener("click", () => {
        heart.classList.toggle("liked");
        heart.textContent = heart.classList.contains("liked") ? "❤️" : "♡";
      });

      featuredContainer.appendChild(card);
    });
  }

  // ================= FILTER =================
  function applyFilters() {
    let data = [...destinations];

    const searchValue = searchInput?.value.toLowerCase().trim();
    const activeBtn = document.querySelector(".filters button.active");
    const type = activeBtn?.dataset.type || "all";

    if (type !== "all") {
      data = data.filter(d => d.category === type);
    }

    if (searchValue) {
      data = data.filter(d =>
        d.name.toLowerCase().includes(searchValue)
      );
    }

    filteredData = data;
    render(data);
  }

  // ================= EVENTS =================
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", applyFilters);

  // ================= HAMBURGER =================
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  // ================= INIT LOAD =================
  render(destinations);
  getWeather(43.65, -79.38, "Toronto");

});