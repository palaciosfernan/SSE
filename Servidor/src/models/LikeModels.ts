import connection from "../Utils/DataDase";
interface Like{
    id?:number,
    like:string,
    fecha:string
}

export const crearLike = async (likes: Like): Promise<void> => {
    const query = 'INSERT INTO Likes(`like`, fecha) VALUES (?, ?)';
    const { like, fecha } = likes;

    try {
        await connection.execute(query, [like, fecha]);
    } catch (error) {
        console.error('Error al crear el like:', error);
        throw error; 
    }
};

export const obtenerLikes = async (): Promise<Like[]> => {
    const query = 'SELECT * FROM Likes';

    try {
        const [rows] = await connection.execute(query);
        return rows as Like[];
    } catch (error) {
        console.error('Error al obtener los likes:', error);
        throw error; 
    }
};

