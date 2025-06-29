import React, { useState } from 'react';
import { useGetPropertiesQuery } from '../features/properties/propertiesApi';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import { FiSearch, FiFilter } from 'react-icons/fi';

const PAGE_SIZE = 12;

export default function Properties() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  // Gọi API với filters, RTK Query sẽ tự động re-fetch khi filters thay đổi
  const { data, error, isLoading } = useGetPropertiesQuery({ ...filters, limit: PAGE_SIZE, page });
  const properties = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    setPage(1); // Reset to first page on new search
  };

  const handleReset = () => {
    setFilters({});
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Danh sách Bất động sản</h1>
      
      {/* SearchBar always visible */}
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách bất động sản...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <FiSearch className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Lỗi tải dữ liệu</h3>
            <p className="text-red-600">Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {!isLoading && !error && (
        <>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {properties && properties.length > 0 
                ? `Tìm thấy ${total} bất động sản`
                : 'Không tìm thấy bất động sản nào'
              }
            </p>
          </div>

          {/* Properties Grid */}
          {properties && properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`px-3 py-1 rounded border ${p === page ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <FiSearch className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Không tìm thấy bất động sản
                </h3>
                <p className="text-gray-500 mb-6">
                  Thử điều chỉnh bộ lọc tìm kiếm hoặc mở rộng phạm vi tìm kiếm của bạn.
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Gợi ý:</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Thử tìm kiếm với từ khóa khác</li>
                    <li>• Mở rộng phạm vi giá</li>
                    <li>• Chọn khu vực khác</li>
                    <li>• Bỏ bớt các bộ lọc</li>
                  </ul>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
