import pool from "../../db/config.js";
import HATEOAS from "../helpers/hateoas.js";

export const getJoyas = async (req, res) => {
    try {
        const { limits = 3, page = 2, order_by = "stock_ASC" } = req.query;
        const limit = parseInt(limits);
        const pageParsed = parseInt(page);
        const [columna, orden] = order_by.split("_");
        const columnasExistentes = ["id", "nombre", "categoria", "metal", "precio", "stock"];
        const ordenValido = ["ASC", "DESC"];

        if (!columnasExistentes.includes(columna) || !ordenValido.includes(orden)) {
            return res.status(400).json({ error: "Columna no valida" });
        }
        const offset = (pageParsed - 1) * limit;
        const query = `SELECT * FROM inventario ORDER BY ${columna} ${orden} LIMIT $1 OFFSET $2`;
        const { rows } = await pool.query(query, [limit, offset]);
        const dataWithHATEOAS = await HATEOAS(rows, req);
        res.json(dataWithHATEOAS);
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos"});
    }
};

export const getFiltroJoyas = async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal} = req.query;
        if (!precio_min || !precio_max || !categoria || !metal) {
            return res.status(400).json({ error: "Faltan filtros requeridos" });
        }
        const valores = [precio_min, precio_max, categoria, metal];
        const query = `SELECT * FROM inventario WHERE precio >= $1 AND precio <= $2 AND categoria = $3 AND metal = $4`;
        const { rows } = await pool.query(query, valores);
        const dataWithHATEOAS = await HATEOAS(rows, req);
        res.json(dataWithHATEOAS);
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos"});
    }
};