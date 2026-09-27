import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  active: boolean;
}

const SCANNER_ELEMENT_ID = "qr-scanner-region";

const QRScanner: React.FC<QRScannerProps> = ({ onScan, active }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      if (!active) return;

      if (scannerRef.current) {
        try {
          if (scannerRef.current.isScanning) {
            await scannerRef.current.stop();
          }
          scannerRef.current.clear();
        } catch (e) {
          console.warn("Error cleaning up previous scanner", e);
        }
      }

      const element = document.getElementById(SCANNER_ELEMENT_ID);
      if (!element || !isMounted) return;

      const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID);
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            if (isMounted) {
              onScan(decodedText);
            }
          },
          () => {},
        );
      } catch (err) {
        console.error("Failed to start camera:", err);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          scannerRef.current
            .stop()
            .then(() => {
              scannerRef.current?.clear();
            })
            .catch((err) => console.error("Failed to stop scanner", err));
        } else {
          scannerRef.current.clear();
        }
      }
    };
  }, [active, onScan]);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-gray-200 bg-black">
      <div id={SCANNER_ELEMENT_ID} className="w-full min-h-[300px]" />
    </div>
  );
};

export default QRScanner;
