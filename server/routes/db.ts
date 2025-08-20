import express from "express";
import { addTODOEntry, getTODOEntries, deleteTODOEntry, completeTODO, editTODOEntry } from '../databaseHelper';
import type { TODOEntry, NoteEntry } from '../types';

export var router = express.Router();

router.get('/TODO/:owner/:name', async (req, res) => {
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
        const request = req.body;

        await addTODOEntry(request.name, request.owner, request.desc, request.due_date, request.label, request.order);
        res.json("Success!");

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send('Failed to fetch user data');
    }
})

router.post('/TODO/delete/:id', async (req, res) => {
    try {
        // VALIDATE param
        // validate(req.params.repo);
        const data = req.params;
        await deleteTODOEntry(Number.parseInt(data.id));

        res.json("Success!");

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send('Failed to fetch user data');
    }
})

router.post('/TODO/edit', async (req, res) => {
    try {
        const request = req.body;
        editTODOEntry(request.id, request.desc, request.due_date, request.label);

        res.json("Success!");
    } catch (error) {
        console.error(error);
        res.status(500)
        res.send('Failed to fetch user data');
    }
})

router.post('/TODO/complete', async (req, res) => {
    try {
        const request = req.body;
        completeTODO(request.id, request.complete);

        res.json("Success!");
    } catch (error) {
        console.error(error);
        res.status(500)
        res.send('Failed to fetch user data');
    }
})