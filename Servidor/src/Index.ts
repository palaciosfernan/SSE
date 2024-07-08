import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import WebSocket from 'ws';
import router from './Routes/routes';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);

const server = createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (data) => {
    try {
      const dataJson = JSON.parse(data.toString());

      // Aquí irían las acciones del WebSocket

    } catch (error) {
      console.error('Error al analizar los datos recibidos:', error);
      ws.send(JSON.stringify({ error: 'Datos no válidos' }));
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
