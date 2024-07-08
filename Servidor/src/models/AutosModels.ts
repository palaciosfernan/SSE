import connection from '../Utils/DataDase';

interface Auto {
  id?: number;
  marca: string;
  modelo: string;
  año: string;
  tipodecarroceria: string;
  color: string;
  kilometraje: number;
  precio: number;
  estado: string;
  cantidad: number;
  motor: string;
}

export const createAuto = async (auto: Auto): Promise<void> => {
  const query = 'INSERT INTO vehiculos (marca, modelo, año, tipodecarroceria, color, kilometraje, precio, estado, cantidad, motor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const { marca, modelo, año, tipodecarroceria, color, kilometraje, precio, estado, cantidad, motor } = auto;
  await connection.execute(query, [marca, modelo, año, tipodecarroceria, color, kilometraje, precio, estado, cantidad, motor]);
};

export const obtenerAutos = async (): Promise<Auto[]> => {
  const [rows] = await connection.execute('SELECT * FROM vehiculos');
  return rows as Auto[];
};
