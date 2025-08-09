import React, { useState } from "react";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Product } from "../interfaces";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../store/cartSlice";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 sm:h-56 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay Actions */}
          <div
            className={`
            absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2 transition-opacity duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          >
            <button
              onClick={handleQuickView}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="Quick View"
            >
              <Eye className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="Add to Wishlist"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "text-red-500 fill-current" : "text-gray-700"
                }`}
              />
            </button>
          </div>

          {/* Sale Badge */}
          {product.rating.rate > 4.5 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Bestseller
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
            {product.category}
          </div>

          {/* Title */}
          <h3 className="font-medium text-gray-900 text-sm leading-5">
            {truncateTitle(product.title, 60)}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating.rate)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.rating.count})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
              title="Add to Cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
