/*
  Warnings:

  - You are about to drop the column `mearning` on the `Word` table. All the data in the column will be lost.
  - Added the required column `meaning` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Word` DROP COLUMN `mearning`,
    ADD COLUMN `meaning` VARCHAR(191) NOT NULL;
