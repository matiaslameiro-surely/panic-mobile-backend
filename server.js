import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

app.use(express.json());

const io = new Server(server);

// Contador de llamadas
const counter = {
  location: 0,
  battery: 0,
  network: 0,
  general: 0,
  permissions: 0,
  statusAlert: 0
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


io.on('connection', (socket) => {
  console.log(`🔗 Conexion establecida con ${socket.id} `)
  socket.on("status", (arg) => {
    console.log(console.log(`🚨 Status Alerta (llamada #${++counter.statusAlert}):`, arg)); 
  });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
