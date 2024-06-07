import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/dokumen");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname
    );
  },
});
export const dokumenUpload = multer({ storage: storage });

export const GetDokumen = async (req, res) => {
  try {
    const nama = req.query.nama;
    const tipe = req.query.tipe;
    const dokumen = await prisma.dokumen.findMany({
      where: {
        nama: {
          contains: nama,
        },
        tipe: {
          contains: tipe,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!dokumen.length) {
      return res.status(404).json({ msg: "Dokumen Tidak Ditemukan" });
    }
    res.json(dokumen);
  } catch (error) {
    console.log({ msg: "Server Error", error: error.message });
    res.status(500).json({ msg: "Server Error" });
  }
};

export const GetDokumenbyId = async (req, res) => {
  try {
    const response = await prisma.dokumen.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data Tidak Ada" });
  }
};

// export const CreateDokumesn = async (req, res) => {
//   try {
//     if (req.file === null) {
//       return res.status(400).json({ msg: "Dokument File not provided" });
//     }

//     const nama = req.body.nama;
//     const tipe = req.body.tipe;
//     const fileName = req.body.filename;
//     const fileSize = req.body.size;
//     const url = `${req.protocol}://${req.get(
//       "host"
//     )}/public/dokumen/${fileName}#toolbar=0`;
//     const allowedType = [".pdf"];
//     const ext = path.extname(req.file.originalname);

//     if (!allowedType.includes(ext.toLowerCase())) {
//       return res.status(422).json({
//         msg: "Format Tidak sesuai, Silahkan Unggah Dengan Format .pdf, .xls, .xlsx, .doc, .docx, .ppt",
//       });
//     }
//     if (fileSize > 50000000) {
//       return res.status(422).json({ msg: "Ukuran File Harus Kurang Dari 5MB" });
//     }
//     await prisma.dokumen.create({
//       data: {
//         nama: nama,
//         tipe: tipe,
//         berkas: fileName,
//         url: url,
//       },
//     });
//     res.status(201).json({ msg: "Dokumen Berhasil Diunggah" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };

export const CreateDokumen = async (req, res) => {
  try {
    if (req.file === null) {
      return res.status(400).json({ msg: "Document file not provided" });
    }
    const nama = req.body.nama;
    const tipe = req.body.tipe;
    const fileName = req.file.filename;
    const fileSize = req.file.size;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/public/dokumen/${fileName}`;
    const allowedType = [".pdf", ".docx", ".doc", ".xls", ".xlsx", ".ppt", ".pptx", ".jpg", "jpeg"];
    const ext = path.extname(req.file.originalname);

    if (!allowedType.includes(ext.toLowerCase())) {
      return res
        .status(422)
        .json({ msg: "Unsupported file format for Document" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "File Harus Kurang Dari 5 Mb" });
    }
    await prisma.dokumen.create({
      data: {
        nama: nama,
        tipe: tipe,
        berkas: fileName,
        url: url,
      },
    });

    res.status(201).json({ msg: "Document uploaded successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const UpdateDokumen = async (req, res) => {
  const Dokumen = await prisma.dokumen.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!Dokumen) return res.status(404).json({ msg: "No Data Found" });
  let fileName = "";
  if (req.file === null) {
    fileName = Dokumen.berkas;
  } else {
    const fileSize = req.file.size
    const ext = path.extname(req.file.originalname);
    const allowedType = [".pdf", ".docx", ".doc", ".xls", ".xlsx", ".ppt", ".pptx", ".jpg", "jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Unsupported format" });
    }

    if (fileSize > 20000000) {
      return res
        .status(422)
        .json({ msg: "file size should be less than 10 MB" });
    }
    const filepath = `./public/dokumen/${Dokumen.berkas}`;

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    fileName = req.file.filename;
  }
  const nama = req.body.nama;
  const tipe = req.body.tipe;
  const url = `${req.protocol}://${req.get(
    "host"
  )}/public/dokumen/${fileName}`;

  try {
    await prisma.dokumen.update({
      data: { nama: nama, tipe: tipe, berkas: fileName, url: url },
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ msg: "Dokumen berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteDokumen = async (req, res) => {
  const Dokumen = await prisma.dokumen.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!Dokumen) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filepath = `./public/dokumen/${Dokumen.berkas}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    await prisma.dokumen.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ msg: "Dokumen Berhasil Dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};
