const output = document.getElementById("output");
const button = document.getElementById("generate");
const status = document.getElementById("status");

function generateRandomUsername(length = 3) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function updateStatus(text, color = "#ccc") {
  status.textContent = text;
  status.style.color = color;
}

function renderResults(usernames) {
  output.innerHTML = "";
  if (usernames.length === 0) {
    updateStatus("No rare usernames found 😢", "#f33");
    return;
  }

  updateStatus(`✅ Found ${usernames.length} rare usernames`, "#3f3");
  usernames.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    li.style.fontFamily = "monospace";
    output.appendChild(li);
  });
}

async function generateBatch(count = 1000) {
  button.disabled = true;
  updateStatus("🔍 Searching for rare usernames...");

  const usernames = Array.from({ length: count }, () => generateRandomUsername(3));
  const query = usernames.map(u => `u=${encodeURIComponent(u)}`).join("&");

  try {
    const res = await fetch(`https://rareproxy.havocgdash.workers.dev/batch?${query}`);
    const data = await res.json();
    const available = data.filter(r => r.valid).map(r => r.username);
    renderResults(available);
  } catch (err) {
    updateStatus("⚠️ Error fetching usernames", "#f33");
    console.error("Batch error:", err);
  }

  button.disabled = false;
}

button.onclick = () => generateBatch(1000);
