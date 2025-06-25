import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-base text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
			<Image
			  src="/images/logo-2.png"
			  alt="Logo"
			  width={40}
			  height={40}
			  className="h-8 w-auto"
			/>
            <span className="text-xl font-semibold">Brief & CRAFT</span>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-white/80">
            <p>© 2025 AI Agents. Solutions d'intelligence artificielle pour l'ère numérique.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}