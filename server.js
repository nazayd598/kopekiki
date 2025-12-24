import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// STATE
let lastDogImage = null;

app.use(express.static("public"));
app.use(express.json());

app.get("/api/dog", async (req, res) => {
  // Eğer state varsa onu dön
  if (lastDogImage) {
    return res.json({ image: lastDogImage, cached: true });
  }

  // Yoksa yeni çek
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();

  lastDogImage = data.message;

  res.json({ image: lastDogImage, cached: false });
});

app.post("/api/dog", async (req, res) => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();

  lastDogImage = data.message;

  res.json({ image: lastDogImage });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
