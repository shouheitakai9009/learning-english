/*
  Warnings:

  - You are about to drop the column `mean` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `modelSentence` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `modelSentenceMean` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Word` DROP COLUMN `mean`,
    DROP COLUMN `modelSentence`,
    DROP COLUMN `modelSentenceMean`,
    ADD COLUMN `origin` TEXT NULL,
    ADD COLUMN `originJp` TEXT NULL,
    ADD COLUMN `phonetic` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `soundUrl` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Definition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `definition` TEXT NOT NULL,
    `definitionJp` TEXT NOT NULL,
    `example` TEXT NULL,
    `exampleJp` TEXT NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Synonym` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `synonym` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Antonym` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `antonym` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Definition` ADD CONSTRAINT `Definition_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Synonym` ADD CONSTRAINT `Synonym_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Antonym` ADD CONSTRAINT `Antonym_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
