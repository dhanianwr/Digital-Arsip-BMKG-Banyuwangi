import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
// import { updateStatus } from "../../../Backend/controller/StatusController";

export const RecentPageComp = () => {
  const [dokumen, setDokumen] = useState([]);
  // const [status, setStatus] = useState("");

  useEffect(() => {
    getDokumen();
  }, []);

  const getDokumen = async () => {
    try {
      const response = await axios.get("https://be-digi-bwi.vercel.app/dokumen");
      setDokumen(response.data);
    } catch (error) {
      console.log("gagal mengambil data", error);
    }
  };

  const HapusDokumen = async (Id) => {
    try {
      await axios.delete(`http://be-digi-bwi.vercel.app/dokumen/${Id}`);
      alert("Dokumen Berhasil Dihapus");
      location.reload();
    } catch (error) {
      alert("Gagal Menghapus Dokumen");
    }
  };

  const updateStatus = async (Id) => {
    try {
      const response = await axios.patch(
        `http://be-digi-bwi.vercel.app/dokumen/${Id}/status`
      );
      setStatus(response.data.status);
      location.reload();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function truncate(str, maxLength = 40) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    } else {
        return str;
    }
}

  return (
    <div className="w-full gap-4 justify-center items-center border border-gray-400 rounded-lg bg-white">
      <div className="flex-auto p-4 justify-between">
        <div className="flex justify-center items-center">
          <h3 className="pb-3 font-bold">Semua Dokumen Tersimpan</h3>
        </div>
        <div className="flex flex-col w-full">
          <table className="table-fixed">
            <thead className="bg-gray-300">
              <tr>
                <th className="text-center">Nama File</th>
                <th className="text-center">Keterangan</th>
                <th className="text-center">Format File</th>
                <th className="text-center">Tanggal Upload</th>
                <th className="text-center">Jam Upload</th>
                <th className="text-center">Status Dokumen</th>
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
                    <th className="w-1/4">
                      <a
                        className="text-black"
                        href={index.url}
                        target="_blank"
                      >
                        {truncate(index.nama)}
                      </a>
                    </th>
                    <th className="w-1/4">{truncate(index.keterangan)}</th>
                    <th className="text-center">{index.tipe}</th>
                    <th className="text-center">{Tanggal}</th>
                    <th className="text-center">{Jam}</th>
                    <th className="text-center">
                      <button
                        onClick={() => updateStatus(index.id)}
                        className={`${
                          index.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } text-white p-1 px-3 hover:px-5 transition-all duration-500 rounded-full`}
                      >
                        {index.status}
                      </button>
                    </th>
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
