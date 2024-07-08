import { Request, Response } from 'express';
import { createAuto, obtenerAutos } from '../models/AutosModels';

let clients: Response[] = [];

export const createrAutos = async (req: Request, res: Response) => {
    try {
        const { marca, modelo, año, tipodecarroceria, color, kilometraje, precio, estado, cantidad, motor } = req.query;

        // Verificar que todos los parámetros estén definidos
        if (!marca || !modelo || !año || !tipodecarroceria || !color || !kilometraje || !precio || !estado || !cantidad || !motor) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        await createAuto({ 
            marca: String(marca), 
            modelo: String(modelo), 
            año: String(año), 
            tipodecarroceria: String(tipodecarroceria), 
            color: String(color), 
            kilometraje: Number(kilometraje), 
            precio: Number(precio), 
            estado: String(estado), 
            cantidad: Number(cantidad), 
            motor: String(motor) 
        });
        
        const autosActualizados = await obtenerAutos();
        
        clients.forEach(client => client.write(`data: ${JSON.stringify(autosActualizados)}\n\n`));
        clients = [];
        
        res.status(201).json({ mensaje: 'Auto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear auto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getAutos = async (req: Request, res: Response) => {
    try {
        const autos = await obtenerAutos();
        res.status(200).json(autos); 
    } catch (error) {
        console.error('Error al obtener autos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
