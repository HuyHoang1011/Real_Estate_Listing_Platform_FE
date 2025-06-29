import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX, FiMapPin, FiHome, FiDollarSign, FiMaximize2 } from 'react-icons/fi';

const PROPERTY_TYPES = [
  { value: '', label: 'Tất cả loại hình' },
  { value: 'apartment', label: 'Căn hộ' },
  { value: 'house', label: 'Nhà ở' },
  { value: 'villa', label: 'Biệt thự' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'area_asc', label: 'Diện tích tăng dần' },
  { value: 'area_desc', label: 'Diện tích giảm dần' },
];

const PROVINCES = [
  { value: '', label: 'Tất cả tỉnh/thành' },
  { value: 'TP.HCM', label: 'TP. Hồ Chí Minh' },
  { value: 'Hà Nội', label: 'Hà Nội' },
  { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  { value: 'Cần Thơ', label: 'Cần Thơ' },
];

const DISTRICTS = {
  'TP.HCM': [
    { value: '', label: 'Tất cả quận/huyện' },
    { value: 'Quận 1', label: 'Quận 1' },
    { value: 'Quận 2', label: 'Quận 2' },
    { value: 'Quận 3', label: 'Quận 3' },
    { value: 'Quận 4', label: 'Quận 4' },
    { value: 'Quận 5', label: 'Quận 5' },
    { value: 'Quận 6', label: 'Quận 6' },
    { value: 'Quận 7', label: 'Quận 7' },
    { value: 'Quận 8', label: 'Quận 8' },
    { value: 'Quận 9', label: 'Quận 9' },
    { value: 'Quận 10', label: 'Quận 10' },
    { value: 'Quận 11', label: 'Quận 11' },
    { value: 'Quận 12', label: 'Quận 12' },
    { value: 'Quận Bình Thạnh', label: 'Quận Bình Thạnh' },
    { value: 'Quận Tân Bình', label: 'Quận Tân Bình' },
    { value: 'Quận Phú Nhuận', label: 'Quận Phú Nhuận' },
    { value: 'Quận Gò Vấp', label: 'Quận Gò Vấp' },
  ],
  'Hà Nội': [
    { value: '', label: 'Tất cả quận/huyện' },
    { value: 'Ba Đình', label: 'Ba Đình' },
    { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm' },
    { value: 'Hai Bà Trưng', label: 'Hai Bà Trưng' },
    { value: 'Đống Đa', label: 'Đống Đa' },
    { value: 'Tây Hồ', label: 'Tây Hồ' },
    { value: 'Cầu Giấy', label: 'Cầu Giấy' },
    { value: 'Thanh Xuân', label: 'Thanh Xuân' },
    { value: 'Hoàng Mai', label: 'Hoàng Mai' },
    { value: 'Long Biên', label: 'Long Biên' },
    { value: 'Nam Từ Liêm', label: 'Nam Từ Liêm' },
    { value: 'Bắc Từ Liêm', label: 'Bắc Từ Liêm' },
  ],
};

export default function SearchBar({ onSearch, onReset }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    propertyType: '',
    province: '',
    district: '',
    ward: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    bedrooms: '',
    sort: 'newest',
  });

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchFilters = { ...filters };
    
    // Convert empty strings to undefined for API
    Object.keys(searchFilters).forEach(key => {
      if (searchFilters[key] === '') {
        searchFilters[key] = undefined;
      }
    });

    // Convert numeric fields
    if (searchFilters.minPrice) searchFilters.minPrice = Number(searchFilters.minPrice);
    if (searchFilters.maxPrice) searchFilters.maxPrice = Number(searchFilters.maxPrice);
    if (searchFilters.minArea) searchFilters.minArea = Number(searchFilters.minArea);
    if (searchFilters.maxArea) searchFilters.maxArea = Number(searchFilters.maxArea);
    if (searchFilters.bedrooms) searchFilters.bedrooms = Number(searchFilters.bedrooms);

    onSearch(searchFilters);
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      propertyType: '',
      province: '',
      district: '',
      ward: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      bedrooms: '',
      sort: 'newest',
    });
    onReset?.();
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '' && value !== 'newest').length;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-6">
      {/* Main Search Bar */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Keyword Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, địa chỉ..."
              value={filters.keyword}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Property Type */}
          <div className="lg:w-48">
            <select
              value={filters.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Province */}
          <div className="lg:w-48">
            <select
              value={filters.province}
              onChange={(e) => {
                handleInputChange('province', e.target.value);
                handleInputChange('district', '');
                handleInputChange('ward', '');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {PROVINCES.map((province) => (
                <option key={province.value} value={province.value}>{province.label}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiSearch />
              Tìm kiếm
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <FiFilter />
              Bộ lọc
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* District */}
              <div className="col-span-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quận/Huyện</label>
                <select
                  value={filters.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  disabled={!filters.province}
                >
                  {(DISTRICTS[filters.province] || [{ value: '', label: 'Chọn tỉnh/thành trước' }]).map((district) => (
                    <option key={district.value} value={district.value}>{district.label}</option>
                  ))}
                </select>
              </div>

              {/* Ward */}
              <div className="col-span-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phường/Xã</label>
                <input
                  type="text"
                  placeholder="Nhập phường/xã..."
                  value={filters.ward}
                  onChange={(e) => handleInputChange('ward', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                />
              </div>

              {/* Price Range */}
              <div className="col-span-2 min-w-0 flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">Giá (triệu VND)</label>
                <div className="flex gap-2 min-w-0">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={filters.minPrice}
                    onChange={(e) => handleInputChange('minPrice', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={filters.maxPrice}
                    onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  />
                </div>
              </div>

              {/* Area Range */}
              <div className="col-span-2 min-w-0 flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">Diện tích (m²)</label>
                <div className="flex gap-2 min-w-0">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={filters.minArea}
                    onChange={(e) => handleInputChange('minArea', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={filters.maxArea}
                    onChange={(e) => handleInputChange('maxArea', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="col-span-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">Số phòng ngủ</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                >
                  <option value="">Tất cả</option>
                  <option value="1">1 phòng</option>
                  <option value="2">2 phòng</option>
                  <option value="3">3 phòng</option>
                  <option value="4">4 phòng</option>
                  <option value="5">5+ phòng</option>
                </select>
              </div>

              {/* Sort */}
              <div className="col-span-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleInputChange('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FiX />
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
