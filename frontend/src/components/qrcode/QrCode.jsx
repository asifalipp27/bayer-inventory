import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = ({ url, size }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <QRCodeSVG  value={url} size={size ?? 75} />
    </div>
  );
};

export default QRCodeGenerator;
