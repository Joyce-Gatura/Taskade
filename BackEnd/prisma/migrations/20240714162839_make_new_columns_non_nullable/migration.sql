/*
  Warnings:

  - Made the column `end_date` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tasks` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `end_date` DATETIME(3) NOT NULL,
    MODIFY `start_date` DATETIME(3) NOT NULL,
    MODIFY `tasks` JSON NOT NULL;
