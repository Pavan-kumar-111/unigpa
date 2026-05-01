import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Menu, X, ChevronRight, ChevronDown, Building2, School, GraduationCap } from 'lucide-react';
import { universitiesData } from '../data/universities';

const IconMap = {
  Building2,
  School,
  GraduationCap
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredUniversity, setHoveredUniversity] = useState(null);
  const [expandedMobileUni, setExpandedMobileUni] = useState(null);
  
  const location = useLocation();
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' 
        ? "text-blue-600 font-bold bg-blue-50" 
        : "text-gray-600 hover:text-blue-600 font-medium";
    }
    return location.pathname.startsWith(path)
      ? "text-blue-600 font-bold bg-blue-50" 
      : "text-gray-600 hover:text-blue-600 font-medium";
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
    if (!hoveredUniversity) setHoveredUniversity(universitiesData[0].id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 150); // Small delay to prevent flicker when moving between panels
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">UniGPA Calculator</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 h-full">
              <Link to="/" className={`transition-colors ${isActive('/').replace('bg-blue-50', '')}`}>Home</Link>
              
              <div 
                className="relative flex items-center h-full cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  to="/universities" 
                  className={`transition-colors inline-flex items-center h-full ${isActive('/universities').replace('bg-blue-50', '')}`}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                >
                  Universities
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${showDropdown ? 'rotate-180 text-blue-600' : ''}`} />
                </Link>
              </div>

              <Link to="/about" className={`transition-colors ${isActive('/about').replace('bg-blue-50', '')}`}>About</Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Floating Mega Menu Dropdown (Desktop) */}
        <div 
          className={`hidden md:block absolute top-full left-0 w-full z-40 transition-all duration-200 ease-in-out pt-2 ${
            showDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-5 flex h-auto">
            
            {/* Left Panel: Universities */}
            <div className="w-1/3 pr-5 border-r border-gray-100">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Institutions</h3>
              <div className="space-y-1">
                {universitiesData.map(uni => {
                  const Icon = IconMap[uni.icon] || Building2;
                  const isHovered = hoveredUniversity === uni.id;
                  return (
                    <div 
                      key={uni.id}
                      onMouseEnter={() => setHoveredUniversity(uni.id)}
                      className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150 ${
                        isHovered 
                          ? 'bg-blue-50 text-blue-700 active:bg-blue-100' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      role="menuitem"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`h-4 w-4 ${isHovered ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                        <span className="text-sm font-medium">{uni.name}</span>
                      </div>
                      <ChevronRight className={`h-3 w-3 transition-transform duration-150 ${isHovered ? 'translate-x-0 opacity-100 text-blue-500' : '-translate-x-1 opacity-0'}`} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Panel: Courses */}
            <div className="w-2/3 pl-5">
              {hoveredUniversity ? (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Programs</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {universitiesData.find(u => u.id === hoveredUniversity)?.courses.map(course => (
                      <Link
                        key={course.id}
                        to={course.path}
                        onClick={closeMenu}
                        className="group flex items-center px-4 py-2.5 rounded-lg border border-transparent hover:border-blue-100 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors duration-150"
                        role="menuitem"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-300 mr-3 group-hover:bg-blue-500 transition-colors duration-150"></div>
                        <span className="text-sm font-medium">{course.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">
                  Select an institution to view programs
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 md:hidden transition-opacity"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer (Slide-in) */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Calculator className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-lg text-gray-900">UniGPA</span>
          </Link>
          <button 
            onClick={closeMenu}
            className="p-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            <Link 
              to="/" 
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-xl text-base transition-colors ${
                location.pathname === '/' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 font-medium hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            {/* Accordion Universities */}
            <div className="pt-3 pb-1">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Universities & Programs
              </div>
              
              <div className="space-y-1 mt-1">
                {universitiesData.map(uni => {
                  const Icon = IconMap[uni.icon] || Building2;
                  const isExpanded = expandedMobileUni === uni.id;
                  
                  return (
                    <div key={uni.id} className="rounded-xl overflow-hidden bg-white">
                      <button 
                        onClick={() => setExpandedMobileUni(isExpanded ? null : uni.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                          isExpanded ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${isExpanded ? 'text-blue-600' : 'text-gray-500'}`} />
                          <span className={`font-medium ${isExpanded ? 'text-blue-700' : 'text-gray-700'}`}>{uni.name}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="pl-12 pr-4 py-2 space-y-1 bg-gray-50/50">
                          {uni.courses.map(course => (
                            <Link
                              key={course.id}
                              to={course.path}
                              onClick={closeMenu}
                              className="block py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {course.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link 
              to="/about" 
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-xl text-base transition-colors ${
                location.pathname === '/about' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 font-medium hover:bg-gray-50 mt-2'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
