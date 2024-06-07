/*
  Warnings:

  - You are about to drop the `orang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `orang`;

-- CreateTable
CREATE TABLE `dokumen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
