import connection from "../Utils/DataDase";

interface Usuarios{
    id?: number,
    username: string,
    password: string,
    rol: string
}
export const createrUsuarios= async (usuario:Usuarios):Promise<void>=>{
    const query='INSERT INTO Usuarios(username,password,rol)VALUES(?,?,?)';
    const{username,password,rol}=usuario;
}
export const obtenerUsuarios=async ():Promise<Usuarios[]>=>{
    const[rows]=await connection.execute('SELECT * FROM Usuarios');
    return rows as Usuarios[];
}