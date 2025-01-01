import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

enum Status {
    Playing,
    Retired
}

enum Position {
    Forward,
    Midfielder,
    Defender,
    Goalkeeper
}

// Create a new player
export const createPlayer = async (req: Request, res: Response) => {
    const { name, age, skill_level, position, salary, teamId, status } = req.body;

    if (!name || !age || !skill_level || !position || !status) {
        return res.status(400).json({
            error: "All fields are required: name, age, skill_level ,status and position."
        });
    }
    // casting
    const ageAsInt = parseInt(age, 10);
    const skillLevelAsInt = parseInt(skill_level, 10);
    const salaryAsInt = parseInt(salary, 10);
    const teamIdAsInt = teamId ? parseInt(teamId, 10) : null;
    // position check
    if (!(position in Position)) {
        return res.status(400).json({
            error: `${position} is not a valid position.`
        });
    }
    // status check
    if (!(status in Status)) {
        return res.status(400).json({
            error: `${status} is not a valid status.`
        });
    }
    // level check
    if (skill_level < 1 || skill_level > 100) {
        return res.status(400).json({
            error: "Skill level must be between 1 and 100."
        });
    }

    try {
        const newPlayer = await prisma.player.create({
            data: {
                name,
                age: ageAsInt,
                skill_level: skillLevelAsInt,
                position,
                salary: salaryAsInt,
                teamId: teamIdAsInt,
                status
            }
        });
        return res.status(201).json(newPlayer);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while creating the player." });
    }
};

// Get all players
export const getPlayers = async (req: Request, res: Response) => {
    try {
        const players = await prisma.player.findMany();
        return res.status(200).json(players);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching players." });
    }
};

// Get a single player by ID
export const getPlayerById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const player = await prisma.player.findUnique({
            where: { id }
        });

        if (!player) {
            return res.status(404).json({ error: "Player not found." });
        }

        return res.status(200).json(player);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching the player." });
    }
};

// Update a player by ID
export const updatePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age, skill_level, position, salary, teamId, status } = req.body;

    if (!name || !age || !skill_level || !position || !status) {
        return res.status(400).json({
            error: "All fields are required: name, age, skill_level ,status and position."
        });
    }
    // casting
    const ageAsInt = parseInt(age, 10);
    const skillLevelAsInt = parseInt(skill_level, 10);
    const salaryAsInt = parseInt(salary, 10);
    const teamIdAsInt = teamId ? parseInt(teamId, 10) : null;
    // position check
    if (!(position in Position)) {
        return res.status(400).json({
            error: `${position} is not a valid position.`
        });
    }
    // status check
    if (!(status in Status)) {
        return res.status(400).json({
            error: `${status} is not a valid status.`
        });
    }
    // level check
    if (skill_level < 1 || skill_level > 100) {
        return res.status(400).json({
            error: "Skill level must be between 1 and 100."
        });
    }
    try {
        const updatedPlayer = await prisma.player.update({
            where: { id },
            data: {
                name,
                age: ageAsInt,
                skill_level: skillLevelAsInt,
                position,
                salary: salaryAsInt,
                teamId: teamIdAsInt,
                status
            }
        });
        return res.status(200).json(updatedPlayer);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "An error occurred while updating the player." });
    }
};

// Delete a player by ID
export const deletePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.player.delete({
            where: { id }
        });
        return res.status(204).send(); // No content
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the player." });
    }
};