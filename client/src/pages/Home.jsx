// src/pages/Home.jsx
import React from 'react';
import { useGetPropertiesQuery } from '../features/properties/propertiesApi';
import Banner from '../components/Banner';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  // Lấy dữ liệu 8 bất động sản mới nhất từ RTK Query
  const { data, error, isLoading } = useGetPropertiesQuery({ limit: 8, sort: 'newest' });
  const properties = data?.data || [];
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/properties");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Banner />

      <section className="container mx-auto px-4 mt-12 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Dự án bất động sản mới nhất</h2>

        {isLoading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="text-cta">Lỗi tải dữ liệu</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-cta text-white rounded-md hover:bg-cta-hover transition"
          >
            Xem thêm
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
