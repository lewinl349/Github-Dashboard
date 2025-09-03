import sqlite3, { Database } from "sqlite3";
import type { TODOEntry, NoteEntry } from './types';

const filename: string = "main.db";
// Default option creates new file if it doesn't exist
const db: Database = new sqlite3.Database(filename);
const todoTable: string = "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, repo_name TEXT NOT NULL, repo_owner TEXT NOT NULL, description TEXT, due_date TEXT, completed INTEGER, label TEXT, list_order INTEGER);";
const notesTable: string = "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, list_order INTEGER);";

// Run a SQL command
const exec = async (db: Database, sql: string) => {
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) reject(err);
            resolve("Success!");
        });
    });
};

// Run a SQL command with parameters
const run = async (db: Database, sql: string, params: any[]) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) reject(err);
            resolve("Success!");
        });
    });
};

// Run a SQL query command
const fetchAll = async (db: Database, sql: string, params: any[]): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

/**
 * Initializes the tables if they don't already exist
 */
async function initTables() {
    await exec(db, todoTable);
    await exec(db, notesTable);
}

/**
 * Adds new TODO entry to the database
 * 
 * @param {string} repo_name - repo the task goes into
 * @param {string} repo_owner - repo the task goes into
 * @param {string} description - The description of the TODO task
 * @param {string} dueDate - When is the task due (YYYY-MM-DD)
 * @param {string} label - What kind of task is it?
 * @param {number} order - The order of the item to be displayed
 * 
 * @example 
 * addTODOEntry("Fix loading screen issue #20", "2025-09-10", "FIXME", 1);
 * addTODOEntry("Add loading screen animation", "2025-06-10", "TODO", 2);
 */
export async function addTODOEntry(repo_name: string, repo_owner: string, description: string, dueDate: string, label: string, order: number): Promise<void> {
    const sql: string = "INSERT INTO todo(repo_name, repo_owner, description, due_date, completed, label, list_order) VALUES(?, ?, ?, ?, ?, ?, ?)"

    // New tasks should be uncompleted (0 is false)
    await run(db, sql, [repo_name, repo_owner, description, dueDate, 0, label, order]);
}

/**
 * Edit a TODO entry in the database
 * 
 * @param {number} id - The id of the TODO entry
 * @param {string} description - The description of the TODO task
 * @param {string} dueDate - When is the task due (YYYY-MM-DD)
 * @param {string} label - What kind of task is it?
 */
export async function editTODOEntry(id: number, description: string, dueDate: string, label: string): Promise<void> {
    const sql = `UPDATE todo SET description = ?, due_date = ?, label = ? WHERE id = ?`;

    await run(db, sql, [description, dueDate, label, id]);

    console.log([description, dueDate, label, id]);
}

/**
 * Edit a TODO entry in the database
 * 
 * @param {number} id - The id of the TODO entry
 * @param {number} completed - If it is completed or not (0 false, 1 ture)
 */
export async function completeTODO(id: number, completed: number): Promise<void> {
    const sql = `UPDATE todo SET completed = ? WHERE id = ?`;

    await run(db, sql, [completed, id]);
}

/**
 * Get all TODO entries from a repository
 * 
 * @param {string} repo_name
 * @param {string} repo_owner - username of who owns the repo
 */
export async function getTODOEntries(repo_name: string, repo_owner: string): Promise<TODOEntry[]> {
    const sql: string = "SELECT * FROM todo WHERE repo_name = ? AND repo_owner = ?";
    const data: any[] = await fetchAll(db, sql, [repo_name, repo_owner]);

    var output: TODOEntry[] = [];

    for (let entry of data) {
        output.push({id: entry.id, repo_name: entry.repo_name, repo_owner: entry.repo_owner, desc: entry.description, due_date: entry.due_date, completed: entry.completed,label: entry.label, order: entry.list_order})
    }
    return output;
}

/**
 * Delete an entry of the database
 * 
 * @param {number} id - The ID of the TODO entry to delete.
 * 
 * @example deleteTODOEntry(5);
 */
export async function deleteTODOEntry(id: number): Promise<void> {
    const sql: string = `DELETE FROM todo WHERE id = ?`;

    await run(db, sql, [id]);
}

await initTables();
// const x = await fetchAll(db, "SELECT name FROM sqlite_master WHERE type = \"table\"", []);
// console.log(x);

//console.log(await fetchAll(db, "SELECT * FROM todo", []));

//console.log(await getTODOEntries("Github-Dashboard", "lewinl349"));