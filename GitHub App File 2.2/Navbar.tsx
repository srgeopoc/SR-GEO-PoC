import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-4 md:mb-0">
          <Link to="/" className="hover:text-blue-300 transition-colors">
            SR-GEO-PoC Theory Review
          </Link>
        </div>
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/comprehensive-review" className="hover:text-blue-300 transition-colors">
              Comprehensive Review
            </Link>
          </li>
          <li>
            <Link to="/evaluation" className="hover:text-blue-300 transition-colors">
              Scientific Evaluation
            </Link>
          </li>
          <li>
            <Link to="/analysis" className="hover:text-blue-300 transition-colors">
              Analysis Notes
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-300 transition-colors">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
