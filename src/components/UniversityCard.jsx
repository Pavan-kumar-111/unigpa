import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';

export default function UniversityCard({ name, shortName, description, link, logoUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden p-1 border border-blue-100/50">
          {logoUrl ? (
            <img src={logoUrl} alt={`${shortName} Logo`} className="w-full h-full object-contain" />
          ) : (
            <Building2 className="h-6 w-6 text-blue-600" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{shortName}</h3>
          <p className="text-sm text-gray-500">{name}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-6 line-clamp-2">
        {description}
      </p>
      <Link 
        to={link}
        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
      >
        Select University <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}
