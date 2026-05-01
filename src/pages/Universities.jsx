import UniversityCard from '../components/UniversityCard';

export default function Universities() {
  const universities = [
    {
      id: 'ou',
      name: "Osmania University",
      shortName: "OU",
      description: "Calculate SGPA and CGPA for MCA, MBA, and Degree programs under Osmania University's grading system.",
      link: "/universities/ou",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Osmania_University_Logo.svg/1200px-Osmania_University_Logo.svg.png"
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-gray-50 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            Supported Universities
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Select your university to access tailored GPA calculators that match your specific grading system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {universities.map(uni => (
            <UniversityCard 
              key={uni.id}
              name={uni.name}
              shortName={uni.shortName}
              description={uni.description}
              link={uni.link}
            />
          ))}
          
          {/* Placeholder */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium text-gray-500 mb-1">Don't see yours?</h3>
            <p className="text-sm text-gray-400 mb-4">We're constantly adding new universities.</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Request University
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
