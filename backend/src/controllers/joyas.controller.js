import pool from "../../db/config.js";

export const getJoyas = async (req, res) => {
    try {
        const { joyas } = await pool.query("SELECT * FROM inventario")
        res.json(joyas);
    }   catch (error) {
        res.status(500).json({ error: "Error al obtener los datos"});
    }
};