/*
  Warnings:

  - You are about to drop the column `victories` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Player` DROP COLUMN `victories`;

-- CreateIndex
CREATE INDEX `Theme_name_idx` ON `Theme`(`name`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- RenameIndex
ALTER TABLE `Player` RENAME INDEX `Player_quizId_fkey` TO `Player_quizId_idx`;

-- RenameIndex
ALTER TABLE `Player` RENAME INDEX `Player_userId_fkey` TO `Player_userId_idx`;

-- RenameIndex
ALTER TABLE `Question` RENAME INDEX `Question_themeId_fkey` TO `Question_themeId_idx`;

-- RenameIndex
ALTER TABLE `Quiz` RENAME INDEX `Quiz_theme1Id_fkey` TO `Quiz_theme1Id_idx`;

-- RenameIndex
ALTER TABLE `Quiz` RENAME INDEX `Quiz_theme2Id_fkey` TO `Quiz_theme2Id_idx`;
