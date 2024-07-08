import express from 'express';
import { createComentario, obtenerComentariosPorAuto } from '../models/ComentarioModels';
import { createAuto, obtenerAutos } from '../models/AutosModels';

const router = express.Router();

router.post('/Autos/create', async (req, res) => {
  try {
    await createAuto(req.body);
    const autos = await obtenerAutos();
    res.status(201).json(autos);
  } catch (error) {
    console.error('Error al crear auto:', error);
    res.status(500).json({ error: 'Error al crear auto' });
  }
});

router.get('/autos', async (req, res) => {
  try {
    const autos = await obtenerAutos();
    res.json(autos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autos' });
  }
});


router.post('/Comentario/create', async (req, res) => {
  try {
    const comentario = await createComentario(req.body);
    res.status(201).json(comentario);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al crear comentario' });
  }
});

router.get('/Comentario/sse/:autoId', async (req, res) => {
  try {
    const autoId = parseInt(req.params.autoId, 10);
    if (isNaN(autoId)) {
      return res.status(400).json({ error: 'El ID del auto debe ser un número válido' });
    }
    const comentarios = await obtenerComentariosPorAuto(autoId);
    res.json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

router.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write('data: Conexión establecida\n\n');

  req.on('close', () => {
    console.log('Cliente desconectado');
    res.end();
  });
});

export default router;
