import React, { useState } from "react";
import { ScanLine } from "lucide-react";
import API from "../api";
import QRScanner from "../components/QRScanner";
import CheckInResultCard from "../components/CheckInResultCard";

interface ScanResult {
  status: "success" | "error";
  message: string;
  eventTitle?: string;
  ticketCount?: number;
}

const AdminCheckIn: React.FC = () => {
  const [scannerActive, setScannerActive] = useState(true);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (decodedText: string) => {
    setScannerActive(false);

    try {
      const response = await API.put(`/bookings/checkin/${decodedText}`);
      const data = response.data.data;

      setResult({
        status: "success",
        message: "This ticket is valid for today's event.",
        eventTitle: data.eventTitle,
        ticketCount: data.ticketCount,
      });
    } catch (error: any) {
      setResult({
        status: "error",
        message:
          error.response?.data?.message || "Could not verify this ticket.",
      });
    }
  };

  const handleScanNext = () => {
    setResult(null);
    setScannerActive(true);
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="flex items-center gap-2 mb-6">
        <ScanLine className="w-6 h-6 text-indigo-600" />
        <h1 className="text-2xl font-bold text-slate-800">Ticket Check-In</h1>
      </div>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Point the camera at a guest's ticket QR code to verify entry.
      </p>

      {scannerActive ? (
        <QRScanner onScan={handleScan} active={scannerActive} />
      ) : (
        <div className="w-full max-w-sm mx-auto aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Camera paused
        </div>
      )}

      {result && (
        <>
          <CheckInResultCard {...result} />
          <button
            onClick={handleScanNext}
            className="w-full max-w-sm mx-auto mt-4 block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
          >
            Scan Next Ticket
          </button>
        </>
      )}
    </div>
  );
};

export default AdminCheckIn;
