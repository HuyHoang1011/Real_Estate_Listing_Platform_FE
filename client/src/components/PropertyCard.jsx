import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded shadow hover:shadow-lg transition p-4"
    >
      <img
        src={property.images?.[0] || '/placeholder.jpg'}
        alt={property.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
      <p className="text-gray-700">{property.location}</p>
      <p className="text-blue-600 font-bold">
        {property.price.toLocaleString()} VND
      </p>
    </div>
  );
}
