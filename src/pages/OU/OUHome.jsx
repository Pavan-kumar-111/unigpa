import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, GraduationCap, ArrowLeft } from 'lucide-react';

export default function OUHome() {
  const programs = [
    {
      id: 'mca',
      name: 'MCA',
      fullName: 'Master of Computer Applications',
      icon: <BookOpen className="h-8 w-8" />,
      link: '/universities/ou/mca',
      status: 'Available'
    },
    {
      id: 'mba',
      name: 'MBA',
      fullName: 'Master of Business Administration',
      icon: <Briefcase className="h-8 w-8" />,
      link: '/universities/ou/mba',
      status: 'Coming Soon'
    },
    {
      id: 'degree',
      name: 'Degree',
      fullName: 'B.Sc, B.Com, B.A (Undergraduate)',
      icon: <GraduationCap className="h-8 w-8" />,
      link: '/universities/ou/degree',
      status: 'Coming Soon'
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-gray-50 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Link to="/universities" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Universities
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 text-2xl sm:text-3xl font-bold">
              OU
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Osmania University</h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl">
                Select your program to calculate your SGPA and CGPA according to Osmania University's latest 10-point CBCS grading system.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Available Programs</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map(program => (
            <div key={program.id} className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col h-full ${program.status === 'Available' ? 'border-gray-200 hover:shadow-md hover:border-blue-300 transition-all' : 'border-gray-100 opacity-75'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${program.status === 'Available' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                  {program.icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${program.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {program.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{program.name}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">{program.fullName}</p>
              
              {program.status === 'Available' ? (
                <Link 
                  to={program.link}
                  className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Open Calculator
                </Link>
              ) : (
                <button 
                  disabled
                  className="w-full text-center px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                >
                  Not Available
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
