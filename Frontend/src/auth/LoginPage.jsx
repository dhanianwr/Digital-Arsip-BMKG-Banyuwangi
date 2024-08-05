import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import logo from "../assets/logo-bmkg-no-text.png";

export const LoginPage = () => {

    const [nip, setNIP] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const Auth = async(e) => {
      e.preventDefault();
      try {
          await axios.post('https://be-digi-bwi.vercel.app/login', {
              nip: nip,
              password: password,
          });
          alert("Login Berhasil")
          navigate("/");
      } catch (error) {
          if(error.response){
              alert("Login gagal. Periksa kembali nip dan password anda");
          }
      }
  }

  return (
    <>
      <div className="hero min-h-screen bg-gradient-to-r from-biru-bmkg to-hijau-bmkg">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="flex justify-center pb-6 flex-col items-center">
              <img className="w-24 border border-white stroke-2 rounded-full" src={logo} alt="" />
              <p className="text-xl font-semibold text-white">Stamet Banyuwangi Kelas III</p>
            </div>
            <h1 className="text-5xl font-bold text-white">Login Form</h1>
            <p className="py-6 text-white">
              Untuk Mengakses Halaman Ini, Harap Login Terlebih Dahulu
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={Auth} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nomor Induk Pegawai</span>
                </label>
                <input
                  type="text"
                  placeholder="nip"
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
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
