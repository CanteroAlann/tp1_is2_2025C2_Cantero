import { Router } from "express";
import {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/Song";
const router = Router();

// Crear canción
router.post("/", async (req, res) => {
  const song = await create(req.body);
  res.status(201).json(song);
});

// Listar canciones
router.get("/", async (req, res) => {
  const songs = await find();
  res.json(songs);
});

// Obtener canción por ID
router.get("/:id", async (req, res) => {
  const song = await findById(req.params.id);
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json(song);
});

// Actualizar canción
router.put("/:id", async (req, res) => {
  const song = await findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json(song);
});

// Eliminar canción
router.delete("/:id", async (req, res) => {
  const song = await findByIdAndDelete(req.params.id);
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json({ message: "Song deleted" });
});

export default router;
