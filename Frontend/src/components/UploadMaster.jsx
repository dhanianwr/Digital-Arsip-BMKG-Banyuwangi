import React, { useEffect, useState } from "react";
import { KategoriData } from "../utils/Option-Kategori";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";

function UploadMaster() {
  const [query, setQuery] = useState("");
  const [nama, setNama] = useState("");
  const [tipe, setTipe] = useState("");
  const [berkas, setBerkas] = useState("");
  const [search, setSearch] = useState([]);
  const [msg, setMsg] = useState("")

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/dokumen?nama=${query}`);
  
      if (response.data.length > 0) {
        setSearch(response.data);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.search-bar')) {
      setSearch([]);
      setMsg('');
    }
  };

  const PostDokumen = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("tipe", tipe);
    formData.append("berkas", berkas);
    try {
      await axios.post("http://localhost:5000/dokumen", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      location.reload();
      alert("Dokumen Berhasil Ditambahkan");
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

  //Dropdown Upload
  const [openTipe, setOpenTipe] = useState(false);

  const onClickTipe = (value) => () => {
    setTipe(value);
    setOpenTipe(false);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 w-full gap-4">
        {/* UPLOAD */}
        <form onSubmit={PostDokumen}>
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

        {/* SEARCH */}
        <div className="flex items-center justify-center border border-gray-400 rounded-lg p-4 gap-4 bg-white">
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-90">
          Search Bar
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="Cari File..."
            className="w-full px-4 py-2 border border-gray-400 rounded-s-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className=" px-5 text-white bg-blue-500 rounded-e-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {search.length > 0 ? (
          <div className="flex flex-col p-2 w-full mt-3 rounded-lg bg-white border border-gray-400 absolute">
            <p className="flex justify-center mb-2 font-semibold bg-gray-300">Hasil Pencarian</p>
            {search.map((index, i) => (
              <ul
                key={i}
                className="flex gap-3 justify-between items-center"
              >
                <li>
                  <a
                    href={index.url}
                    className="no-underline text-black font-light"
                    target="_blank"
                  >
                    {index.nama}
                  </a>
                </li>
                <li className="no-underline text-black font-light">{index.tipe}</li>
              </ul>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-3">{msg}</p>
        )}
      </div>
    </div>
      </div>
    </>
  );
}

export default UploadMaster;
