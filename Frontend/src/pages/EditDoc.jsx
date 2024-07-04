import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { KategoriData } from "../utils/Option-Kategori";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect } from "react";

export const EditDoc = () => {
  const [nama, setNama] = useState([]);
  const [keterangan, setKeterangan] = useState([])
  const [tipe, setTipe] = useState([]);
  const [berkas, setBerkas] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const getDokumenById = async () => {
      const response = await axios.get(`http://localhost:5000/dokumen/${id}`);
      setNama(response.data.nama);
      setKeterangan(response.keterangan)
      setTipe(response.data.tipe);
      setBerkas(response.data.berkas);
    };
    getDokumenById();
  }, [id]);

  const UpdateDokumen = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("keterangan", keterangan)
    formData.append("tipe", tipe);
    formData.append("berkas", berkas);
    try {
      await axios.patch(`http://localhost:5000/dokumen/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
      alert("Dokumen Berhasil Di Update");
    } catch (error) {
      console.log(error);
    }
  };

  const loadFile = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const maxFileSize = 10 * 1024 * 1024;
    if (["jpeg", "png", "jpg"].includes(fileExtension)) {
      alert("Dokumen Scan Harus Memiliki Format PDF");
      return;
    }
    if (
      !["pdf", "docx", "doc", "xls", "xlsx", "pptx"].includes(fileExtension)
    ) {
      alert("Format Tidak Sesuai");
      return;
    }
    if (file.size > maxFileSize) {
      alert("Ukuran File Harus Dibawah 6 MB");
      return;
    }
    setBerkas(file);
  };

  const [openTipe, setOpenTipe] = useState(false);

  const onClickTipe = (value) => () => {
    setTipe(value);
    setOpenTipe(false);
  };
  return (
    <div>
      <form onSubmit={UpdateDokumen}>
        <div className="border border-gray-400 rounded-lg p-4 gap-4 bg-white">
          <div className="flex gap-4 justify-center">
            <div className="#">
              <label className="block mb-2 text-sm font-medium text-gray-90">
                Nama File
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Beri Nama File"
                  className="w-full px-4 py-2 border border-gray-400 rounded"
                  onChange={(e) => setNama(e.target.value)}
                  selected={nama}
                />
              </div>
            </div>
            <div className="#">
                <label className="block mb-2 text-sm font-medium text-gray-90">
                  Keterangan
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Keterangan"
                    className="w-full px-4 py-2 border border-gray-400 rounded"
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </div>
              </div>
            <div className="#">
              <label
                className="block mb-2 text-sm font-medium text-gray-90"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="file_input"
                type="file"
                onChange={loadFile}
              />
            </div>
            <div className="">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kategori
              </label>
              <div className="relative h-10 w-full min-w-[200px] cursor-pointer">
                <div
                  onClick={() => setOpenTipe(!openTipe)}
                  className={`peer w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                    openTipe ? "border-blue-500" : "border-blue-gray-200 "
                  } h-11 text-center`}
                >
                  <span
                    value={tipe}
                    onChange={(e) => setTipe(e.target.value)}
                    className="absolute top-2/4 left-3 -translate-y-2/4 pt-0.5"
                  >
                    {tipe || "Pilih Jenis File"}
                  </span>
                  <IoMdArrowDropdown
                    strokeWidth={2.5}
                    className={`cursor-pointer absolute top-2/4 right-2 grid h-5 w-5 -translate-y-2/4 place-items-center pt-px text-blue-gray-400 transition-all
                        ${
                          openTipe ? "mt-px rotate-180" : "rotate-0"
                        } duration-200`}
                  />
                </div>
                {openTipe && (
                  <ul className="absolute top-[49px] left-0 z-[100] max-h-96 w-full origin-center transform-none overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 opacity-100 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                    {KategoriData.map(({ value, label }) => (
                      <li
                        key={value}
                        value={value}
                        onClick={onClickTipe(value)}
                        className="cursor-pointer p-2 hover:text-white hover:bg-blue-500 rounded transition-all select-none "
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center pt-3">
            <button
              className="p-2 px-6 bg-blue-500 text-white rounded-md"
              type="submit"
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
