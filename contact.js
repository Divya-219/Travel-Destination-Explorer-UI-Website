document.addEventListener("DOMContentLoaded", () => {

  console.log("JS LOADED");

  // ================= ELEMENTS =================
  const form = document.getElementById("contactForm");
  const weatherMini = document.getElementById("weatherMini");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.querySelector(".nav-links");

  // ================= EMAIL VALIDATION =================
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ================= CONTACT FORM =================
  if (form) {

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      console.log("FORM SUBMIT FIRED");

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      console.log("VALUES:", name, email, message);

      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return;
      }

      alert("Message sent ✅");
      form.reset();
    });

    form.reset();
  }

  // ================= WEATHER =================
  function getWeather(lat, lon, name) {

    if (!weatherMini) return;

    weatherMini.innerText = "Loading... 🌤";

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {

        if (!data.current_weather) {
          weatherMini.innerText = "Weather not available ❌";
          return;
        }

        weatherMini.innerText =
          `${name} 🌤 ${data.current_weather.temperature}°C`;
      })
      .catch(() => {
        weatherMini.innerText = "Weather failed ❌";
      });
  }

  // ================= HAMBURGER MENU =================
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

  // ================= CALL WEATHER =================
  if (weatherMini) {
    getWeather(43.65, -79.38, "Toronto");
  }

});