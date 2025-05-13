import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import courseData from './CourseFlow'; // or import from the correct data file if needed

const gradeOptions = [
  '', '1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '4.00', '5.00', 'INC', 'DRP'
];

// Map percentage to UPD grade (example, adjust as needed)
function percentToUPDGrade(percent) {
  if (percent >= 0.96) return '1.00';
  if (percent >= 0.93) return '1.25';
  if (percent >= 0.90) return '1.50';
  if (percent >= 0.87) return '1.75';
  if (percent >= 0.84) return '2.00';
  if (percent >= 0.81) return '2.25';
  if (percent >= 0.78) return '2.50';
  if (percent >= 0.75) return '2.75';
  if (percent >= 0.70) return '3.00';
  if (percent >= 0.60) return '4.00';
  if (percent < 0.60) return '5.00';
  return '';
}

function isNumericGrade(grade) {
  return !isNaN(parseFloat(grade)) && isFinite(grade);
}

function GwaCalculator() {
  const defaultCourses = Object.entries(courseData).map(([code, data]) => ({ code, name: data.name, units: data.units }));
  const [grades, setGrades] = useState({}); // { [code]: { assessments: [{name, score, total, weight}], finalGrade } }
  const [expanded, setExpanded] = useState({});
  const [customCourses, setCustomCourses] = useState([]); // [{ code, name, units }]
  const [newCourse, setNewCourse] = useState({ code: '', name: '', units: '' });

  const courses = [...defaultCourses, ...customCourses];

  const handleNewCourseChange = (field, value) => {
    setNewCourse(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.code.trim() || !newCourse.name.trim() || !newCourse.units || isNaN(Number(newCourse.units))) return;
    setCustomCourses(prev => [...prev, { ...newCourse, units: Number(newCourse.units) }]);
    setNewCourse({ code: '', name: '', units: '' });
  };

  const handleAssessmentChange = (code, idx, field, value) => {
    setGrades(prev => {
      const course = prev[code] || { assessments: [], finalGrade: '' };
      const assessments = [...(course.assessments || [])];
      assessments[idx] = { ...assessments[idx], [field]: value };
      return { ...prev, [code]: { ...course, assessments } };
    });
  };

  const handleAddAssessment = (code) => {
    setGrades(prev => {
      const course = prev[code] || { assessments: [], finalGrade: '' };
      return {
        ...prev,
        [code]: {
          ...course,
          assessments: [...(course.assessments || []), { name: '', score: '', total: '', weight: '' }]
        }
      };
    });
  };

  const handleRemoveAssessment = (code, idx) => {
    setGrades(prev => {
      const course = prev[code] || { assessments: [], finalGrade: '' };
      const assessments = [...(course.assessments || [])];
      assessments.splice(idx, 1);
      return { ...prev, [code]: { ...course, assessments } };
    });
  };

  // Calculate weighted average for a course
  function calcCoursePercent(assessments) {
    let sum = 0;
    let totalWeight = 0;
    for (const a of assessments) {
      const percent = a.score && a.total ? (parseFloat(a.score) / parseFloat(a.total)) : 0;
      const weight = parseFloat(a.weight) || 0;
      sum += percent * weight;
      totalWeight += weight;
    }
    return totalWeight > 0 ? sum / totalWeight : 0;
  }

  // Calculate GWA
  let totalUnits = 0;
  let weightedSum = 0;
  courses.forEach(({ code, units }) => {
    const course = grades[code] || {};
    const grade = course.finalGrade;
    if (isNumericGrade(grade)) {
      totalUnits += units;
      weightedSum += parseFloat(grade) * units;
    }
  });
  const gwa = totalUnits > 0 ? (weightedSum / totalUnits).toFixed(4) : '';

  const handleFinalGradeChange = (code, value) => {
    setGrades(prev => ({
      ...prev,
      [code]: {
        ...(prev[code] || { assessments: [] }),
        finalGrade: value
      }
    }));
  };

  const handleExpand = (code) => setExpanded(prev => ({ ...prev, [code]: !prev[code] }));
  const handleReset = () => setGrades({});

  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto mt-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">GWA Calculator (UP Diliman)</h1>
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">Input your assessment scores for each course. The calculator will compute your final grade per course and your GWA. Only numeric grades (1.00–5.00) are included in the GWA calculation.</p>
        {/* Add Course Input */}
        <form onSubmit={handleAddCourse} className="flex flex-wrap gap-2 mb-6 items-end">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="course-code">Course Code</label>
            <input
              id="course-code"
              type="text"
              value={newCourse.code}
              onChange={e => handleNewCourseChange('code', e.target.value)}
              className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white w-28"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="course-name">Course Name</label>
            <input
              id="course-name"
              type="text"
              value={newCourse.name}
              onChange={e => handleNewCourseChange('name', e.target.value)}
              className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white w-48"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="course-units">Units</label>
            <input
              id="course-units"
              type="number"
              min="1"
              value={newCourse.units}
              onChange={e => handleNewCourseChange('units', e.target.value)}
              className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white w-20"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 shadow mt-5"
          >
            Add Course
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-left px-2 py-1">Course</th>
                <th className="text-left px-2 py-1">Units</th>
                <th className="text-left px-2 py-1">Final Grade</th>
                <th className="text-left px-2 py-1">Breakdown</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(({ code, name, units }) => {
                const course = grades[code] || { assessments: [], finalGrade: '' };
                const percent = calcCoursePercent(course.assessments);
                const autoGrade = percentToUPDGrade(percent);
                return (
                  <React.Fragment key={code}>
                    <tr>
                      <td className="px-2 py-1 font-medium text-neutral-900 dark:text-white align-top">
                        {code} <span className="font-normal text-neutral-500 dark:text-neutral-400">{name}</span>
                      </td>
                      <td className="px-2 py-1 align-top">{units}</td>
                      <td className="px-2 py-1 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-neutral-500">{(percent * 100).toFixed(2)}%</span>
                          <select
                            value={course.finalGrade || autoGrade}
                            onChange={e => handleFinalGradeChange(code, e.target.value)}
                            className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                            aria-label={`Final grade for ${code}`}
                          >
                            <option value={autoGrade}>{autoGrade} (suggested)</option>
                            {gradeOptions.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-2 py-1 align-top">
                        <button
                          className="underline text-primary text-sm font-semibold"
                          onClick={() => handleExpand(code)}
                          aria-expanded={!!expanded[code]}
                          aria-controls={`breakdown-${code}`}
                        >
                          {expanded[code] ? 'Hide' : 'Show'} Breakdown
                        </button>
                      </td>
                    </tr>
                    {expanded[code] && (
                      <tr>
                        <td colSpan={4} id={`breakdown-${code}`} className="bg-neutral-50 dark:bg-neutral-900 rounded p-4">
                          <div className="mb-2 flex flex-col gap-2">
                            {(course.assessments || []).map((a, idx) => (
                              <div key={idx} className="flex flex-wrap gap-2 items-center border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-2">
                                <input
                                  type="text"
                                  value={a.name}
                                  onChange={e => handleAssessmentChange(code, idx, 'name', e.target.value)}
                                  placeholder="Assessment (e.g., Exam 1)"
                                  className="w-32 px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                  aria-label="Assessment name"
                                />
                                <input
                                  type="number"
                                  value={a.score}
                                  onChange={e => handleAssessmentChange(code, idx, 'score', e.target.value)}
                                  placeholder="Score"
                                  className="w-20 px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                  aria-label="Score"
                                />
                                <span>/</span>
                                <input
                                  type="number"
                                  value={a.total}
                                  onChange={e => handleAssessmentChange(code, idx, 'total', e.target.value)}
                                  placeholder="Total"
                                  className="w-20 px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                  aria-label="Total possible score"
                                />
                                <input
                                  type="number"
                                  value={a.weight}
                                  onChange={e => handleAssessmentChange(code, idx, 'weight', e.target.value)}
                                  placeholder="Weight %"
                                  className="w-20 px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                  aria-label="Weight percent"
                                />
                                <span className="text-xs text-neutral-500">% of final</span>
                                <span className="ml-2 text-xs text-neutral-700 dark:text-neutral-300">Contribution: {a.score && a.total && a.weight ? ((parseFloat(a.score) / parseFloat(a.total)) * parseFloat(a.weight)).toFixed(2) : '0.00'}</span>
                                <button
                                  className="ml-2 text-red-600 hover:underline text-xs"
                                  onClick={() => handleRemoveAssessment(code, idx)}
                                  aria-label="Remove assessment"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              className="mt-2 px-3 py-1 rounded bg-primary text-white font-semibold hover:bg-primary/90 text-sm"
                              onClick={() => handleAddAssessment(code)}
                            >
                              Add Assessment
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="font-semibold">Total Units:</span> {totalUnits}
            <span className="ml-6 font-semibold">GWA:</span> {gwa || '--'}
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded bg-neutral-200 hover:bg-neutral-300 text-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white font-semibold shadow"
          >
            Clear All Grades
          </button>
        </div>
      </main>
    </>
  );
}

export default GwaCalculator; 