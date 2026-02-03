import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import { timeStamp } from 'node:console'

const app = express()

const server = createServer(app)

app.use(cors({
  origin: '*',
  credential: true
}))

app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true
})

// Contador de llamadas
const counter = {
  location: 0,
  battery: 0,
  network: 0,
  general: 0,
  permissions: 0,
  statusAlert: 0,
  monitoringStart: 0
}

let code = null
let monitoringActiveUsers = new Set()

app.post('/location', (req, res) => {
  counter.location++
  console.log(`📍 Ubicación recibida (llamada #${counter.location}):`, JSON.stringify(req.body, null, 2))
  res.sendStatus(200)
})
app.post('/battery', (req, res) => {
  counter.battery++
  console.log(`🔋 Batería recibida (llamada #${counter.battery}):`, JSON.stringify(req.body, null, 2))
  res.sendStatus(200)
})
app.post('/network', (req, res) => {
  counter.network++
  console.log(`📶 Red recibida (llamada #${counter.network}):`, JSON.stringify(req.body, null, 2))
  res.sendStatus(200)
})
app.post('/general', (req, res) => {
  counter.general++
  console.log(`📲 General recibida (llamada #${counter.general}):`, JSON.stringify(req.body, null, 2))
  res.sendStatus(200)
})
app.post('/permissions', (req, res) => {
  counter.permissions++
  console.log(`🔒 Permisos recibida (llamada #${counter.permissions}):`, JSON.stringify(req.body, null, 2))
  res.sendStatus(200)
})

app.post('/auth/phone-number', (req, res) => {
  const { phoneNumber } = req.body
  const invalidPhoneNumber = '+54 1133445566'
  if (phoneNumber === invalidPhoneNumber) {
    res.status(400).json({ message: 'El número de teléfono no es válido' })
    console.log(`❌ Número de teléfono no válido:`, phoneNumber)
    return
  }
  console.log(`✅ Número de teléfono válido:`, phoneNumber)
  res.status(200).json({
    phoneNumber,
    message: 'El número de teléfono es válido',
  })
})

app.post('/auth/verification-code', (req, res) => {
  const { phoneNumber, verificationCode } = req.body
  const invalidVerificationCode = '123456'
  if (verificationCode === invalidVerificationCode) {
    res.status(400).json({ message: 'El código de verificación no es válido' })
    console.log(`❌ Código de verificación no válido:`, verificationCode)
    return
  }
  console.log(`✅ Código de verificación válido:`, verificationCode)
  res.status(200).json({
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
    userData: {
      dni: '12345678',
      fullName: 'Juan Perez',
      email: 'juanperez@gmail.com',
    },
  })
})

app.post('/auth/confirm-user-data', (req, res) => {
  const { userData } = req.body
  if (userData.email === 'juanperez1@gmail.com') {
    res.status(400).json({ message: 'El email no es válido' })
    console.log(`❌ Email no válido:`, userData.email)
    return
  }
  console.log(`✅ Email válido:`, userData.email)
  res.status(200).json({
    userData,
  })
})

app.post('/auth/modify-user-data', (req, res) => {
  const { userData } = req.body
  console.log(`✅ Email modificado:`, userData.email)
  res.status(200).json({
    userData,
  })
})

app.put('/config/deactivation-code', (req, res) => {
  const { deactivationCode } = req.body
  console.log(`✅ Código de desactivación:`, deactivationCode)
  res.status(200).json({
    deactivationCode,
  })
})

app.get('/notifications', (req, res) => {
  const notifications = [
    {
      id: 1,
      title: 'Bateria del dispositivo baja',
      description: 'La batería del dispositivo está baja',
      body: 'Cargue la batería del dispositivo para un mejor funcionamiento',
      date: new Date('2025-11-24T18:00:00Z').toISOString(),
      type: 'battery',
    },
    {
      id: 2,
      title: 'Conectividad',
      description: 'No se pudo registrar conectividad',
      body: 'Verifique la conexión de red del dispositivo',
      date: new Date('2025-11-24T18:00:00Z').toISOString(),
      type: 'network',
    },
    {
      id: 3,
      title: 'Ubicación',
      description: 'No se pudo registrar la ubicación',
      body: 'Verifique que el dispositivo tenga permisos para acceder a la ubicación',
      date: new Date('2025-11-24T18:00:00Z').toISOString(),
      type: 'location',
    },
    {
      id: 4,
      title: 'Ubicación',
      description: 'No se pudo registrar la ubicación',
      body: 'Verifique que el dispositivo tenga permisos para acceder a la ubicación',
      date: new Date('2025-11-24T16:00:00Z').toISOString(),
      type: 'location',
    },
  ]
  console.log(`✅ Notificaciones:`)
  res.status(200).json({
    notifications,
  })
})

app.post('/panic-alert', (req, res) => {
  const { deactivationCode } = req.body
  code = deactivationCode
  console.log(`✅ Alerta activada, el codigo de desactivación es:`, deactivationCode)
  res.sendStatus(200)
})

app.post('/panic-alert/deactivate', (req, res) => {
  const { deactivationCode } = req.body
  if (code !== deactivationCode) {
    res.status(400).json({ message: 'El código de desactivación no es válido' })
    console.log(`❌ Código de desactivación no válido:`, deactivationCode)
    return
  }
  console.log(`✅ Código de desactivación válido:`, deactivationCode)
  res.sendStatus(200)
})

app.post('/monitoring/start', (req, res) => {
  const { userId } = req.body

  if (!userId) {
    res.status(400).json({ message: 'El ID de usuario es requerido' })
    console.log('ID de usuario no proporcionado')
    return
  }

  monitoringActiveUsers.add(userId)
  counter.monitorungStart++
  console.log(`Monitoreo iniciado para usuario: ${userId} (llamada # ${counter.monitoringStart})`)
  console.log(`Total de usuarios con monitoreo activo: ${monitoringActiveUsers.size}`)

  res.status(200).json({
    message: 'Monitoreo iniciado correctamente',
    userId,
    timeStamp: new Date().toISOString()
  })
})

io.on('connection', (socket) => {
  console.log(`🔗 Conexion establecida con ${socket.id} `)
  socket.on('status', (arg) => {
    console.log(`🚨 Status Alerta (llamada #${++counter.statusAlert}):`, arg)
  })
})



const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})
