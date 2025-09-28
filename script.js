document.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById("result");
  const stopBtn = document.getElementById("stop");
  const generateBtn = document.querySelector("button[onclick='generateUsername()']");

  let searching = false;
  let activeRequests = 0;

  function generateRandomUsername(length = 3) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  function updateStatus(text, color = "#ccc") {
    result.textContent = text;
    result.style.color = color;
  }

  async function generateUsername() {
    if (searching) return;
    searching = true;
    generateBtn.style.display = "none";
    stopBtn.style.display = "inline-block";
    updateStatus("🔍 Searching for rare usernames...");

    while (searching) {
      const batchSize = 100;
      const usernames = Array.from({ length: batchSize }, () => generateRandomUsername(3));
      const query = usernames.map(u => `u=${encodeURIComponent(u)}`).join("&");

      activeRequests++;
      try {
       const res = await fetch("https://rareproxy.havocgdash.workers.dev/batch", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ usernames })
});

        const data = await res.json();
        const available = data.filter(r => r.valid).map(r => r.username);

        if (available.length > 0) {
          updateStatus(`✅ Found: ${available.join(", ")}`, "#3f3");
          searching = false;
          generateBtn.style.display = "inline-block";
          stopBtn.style.display = "none";
          return;
        } else {
          updateStatus(`⏳ Checked ${batchSize * activeRequests} usernames... still searching`, "#999");
        }
      } catch (err) {
        updateStatus("⚠️ Error during batch request", "#f33");
        console.error("Batch error:", err);
        searching = false;
      }
      activeRequests--;
      await new Promise(resolve => setTimeout(resolve, 100)); // throttle loop
    }
  }

  window.generateUsername = generateUsername;

  window.stopUsernameSearch = () => {
    searching = false;
    generateBtn.style.display = "inline-block";
    stopBtn.style.display = "none";
    updateStatus("⛔ Search stopped.");
  };
});
