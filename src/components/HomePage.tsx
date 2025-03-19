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
        className="relative w-full flex-shrink-0 bg-gray-300"
        style={{ height: "calc(100svh - 4rem)" }}
      >
        <img
          src="/image 312.png" // This will now look in the public folder
          // src="/hero shao.png" // This will now look in the public folder
          alt="Hero"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.8]"
          style={{ willChange: "transform" }} // Optimize performance
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /> */}
        <div className="absolute bottom-0 w-full">
          <div className="px-4 md:px-8 pb-8 md:pb-12">
            <h1 className="text-5xl md:text-8xl  text-white mb-4 max-w-lg">
              RADICAL FRAGRANCE
            </h1>
            <p className="text-lg md:text-base text-white/90  max-w-lg uppercase">
              Discover our collection of natural and organic cosmetics
            </p>
          </div>
        </div>
      </section>

      <section className="w-ful py-12  flex-grow">
        <div className="px-4 md:px-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-12 uppercase ">
              Featured Products
            </h2>
            <h2 className="text-l font-bold mb-12 uppercase underline">
              Shop Now
            </h2>
          </div>
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
      <section className="w-full py-12 md:py-20  bg-[#35322B] text-white">
        <div className="px-4 md:px-8">
          <div className="text-xl w-full text-center mx-auto lg:w-1/2 mb-12">
            <p>
              At COSMETIC, we believe in the power of natural ingredients and
              sustainable beauty practices. Our journey began with a simple
              mission: to provide high-quality, organic cosmetics that enhance
              your natural beauty while caring for our planet.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              className="w-[300px] h-[350px] object-cover cursor-pointer mb-12"
              src="https://images.unsplash.com/photo-1731328667980-9ea08c5edc07?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image description"
            />
          </div>
          <h2 className="text-l font-bold  flex justify-center underline uppercase">
            Shop Now
          </h2>
        </div>
      </section>

      <section
        className="w-full min-h-screen px-4 md:px-8 flex flex-col md:flex-row py-12 md:py-20"
        id="doubleimg"
      >
        <div className="flex-1 relative min-h-[50vh] md:min-h-full mb-4 md:mb-0">
          {/* Image - Absolute Positioned */}
          <img
            className="absolute inset-0 w-full h-full object-cover grayscale"
            src="https://images.unsplash.com/photo-1731328667980-9ea08c5edc07?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image description"
          />

          {/* Text Container - Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-4 md:p-8 w-full md:w-2/3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Your Text Here
              </h1>
              <p className="text-sm md:text-base lg:text-lg">
                Our journey began with a simple mission: to provide
                high-quality.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative min-h-[50vh] md:min-h-full">
          <img
            className="w-full h-full object-cover absolute inset-0"
            src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image description"
          />
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="px-4 md:px-8">
          <div className=" w-full text-center mx-auto lg:w-1/3 mb-12  font-bold">
            <p className="text-xl uppercase">
              At COSMETIC, we believe in the power of natural ingredients and
              sustainable beauty practices.
            </p>
            <p className="text-sm py-4 mx-auto max-w-xs">
              At COSMETIC, we believe in the power of natural ingredients and
              sustainable beauty practices.
            </p>
          </div>
          <h2 className="text-l font-bold  flex justify-center underline uppercase">
            Shop Now
          </h2>
        </div>
      </section>
      <section className="w-ful py-12  flex-grow">
        <div className="px-4 md:px-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-12 uppercase ">
              Featured Products
            </h2>
            <h2 className="text-l font-bold mb-12 uppercase underline">
              Shop Now
            </h2>
          </div>
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
      <section className="w-full h-[80vh]  ">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image description"
        />
      </section>

      <section className=" py-12 flex-grow bg-gray-300">
        <div className="px-4 md:px-8">
          <h2 className="text-2xl font-bold mb-12">Our Mission</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4">Sustainable Beauty</h3>
              <p>
                Our commitment to sustainability goes beyond our products. We
                strive to minimize our environmental impact at every stage of
                production, from sourcing ingredients to packaging.
              </p>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4">Natural Ingredients</h3>
              <p>
                We believe that nature provides the best solutions for healthy
                skin. That's why we use only the finest natural ingredients in
                our products, free from harmful chemicals and toxins.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
