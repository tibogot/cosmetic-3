import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, ShopifyClient } from "../features/shop/shopify";
import { useStore } from "../features/shop/store";

interface FeaturedProductProps {
  handle: string;
  className?: string;
}

export const FeaturedProduct = ({
  handle,
  className = "",
}: FeaturedProductProps) => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const shopifyAccess = useStore((state) => state.shopifyAccess);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!shopifyAccess) return;

      const client = new ShopifyClient(
        shopifyAccess.shopDomain,
        shopifyAccess.accessToken
      );

      try {
        const product = await client.getProductByHandle(handle);
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [shopifyAccess, handle]);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-white">
          {product.images[0] && (
            <img
              src={product.images[0].src}
              alt={product.images[0].altText || product.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-4">{product.title}</h3>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-bold mb-8">${product.price}</p>
          <Link
            to={`/product/${product.handle}`}
            className="bg-black text-white py-4 px-8 rounded text-center hover:bg-gray-900 transition-colors"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};
