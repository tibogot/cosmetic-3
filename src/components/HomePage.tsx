import { useEffect, useState } from "react";
import { ShopifyProduct } from "../features/shop/shopify";
import { ShopifyClient } from "../features/shop/shopify";
import { useStore } from "../features/shop/store";
import { ProductCard } from "./ProductCard";

export const HomePage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const shopifyAccess = useStore((state) => state.shopifyAccess);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!shopifyAccess) return;

      const client = new ShopifyClient(
        shopifyAccess.shopDomain,
        shopifyAccess.accessToken
      );

      try {
        const response = await client.getAllProducts({ first: 4 }); // Changed from 3 to 4
        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopifyAccess]);

  return (
    <div className="w-full flex flex-col">
      <section
        className="relative w-full flex-shrink-0 bg-gray-900"
        style={{ height: "calc(100svh - 4rem)" }}
      >
        <img
          src="/Image_26.webp" // This will now look in the public folder
          alt="Hero"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform" }} // Optimize performance
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /> */}
        <div className="absolute bottom-0 w-full">
          <div className="px-4 md:px-8 pb-8 md:pb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white font-neue mb-4">
              Natural Beauty
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-neue max-w-lg">
              Discover our collection of natural and organic cosmetics
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 flex-grow">
        <div className="px-4 md:px-8 ">
          <div className="text-2xl prose prose-lg w-full text-center mx-auto lg:w-2/3">
            <p>
              At COSMETIC, we believe in the power of natural ingredients and
              sustainable beauty practices. Our journey began with a simple
              mission: to provide high-quality, organic cosmetics that enhance
              your natural beauty while caring for our planet.
            </p>
            <p>
              Every product in our collection is carefully crafted using
              ethically sourced ingredients, ensuring both effectiveness and
              environmental responsibility.
            </p>
          </div>
        </div>
      </section>
      <section className="w-ful py-12  flex-grow">
        <div className="px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-12 ">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
            {" "}
            {/* Updated grid */}
            {loading
              ? Array(4) // Changed from 3 to 4
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 aspect-square  mb-4"></div>
                      <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded"></div>
                      <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
                    </div>
                  ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};
