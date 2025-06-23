// src/pages/PropertyDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPropertyByIdQuery } from '../features/properties/propertiesApi';

export default function PropertyDetail() {
  const { id } = useParams();
  const { data: property, error, isLoading } = useGetPropertyByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <p className="text-center mt-20">Đang tải chi tiết bất động sản...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Lỗi tải dữ liệu. Vui lòng thử lại.</p>;
  if (!property) return <p className="text-center mt-20">Không tìm thấy bất động sản.</p>;

  const images = property.images || [];

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-4xl font-bold mb-6">{property.title}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Ảnh lớn bên trái */}
        <div className="md:w-2/3 rounded shadow-lg overflow-hidden">
          <img
            src={selectedImage || images[0] || '/placeholder.jpg'}
            alt={property.title}
            className="w-full h-[400px] object-cover"
          />
          {/* Ảnh phụ */}
          {images.length > 1 && (
            <div className="flex mt-4 space-x-4 overflow-x-auto">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${property.title} ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    selectedImage === img || (!selectedImage && idx === 0)
                      ? 'border-blue-600'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thông tin chi tiết bên phải */}
        <div className="md:w-1/3 flex flex-col justify-between">
          <div>
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              {property.price.toLocaleString()} VND
            </p>
            <p className="mb-2">
              <strong>Vị trí:</strong> {property.location}
            </p>
            <p className="mb-2">
              <strong>Diện tích:</strong> {property.area} m²
            </p>
            <p className="mb-2">
              <strong>Phòng ngủ:</strong> {property.bedrooms}
            </p>
            <p className="mb-2">
              <strong>Phòng tắm:</strong> {property.bathrooms}
            </p>

            <p className="mt-4 whitespace-pre-line">{property.description}</p>
          </div>

          {/* Nút liên hệ */}
          <button
            onClick={() => alert('Chức năng liên hệ đang phát triển!')}
            className="mt-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Liên hệ người bán
          </button>
        </div>
      </div>

      {/* Bản đồ Google Maps (nếu đã tích hợp API) */}
      {/* Ví dụ đơn giản nhúng iframe */}
      {property.location && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Vị trí trên bản đồ</h2>
          <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden shadow">
            <iframe
              title="Google Maps"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                property.location
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
