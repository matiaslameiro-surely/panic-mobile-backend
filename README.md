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

### POST `/auth/phone-number`
Valida el número de teléfono del usuario.

**Request Body:**
```json
{
  "phoneNumber": "+54 1133445566"
}
```

**Response:**
- `200`: Número válido
  ```json
  {
    "phoneNumber": "+54 1133445566",
    "message": "El número de teléfono es válido"
  }
  ```
- `400`: Número inválido
  ```json
  {
    "message": "El número de teléfono no es válido"
  }
  ```

### POST `/auth/verification-code`
Valida el código de verificación enviado al teléfono.

**Request Body:**
```json
{
  "phoneNumber": "+54 1133445566",
  "verificationCode": "123456"
}
```

**Response:**
- `200`: Código válido
  ```json
  {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userData": {
      "dni": "12345678",
      "fullName": "Juan Perez",
      "email": "juanperez@gmail.com"
    }
  }
  ```
- `400`: Código inválido
  ```json
  {
    "message": "El código de verificación no es válido"
  }
  ```

### POST `/auth/confirm-user-data`
Confirma los datos del usuario después de la verificación.

**Request Body:**
```json
{
  "userData": {
    "dni": "12345678",
    "fullName": "Juan Perez",
    "email": "juanperez@gmail.com"
  }
}
```

**Response:**
- `200`: Datos confirmados
  ```json
  {
    "userData": {
      "dni": "12345678",
      "fullName": "Juan Perez",
      "email": "juanperez@gmail.com"
    }
  }
  ```
- `400`: Email inválido
  ```json
  {
    "message": "El email no es válido"
  }
  ```

### POST `/auth/modify-user-data`
Modifica los datos del usuario.

**Request Body:**
```json
{
  "userData": {
    "dni": "12345678",
    "fullName": "Juan Perez",
    "email": "juanperez@gmail.com"
  }
}
```

**Response:**
```json
{
  "userData": {
    "dni": "12345678",
    "fullName": "Juan Perez",
    "email": "juanperez@gmail.com"
  }
}
```

### PUT `/config/deactivation-code`
Actualiza el código de desactivación del dispositivo.

**Request Body:**
```json
{
  "deactivationCode": "1234"
}
```

**Response:**
```json
{
  "deactivationCode": "1234"
}
```

### PUT `/config/emergency-contact`
Actualiza el contacto de emergencia.

**Request Body:**
```json
{
  "emergencyContact": {
    "name": "María García",
    "phone": "+54 1199887766"
  }
}
```

**Response:**
```json
{
  "emergencyContact": {
    "name": "María García",
    "phone": "+54 1199887766"
  }
}
```

### GET `/notifications`
Obtiene la lista de notificaciones del usuario.

**Response:**
```json
{
  "notifications": [
    {
      "id": 1,
      "title": "Bateria del dispositivo baja",
      "description": "La batería del dispositivo está baja",
      "body": "Cargue la batería del dispositivo para un mejor funcionamiento",
      "date": "2025-11-24T18:00:00.000Z",
      "type": "battery"
    },
    {
      "id": 2,
      "title": "Conectividad",
      "description": "No se pudo registrar conectividad",
      "body": "Verifique la conexión de red del dispositivo",
      "date": "2025-11-24T18:00:00.000Z",
      "type": "network"
    }
  ]
}
```

### POST `/panic-alert`
Activa una alerta de pánico.

**Request Body:**
```json
{
  "deactivationCode": "1234"
}
```

**Response:**
- `200`: Alerta activada correctamente

### POST `/panic-alert/deactivate`
Desactiva una alerta de pánico usando el código de desactivación.

**Request Body:**
```json
{
  "deactivationCode": "1234"
}
```

**Response:**
- `200`: Alerta desactivada correctamente
- `400`: Código de desactivación inválido
  ```json
  {
    "message": "El código de desactivación no es válido"
  }
  ```

Todos los endpoints devuelven un código de estado `200` cuando se recibe correctamente la información.

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
- Número de llamada consecutiva
- Datos recibidos en formato JSON

Ejemplo de salida:
```
📍 Ubicación recibida (llamada #1): {
  "latitude": 19.4326,
  "longitude": -99.1332
}
```
