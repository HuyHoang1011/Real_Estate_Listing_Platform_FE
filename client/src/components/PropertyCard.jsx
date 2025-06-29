import React from 'react';
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} from '../features/favorites/favoritesApi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // icon trái tim

export default function PropertyCard({ property }) {
  const { data: favorites } = useGetFavoritesQuery();

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // Kiểm tra property này đã có trong favorites chưa
  const isFavorite = favorites?.some(fav => fav.propertyId === property.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property.id);
    }
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition relative">
      {/* Trái tim yêu thích */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-2xl focus:outline-none"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? (
          <AiFillHeart className="text-red-600" />
        ) : (
          <AiOutlineHeart className="text-gray-400 hover:text-red-500" />
        )}
      </button>

      {/* Thông tin property */}
      <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-2">{property.title}</h3>
      <p className="text-gray-600 mt-1">
        {property.streetAddress}, {property.ward}, {property.district}, {property.province}
      </p>
      <p className="mt-2 font-bold">{property.price} tỷ</p>
      {/* Thêm các thông tin khác nếu muốn */}
    </div>
  );
}
