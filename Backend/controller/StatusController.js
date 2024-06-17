import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const status = await getStatus(id);
    res.json({ status });
  } catch (error) {
    res.status(404).json({ message: "Dokumen not found" });
  }
};

export const updateStatus = async (req, res) => {
    const { id } = req.params;
  
    try {
      const dokumen = await prisma.dokumen.findUnique({
        where: { id: parseInt(id) }
      });
  
      if (!dokumen) {
        return res.status(404).json({ error: 'Dokumen not found' });
      }
  
      const newStatus = dokumen.status === 'active' ? 'inactive' : 'active';
  
      const updatedDokumen = await prisma.dokumen.update({
        where: { id: parseInt(id) },
        data: { status: newStatus }
      });
  
      res.json(updatedDokumen);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the status' });
    }
};
