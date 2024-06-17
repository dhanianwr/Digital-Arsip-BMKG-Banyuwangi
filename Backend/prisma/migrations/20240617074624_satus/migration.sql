/*
  Warnings:

  - Added the required column `keterangan` to the `dokumen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dokumen` ADD COLUMN `keterangan` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` ENUM('0', '1') NOT NULL DEFAULT '0';
