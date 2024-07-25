/*
  Warnings:

  - You are about to drop the `dailytask` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `subtask` ADD COLUMN `progress` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `dailytask`;
