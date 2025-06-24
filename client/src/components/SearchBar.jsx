import React, { useState } from 'react';

const PROPERTY_TYPES = [
  { value: '', label: 'Tất cả loại hình' },
  { value: 'house', label: 'Nhà ở' },
  { value: 'apartment', label: 'Căn hộ' },
  { value: 'land', label: 'Đất' },
];

export default function SearchBar({ onSearch, onReset }) {
  const [keyword, setKeyword] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      keyword,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minArea: minArea ? Number(minArea) : undefined,
      maxArea: maxArea ? Number(maxArea) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      propertyType: propertyType || undefined,
    });
  };

  const handleReset = () => {
    setKeyword('');
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setMaxArea('');
    setBedrooms('');
    setPropertyType('');
    onReset?.(); // gọi callback reset nếu có
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white shadow-md rounded-lg mb-6"
    >
      <input
        type="text"
        placeholder="Tìm kiếm từ khóa..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {PROPERTY_TYPES.map((type) => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Giá từ (triệu)"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Giá đến (triệu)"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Diện tích từ (m²)"
        value={minArea}
        onChange={(e) => setMinArea(e.target.value)}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Diện tích đến (m²)"
        value={maxArea}
        onChange={(e) => setMaxArea(e.target.value)}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Số phòng ngủ"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tìm kiếm
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Xóa lọc
        </button>
      </div>
    </form>
  );
}
