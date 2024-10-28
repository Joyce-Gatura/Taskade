-- AlterTable
ALTER TABLE `project` MODIFY `end_date` DATETIME(3) NULL,
    MODIFY `start_date` DATETIME(3) NULL,
    MODIFY `tasks` JSON NULL;
