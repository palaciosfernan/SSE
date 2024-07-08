import { Request, Response } from 'express';
import { createComentario, obtenerComentariosPorAuto } from '../models/ComentarioModels';

let commentClients: { [autoId: number]: Response[] } = {};

export const createComent = async (req: Request, res: Response) => {
    try {
        const { comentario, fecha, autoId } = req.body; // Usamos `req.body` en lugar de `req.query` para datos de POST
        await createComentario({ comentario, fecha, autoId: Number(autoId) });

        const comentariosActualizados = await obtenerComentariosPorAuto(Number(autoId));

        if (commentClients[Number(autoId)]) {
            commentClients[Number(autoId)].forEach(client => client.write(`data: ${JSON.stringify(comentariosActualizados)}\n\n`));
        }

        res.status(201).json({ mensaje: 'Comentario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getComentariosPorAutoSSE = (req: Request, res: Response) => {
    const { autoId } = req.params;
    const id = Number(autoId);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    if (!commentClients[id]) {
        commentClients[id] = [];
    }
    commentClients[id].push(res);

    req.on('close', () => {
        commentClients[id] = commentClients[id].filter(client => client !== res);
    });
};
