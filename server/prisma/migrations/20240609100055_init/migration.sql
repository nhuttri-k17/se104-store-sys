-- CreateTable
CREATE TABLE "taikhoan" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nhanvienId" TEXT,

    CONSTRAINT "taikhoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taikhoankhachhang" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "khachhangId" TEXT,

    CONSTRAINT "taikhoankhachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roledetail" (
    "nhanvienId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "roledetail_pkey" PRIMARY KEY ("nhanvienId","roleId")
);

-- CreateTable
CREATE TABLE "nhanvien" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "vaitro" TEXT NOT NULL,
    "ngayvaolam" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hinhanh" TEXT,
    "xoa" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "nhanvien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sanpham" (
    "id" TEXT NOT NULL,
    "tinhtrang" TEXT NOT NULL,
    "soluong" INTEGER NOT NULL,
    "detailId" TEXT NOT NULL,
    "xoa" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sanpham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sanphamcuahang" (
    "id" TEXT NOT NULL,
    "soluong" INTEGER NOT NULL,

    CONSTRAINT "sanphamcuahang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sanphamdetail" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "loai" TEXT NOT NULL,
    "hinhanh" TEXT NOT NULL,
    "gia" INTEGER NOT NULL,
    "mota" TEXT NOT NULL,

    CONSTRAINT "sanphamdetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chienluoc" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "noidung" TEXT NOT NULL,
    "nhanvienId" TEXT NOT NULL,
    "ngaydang" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chienluoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "khuyenmai" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "giatri" INTEGER NOT NULL,
    "ngaybatdau" TIMESTAMP(3) NOT NULL,
    "ngayketthuc" TIMESTAMP(3) NOT NULL,
    "tinhtrang" BOOLEAN NOT NULL,

    CONSTRAINT "khuyenmai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "khachhang" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL DEFAULT 'chưa đặt tên',
    "email" TEXT NOT NULL,
    "hinhanh" TEXT,
    "sdt" TEXT,
    "giohangId" TEXT NOT NULL,
    "ngaylap" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "khachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chitietgiohang" (
    "giohangId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "soluong" INTEGER NOT NULL,

    CONSTRAINT "chitietgiohang_pkey" PRIMARY KEY ("giohangId","sanphamId")
);

-- CreateTable
CREATE TABLE "donhang" (
    "id" TEXT NOT NULL,
    "khachhangId" TEXT NOT NULL,
    "ngaylap" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tonggiatri" INTEGER NOT NULL,
    "tinhtrang" TEXT NOT NULL,
    "khuyenmaiId" TEXT,

    CONSTRAINT "donhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chitietdonhang" (
    "donhangId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "soluong" INTEGER NOT NULL,
    "tonggiatri" INTEGER NOT NULL,

    CONSTRAINT "chitietdonhang_pkey" PRIMARY KEY ("donhangId","sanphamId")
);

-- CreateIndex
CREATE UNIQUE INDEX "taikhoan_email_key" ON "taikhoan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "taikhoan_nhanvienId_key" ON "taikhoan"("nhanvienId");

-- CreateIndex
CREATE UNIQUE INDEX "taikhoankhachhang_email_key" ON "taikhoankhachhang"("email");

-- CreateIndex
CREATE UNIQUE INDEX "taikhoankhachhang_khachhangId_key" ON "taikhoankhachhang"("khachhangId");

-- CreateIndex
CREATE UNIQUE INDEX "sanpham_detailId_key" ON "sanpham"("detailId");

-- CreateIndex
CREATE UNIQUE INDEX "khachhang_email_key" ON "khachhang"("email");

-- CreateIndex
CREATE UNIQUE INDEX "khachhang_giohangId_key" ON "khachhang"("giohangId");

-- AddForeignKey
ALTER TABLE "taikhoan" ADD CONSTRAINT "taikhoan_nhanvienId_fkey" FOREIGN KEY ("nhanvienId") REFERENCES "nhanvien"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taikhoankhachhang" ADD CONSTRAINT "taikhoankhachhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roledetail" ADD CONSTRAINT "roledetail_nhanvienId_fkey" FOREIGN KEY ("nhanvienId") REFERENCES "nhanvien"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roledetail" ADD CONSTRAINT "roledetail_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sanphamcuahang" ADD CONSTRAINT "sanphamcuahang_id_fkey" FOREIGN KEY ("id") REFERENCES "sanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sanphamdetail" ADD CONSTRAINT "sanphamdetail_id_fkey" FOREIGN KEY ("id") REFERENCES "sanpham"("detailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chienluoc" ADD CONSTRAINT "chienluoc_nhanvienId_fkey" FOREIGN KEY ("nhanvienId") REFERENCES "nhanvien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chitietgiohang" ADD CONSTRAINT "chitietgiohang_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "sanphamcuahang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chitietgiohang" ADD CONSTRAINT "chitietgiohang_giohangId_fkey" FOREIGN KEY ("giohangId") REFERENCES "khachhang"("giohangId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donhang" ADD CONSTRAINT "donhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donhang" ADD CONSTRAINT "donhang_khuyenmaiId_fkey" FOREIGN KEY ("khuyenmaiId") REFERENCES "khuyenmai"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chitietdonhang" ADD CONSTRAINT "chitietdonhang_donhangId_fkey" FOREIGN KEY ("donhangId") REFERENCES "donhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chitietdonhang" ADD CONSTRAINT "chitietdonhang_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "sanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;
