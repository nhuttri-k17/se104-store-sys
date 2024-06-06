-- CreateTable
CREATE TABLE `roledetail` (
    `nhanvienId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nhanvienId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `roledetail` ADD CONSTRAINT `roledetail_nhanvienId_fkey` FOREIGN KEY (`nhanvienId`) REFERENCES `nhanvien`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roledetail` ADD CONSTRAINT `roledetail_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
