let selectedPage = "";

// Time travel confirmation handler
function navigateTo(targetPage) {
  const symbol = event.currentTarget;

  // If the symbol is locked, show the locked gate message
  if (symbol.classList.contains("locked")) {
    document.getElementById("locked-message").style.display = "flex";
    return;
  }

  // Otherwise, start confirmation
  selectedPage = targetPage;
  document.getElementById("confirmation-screen").style.display = "flex";
}

// Confirmation "Yes" — begin time travel animation
document.getElementById("confirm-yes").addEventListener("click", () => {
  document.getElementById("confirmation-screen").style.display = "none";

  const overlay = document.getElementById("time-travel-overlay");
  const progressBar = document.getElementById("progress-bar");
  const travelText = document.getElementById("travel-text");

  overlay.style.display = "flex";
  progressBar.style.width = "0%";
  travelText.textContent = "Traveling to the past...";

  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 100);

  setTimeout(() => {
    travelText.textContent = "Time Travel Complete!";
  }, 2000);

  setTimeout(() => {
    window.location.href = selectedPage;
  }, 2700);
});

// Confirmation "No" — cancel
document.getElementById("confirm-no").addEventListener("click", () => {
  document.getElementById("confirmation-screen").style.display = "none";
});

// Close locked gate message
document.getElementById("close-locked").addEventListener("click", () => {
  document.getElementById("locked-message").style.display = "none";
});

// Reset progress
document.getElementById("reset-progress").addEventListener("click", () => {
  localStorage.removeItem("unlockedTribes");
  localStorage.removeItem("unlockedColonial");
  location.reload();
});

// Pulse animation function
function pulseOnce(el) {
  el.classList.remove("pulse"); // reset
  void el.offsetWidth; // force reflow
  setTimeout(() => {
    el.classList.add("pulse");
  }, 100);
}

// Unlock gates and assign click handlers
window.addEventListener("DOMContentLoaded", () => {
  // Assign navigateTo() to all symbols with data-page
  document.querySelectorAll(".symbol[data-page]").forEach(symbol => {
    const targetPage = symbol.getAttribute("data-page");
    symbol.onclick = () => navigateTo(targetPage);
  });

  // Unlock TRIBES if Christianity visited
  if (localStorage.getItem("unlockedTribes") === "true") {
    const tribeSymbol = document.querySelector('[data-page="tribes.html"]');
    if (tribeSymbol) {
      tribeSymbol.classList.remove("locked");
      tribeSymbol.classList.add("unlocked");
      pulseOnce(tribeSymbol);
    }
  }

  // Unlock COLONIAL if Tribes visited
  if (localStorage.getItem("unlockedColonial") === "true") {
    const colonialSymbol = document.querySelector('[data-page="colonial.html"]');
    if (colonialSymbol) {
      colonialSymbol.classList.remove("locked");
      colonialSymbol.classList.add("unlocked");
      pulseOnce(colonialSymbol);
    }
  }
});


function resetExperience() {
  localStorage.clear(); // ✅ This clears introSeen + gate unlocks
  alert("Progress reset! Reload or re-enter to experience again.");
}
