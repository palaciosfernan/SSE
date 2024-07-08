import connection from '../Utils/DataDase';

interface Comentario {
    id?: number;
    comentario: string;
    fecha: string;
    autoId: number;
}

export const createComentario = async (coment: Comentario): Promise<void> => {
    const query = 'INSERT INTO comentario (comentario, fecha, autoId) VALUES (?, ?, ?)';
    const { comentario, fecha, autoId } = coment;
    await connection.execute(query, [comentario, fecha, autoId]);
};

export const obtenerComentariosPorAuto = async (autoId: number): Promise<Comentario[]> => {
    const [rows] = await connection.execute('SELECT * FROM comentario WHERE autoId = ?', [autoId]);
    return rows as Comentario[];
};
