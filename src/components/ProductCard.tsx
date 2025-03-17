import { Link } from "react-router-dom";
import { ShopifyProduct } from "../features/shop/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isGLB = product.images[0]?.src.endsWith(".glb");
  const hasSecondImage = product.images.length > 1;

  return (
    <Link to={`/product/${product.handle}`} className="group w-full">
      <div className="aspect-square bg-gray-100  overflow-hidden mb-4 select-none relative">
        {product.images[0] &&
          (isGLB ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">3D Model Available</span>
            </div>
          ) : (
            <>
              <img
                src={product.images[0].src}
                alt={product.images[0].altText || product.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              {hasSecondImage && (
                <img
                  src={product.images[1].src}
                  alt={product.images[1].altText || product.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </>
          ))}
      </div>
      <div className="p-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-lg md:text-xl font-bold text-blue-600">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};
