/*
  Warnings:

  - You are about to drop the column `file` on the `dokumen` table. All the data in the column will be lost.
  - Added the required column `filedokumen` to the `dokumen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dokumen` DROP COLUMN `file`,
    ADD COLUMN `filedokumen` VARCHAR(191) NOT NULL;
