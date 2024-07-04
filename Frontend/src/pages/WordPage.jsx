import { useEffect, useState } from "react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";

export default function WordPage() {
    const [dokumen, setDokumen] = useState([]);

    useEffect(() => {
      getDokumen();
    }, []);
  
    const getDokumen = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dokumen?tipe=file_word");
        setDokumen(response.data);
      } catch (error) {
        console.log("gagal mengambil data", error);
      }
    };
  
    const HapusDokumen = async (Id) => {
      try {
        await axios.delete(`http://localhost:5000/dokumen/${Id}`)
        alert("Dokumen Berhasil Dihapus")
        location.reload()
      } catch (error) {
        alert("Gagal Menghapus Dokumen")
      }
    }
  
    return (
      <>
        <div className="w-full border border-gray-400 bg-white rounded-lg">
          <div className="flex justify-center p-4">
            <table className="w-full">
              <thead>
                <tr>
                <th className="w-6/12 text-center">Nama File</th>
                <th className="w-3/12 text-center">Jenis File</th>
                <th className="w-3/12 text-center">Tanggal Upload</th>
                <th className="w-3/12 text-center">Aksi</th>
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
                return (
                  <tr key={i}>
                    <th className="w-6/12 text-center">
                      <a className="text-black" href={index.url} target="_blank">{index.nama}</a></th>
                    <th className="w-3/12 text-center">{index.tipe}</th>
                    <th className="w-3/12 text-center">{Tanggal}</th>
                    <th className="w-3/12 text-center">
                      <div className="flex justify-center gap-4">
                        <div className="tooltip" data-tip="Hapus">
                          
                            <MdDelete className="cursor-pointer" color="red" size={"1.5rem"} onClick={() => HapusDokumen(index.id)}/>
                          
                        </div>
                        <div className="tooltip" data-tip="Edit">
                          <a href="#">
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
      </>
    );
}
