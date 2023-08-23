-- CreateTable
CREATE TABLE `Word` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partOfSpeechId` VARCHAR(191) NOT NULL,
    `word` VARCHAR(191) NOT NULL,
    `mean` VARCHAR(191) NOT NULL,
    `modelSentence` VARCHAR(191) NOT NULL,
    `modelSentenceMean` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `Word_word_partOfSpeechId_key`(`word`, `partOfSpeechId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartOfSpeech` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PartOfSpeech_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Word` ADD CONSTRAINT `Word_partOfSpeechId_fkey` FOREIGN KEY (`partOfSpeechId`) REFERENCES `PartOfSpeech`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
