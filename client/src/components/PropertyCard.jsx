// src/components/PropertyCard.jsx
import React from "react";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded-md overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
      <img
        src={property.images?.[0] || "/placeholder.jpg"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
        <p className="text-sm text-gray-600 mb-2 truncate">{property.description}</p>
        <p className="text-blue-600 font-bold">{property.price.toLocaleString()} VND</p>
      </div>
    </div>
  );
}
