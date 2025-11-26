const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Restaurant Explorer</p>
      <p className="text-gray-400">Crafted with React, Tailwind, and MongoDB</p>
    </div>
  </footer>
);

export default Footer;

