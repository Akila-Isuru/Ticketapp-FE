import React from "react";
import { Train, Bus } from "lucide-react";

const EventTransportLinks: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-3">Getting There</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href="https://pravesha.lk/en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition"
        >
          <Train className="w-5 h-5 text-slate-700" />
          <div>
            <p className="font-semibold text-slate-800 text-sm">Book a Train</p>
            <p className="text-xs text-gray-400">Sri Lanka Railways</p>
          </div>
        </a>

        <a
          href="https://www.busticket.gov.lk/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition"
        >
          <Bus className="w-5 h-5 text-slate-700" />
          <div>
            <p className="font-semibold text-slate-800 text-sm">Book a Bus</p>
            <p className="text-xs text-gray-400">SLTB Online Booking</p>
          </div>
        </a>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Transport links are provided for convenience. Availability and schedules
        are managed by the respective operators.
      </p>
    </div>
  );
};

export default EventTransportLinks;
