import express from "express";
import {
  GetDokumen,
  GetDokumenbyId,
  CreateDokumen,
  UpdateDokumen,
  DeleteDokumen,
  dokumenUpload,
} from "../controller/dokumencontroller.js";

const router = express.Router();

router.get("/dokumen", GetDokumen);
router.get("/dokumen/:id", GetDokumenbyId);
router.post("/dokumen", dokumenUpload.single('berkas') ,CreateDokumen);
router.patch("/dokumen/:id", dokumenUpload.single('berkas') ,UpdateDokumen);
router.delete("/dokumen/:id", DeleteDokumen);

export default router;
