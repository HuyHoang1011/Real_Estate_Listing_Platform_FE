import React from "react";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={property.images?.[0] || "/placeholder.jpg"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.location}</p>
        <p className="text-blue-600 font-bold">${property.price.toLocaleString()}</p>
        <p className="text-gray-700 text-sm">{property.area} m²</p>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{property.description}</p>
      </div>
    </div>
  );
}
