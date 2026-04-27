-- AlterTable
ALTER TABLE `reports` ADD COLUMN `iluminacion` VARCHAR(191) NOT NULL DEFAULT 'Bueno',
    ADD COLUMN `limpieza` VARCHAR(191) NOT NULL DEFAULT 'Bueno',
    ADD COLUMN `mobiliario` VARCHAR(191) NOT NULL DEFAULT 'Bueno';
