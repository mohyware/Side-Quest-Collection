// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create teams
    const teamA = await prisma.team.create({
        data: {
            name: "Team A",
            coach: "Coach A",
            shirt_color: "Red",
            city: "City A"
        }
    });

    const teamB = await prisma.team.create({
        data: {
            name: "Team B",
            coach: "Coach B",
            shirt_color: "Blue",
            city: "City B"
        }
    });

    // Create players
    await prisma.player.createMany({
        data: [
            {
                name: "Player 1",
                age: 25,
                skill_level: 90,
                position: "Forward",
                salary: 50000,
                status: "Playing",
                teamId: teamA.id
            },
            {
                name: "Player 2",
                age: 28,
                skill_level: 85,
                position: "Midfielder",
                salary: 60000,
                status: "Playing",
                teamId: teamA.id
            },
            {
                name: "Player 3",
                age: 30,
                skill_level: 88,
                position: "Defender",
                salary: 55000,
                status: "Playing",
                teamId: teamB.id
            },
            {
                name: "Player 4",
                age: 27,
                skill_level: 82,
                position: "Goalkeeper",
                salary: 62000,
                status: "Playing",
                teamId: teamB.id
            }
        ]
    });

    console.log("Seeding completed!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
