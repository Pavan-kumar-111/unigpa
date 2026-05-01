import { useEffect } from 'react';
import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export default function About() {
  useEffect(() => {
    // SEO Best Practices: Updating the document title for search engines
    document.title = "About & Disclaimer | UniGPA Calculator";
  }, []);

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-white flex-grow">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            About UniGPA Calculator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            A fast, modern, and highly accurate academic tool for university students.
          </p>
        </div>

        {/* Content Section */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg prose-blue max-w-none text-gray-700 space-y-6 sm:space-y-8">
          <section className="bg-blue-50 p-5 sm:p-6 rounded-2xl border border-blue-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center mb-3 sm:mb-4">
              <Info className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              Our Mission
            </h2>
            <p>
              UniGPA Calculator was created to provide a seamless, accurate, and ad-free experience for students aiming to calculate their Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA). We strictly follow the Choice Based Credit System (CBCS) grading rules and regulations as mandated by supported universities.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Why Use UniGPA?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Absolute Accuracy:</strong> Calculations are strictly based on the officially published university syllabi and credit schemes.</li>
              <li><strong>Dynamic Electives:</strong> We support complex elective selections, laboratories, and internship credits to ensure your calculation perfectly matches your actual coursework.</li>
              <li><strong>Privacy First:</strong> Your academic data never leaves your browser. We do not store, track, or harvest your grades.</li>
              <li><strong>Mobile Responsive:</strong> Calculate your grades on the go, beautifully formatted for any device.</li>
            </ul>
          </section>

          {/* SEO Optimized Disclaimer Section */}
          <section className="bg-yellow-50 p-5 sm:p-6 rounded-2xl border border-yellow-200 mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center mb-3 sm:mb-4">
              <AlertTriangle className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              Legal Disclaimer
            </h2>
            <div className="text-sm space-y-4">
              <p>
                <strong>Not an Official University Tool:</strong> UniGPA Calculator is an independent, third-party utility. It is not affiliated with, endorsed by, or officially connected to Osmania University or any other academic institution listed herein.
              </p>
              <p>
                <strong>Informational Purposes Only:</strong> The SGPA, CGPA, and Percentage results provided by this application are estimations intended solely for your personal tracking and convenience. 
              </p>
              <p>
                <strong>No Liability:</strong> While we strive for 100% precision by using publicly available academic schemas, we cannot guarantee the complete accuracy of the output. The developer assumes no responsibility or liability for any errors, omissions, or academic decisions made based on the calculations from this site. Always refer to your official university transcripts, memorandums of marks, and university administration for your certified grades.
              </p>
            </div>
          </section>
          
          <section className="bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center mb-3 sm:mb-4">
              <ShieldCheck className="mr-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              Privacy Policy & SEO Compliance
            </h2>
            <p className="text-sm">
              In compliance with SEO best practices and data privacy regulations, this platform is a client-side only application. We employ modern semantics, proper heading structures, and accessibility standards to ensure content is universally accessible.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
