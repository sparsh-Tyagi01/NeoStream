const Footer = () => {
  return (
    <>
      <footer className="bg-zinc-900 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-3">NeoStream</h1>
            <p className="text-sm text-gray-400">
              Your ultimate movie destination. Watch latest movies, trailers,
              and explore more.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Support</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-400"
              >
                📸
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400">
                🐦
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-red-500">
                ▶️
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-blue-600">
                📘
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} NeoStream. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
