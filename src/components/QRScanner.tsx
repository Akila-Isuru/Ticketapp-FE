import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  active: boolean;
}

const SCANNER_ELEMENT_ID = "qr-scanner-region";

const QRScanner: React.FC<QRScannerProps> = ({ onScan, active }) => {
  const onScanRef = useRef(onScan);
  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  const queueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let hasScanned = false;
    const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID);

    queueRef.current = queueRef.current.then(async () => {
      if (cancelled) return;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (hasScanned) return;
            hasScanned = true;
            onScanRef.current(decodedText);
          },
          () => {},
        );
      } catch (err) {
        console.error("Failed to start camera:", err);
      }
    });

    return () => {
      cancelled = true;

      queueRef.current = queueRef.current.then(async () => {
        try {
          if (scanner.isScanning) {
            await scanner.stop();
          }
          scanner.clear();
        } catch (err) {
          console.warn("Error while stopping scanner:", err);
        }
      });
    };
  }, [active]);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-gray-200 bg-black">
      <div id={SCANNER_ELEMENT_ID} className="w-full min-h-[300px]" />
    </div>
  );
};

export default QRScanner;
