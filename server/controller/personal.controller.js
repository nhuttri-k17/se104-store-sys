import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getIdentity = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        const acc = await prisma.taikhoan.findUnique({
            where: {
                id,
            },
        });
        if (!acc) {
            return res.status(404).json({ message: "Account not found" });
        }

        const { email, nhanvienId } = acc;
        const staff = await prisma.nhanvien.findUnique({
            where: {
                id: nhanvienId,
            },
        });

        return res.json({ ...staff, email });
    } catch (error) {
        console.error("Error getting identity", error);
        res.status(500).json({
            message: `Error getting identity ${error.message}`,
        });
    }
};

export { getIdentity };
