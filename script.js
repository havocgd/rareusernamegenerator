async function generateUsername() {
  const candidate = generateRandomUsername();
  const response = await fetch("https://your-backend.onrender.com/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: candidate,
      context: "Signup",
      birthday: "2009-11-26T13:00:00.000Z"
    })
  });
  const result = await response.json();
  if (result.isValid && result.code === 0) {
    document.getElementById("result").textContent = `✅ Available: ${candidate}`;
  } else {
    generateUsername(); // Try again
  }
}

function generateRandomUsername() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let name = "";
  for (let i = 0; i < 3; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}
