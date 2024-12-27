"use client";
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  CornerDotType,
  Options,
} from "qr-code-styling";

const CustomQr: React.FC<any> = ({ qrCodeData, id }) => {
  const ref = useRef<any>(null);
  const [options, setOptions] = useState<Options>({
    width: 350,
    height: 350,
    type: "svg" as DrawType,
    data: qrCodeData,
    image: "",
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "H" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.1,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      type: "rounded",
      color: "#000000",
    },
    backgroundOptions: {
      color: "#FEFEFE",
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#000000",
    },
    cornersDotOptions: {
      color: "#000000",
      type: "dot" as CornerDotType,
    },
  });
  const [fileExt, setFileExt] = useState<any>("svg");
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
    qrCode.update({
      data: qrCodeData,
    });
  }, [qrCodeData, ref]);

  // useEffect(() => {
  // 	qrCode.update({
  // 		data: qrCodeData,
  // 	})
  // }, [qrCodeData])

  if (!qrCodeData) return null;

  return <div className="rounded-lg" id={id} ref={ref} />;
};

export default CustomQr;
