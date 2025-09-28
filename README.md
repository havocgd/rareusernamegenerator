# Rare Roblox Username Generator

Find the rarest available usernames on Roblox—short, alphanumerical, and signup-ready.

## 🚀 Live Demo
Try it now: [https://havocgd.github.io/rareusernamegenerator](https://havocgd.github.io/rareusernamegenerator)

## 🔧 Features
- Infinite retry loop until a valid username is found
- Live feedback: shows each username being checked
- Stop button to cancel search instantly
- Backend caching to skip known invalid usernames (shared across users)
- Fast validation using Roblox’s official API

## 📦 Files
- `index.html` — main UI
- `script.js` — logic for generation, validation, and control
- `style.css` — optional styling
- `rejected.json` — backend cache (if using server)
- `valid.txt` — logs successful usernames (if using server)

## 🧠 How It Works
1. Generates a random alphanumerical username
2. Sends a POST request to Roblox’s validation API
3. If valid → displays it
4. If invalid → retries with a new one
5. Skips usernames already rejected by other users (via shared cache)

## ⚠️ Notes
- This tool does not create accounts or log in to Roblox
- It uses Roblox’s public API for validation only
- Rate limits may apply if used aggressively

## 🛠️ Built With
- HTML, CSS, JavaScript
- GitHub Pages for hosting
- Optional: Node.js backend for shared caching

## 📄 License
MIT — free to use, fork, and remix

## 🙌 Credits
Created by [Havoc](https://github.com/havocgd)  
Inspired by the need for clean, rare usernames that actually work

