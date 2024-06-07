import React from "react";
import { RiAdminFill } from "react-icons/ri";

export default function HeaderDash() {
  
  return (
    <div className="navbar bg-white border border-gray-400 rounded-lg">
      <div className="flex justify-center items-center flex-1">
        <h3 className="hover:no-underline text-stone-900 text-wrap text-center font-semibold text-xl cursor-default">
          Website Digital Arsip BMKG Banyuwangi
        </h3>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
                <RiAdminFill size="2.5rem" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="hover:no-underline text-slate-900">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
