import { Link } from 'react-router-dom';
import { Calculator, Award, Percent } from 'lucide-react';
import UniversityCard from '../components/UniversityCard';
import ouLogo from "../assets/ou-logo.png";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem-100px)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight break-words">
            GPA Calculator for <span className="text-blue-600">All Universities</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10">
            Fast, accurate, and easy-to-use academic calculator designed specifically for your university's grading system.
          </p>
          <Link
            to="/universities"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Select University
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 h-full">
              <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">SGPA Calculator</h3>
              <p className="text-sm sm:text-base text-gray-600">Calculate your Semester Grade Point Average accurately based on your course credits and grades.</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 h-full">
              <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Award className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">CGPA Calculator</h3>
              <p className="text-sm sm:text-base text-gray-600">Track your Cumulative Grade Point Average across multiple semesters to monitor your overall progress.</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 h-full">
              <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Percent className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Percentage Converter</h3>
              <p className="text-sm sm:text-base text-gray-600">Easily convert your CGPA to percentage format for job applications and higher education requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Popular Universities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <UniversityCard
              name="Osmania University"
              shortName="OU"
              description="Calculate SGPA and CGPA for MCA, MBA, and Degree programs under Osmania University."
              link="/universities/ou"
              logoUrl={ouLogo}
            />
            {/* Placeholders for future */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-200 p-6 opacity-60 flex flex-col items-center justify-center text-center min-h-[200px]">
              <h3 className="text-lg font-bold text-gray-500 mb-2">More Universities</h3>
              <p className="text-sm text-gray-400">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
