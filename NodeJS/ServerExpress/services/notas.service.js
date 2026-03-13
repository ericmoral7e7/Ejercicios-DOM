import { incrementarId, nextId, notas } from '../data/notas.js';
import { students } from '../data/students.js';

// TODO
function validateNota(obj) {
    if (!obj || typeof obj !== "object") return "Body inválido";
    if (!obj.studentId || !obj.modulo || !obj.nota) return "Faltan campos, la petición debe contener: id, studentId, modulo, nota";
    return null;
}

// const existsId = (id) => notas.some(n => n.id === id);

const existsStudent = (id) => students.some(s => s.id === id);

export function getAll() { return notas; }

export function getById(id) { return notas.filter(n => n.studentId === id); }



export function create(notaNew) {
    const validationMsg = validateNota(notaNew);
    if (validationMsg) return { error: validationMsg };

    if (!existsStudent(notaNew.studentId)) return { error: "L'student no existeix", status: 409 };

    let notaCreada = { id: nextId, studentId: notaNew.studentId, modulo: notaNew.modulo, nota: notaNew.nota }

    notas.push(notaCreada);

    incrementarId()

    return { data: notaCreada };
}

export function update(id, payload) {
    const idx = notas.findIndex(n => n.id === id);
    if (idx === -1) return null;
    if (payload && typeof payload === "object") {
        if (payload.nota !== undefined) notas[idx].nota = payload.nota;
    }
    return notas[idx];
}

export function remove(id) {
    const before = notas.length;
    const filtered = notas.filter(n => n.id !== id);
    if (filtered.length === before) return false;
    notas.length = 0;
    notas.push(...filtered);
    return true;
}