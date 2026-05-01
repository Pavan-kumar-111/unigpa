import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';
import { ouMcaSemesters } from '../../data/ouMcaData';

const gradesConfig = {
  "O": 10,
  "A": 9,
  "B": 8,
  "C": 7,
  "D": 6,
  "E": 5,
  "F": 0,
  "Ab": 0
};
const gradeOptions = Object.keys(gradesConfig);

const expectedCredits = {
  semester1: 28.5,
  semester2: 28.5,
  semester3: 28,
  semester4: 20
};

const formatGroupName = (key) => {
  let name = key.replace(/([A-Z0-9])/g, ' $1').trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export default function OUMCA() {
  const [selectedSemester, setSelectedSemester] = useState('semester1');
  const [subjects, setSubjects] = useState([]);
  const [savedSemesters, setSavedSemesters] = useState([]);
  const cgpaSectionRef = useRef(null);

  const loadSemesterData = (semKey) => {
    const data = ouMcaSemesters[semKey];
    let newSubjects = [];

    if (Array.isArray(data)) {
      newSubjects = data.map(sub => ({
        id: sub.code,
        ...sub,
        grade: "",
        gradePoint: 0,
        creditPoint: 0
      }));
    } else if (typeof data === 'object') {
      Object.keys(data).forEach(key => {
        const item = data[key];
        if (Array.isArray(item)) {
          if (key.toLowerCase().includes('elective')) {
            newSubjects.push({
              id: key,
              isElectiveGroup: true,
              groupName: formatGroupName(key),
              options: item,
              selectedCode: "",
              code: "",
              name: "Select Subject",
              credits: item[0].credits,
              type: "Elective",
              grade: "",
              gradePoint: 0,
              creditPoint: 0
            });
          } else {
            item.forEach(sub => {
              newSubjects.push({
                id: sub.code,
                ...sub,
                grade: "",
                gradePoint: 0,
                creditPoint: 0
              });
            });
          }
        } else {
          newSubjects.push({
            id: item.code,
            ...item,
            grade: "",
            gradePoint: 0,
            creditPoint: 0
          });
        }
      });
    }
    setSubjects(newSubjects);
  };

  useEffect(() => {
    loadSemesterData(selectedSemester);
  }, [selectedSemester]);

  const handleGradeChange = (id, grade) => {
    const gradePoint = gradesConfig[grade];
    setSubjects(subjects.map(sub => {
      if (sub.id === id) {
        return { 
          ...sub, 
          grade,
          gradePoint,
          creditPoint: sub.credits * gradePoint
        };
      }
      return sub;
    }));
  };

  const handleElectiveChange = (id, selectedCode) => {
    setSubjects(subjects.map(sub => {
      if (sub.id === id && sub.isElectiveGroup) {
        const selectedSub = sub.options.find(o => o.code === selectedCode);
        return {
          ...sub,
          selectedCode,
          code: selectedSub ? selectedSub.code : "",
          name: selectedSub ? selectedSub.name : "Select Subject",
          credits: selectedSub ? selectedSub.credits : sub.credits
        };
      }
      return sub;
    }));
  };

  const resetCalculator = () => {
    loadSemesterData(selectedSemester);
  };

  const { totalCredits, totalPoints, sgpa, hasFail, allGradesSelected, allElectivesSelected, isValidCredits } = useMemo(() => {
    let credits = 0;
    let points = 0;
    let fail = false;
    let allSelected = true;
    let electivesSelected = true;

    subjects.forEach(sub => {
      credits += sub.credits;
      
      if (sub.isElectiveGroup && !sub.selectedCode) {
        electivesSelected = false;
      }

      if (sub.grade) {
        points += sub.creditPoint;
        if (sub.grade === 'F' || sub.grade === 'Ab') fail = true;
      } else {
        allSelected = false;
      }
    });

    const canCalculate = credits > 0 && allSelected && electivesSelected && !fail;
    const calculatedSgpa = canCalculate ? (points / credits).toFixed(2) : '0.00';
    
    return { 
      totalCredits: credits, 
      totalPoints: points, 
      sgpa: calculatedSgpa, 
      hasFail: fail,
      allGradesSelected: allSelected,
      allElectivesSelected: electivesSelected,
      isValidCredits: credits === expectedCredits[selectedSemester]
    };
  }, [subjects, selectedSemester]);

  const saveCurrentSemester = () => {
    if (!allGradesSelected || !allElectivesSelected || hasFail || !isValidCredits) return;
    
    const semName = selectedSemester.replace('semester', 'Semester ');
    
    const newSaved = [...savedSemesters];
    const existingIndex = newSaved.findIndex(s => s.id === selectedSemester);
    
    const semData = {
      id: selectedSemester,
      name: semName,
      sgpa: parseFloat(sgpa),
      credits: totalCredits
    };

    if (existingIndex >= 0) {
      newSaved[existingIndex] = semData;
    } else {
      newSaved.push(semData);
    }
    
    setSavedSemesters(newSaved);

    // Smooth scroll to CGPA section
    setTimeout(() => {
      cgpaSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const removeSavedSemester = (id) => {
    setSavedSemesters(savedSemesters.filter(s => s.id !== id));
  };

  const { cgpa, totalCgpaCredits, percentage } = useMemo(() => {
    if (savedSemesters.length === 0) return { cgpa: '0.00', totalCgpaCredits: 0, percentage: '0.00' };
    
    let totalPts = 0;
    let totalCreds = 0;
    
    savedSemesters.forEach(sem => {
      totalPts += (sem.sgpa * sem.credits);
      totalCreds += sem.credits;
    });
    
    const calcCgpa = totalCreds > 0 ? (totalPts / totalCreds).toFixed(2) : '0.00';
    const calcPercentage = (calcCgpa * 10).toFixed(2);
    
    return { cgpa: calcCgpa, totalCgpaCredits: totalCreds, percentage: calcPercentage };
  }, [savedSemesters]);

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-gray-50 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <Link to="/universities/ou" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to OU Programs
          </Link>
        </div>

        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            OU MCA GPA Calculator
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your SGPA and CGPA based on Osmania University's latest scheme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">SGPA Calculator</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Select semester and enter your grades</p>
                </div>
                <div className="w-full sm:w-auto">
                  <select 
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white shadow-sm"
                  >
                    <option value="semester1">Semester 1</option>
                    <option value="semester2">Semester 2</option>
                    <option value="semester3">Semester 3</option>
                    <option value="semester4">Semester 4</option>
                  </select>
                </div>
              </div>

              {!allElectivesSelected && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mx-6 mt-6 mb-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Please select all your elective subjects to proceed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {hasFail && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-6 mb-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Warning:</strong> SGPA not valid (fail in subject).
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {!isValidCredits && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mx-6 mt-6 mb-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Total credits must equal exactly {expectedCredits[selectedSemester]}. Current total: {totalCredits}.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop Table Layout */}
              <div className="hidden lg:block overflow-x-auto mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Pt</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Pt</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.map((subject) => (
                      <tr key={subject.id} className={`transition-colors ${subject.isElectiveGroup && !subject.selectedCode ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {subject.code || <span className="text-gray-400 border border-dashed border-gray-300 px-2 py-1 rounded">--</span>}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {subject.isElectiveGroup ? (
                            <div className="flex flex-col space-y-1">
                              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{subject.groupName}</span>
                              <select
                                value={subject.selectedCode}
                                onChange={(e) => handleElectiveChange(subject.id, e.target.value)}
                                className={`block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-1 ${!subject.selectedCode ? 'text-gray-500 italic' : 'text-gray-900 font-medium'}`}
                              >
                                <option value="" disabled>Select {subject.groupName}</option>
                                {subject.options.map(opt => (
                                  <option key={opt.code} value={opt.code}>{opt.name}</option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              {subject.name}
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {subject.type}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          {subject.credits}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={subject.grade}
                            onChange={(e) => handleGradeChange(subject.id, e.target.value)}
                            disabled={subject.isElectiveGroup && !subject.selectedCode}
                            className={`block w-full min-w-[80px] pl-3 pr-8 py-1.5 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm border-gray-300 
                              ${!subject.grade ? 'text-gray-400' : 'text-gray-900 font-semibold'}
                              ${(subject.isElectiveGroup && !subject.selectedCode) ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
                            `}
                          >
                            <option value="" disabled>Select</option>
                            {gradeOptions.map(g => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          {subject.grade ? subject.gradePoint : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                          {subject.grade ? subject.creditPoint : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-blue-50 border-t border-blue-100">
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-sm font-bold text-gray-900 text-right">Totals:</td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-700 text-center">{totalCredits}</td>
                      <td></td>
                      <td></td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-700 text-center">{totalPoints}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile List Layout */}
              <div className="lg:hidden mt-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className={`px-4 py-3 border-b border-gray-200 space-y-1 ${subject.isElectiveGroup && !subject.selectedCode ? 'bg-blue-50/30' : 'bg-white'}`}>
                    
                    {/* Top Row: Code and Credits */}
                    <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                      <span>{subject.code || '--'}</span>
                      <span className="font-bold text-gray-600">{subject.credits} Cr</span>
                    </div>

                    {/* Subject Name and Type */}
                    <div>
                      {subject.isElectiveGroup ? (
                        <div className="flex flex-col space-y-1 mt-1">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{subject.groupName}</span>
                          <select
                            value={subject.selectedCode}
                            onChange={(e) => handleElectiveChange(subject.id, e.target.value)}
                            className={`block w-full text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 py-1.5 ${!subject.selectedCode ? 'text-gray-500 italic bg-white' : 'text-gray-900 font-medium bg-white'}`}
                          >
                            <option value="" disabled>Select {subject.groupName}</option>
                            {subject.options.map(opt => (
                              <option key={opt.code} value={opt.code}>{opt.name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <h3 className="text-sm font-medium leading-snug text-gray-900 mt-1">
                          {subject.name}
                        </h3>
                      )}
                      
                      {!subject.isElectiveGroup && (
                        <span className="inline-block mt-1 text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider">
                          {subject.type}
                        </span>
                      )}
                    </div>

                    {/* Grade Row */}
                    <div className="flex justify-between items-center mt-2 pt-1">
                      <span className="text-sm font-medium text-gray-700">Grade:</span>
                      <select
                        value={subject.grade}
                        onChange={(e) => handleGradeChange(subject.id, e.target.value)}
                        disabled={subject.isElectiveGroup && !subject.selectedCode}
                        className={`border rounded px-2 py-1.5 text-sm bg-white min-w-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500
                          ${!subject.grade ? 'text-gray-400 border-gray-300' : (subject.grade === 'F' || subject.grade === 'Ab' ? 'text-red-600 font-bold border-red-300 bg-red-50' : 'text-green-700 font-bold border-green-300 bg-green-50')}
                          ${(subject.isElectiveGroup && !subject.selectedCode) ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
                        `}
                      >
                        <option value="" disabled>Select</option>
                        {gradeOptions.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    {/* GP / CP Row */}
                    <div className="flex justify-between text-xs text-gray-500 mt-1 pb-1">
                      <span>GP: <strong className="text-gray-700">{subject.grade ? subject.gradePoint : "-"}</strong></span>
                      <span>CP: <strong className="text-blue-600">{subject.grade ? subject.creditPoint : "-"}</strong></span>
                    </div>

                  </div>
                ))}

                {/* Mobile Totals Bar */}
                <div className="bg-gray-50 border-b border-gray-200 p-4 text-gray-800 flex justify-between items-center text-sm font-medium shadow-inner">
                  <div>
                    <span className="text-gray-500 mr-2">Credits:</span>
                    <span className="font-bold">{totalCredits}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 mr-2">Points:</span>
                    <span className="font-bold text-blue-600">{totalPoints}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="w-full sm:w-auto">
                  <button 
                    onClick={resetCalculator}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <div className="text-center sm:text-right w-full sm:w-auto">
                    <span className="block text-xs sm:text-sm font-medium text-gray-500">Current SGPA</span>
                    <span className={`text-2xl sm:text-3xl font-extrabold ${(hasFail || !allGradesSelected || !allElectivesSelected) ? 'text-gray-400' : 'text-blue-600'}`}>
                      {(allGradesSelected && allElectivesSelected && !hasFail) ? sgpa : 'N/A'}
                    </span>
                  </div>
                  <button 
                    onClick={saveCurrentSemester}
                    disabled={!allGradesSelected || !allElectivesSelected || hasFail || !isValidCredits}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" /> Save to CGPA
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6" ref={cgpaSectionRef}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  Cumulative GPA
                </h2>
                <p className="text-blue-100 text-sm mt-1">Track your overall progress</p>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-500 font-medium">Overall CGPA</span>
                    <span className="text-4xl font-extrabold text-gray-900">{cgpa}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(cgpa / 10) * 100}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Percentage</span>
                    <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Credits</span>
                    <span className="text-2xl font-bold text-gray-900">{totalCgpaCredits}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
                  Saved Semesters
                </h3>
                
                {savedSemesters.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500">No semesters saved yet. Calculate your SGPA and click "Save to CGPA" to add them here.</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {savedSemesters.map(sem => (
                      <li key={sem.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div>
                          <span className="block font-medium text-gray-900">{sem.name}</span>
                          <span className="text-xs text-gray-500">{sem.credits} Credits</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-bold text-blue-600">{sem.sgpa.toFixed(2)}</span>
                          <button 
                            onClick={() => removeSavedSemester(sem.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
