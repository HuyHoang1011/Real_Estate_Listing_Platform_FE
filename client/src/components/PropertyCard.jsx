import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} from '../features/favorites/favoritesApi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // icon trái tim

export default function PropertyCard({ property, hideFavorite = false }) {
  const navigate = useNavigate();
  const { data: favorites } = useGetFavoritesQuery();

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // Kiểm tra property này đã có trong favorites chưa
  const isFavorite = favorites?.some(fav => fav.propertyId === property.id);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    if (isFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div 
      className="border border-accent rounded p-4 shadow hover:shadow-lg transition relative cursor-pointer bg-accent-light flex flex-col"
      onClick={handleCardClick}
    >
      {/* Image */}
      <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover rounded mb-3" />

      {/* Title and Heart */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xl font-semibold truncate mr-2">{property.title}</h3>
        {!hideFavorite && (
          <button
            onClick={toggleFavorite}
            className="text-2xl focus:outline-none z-10 p-1 hover:bg-accent rounded-full"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <AiFillHeart className="text-cta" />
            ) : (
              <AiOutlineHeart className="text-gray-400 hover:text-cta" />
            )}
          </button>
        )}
      </div>

      {/* Address */}
      <p className="text-gray-600 mt-1 text-sm truncate">
        {property.streetAddress}, {property.ward}, {property.district}, {property.province}
      </p>
      <p className="mt-2 font-bold text-lg">{property.price} triệu</p>
      {/* Thêm các thông tin khác nếu muốn */}
    </div>
  );
}
