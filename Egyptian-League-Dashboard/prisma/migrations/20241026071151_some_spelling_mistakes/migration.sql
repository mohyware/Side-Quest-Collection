/*
  Warnings:

  - You are about to drop the column `salray` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `shirt_colour` on the `Team` table. All the data in the column will be lost.
  - Added the required column `salary` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shirt_color` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "salray",
ADD COLUMN     "salary" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "shirt_colour",
ADD COLUMN     "shirt_color" TEXT NOT NULL;
