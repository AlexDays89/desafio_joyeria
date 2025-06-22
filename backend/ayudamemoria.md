
#RUTAS

routes/posts.routes.js
import express from "express";
import { getPosts, createPost } from "../controllers/posts.controller.js";

const router = express.Router(); // crea un mini-router Express

router.get("/", getPosts);         // GET /posts
router.post("/", createPost);      // POST /posts

export default router;

#CONTROLADORES

// controllers/posts.controller.js
import db from "../db/config.js";

export const getPosts = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener posts" });
  }
};

export const createPost = async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  try {
    const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)";
    await db.query(query, [titulo, img, descripcion]);
    res.status(201).json({ message: "Post creado" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear post" });
  }
};
