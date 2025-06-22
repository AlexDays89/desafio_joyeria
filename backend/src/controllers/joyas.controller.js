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
        res.status(500).json({ error: "Error al obtener los datos"});
    }
};

export const getFiltroJoyas = async (req, res) => {
    try {
        const { categoria, metal, precio } = req.query;
        const query = `SELECT * FROM inventario WHERE categoria = $1 AND metal = $2 AND precio BETWEEN $3 AND $4`;
        const { rows } = await pool.query(query, [categoria, metal, precio]);
        const dataWithHATEOAS = await HATEOAS(rows, req);
        res.json(dataWithHATEOAS);
    }   catch (error) {
        res.status(500).json({ error: "Error al obtener los datos"});
    }
};