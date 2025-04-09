export const courseData = {
  nodes: [
    // First Year, First Semester
    { id: 'CS11', data: { label: 'CS 11', semester: 1, year: 1, description: 'Introduction to Computer Science', prerequisites: [] }},
    { id: 'CS30', data: { label: 'CS 30', semester: 1, year: 1, description: 'Computer Architecture and Organization', prerequisites: [] }},
    { id: 'MATH21', data: { label: 'Math 21', semester: 1, year: 1, description: 'Fundamentals of Mathematics', prerequisites: [] }},
    { id: 'CS10', data: { label: 'CS 10', semester: 1, year: 1, description: 'Ethics in Computing', prerequisites: [] }},

    // First Year, Second Semester
    { id: 'CS12', data: { label: 'CS 12', semester: 2, year: 1, description: 'Computer Programming', prerequisites: ['CS11'] }},
    { id: 'CS31', data: { label: 'CS 31', semester: 2, year: 1, description: 'Digital Logic Design', prerequisites: ['CS30'] }},
    { id: 'MATH22', data: { label: 'Math 22', semester: 2, year: 1, description: 'Calculus I', prerequisites: ['MATH21'] }},
    { id: 'PHYSICS71', data: { label: 'Physics 71', semester: 2, year: 1, description: 'Physics I', prerequisites: ['CS10'] }},

    // Second Year, First Semester
    { id: 'CS20', data: { label: 'CS 20', semester: 1, year: 2, description: 'Data Structures', prerequisites: ['CS12'] }},
    { id: 'CS32', data: { label: 'CS 32', semester: 1, year: 2, description: 'Computer Organization', prerequisites: ['CS31'] }},
    { id: 'MATH23', data: { label: 'Math 23', semester: 1, year: 2, description: 'Calculus II', prerequisites: ['MATH22'] }},
    { id: 'PHYSICS72', data: { label: 'Physics 72', semester: 1, year: 2, description: 'Physics II', prerequisites: ['PHYSICS71'] }},

    // Second Year, Second Semester
    { id: 'CS21', data: { label: 'CS 21', semester: 2, year: 2, description: 'Algorithms', prerequisites: ['CS20'] }},
    { id: 'CS33', data: { label: 'CS 33', semester: 2, year: 2, description: 'Operating Systems', prerequisites: ['CS32'] }},
    { id: 'MATH40', data: { label: 'Math 40', semester: 2, year: 2, description: 'Linear Algebra', prerequisites: ['MATH23'] }},

    // Third Year, First Semester
    { id: 'CS140', data: { label: 'CS 140', semester: 1, year: 3, description: 'Software Engineering', prerequisites: ['CS21'] }},
    { id: 'CS150', data: { label: 'CS 150', semester: 1, year: 3, description: 'Computer Networks', prerequisites: ['CS33'] }},
    { id: '191', data: { label: '191', semester: 1, year: 3, description: 'Special Topics', prerequisites: ['CS33'] }},
    { id: 'CS180', data: { label: 'CS 180', semester: 1, year: 3, description: 'Database Management', prerequisites: ['CS33'] }},
    { id: 'CS136', data: { label: 'CS 136', semester: 1, year: 3, description: 'Software Design', prerequisites: ['CS33'] }},

    // Third Year, Second Semester
    { id: 'CS145', data: { label: 'CS 145', semester: 2, year: 3, description: 'Software Testing', prerequisites: ['CS140'] }},
    { id: 'CS153', data: { label: 'CS 153', semester: 2, year: 3, description: 'Advanced Computer Networks', prerequisites: ['CS150'] }},
    { id: 'CS192', data: { label: 'CS 192', semester: 2, year: 3, description: 'Software Engineering II', prerequisites: ['191'] }},
    { id: 'CS165', data: { label: 'CS 165', semester: 2, year: 3, description: 'Theory of Programming Languages', prerequisites: ['CS33'] }},
    { id: 'CS138', data: { label: 'CS 138', semester: 2, year: 3, description: 'Web Development', prerequisites: ['CS136'] }},

    // Third Year, Midyear
    { id: 'CS195', data: { label: 'CS 195', semester: 3, year: 3, description: 'Special Project', prerequisites: ['CS192'] }},

    // Fourth Year, First Semester
    { id: 'CS133', data: { label: 'CS 133', semester: 1, year: 4, description: 'Computer Security', prerequisites: ['CS31'] }},
    { id: 'CS194', data: { label: 'CS 194', semester: 1, year: 4, description: 'Research Methods', prerequisites: [] }},

    // Fourth Year, Second Semester
    { id: 'CS155', data: { label: 'CS 155', semester: 2, year: 4, description: 'Computer Graphics', prerequisites: ['CS145', 'CS153'] }},
    { id: 'CS132', data: { label: 'CS 132', semester: 2, year: 4, description: 'Parallel Computing', prerequisites: ['CS31'] }},
    { id: 'CS196', data: { label: 'CS 196', semester: 2, year: 4, description: 'Seminar', prerequisites: [] }},
    { id: 'CS198', data: { label: 'CS 198', semester: 2, year: 4, description: 'Undergraduate Project I', prerequisites: ['CS194'] }},
    { id: 'CS199200', data: { label: 'CS 199/200', semester: 2, year: 4, description: 'Thesis', prerequisites: ['CS198'] }}
  ]
};

export const getNodePosition = (semester, year) => {
  const SEMESTER_WIDTH = 220;
  const YEAR_HEIGHT = 150;
  const MIDYEAR_OFFSET = 160;
  
  let x = (semester - 1) * SEMESTER_WIDTH;
  let y = (year - 1) * YEAR_HEIGHT;

  // Adjust for midyear semester
  if (semester === 3) {
    x = 6 * SEMESTER_WIDTH; // Position between 6th and 7th semester
  }

  return { x, baseY: y };
};

export const generateEdges = (nodes) => {
  const edges = [];
  nodes.forEach(node => {
    node.data.prerequisites.forEach(prereq => {
      edges.push({
        id: `${prereq}-${node.id}`,
        source: prereq,
        target: node.id,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#6B7280', strokeWidth: 1 },
      });
    });
  });
  return edges;
}; 