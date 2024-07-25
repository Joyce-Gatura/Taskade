-- AlterTable
ALTER TABLE `project` ADD COLUMN `end_date` DATETIME(3) NULL,
    ADD COLUMN `start_date` DATETIME(3) NULL,
    ADD COLUMN `tasks` JSON NULL;
