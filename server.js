const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

let data = { keys: [] };

if (fs.existsSync("./database.json")) {
  data = JSON.parse(fs.readFileSync("./database.json"));
}

function save() {
  fs.writeFileSync("./database.json", JSON.stringify(data, null, 2));
}

function generateKey() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

app.get("/", (req, res) => {
  res.send(`
    <h2>GET KEY SYSTEM</h2>
    <form action="/getkey" method="post">
      <button type="submit">Get Key</button>
    </form>
  `);
});

app.post("/getkey", (req, res) => {
  const key = generateKey();
  data.keys.push({ code: key, used: false, userID: null });
  save();
  res.send(`<h3>Key của bạn: ${key}</h3>`);
});

app.listen(3000, () => {
  console.log("Web running on port 3000");
});
