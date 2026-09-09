import React from "react";
import { Ticket, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
          <Ticket className="w-5 h-5" />
          <span>TuneTix</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <span className="flex items-center gap-1">
            <Mail className="w-4 h-4" /> hello@tunetix.com
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        © 2026 TuneTix. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
