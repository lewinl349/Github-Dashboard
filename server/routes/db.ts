import express from "express";
import { addRepo, addTODOEntry, getTODOEntries, deleteTODOEntry } from '../databaseHelper';
import type { TODOEntry, NoteEntry } from '../types';

export var router = express.Router();

router.get('/:name/:owner', async (req, res) => {
    try {
        // VALIDATE param
        // validate(req.params.repo);
        const data = req.params;
        const output: TODOEntry[] = await getTODOEntries(data.name, data.owner);
        res.json(output);

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send('Failed to fetch user data');
    }
})

router.post('/TODO/new', async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send('Failed to fetch user data');
    }
})