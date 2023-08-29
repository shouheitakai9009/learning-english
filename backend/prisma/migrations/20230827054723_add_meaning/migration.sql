/*
  Warnings:

  - You are about to drop the column `origin` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `originJp` on the `Word` table. All the data in the column will be lost.
  - Added the required column `mearning` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Word` DROP COLUMN `origin`,
    DROP COLUMN `originJp`,
    ADD COLUMN `mearning` VARCHAR(191) NOT NULL;
