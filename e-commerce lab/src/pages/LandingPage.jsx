import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="text-center max-w-3xl">
        <h2 className="text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-4">
          Build Your Dream Wardrobe
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Start dressing beautifully.
          <br />
          Grow your confidence.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Get everything you need to build, run and scale your personal style on
          one unified platform. Explore our curated collections.
        </p>
        <Link
          to="/products"
          className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Explore Store
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
