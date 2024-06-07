import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [nip, setNIP] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        nip: nip,
        password: password,
        confPassword: confPassword,
      });
      alert ('Registrasi Berhasil')
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-biru-bmkg to-hijau-bmkg">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">Registrasi</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={Register} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama</span>
              </label>
              <input
                type="text"
                placeholder="Masukan Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">NIP</span>
              </label>
              <input
                type="text"
                placeholder="Masukan Nomor NIP Anda"
                value={nip}
                onChange={(e) => setNIP(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Ketik Kembali Password Anda"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Registrasi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
