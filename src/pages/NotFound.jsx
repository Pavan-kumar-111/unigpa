import { useNavigate, Link } from 'react-router-dom';
import { FileQuestion, HardHat, ArrowLeft, Home } from 'lucide-react';

export default function NotFound({ type = "404" }) {
  const navigate = useNavigate();

  const content = {
    "404": {
      title: "Page Not Found",
      subtitle: "The page you're looking for doesn't exist or has been moved.",
      icon: <FileQuestion className="h-20 w-20 text-gray-400 mx-auto" />
    },
    "under-development": {
      title: "Under Development",
      subtitle: "We're working hard to bring this feature to you. Stay tuned!",
      icon: <HardHat className="h-20 w-20 text-yellow-500 mx-auto" />
    }
  };

  const { title, subtitle, icon } = content[type] || content["404"];

  return (
    <div className="py-12 sm:py-16 bg-gray-50 flex-grow flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-8 sm:p-10 md:p-14 rounded-[2rem] shadow-sm border border-gray-100 max-w-lg w-full transform transition-all duration-500 translate-y-0 opacity-100">
        <div className="mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
          {icon}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {title}
        </h1>
        
        <p className="text-lg text-gray-500 mb-10">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5 text-gray-500" /> Go Back
          </button>
          
          <Link 
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
