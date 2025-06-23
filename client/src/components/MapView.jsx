import React from "react";

export default function MapView({ latitude, longitude }) {
  return (
    <div className="w-full h-64 rounded-md overflow-hidden shadow-md">
      {/* Google Maps sẽ được tích hợp ở đây */}
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
        allowFullScreen
        title="property-location"
      />
    </div>
  );
}

