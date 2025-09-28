let stopSearch = false;
const rejectedCache = new Set(JSON.parse(localStorage.getItem("rejectedUsernames") || "[]"));

function generateRandomUsername(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function validateUsername(username) {
  const response = await fetch("https://corsproxy.io/?https://auth.roblox.com/v1/usernames/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      context: "Signup",
      birthday: "2009-11-26T13:00:00.000Z"
    })
  });

  if (!response.ok) return false;
  const result = await response.json();
  return result.isValid && result.code === 0;
}

async function generateUsername() {
  stopSearch = false;
  document.getElementById("result").textContent = "🔍 Starting search...";
  document.getElementById("stop").style.display = "inline";

  let length = 3;

  while (!stopSearch) {
    const candidate = generateRandomUsername(length);
    if (rejectedCache.has(candidate)) continue;

    document.getElementById("result").textContent = `Checking: ${candidate}...`;
    const isValid = await validateUsername(candidate);
    if (stopSearch) break;

    if (isValid) {
      document.getElementById("result").textContent = `✅ Available: ${candidate}`;
      document.getElementById("stop").style.display = "none";
      return;
    } else {
      rejectedCache.add(candidate);
      localStorage.setItem("rejectedUsernames", JSON.stringify([...rejectedCache]));
      document.getElementById("result").textContent = `Checking: ${candidate} → ❌ Invalid`;
    }

    length = length < 10 ? length : length + 1;
  }

  document.getElementById("result").textContent = "⛔ Search stopped.";
  document.getElementById("stop").style.display = "none";
}

function stopUsernameSearch() {
  stopSearch = true;
}
