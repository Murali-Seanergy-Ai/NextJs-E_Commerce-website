import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, ShieldCheck, Truck, Clock, Zap } from "lucide-react";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299.00",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Minimalist Smart Watch",
      price: "$199.00",
      rating: 4.9,
      reviews: 86,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      tag: "New"
    },
    {
      id: 3,
      name: "Urban Red Sneakers",
      price: "$149.00",
      rating: 4.7,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      tag: "Trending"
    },
    {
      id: 4,
      name: "Luxury Leather Bag",
      price: "$399.00",
      rating: 4.9,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
      tag: "Premium"
    }
  ];

  const categories = [
    {
      name: "Electronics",
      desc: "Latest gadgets & tech",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800",
      colSpan: "md:col-span-2 md:row-span-2"
    },
    {
      name: "Accessories",
      desc: "Elevate your style",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      colSpan: "md:col-span-1 md:row-span-1"
    },
    {
      name: "Fashion",
      desc: "Trending apparel",
      image: "https://images.unsplash.com/photo-1550614000-4b95d4ed4d90?auto=format&fit=crop&q=80&w=800",
      colSpan: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-poppins">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-neutral-900 dark:to-neutral-950 -z-10" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-sky-100/50 dark:bg-sky-900/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-6 border border-indigo-100 dark:border-indigo-800/50">
                <Zap className="w-4 h-4 fill-indigo-600 dark:fill-indigo-400" />
                <span>Winter Collection 2026 is here</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight">
                Discover Your Next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Obsession</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg leading-relaxed">
                Explore our curated collection of premium products. Quality meets elegance in every piece, designed to elevate your everyday lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/home"
                  className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Collection
                </Link>
                <Link
                  href="#"
                  className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-neutral-800 bg-white border border-neutral-200 hover:bg-neutral-50 dark:text-white dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  Explore Categories
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200"
                alt="Latest Fashion Trends"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-6 left-6 z-20 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-600 dark:text-indigo-400">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white">Rated #1</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">By our customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-12 bg-white dark:bg-neutral-950 border-t border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: Clock, title: "24/7 Support", desc: "Always here for you" },
              { icon: ShieldCheck, title: "Secure Payments", desc: "100% safe checkout" },
              { icon: Star, title: "Premium Quality", desc: "Top grade materials" }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Shop by Category</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Curated collections just for you</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {categories.map((cat, idx) => (
              <div key={idx} className={`relative group rounded-3xl overflow-hidden shadow-lg ${cat.colSpan}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-white/80 mb-4">{cat.desc}</p>
                  <Link
                    href='/home'
                    className="inline-flex items-center px-5 py-2.5 bg-white/20 hover:bg-white text-white hover:text-neutral-900 rounded-full backdrop-blur-sm transition-all text-sm font-semibold"
                  >
                    Explore <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Trending Now</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Our most popular products this week</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative bg-neutral-100 dark:bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/5] mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-bold rounded-full shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full py-3.5 bg-neutral-900/90 backdrop-blur text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg">
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <Link href={`/products/${product.id}`} className="font-bold text-lg text-neutral-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">
                      {product.name}
                    </Link>
                    <span className="font-bold text-lg text-neutral-900 dark:text-white whitespace-nowrap">{product.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-medium text-neutral-700 dark:text-neutral-300 mr-1">{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto bg-neutral-900 dark:bg-neutral-900 rounded-3xl overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=1200"
              alt="Sale Banner"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          <div className="relative z-10 p-12 md:p-24 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Mid-Season Sale</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Get up to 50% off on all items. Exclusive deals on electronics, fashion, and home accessories.
            </p>
            <Link
              href="#"
              className="inline-flex justify-center items-center px-10 py-5 text-lg font-bold text-neutral-900 bg-white hover:bg-neutral-100 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Shop The Sale
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}