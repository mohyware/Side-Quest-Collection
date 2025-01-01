require('dotenv').config();
import pool from '../services/database.service';

interface PgError extends Error {
    code?: string;
}

const createDatabaseIfNotExists = async (dbName: string) => {
    const client = await pool.connect();

    try {
        console.log('Connected to PostgreSQL');
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database ${dbName} created successfully.`);
    } catch (err) {
        const error = err as PgError;
        if (error.code === '42P04') { // Error code for "duplicate_database"
            console.log(`Database ${dbName} already exists.`);
        } else {
            console.error('Error creating database', err);
        }
    } finally {
        client.release();
    }
};

createDatabaseIfNotExists('NHL');


const createTables = async () => {
    const client = await pool.connect();
    try {
        console.log('Creating tables if they do not exist...');

        // Create player table
        await client.query(`
            CREATE TABLE IF NOT EXISTS player (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                position VARCHAR(50) NOT NULL,
                skill_level INT NOT NULL,
                injury_records TEXT[] DEFAULT '{}' -- Use TEXT[] for an array of strings
            );
        `);
        console.log('Player table created or already exists.');

        // Create team table
        await client.query(`
            CREATE TABLE IF NOT EXISTS team (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                city VARCHAR(100),
                coach VARCHAR(100),
                captain_id INT REFERENCES player(id) ON DELETE SET NULL
            );
        `);
        console.log('Team table created or already exists.');

        // 
        await client.query(`
            ALTER TABLE player
            ADD COLUMN team_id INT REFERENCES team(id) ON DELETE SET NULL;
        `)

        // Create game table
        await client.query(`
            CREATE TABLE IF NOT EXISTS game (
                id SERIAL PRIMARY KEY,
                host_team_id INT REFERENCES team(id),
                guest_team_id INT REFERENCES team(id),
                game_date DATE,
                score VARCHAR(50)
            );
        `);
        console.log('Game table created or already exists.');

    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        client.release(); // Ensure the client is released
    }
};

createTables();