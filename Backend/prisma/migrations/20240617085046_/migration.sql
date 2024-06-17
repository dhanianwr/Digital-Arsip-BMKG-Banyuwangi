/*
  Warnings:

  - You are about to alter the column `status` on the `dokumen` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `dokumen` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';
