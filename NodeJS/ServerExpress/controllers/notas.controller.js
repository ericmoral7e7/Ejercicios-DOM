import * as notasService from '../services/notas.service.js';

export function getAll(req, res) { res.json(notasService.getAll()); }

export function getById(req, res) {
    const notasStudent = notasService.getById(req.params.id);
    if (!notasStudent) return res.status(404).json({ message: "Estudiant no trobat" });
    res.json(notasStudent);
}

export function create(req, res) {
    const result = notasService.create(req.body);
    if (result.error) {
        const status = result.status || 400;
        return res.status(status).json({ message: result.error });
    }
    res.status(201).json({ message: "Created", student: result.data });
}

export function update(req, res) {
    const updated = notasService.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Registre de nota no trobada" });
    res.json(updated);
}

export function remove(req, res) {
    const deleted = notasService.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Not Found" });
    res.sendStatus(204);
}