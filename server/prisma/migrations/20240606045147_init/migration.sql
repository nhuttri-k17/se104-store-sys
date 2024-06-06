-- CreateTable
CREATE TABLE `taikhoan` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nhanvienId` VARCHAR(191) NULL,

    UNIQUE INDEX `taikhoan_email_key`(`email`),
    UNIQUE INDEX `taikhoan_nhanvienId_key`(`nhanvienId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taikhoankhachhang` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `khachhangId` VARCHAR(191) NULL,

    UNIQUE INDEX `taikhoankhachhang_email_key`(`email`),
    UNIQUE INDEX `taikhoankhachhang_khachhangId_key`(`khachhangId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nhanvien` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `vaitro` VARCHAR(191) NOT NULL,
    `ngayvaolam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hinhanh` TEXT NULL,
    `xoa` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sanpham` (
    `id` VARCHAR(191) NOT NULL,
    `tinhtrang` VARCHAR(191) NOT NULL,
    `soluong` INTEGER NOT NULL,
    `detailId` VARCHAR(191) NOT NULL,
    `xoa` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `sanpham_detailId_key`(`detailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sanphamcuahang` (
    `id` VARCHAR(191) NOT NULL,
    `soluong` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sanphamdetail` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `loai` VARCHAR(191) NOT NULL,
    `hinhanh` TEXT NOT NULL,
    `gia` INTEGER NOT NULL,
    `mota` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chienluoc` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `noidung` TEXT NOT NULL,
    `nhanvienId` VARCHAR(191) NOT NULL,
    `ngaydang` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khuyenmai` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `giatri` INTEGER NOT NULL,
    `ngaybatdau` DATETIME(3) NOT NULL,
    `ngayketthuc` DATETIME(3) NOT NULL,
    `tinhtrang` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khachhang` (
    `id` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL DEFAULT 'chưa đặt tên',
    `email` VARCHAR(191) NOT NULL,
    `hinhanh` TEXT NULL,
    `sdt` VARCHAR(191) NULL,
    `giohangId` VARCHAR(191) NOT NULL,
    `ngaylap` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `khachhang_email_key`(`email`),
    UNIQUE INDEX `khachhang_giohangId_key`(`giohangId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chitietgiohang` (
    `giohangId` VARCHAR(191) NOT NULL,
    `sanphamId` VARCHAR(191) NOT NULL,
    `soluong` INTEGER NOT NULL,

    PRIMARY KEY (`giohangId`, `sanphamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donhang` (
    `id` VARCHAR(191) NOT NULL,
    `khachhangId` VARCHAR(191) NOT NULL,
    `ngaylap` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tonggiatri` INTEGER NOT NULL,
    `tinhtrang` VARCHAR(191) NOT NULL,
    `khuyenmaiId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chitietdonhang` (
    `donhangId` VARCHAR(191) NOT NULL,
    `sanphamId` VARCHAR(191) NOT NULL,
    `soluong` INTEGER NOT NULL,
    `tonggiatri` INTEGER NOT NULL,

    PRIMARY KEY (`donhangId`, `sanphamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `taikhoan` ADD CONSTRAINT `taikhoan_nhanvienId_fkey` FOREIGN KEY (`nhanvienId`) REFERENCES `nhanvien`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taikhoankhachhang` ADD CONSTRAINT `taikhoankhachhang_khachhangId_fkey` FOREIGN KEY (`khachhangId`) REFERENCES `khachhang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sanphamcuahang` ADD CONSTRAINT `sanphamcuahang_id_fkey` FOREIGN KEY (`id`) REFERENCES `sanpham`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sanphamdetail` ADD CONSTRAINT `sanphamdetail_id_fkey` FOREIGN KEY (`id`) REFERENCES `sanpham`(`detailId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chienluoc` ADD CONSTRAINT `chienluoc_nhanvienId_fkey` FOREIGN KEY (`nhanvienId`) REFERENCES `nhanvien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietgiohang` ADD CONSTRAINT `chitietgiohang_sanphamId_fkey` FOREIGN KEY (`sanphamId`) REFERENCES `sanphamcuahang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietgiohang` ADD CONSTRAINT `chitietgiohang_giohangId_fkey` FOREIGN KEY (`giohangId`) REFERENCES `khachhang`(`giohangId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donhang` ADD CONSTRAINT `donhang_khachhangId_fkey` FOREIGN KEY (`khachhangId`) REFERENCES `khachhang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donhang` ADD CONSTRAINT `donhang_khuyenmaiId_fkey` FOREIGN KEY (`khuyenmaiId`) REFERENCES `khuyenmai`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietdonhang` ADD CONSTRAINT `chitietdonhang_donhangId_fkey` FOREIGN KEY (`donhangId`) REFERENCES `donhang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietdonhang` ADD CONSTRAINT `chitietdonhang_sanphamId_fkey` FOREIGN KEY (`sanphamId`) REFERENCES `sanpham`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
