import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-3 mb-8 group cursor-pointer">
            <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
              <FontAwesomeIcon icon={faBlog} className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white uppercase">
              BLOG<span className="text-indigo-500">.</span>
            </span>
          </div>
          
          <p className="max-w-md text-slate-500 font-medium mb-10 leading-relaxed">
            A premium platform for sharing digital transmissions, cosmic ideas, and profound experiences with the nexus.
          </p>
          
          <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-10"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl text-[11px] text-slate-600 font-black tracking-[0.2em] uppercase space-y-6 md:space-y-0">
            <p className="hover:text-slate-400 transition-colors">
              © {new Date().getFullYear()} NEXUS BLOG MODULE. ALL RIGHTS RESERVED.
            </p>
            <p className="flex items-center group">
              DEVELOPED WITH <FontAwesomeIcon icon={faHeart} className="mx-2 text-red-500/60 group-hover:text-red-500 transition-colors animate-pulse" /> BY MOHAMED EYADA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
