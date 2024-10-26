-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Playing', 'Retired');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Forward', 'Midfielder', 'Defender', 'Goalkeeper');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "skill_level" INTEGER NOT NULL,
    "position" "Position" NOT NULL,
    "salray" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Playing',
    "teamId" INTEGER,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coach" TEXT NOT NULL,
    "shirt_colour" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
