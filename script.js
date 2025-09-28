// script.js

let stopSearch = false;

// Generate a random alphanumerical username of given length
function generateRandomUsername(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let name = "";
  for (let i = 0; i < length; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}

// Validate the username using your Render backend
async function validateUsername(username) {
  const response = await fetch("https://roblox-username-validator.onrender.com/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      context: "Signup",
      birthday: "2009-11-26T13:00:00.000Z"
    })
  });

  if (!response.ok) return false;

  const result = await response.json();
  return result.isValid && result.code === 0;
}

// Start the infinite search loop
async function generateUsername() {
  stopSearch = false;
  document.getElementById("result").textContent = "🔍 Searching for rare usernames...";
  document.getElementById("stop").style.display = "inline";

  let length = 3;

  while (!stopSearch) {
    const candidate = generateRandomUsername(length);
    document.getElementById("result").textContent = `Trying: ${candidate}`;

    const isValid = await validateUsername(candidate);
    if (isValid) {
      document.getElementById("result").textContent = `✅ Available: ${candidate}`;
      document.getElementById("stop").style.display = "none";
      return;
    }

    length = length < 10 ? length : length + 1; // Expand length slowly if needed
    await new Promise(r => setTimeout(r, 100)); // Optional delay for UX
  }

  document.getElementById("result").textContent = "⛔ Search stopped.";
  document.getElementById("stop").style.display = "none";
}

// Stop the search loop
function stopUsernameSearch() {
  stopSearch = true;
}
