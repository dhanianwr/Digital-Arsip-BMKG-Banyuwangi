import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { SiMicrosoftword } from "react-icons/si";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePowerpoint } from "react-icons/fa";
import { MdAdfScanner } from "react-icons/md";
import axios from "axios";

export default function DashboardStat() {
  const [pdf, setPDF] = useState([]);
  const [word, setWord] = useState([]);
  const [ppt, setPPT] = useState([]);
  const [excel, setExcel] = useState([]);
  const [scan, setScan] = useState([]);

  useEffect(() => {
    GetDokumenPDF();
    GetDokumenWord();
    GetDokumenExcel();
    GetDokumenPPT();
    GetDokumenScan();
  }, []);

  const GetDokumenPDF = async () => {
    try {
      const response = await axios.get(
        `https://be-digi-bwi.vercel.app/dokumen?tipe=file_pdf`
      );
      setPDF(response.data);
    } catch (error) {}
  };

  const GetDokumenWord = async () => {
    try {
      const response = await axios.get(
        `https://be-digi-bwi.vercel.app/dokumen?tipe=file_word`
      );
      setWord(response.data);
    } catch (error) {}
  };

  const GetDokumenExcel = async () => {
    try {
      const response = await axios.get(
        `https://be-digi-bwi.vercel.app/dokumen?tipe=file_excel`
      );
      setExcel(response.data);
    } catch (error) {}
  };

  const GetDokumenPPT = async () => {
    try {
      const response = await axios.get(
        `https://be-digi-bwi.vercel.app/dokumen?tipe=file_ppt`
      );
      setPPT(response.data);
    } catch (error) {}
  };

  const GetDokumenScan = async () => {
    try {
      const response = await axios.get(
        "https://be-digi-bwi.vercel.app/dokumen?tipe=scan_dokumen"
      );
      setScan(response.data);
    } catch (error) {}
  };

  return (
    <div className="flex gap-4 w-full flex-wrap">
      <div className="bg-white rounded-lg p-4 flex-1 border border-gray-400 flex items-center justify-between">
        <FaFilePdf size={"2em"} color="red" />
        <h3>
          File Tersimpan : <span className="font-bold">{pdf.length}</span>
        </h3>
      </div>
      <div className="bg-white rounded-lg p-4 flex-1 border border-gray-400 flex items-center justify-between">
        <SiMicrosoftexcel size={"2em"} color="green" />
        <h3>
          File Tersimpan : <span className="font-bold">{excel.length}</span>
        </h3>
      </div>
      <div className="bg-white rounded-lg p-4 flex-1 border border-gray-400 flex items-center justify-between">
        <SiMicrosoftword size={"2em"} color="#002379" />
        <h3>
          File Tersimpan : <span className="font-bold">{word.length}</span>
        </h3>
      </div>
      <div className="bg-white rounded-lg p-4 flex-1 border border-gray-400 flex items-center justify-between">
        <FaFilePowerpoint size={"2em"} color="orange" />
        <h3>
          File Tersimpan : <span className="font-bold">{ppt.length}</span>
        </h3>
      </div>
      <div className="bg-white rounded-lg p-4 flex-1 border border-gray-400 flex items-center justify-between">
        <MdAdfScanner size={"2em"} color="brown" />
        <h3>
          File Tersimpan : <span className="font-bold">{scan.length}</span>
        </h3>
      </div>
    </div>
  );
}
