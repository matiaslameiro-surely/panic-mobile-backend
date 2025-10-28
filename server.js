import express from "express";

const app = express();
app.use(express.json());

// Contador de llamadas
const counter = {
  location: 0,
  battery: 0,
  network: 0,
  general: 0,
  permissions: 0
}

app.post("/location", (req, res) => {
  counter.location++;
  console.log(`📍 Ubicación recibida (llamada #${counter.location}):`, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});
app.post("/battery", (req, res) => {
  counter.battery++;
  console.log(`🔋 Batería recibida (llamada #${counter.battery}):`, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});
app.post("/network", (req, res) => {
  counter.network++;
  console.log(`📶 Red recibida (llamada #${counter.network}):`, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});
app.post("/general", (req, res) => {
  counter.general++;
  console.log(`📲 General recibida (llamada #${counter.general}):`, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});
app.post("/permissions", (req, res) => {
  counter.permissions++;
  console.log(`🔒 Permisos recibida (llamada #${counter.permissions}):`, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
