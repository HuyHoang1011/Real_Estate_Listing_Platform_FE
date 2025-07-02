// src/pages/PropertyDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetPropertyByIdQuery } from '../features/properties/propertiesApi';
import { useCreateContactMutation } from '../features/contacts/contactsApi';
import ContactForm from '../components/ContactForm';

export default function PropertyDetail() {
  const { id } = useParams();
  const { data: property, error, isLoading } = useGetPropertyByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [createContact, { isLoading: isSubmitting }] = useCreateContactMutation();
  
  // Get auth state from Redux
  const { user, accessToken } = useSelector((state) => state.auth);

  if (isLoading) return <p className="text-center mt-20">Đang tải chi tiết bất động sản...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Lỗi tải dữ liệu. Vui lòng thử lại.</p>;
  if (!property) return <p className="text-center mt-20">Không tìm thấy bất động sản.</p>;

  const images = property.images || [];

  const handleContactClick = () => {
    if (!user || !accessToken) {
      setShowAuthPrompt(true);
    } else {
      setShowContactModal(true);
    }
  };

  const handleContactSubmit = async (contactData) => {
    try {
      await createContact({
        propertyId: parseInt(id),
        message: contactData.message
      }).unwrap();
      
      alert('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.');
      setShowContactModal(false);
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.');
      console.error('Contact submission error:', error);
    }
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    window.location.href = '/auth';
  };

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
              <strong>Vị trí:</strong> {property.streetAddress}, {property.ward}, {property.district}, {property.province}
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
            onClick={handleContactClick}
            disabled={isSubmitting}
            className="mt-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isSubmitting ? 'Đang gửi...' : 'Liên hệ người bán'}
          </button>
        </div>
      </div>

      {/* Bản đồ Google Maps (nếu đã tích hợp API) */}
      {/* Ví dụ đơn giản nhúng iframe */}
      {property.streetAddress && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Vị trí trên bản đồ</h2>
          <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden shadow">
            <iframe
              title="Google Maps"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${property.streetAddress}, ${property.ward}, ${property.district}, ${property.province}`
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

      {/* Modal liên hệ */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Liên hệ người bán</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">
                <strong>Bất động sản:</strong> {property.title}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Giá:</strong> {property.price.toLocaleString()} VND
              </p>
            </div>

            <ContactForm
              propertyId={parseInt(id)}
              onSubmit={handleContactSubmit}
            />
          </div>
        </div>
      )}

      {/* Modal yêu cầu đăng nhập */}
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Yêu cầu đăng nhập</h2>
              <button
                onClick={() => setShowAuthPrompt(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Để liên hệ với người bán, bạn cần đăng nhập vào tài khoản của mình.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleLoginRedirect}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Đăng nhập / Đăng ký
                </button>
                <button
                  onClick={() => setShowAuthPrompt(false)}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 transition duration-200"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
