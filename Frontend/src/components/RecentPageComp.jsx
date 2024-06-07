import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export const RecentPageComp = () => {
  const [dokumen, setDokumen] = useState([]);

  useEffect(() => {
    getDokumen();
  }, []);

  const getDokumen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dokumen");
      setDokumen(response.data);
    } catch (error) {
      console.log("gagal mengambil data", error);
    }
  };

  const HapusDokumen = async (Id) => {
    try {
      await axios.delete(`http://localhost:5000/dokumen/${Id}`);
      alert("Dokumen Berhasil Dihapus");
      location.reload();
    } catch (error) {
      alert("Gagal Menghapus Dokumen");
    }
  };

  return (
    <div className="w-full gap-4 justify-center items-center border border-gray-400 rounded-lg bg-white">
      <div className="flex-auto p-4 justify-between">
        <div className="flex justify-center items-center">
          <h3 className="pb-3 font-bold">Semua Dokumen Tersimpan</h3>
        </div>
        <div className="flex flex-col">
          <table className="table-fixed">
            <thead className="bg-gray-300">
              <tr>
                <th className="text-center">Nama File</th>
                <th className="text-center">Jenis File</th>
                <th className="text-center">Tanggal Upload</th>
                <th className="text-center">Jam Upload</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dokumen.map((index, i) => {
                var Tanggal = new Date(index.createdAt).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                );
                var Jam = new Date(index.createdAt).toLocaleTimeString(
                  "id-ID",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );
                return (
                  <tr key={i}>
                    <th className="w-6/12 text-center">
                      <a
                        className="text-black"
                        href={index.url}
                        target="_blank"
                      >
                        {index.nama}
                      </a>
                    </th>
                    <th className="text-center">{index.tipe}</th>
                    <th className="text-center">{Tanggal}</th>
                    <th className="text-center">{Jam}</th>
                    <th className="text-center">
                      <div className="flex justify-center gap-4">
                        <div className="tooltip" data-tip="Hapus">
                          <MdDelete
                            className="cursor-pointer"
                            color="red"
                            size={"1.5rem"}
                            onClick={() => HapusDokumen(index.id)}
                          />
                        </div>
                        <div className="tooltip" data-tip="Edit">
                          <a href={`/edit/${index.id}`}>
                            <MdEdit color="green" size={"1.5rem"} />
                          </a>
                        </div>
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
