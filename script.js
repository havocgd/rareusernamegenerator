async function generateBatch(count = 1000) {
  const usernames = Array.from({ length: count }, () => generateRandomUsername(3));

  const responses = await Promise.allSettled(
    usernames.map(username =>
      fetch("https://rareproxy.havocgdash.workers.dev/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: [username] })
      }).then(res => res.json())
    )
  );

  const results = responses
    .filter(r => r.status === "fulfilled")
    .flatMap(r => r.value)
    .filter(r => r.valid);

  console.log(`✅ ${results.length} available usernames`);
  console.log(results.map(r => r.username));
}

function generateRandomUsername(length = 3) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

generateBatch(1000);
