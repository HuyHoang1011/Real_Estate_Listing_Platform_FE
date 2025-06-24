import React, { useState } from 'react';
import { useGetPropertiesQuery } from '../features/properties/propertiesApi';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';

export default function Properties() {
  const [filters, setFilters] = useState({});

  // Gọi API với filters, RTK Query sẽ tự động re-fetch khi filters thay đổi
  const { data: properties, error, isLoading } = useGetPropertiesQuery(filters);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  if (isLoading) return <p className="text-center mt-20">Đang tải danh sách bất động sản...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Lỗi tải dữ liệu</p>;
  if (!properties || properties.length === 0) return <p className="text-center mt-20">Chưa có bất động sản nào.</p>;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Danh sách Bất động sản</h1>
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
