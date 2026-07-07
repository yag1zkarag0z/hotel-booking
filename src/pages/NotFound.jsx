import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 pt-24 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
          Error 404
        </p>
        <h1 className="mt-3 font-playfair text-5xl text-slate-900 md:text-7xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-500">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
