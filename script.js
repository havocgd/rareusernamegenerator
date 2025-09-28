let stopSearch = false;

function generateRandomUsername(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function validateUsername(username) {
  try {
    const response = await fetch("https://rareproxy.havocgdash.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const result = await response.json();
    return result.valid;
  } catch (err) {
    console.error("Validation error:", err);
    return false;
  }
}

async function generateUsername() {
  stopSearch = false;
  document.getElementById("result").textContent = "🔍 Searching...";
  document.getElementById("stop").style.display = "inline";

  let length = 3;

  while (!stopSearch) {
    const candidate = generateRandomUsername(length);
    document.getElementById("result").textContent = `Checking: ${candidate}...`;

    const isValid = await validateUsername(candidate);
    if (stopSearch) break;

    if (isValid) {
      document.getElementById("result").textContent = `✅ Available: ${candidate}`;
      document.getElementById("stop").style.display = "none";
      return;
    } else {
      document.getElementById("result").textContent = `❌ ${candidate} is taken`;
    }

    length = length < 10 ? length : length + 1;
  }

  document.getElementById("result").textContent = "⛔ Search stopped.";
  document.getElementById("stop").style.display = "none";
}

function stopUsernameSearch() {
  stopSearch = true;
}
