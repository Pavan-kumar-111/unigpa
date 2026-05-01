import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-gray-900 font-semibold">© {new Date().getFullYear()} UniGPA Calculator. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
              About & Disclaimer
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> This application is an independent tool and is not officially affiliated with Osmania University or any other institution. The calculated SGPA, CGPA, and Percentage are estimates for informational purposes only. Always refer to your official university memorandum of marks for verified results.
          </p>
        </div>
      </div>
    </footer>
  );
}
