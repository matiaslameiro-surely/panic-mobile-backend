# surely-api

Back end para la app móvil de Surely

## Descripción

API REST desarrollada con Express.js que recibe e imprime en consola datos de dispositivos móviles, incluyendo información de ubicación, batería, estado de red, información general del dispositivo y permisos.

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd surely-api
```

2. Instala las dependencias:
```bash
npm install
```

## Uso

### Desarrollo local

Inicia el servidor:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Con Docker

Construye y ejecuta el contenedor:
```bash
docker-compose up
```

O manualmente:
```bash
docker build -t surely-api .
docker run -p 3000:3000 surely-api
```

## API Endpoints

### POST `/location`
Recibe datos de ubicación del dispositivo móvil.

**Request Body:**
```json
{
  "latitude": 19.4326,
  "longitude": -99.1332,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### POST `/battery`
Recibe información sobre el estado de la batería.

**Request Body:**
```json
{
  "level": 85,
  "isCharging": true,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### POST `/network`
Recibe información sobre la conexión de red.

**Request Body:**
```json
{
  "type": "wifi",
  "isConnected": true,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### POST `/general`
Recibe información general del dispositivo.

**Request Body:**
```json
{
  "deviceId": "unique-device-id",
  "model": "iPhone 12",
  "os": "iOS 15.0"
}
```

### POST `/permissions`
Recibe información sobre los permisos de la aplicación.

**Request Body:**
```json
{
  "location": true,
  "camera": false,
  "contacts": true
}
```

Todos los endpoints devuelven un código de estado `200` cuando se recibe correctamente la información.

## Configuración

### Variables de Entorno

- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 3000)

Ejemplo:
```bash
PORT=8080 npm start
```

## Estructura del Proyecto

```
surely-api/
├── server.js          # Servidor Express principal
├── package.json       # Dependencias y scripts
├── Dockerfile         # Configuración Docker
├── docker-compose.yml # Orquestación Docker
└── README.md          # Documentación
```

## Tecnologías Utilizadas

- **Express.js** - Framework web para Node.js
- **Node.js 20** - Entorno de ejecución
- **Docker** - Containerización
- **ES Modules** - Sistema de módulos moderno

## Logging

El servidor registra cada petición recibida en la consola con:
- Emoji identificador del tipo de dato
- Número de llamada consecutiva
- Datos recibidos en formato JSON

Ejemplo de salida:
```
📍 Ubicación recibida (llamada #1): {
  "latitude": 19.4326,
  "longitude": -99.1332
}
```
