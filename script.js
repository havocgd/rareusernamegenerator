// script.js

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

  if (!response.ok) {
    throw new Error("Failed to reach backend");
  }

  const result = await response.json();
  return result.isValid && result.code === 0;
}

// Try usernames starting from length 3 and increase until one is valid
async function generateUsername() {
  document.getElementById("result").textContent = "🔍 Searching for rare usernames...";
  let length = 3;
  let attempts = 0;

  while (length <= 10) {
    const candidate = generateRandomUsername(length);
    const isValid = await validateUsername(candidate);
    if (isValid) {
      document.getElementById("result").textContent = `✅ Available: ${candidate}`;
      return;
    }

    attempts++;
    if (attempts >= 100) {
      length++;
      attempts = 0;
    }
  }

  document.getElementById("result").textContent = "❌ Couldn't find a valid username. Try again.";
}
