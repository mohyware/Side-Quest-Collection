import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new team
export const createTeam = async (req: Request, res: Response) => {
    const { name, coach, shirt_color, city } = req.body;

    try {
        const newTeam = await prisma.team.create({
            data: {
                name,
                coach,
                shirt_color,
                city
            }
        });
        return res.status(201).json(newTeam);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while creating the team." });
    }
};

// Get all teams
export const getTeams = async (req: Request, res: Response) => {
    try {
        const teams = await prisma.team.findMany({});
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching teams." });
    }
};

// Get a single team by ID
export const getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idAsInt = parseInt(id, 10);
    try {
        const team = await prisma.team.findUnique({
            where: { id: idAsInt },
            include: { players: true } // Optional: Include players in response
        });

        if (!team) {
            return res.status(404).json({ error: "Team not found." });
        }

        return res.status(200).json(team);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching the team." });
    }
};

// Update a team by ID
export const updateTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, coach, shirt_color, city } = req.body;
    const idAsInt = parseInt(id, 10);
    try {
        const updatedTeam = await prisma.team.update({
            where: { id: idAsInt },
            data: {
                name,
                coach,
                shirt_color,
                city
            }
        });
        return res.status(200).json(updatedTeam);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while updating the team." });
    }
};

// Delete a team by ID
export const deleteTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idAsInt = parseInt(id, 10);
    try {
        await prisma.team.delete({
            where: { id: idAsInt }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the team." });
    }
};
