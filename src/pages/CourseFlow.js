import React, { useState, useCallback, useMemo } from 'react';
import { 
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CourseNode from '../components/CourseNode';
import NavBar from '../components/NavBar/NavBar';
import { motion } from 'framer-motion';

// Course data with prerequisites
const courseData = {
  // CS Core Courses
  'CS 10': { name: 'Introduction to Computing', description: 'History of computing, parts of a computer, data storage in a computer, trends and issues in computing', units: 3, prerequisites: [] },
  'CS 11': { name: 'Computer Programming I', description: 'Basic Programming, Programming Constructs, Programming Logic', units: 3, prerequisites: ['CS 10'] },
  'CS 12': { name: 'Computer Programming II', description: 'Abstract data types: Advanced programming techniques: Exception handling. Documentation. API programming', units: 3, prerequisites: ['CS 11'] },
  'CS 20': { name: 'Digital Electronics and Circuits', description: 'Introduction to digital electronics and circuit design', units: 3, prerequisites: ['CS 12'] },
  'CS 21': { name: 'Computer Organization and Architecture', description: 'Computer organization and architecture fundamentals', units: 4, prerequisites: ['CS 20'] },
  'CS 30': { name: 'Discrete Mathematics for CS I', description: 'Discrete Structures and their applications in Computer Science I', units: 3, prerequisites: [] },
  'CS 31': { name: 'Discrete Mathematics for CS II', description: 'Discrete structures and their applications to Computer Science II, Probability and Topics in Statistics', units: 3, prerequisites: ['CS 30'] },
  'CS 32': { name: 'Data Structures and Algorithms I', description: 'Basic data structures and algorithm analysis', units: 4, prerequisites: ['CS 12', 'CS 31'] },
  'CS 33': { name: 'Data Structures and Algorithms II', description: 'Advanced data structures and algorithm analysis', units: 4, prerequisites: ['CS 32'] },
  
  // Required GE Courses
  'KAS 1': { name: 'Kasaysayan ng Pilipinas', description: 'Ang pampulitika, pang-ekonomiya, panlipunan, at pangkalinangang pagsulong ng Pilipinas', units: 3, prerequisites: [] },
  'PHILO 1': { name: 'Philosophical Analysis', description: 'Application of basic concepts, skills and principles drawn from the Philosophy of Language, Symbolic Logic, Epistemology, Philosophy of Science and Ethics', units: 3, prerequisites: [] },
  'ENG 13': { name: 'Writing as Thinking', description: 'A course in critical thinking, reading, and writing in English', units: 3, prerequisites: [] },
  'SPEECH 30': { name: 'Public Speaking and Persuasion', description: 'Persuasion in various public speaking situations', units: 3, prerequisites: [] },
  'FIL 40': { name: 'Wika, Kultura, at Lipunan', description: 'Ang relasyon ng Filipino sa kultura at lipunang Pilipino', units: 3, prerequisites: [] },
  'ENG 30': { name: 'English for the Professions', description: 'Principles and uses of writing in English in the various disciplines/professions', units: 3, prerequisites: [] },
  'STS 1': { name: 'Science, Technology and Society', description: 'An introductory exploration of the past, present and future of science and technology in society', units: 3, prerequisites: [] },
  'ARTS 1': { name: 'Critical Perspectives in the Arts', description: 'A critical study of the experience, language, and context of art', units: 3, prerequisites: [] },
  'PI 100': { name: 'The Life and Works of Jose Rizal', description: 'Study of Jose Rizal\'s life, works and writings', units: 3, prerequisites: [] },

  // GE Electives
  //'DEMO 1': { name: 'Population Studies in the Contemporary World', description: 'Demographic perspectives in understanding population issues', units: 3, prerequisites: [] },
  //'ETHICS 1': { name: 'Ethics and Moral Reasoning in Everyday Life', description: 'The nature and development, sources and frameworks of ethics and moral reasoning and their application', units: 3, prerequisites: [] },
  'SOCSCI 1': { name: 'Foundations of Social Science', description: 'Social science as an integrated discipline and its contribution to knowledge production', units: 3, prerequisites: [] },
  'SOCSCI 2': { name: 'Social, Economic and Political Thought', description: 'A survey of social, economic and political thought from classical to contemporary times', units: 3, prerequisites: [] },
  'DRMAPS': { name: 'Disaster Risk Mitigation, Adaptation, and Preparedness Strategies', description: 'Introduction to principles and practices of natural disaster risk management', units: 3, prerequisites: [] },

  // PE slots with simplified options
  'PE-1': {
    name: 'PE',
    description: 'Physical Education requirement',
    units: 2,
    prerequisites: [],
    options: {
      'PE 1': {
        name: 'Foundations of Physical Fitness',
        description: 'Basic principles and practices of physical fitness',
        units: 2
      }
    }
  },
  'PE-2': {
    name: 'PE',
    description: 'Physical Education requirement',
    units: 2,
    prerequisites: [],
    options: {
      'PE 1': {
        name: 'Foundations of Physical Fitness',
        description: 'Basic principles and practices of physical fitness',
        units: 2
      },
      'PE 2': {
        name: 'Physical Education 2',
        description: 'Advanced physical education activities',
        units: 2,
        activities: [
          { code: 'PE 2 TN', name: 'Lawn Tennis' },
          { code: 'PE 2 BD', name: 'Badminton' },
          { code: 'PE 2 V', name: 'Basic Volleyball' },
          { code: 'PE 2 BS', name: 'Basic Basketball' },
          { code: 'PE 2 SW', name: 'Swimming' },
          { code: 'PE 2 Y', name: 'Yoga' },
          { code: 'PE 2 TT', name: 'Table Tennis' },
          { code: 'PE 2 T&F', name: 'Track And Field' },
          { code: 'PE 2 SO', name: 'Soccer' }
        ]
      }
    }
  },
  'PE-3': {
    name: 'PE',
    description: 'Physical Education requirement',
    units: 2,
    prerequisites: [],
    options: {
      'PE 1': {
        name: 'Foundations of Physical Fitness',
        description: 'Basic principles and practices of physical fitness',
        units: 2
      },
      'PE 2': {
        name: 'Physical Education 2',
        description: 'Advanced physical education activities',
        units: 2,
        activities: [
          { code: 'PE 2 TN', name: 'Lawn Tennis' },
          { code: 'PE 2 BD', name: 'Badminton' },
          { code: 'PE 2 V', name: 'Basic Volleyball' },
          { code: 'PE 2 BS', name: 'Basic Basketball' },
          { code: 'PE 2 SW', name: 'Swimming' },
          { code: 'PE 2 Y', name: 'Yoga' },
          { code: 'PE 2 TT', name: 'Table Tennis' },
          { code: 'PE 2 T&F', name: 'Track And Field' },
          { code: 'PE 2 SO', name: 'Soccer' }
        ]
      }
    }
  },
  'PE-4': {
    name: 'PE',
    description: 'Physical Education requirement',
    units: 2,
    prerequisites: [],
    options: {
      'PE 1': {
        name: 'Foundations of Physical Fitness',
        description: 'Basic principles and practices of physical fitness',
        units: 2
      },
      'PE 2': {
        name: 'Physical Education 2',
        description: 'Advanced physical education activities',
        units: 2,
        activities: [
          { code: 'PE 2 TN', name: 'Lawn Tennis' },
          { code: 'PE 2 BD', name: 'Badminton' },
          { code: 'PE 2 V', name: 'Basic Volleyball' },
          { code: 'PE 2 BS', name: 'Basic Basketball' },
          { code: 'PE 2 SW', name: 'Swimming' },
          { code: 'PE 2 Y', name: 'Yoga' },
          { code: 'PE 2 TT', name: 'Table Tennis' },
          { code: 'PE 2 T&F', name: 'Track And Field' },
          { code: 'PE 2 SO', name: 'Soccer' }
        ]
      }
    }
  },

  // CS Core Courses - Second Row (Theory Track)
  'CS 150': { name: 'Programming Languages', units: 3, prerequisites: ['CS 21'] },
  'CS 153': { name: 'Introduction to Computer Security', description: "Computer Security Models and Protocols. Security Issues. Cryptographic Algorithms and Digital Signatures. Risk Assessment", units: 3, prerequisites: ['CS 145'] },
  'CS 133': { name: 'Automata Theory and Computability', description: "Finite state automata and regular expressions; context free grammars and pushdown automata. Turing machines, Church's thesis, complexity classes, and undecidability.", units: 3, prerequisites: ['CS 31'] },

  // CS Core Courses - Third Row (Applications Track)
  'CS 136': { name: 'Elementary Numerical Computing I', units: 3, prerequisites: ['CS 21'] },
  'CS 138': { name: 'Elementary Numerical Computing II', units: 3, prerequisites: ['CS 136'] },
  'CS 165': { name: 'Database Systems', units: 3, prerequisites: ['CS 33'] },
  'CS 180': { name: 'Artificial Intelligence', units: 3, prerequisites: ['CS 33'] },
  'CS 132': { name: 'Introduction to Data Science', units: 3, prerequisites: ['CS 31'] },
  'CS 196': { name: 'Seminar on Ethical and Professional Issues in Computing', units: 1, prerequisites: [] },

  // Math and Physics - Fourth Row
  'Math 21': { name: 'Calculus 1', units: 3, prerequisites: [] },
  'Math 22': { name: 'Calculus 2', units: 3, prerequisites: ['Math 21'] },
  'Math 23': { name: 'Calculus 3', units: 3, prerequisites: ['Math 22'] },
  'Math 40': { name: 'Linear Algrebra', units: 3, prerequisites: ['Math 23'] },
  'Physics 71': { name: 'Physics 1', units: 3, prerequisites: ['Math 21'] },
  'Physics 72': { name: 'Physics 2', units: 3, prerequisites: ['Physics 71'] },

  // Project Track - Fifth Row
  'CS 191': { name: 'Software Engineering I', units: 3, prerequisites: ['CS 33'] },
  'CS 192': { name: 'Software Engineering II', units: 3, prerequisites: ['CS 191'] },
  'CS 194': { name: 'Undergraduate Research Seminar', units: 3, prerequisites: [] },
  'CS 195': { name: 'Practicum', units: 3, prerequisites: ['CS 192'] },
  'CS 198': { name: 'Special Problems I', units: 3, prerequisites: ['CS 194'] },
  'CS 199/200': { name: 'Special Problems II/Undergraduate Thesis', units: 3, prerequisites: ['CS 198'] },

  // Required GE Courses - Sixth Row
  'CS 155': { name: 'Compiler Construction', units: 3, prerequisites: ['CS 145', 'CS 153'] },
  'CS 140': { name: 'Operating Systems', units: 3, prerequisites: ['CS 21'] },
  'CS 145': { name: 'Computer Networks', units: 4, prerequisites: ['CS 140'] },
  //'CS 155': { name: 'Advanced Algorithms', units: 3, prerequisites: ['CS 145', 'CS 153'] },

  // GE Electives - Seventh Row
  'ARTS 1': { name: 'Critical Perspectives in the Arts', units: 3, prerequisites: [] },
  'PI 100': { name: 'The Life and Works of Jose Rizal', units: 3, prerequisites: [] },
  //'DEMO 1': { name: 'Population Studies in the Contemporary World', units: 3, prerequisites: [] },
  //'ETHICS 1': { name: 'Ethics and Moral Reasoning in Everyday Life', units: 3, prerequisites: [] },
  'SOCSCI 1': { name: 'Foundations of Social Science', units: 3, prerequisites: [] },
  'SOCSCI 2': { name: 'Social, Economic and Political Thought', units: 3, prerequisites: [] },
  'DRMAPS': { name: 'Disaster Risk Mitigation, Adaptation, and Preparedness Strategies', units: 3, prerequisites: [] },

  /*// PE Courses - Eighth Row (Sample of PE courses)
  'PE 1': { name: 'Foundations of Physical Fitness', units: 2, prerequisites: [] },
  'PE 2 TN': { name: 'Lawn Tennis', units: 2, prerequisites: [] },
  'PE 2 BD': { name: 'Badminton', units: 2, prerequisites: [] },
  'PE 2 V': { name: 'Basic Volleyball', units: 2, prerequisites: [] },
  'PE 2 BS': { name: 'Basic Basketball', units: 2, prerequisites: [] },
  'PE 2 SW': { name: 'Swimming', units: 2, prerequisites: [] },
  'PE 2 Y': { name: 'Yoga', units: 2, prerequisites: [] },

  // More PE Courses - Ninth Row
  'PE 2 TT': { name: 'Table Tennis', units: 2, prerequisites: [] },
  'PE 2 T&F': { name: 'Track And Field', units: 2, prerequisites: [] },
  'PE 2 SO': { name: 'Soccer', units: 2, prerequisites: [] },
  'PE 2 FB': { name: 'Football', units: 2, prerequisites: [] },
  'CS 10': { name: 'Introduction to Computing', units: 3, prerequisites: [] },*/
};

// Node positions based on semesters (you may need to adjust these values)
const getNodePosition = (code) => {
  const getCoordinates = (col, row) => ({ x: col * 190, y: row * 110 });

  const positions = {
    //First Row
    'CS 11': getCoordinates(0, 0),
    'CS 12': getCoordinates(1, 0),
    'CS 20': getCoordinates(2, 0),
    'CS 21': getCoordinates(3, 0),
    'CS 140': getCoordinates(4, 0),
    'CS 145': getCoordinates(5, 0),

    //Second Row
    'CS 30': getCoordinates(0, 1),
    'CS 31': getCoordinates(1, 1),
    'CS 32': getCoordinates(2, 1),
    'CS 33': getCoordinates(3, 1),
    'CS 150': getCoordinates(4, 1),
    'CS 155': getCoordinates(7, 1),

    //Third Row
    'CS 165': getCoordinates(4, 2),
    'CS 153': getCoordinates(5, 2),

    //Fourth Row
    'CS 191': getCoordinates(3, 3),
    'CS 192': getCoordinates(4, 3),
    'CS 195': getCoordinates(5, 3),

    //Fifth Row
    'CS 180': getCoordinates(4, 4),

    //Sixth Row
    'CS 133': getCoordinates(6, 5),

    //Seventh Row
    'CS 136': getCoordinates(3, 6),
    'CS 138': getCoordinates(4, 6),

    //Eighth Row
    'Math 21': getCoordinates(0, 7),
    'Math 22': getCoordinates(1, 7),
    'Math 23': getCoordinates(2, 7),
    'Math 40': getCoordinates(3, 7),
    'CS 196': getCoordinates(7, 7),

    //Ninth Row
    'CS 132': getCoordinates(7, 8),

    //Tenth Row
    'CS 10': getCoordinates(0, 9),
    'Physics 71': getCoordinates(1, 9),
    'Physics 72': getCoordinates(2, 9),
    'CS 194': getCoordinates(4, 9),
    'CS 198': getCoordinates(6, 9),
    'CS 199/200': getCoordinates(7, 9),

    //Eleventh Row
    'KAS 1': getCoordinates(0, 10),
    'SOCSCI 1': getCoordinates(1, 10),
    'SOCSCI 2': getCoordinates(1, 11),
    'ENG 13': getCoordinates(2, 10),
    'SPEECH 30': getCoordinates(3, 10),
    'FIL 40': getCoordinates(4, 10),
    'ENG 30': getCoordinates(5, 10),
    'STS 1': getCoordinates(6, 10),
    'DRMAPS': getCoordinates(6, 11),
    'ARTS 1': getCoordinates(7, 10),

    //Twelfth Row
    'PHILO 1': getCoordinates(0, 12),
    'PI 100': getCoordinates(7, 12),

    //Thirteenth Row
    'PE-1': getCoordinates(0, 13),
    'PE-2': getCoordinates(1, 13),
    'PE-3': getCoordinates(2, 13),
    'PE-4': getCoordinates(3, 13),
  };

  return positions[code] || { x: 0, y: 0 };
};

const nodeTypes = {
  courseNode: CourseNode,
};

function CourseFlow() {
  const [courseStatus, setCourseStatus] = useState(
    Object.keys(courseData).reduce((acc, code) => {
      acc[code] = 'not_taken';
      return acc;
    }, {})
  );

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedPEOptions, setSelectedPEOptions] = useState({
    'PE-1': null,
    'PE-2': null,
    'PE-3': null,
    'PE-4': null
  });

  const [selectedPEActivity, setSelectedPEActivity] = useState({
    'PE-1': null,
    'PE-2': null,
    'PE-3': null,
    'PE-4': null
  });

  const [otherPEActivity, setOtherPEActivity] = useState({
    'PE-1': '',
    'PE-2': '',
    'PE-3': '',
    'PE-4': ''
  });

  // Create nodes
  const initialNodes = useMemo(() => 
    Object.entries(courseData).map(([code, data]) => {
      const position = getNodePosition(code);
      return {
        id: code,
        type: 'courseNode',
        position,
        data: {
          label: code,
          name: data.name,
          units: data.units,
          status: courseStatus[code],
          prerequisites: data.prerequisites,
        },
      };
    }), [courseStatus]
  );

  // Create edges
  const initialEdges = useMemo(() => {
    const edges = [];
    Object.entries(courseData).forEach(([code, data]) => {
      data.prerequisites.forEach((prereq) => {
        edges.push({
          id: `${prereq}-${code}`,
          source: prereq,
          target: code,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#8B0000', strokeWidth: 2 },
        });
      });
    });
    return edges;
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const canTakeCourse = useCallback((code) => {
    const prerequisites = courseData[code].prerequisites;
    return prerequisites.every(prereq => courseStatus[prereq] === 'completed');
  }, [courseStatus]);

  const handleCourseStatusChange = useCallback((code, newStatus) => {
    if (newStatus === 'in_progress' || newStatus === 'completed') {
      if (!canTakeCourse(code)) {
        alert('You must complete all prerequisites first!');
        return;
      }
    }

    if (newStatus === 'not_taken') {
      const dependentCourses = Object.entries(courseData).filter(([_, data]) =>
        data.prerequisites.includes(code) && courseStatus[code] === 'completed'
      );

      if (dependentCourses.some(([key]) => courseStatus[key] === 'completed')) {
        const completedDependentCourses = dependentCourses
          .filter(([key]) => courseStatus[key] === 'completed')
          .map(([key]) => key);
        alert(`You cannot mark this course as "not taken" because it is a prerequisite for completed courses: ${completedDependentCourses.join(', ')}`);
        return;
      
      }
    }

    setCourseStatus(prev => ({
      ...prev,
      [code]: newStatus
    }));

    setNodes(nds => 
      nds.map(node => {
        if (node.id === code) {
          return {
            ...node,
            data: {
              ...node.data,
              status: newStatus
            }
          };
        }
        return node;
      })
    );
  }, [canTakeCourse, setNodes, courseStatus]);

  const handleNodeClick = useCallback((_, node) => {
    setSelectedCourse(node.id);
    
    // Highlight prerequisites
    setNodes(nds => 
      nds.map(n => ({
        ...n,
        data: {
          ...n.data,
          isHighlighted: node.id === n.id,
          isPrerequisite: courseData[node.id].prerequisites.includes(n.id)
        }
      }))
    );
  }, [setNodes]);

  // Calculate progress
  const totalUnits = Object.values(courseData).reduce((sum, course) => sum + course.units, 0);
  const completedUnits = Object.entries(courseStatus).reduce((sum, [code, status]) => 
    status === 'completed' ? sum + courseData[code].units : sum, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col"
    >
      {/* Navigation Bar */}
      <NavBar />
      {/* Progress Header */}
      <div className="bg-white dark:bg-neutral-800 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Course Flow
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Track your academic progress
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Total Progress
                </p>
                <p className="text-2xl font-bold text-[#8B0000]">
                  {completedUnits}/{totalUnits} units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flowchart with updated dimensions and zoom settings */}
      <div className="flex-1 bg-neutral-50 dark:bg-neutral-900">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          defaultZoom={0.6}
          attributionPosition="bottom-right"
          style={{ width: '100%', height: '100%' }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* Course Status Panel */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md"
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              {selectedCourse}
            </h3>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              {selectedCourse.startsWith('PE-') && (
                <div className="space-y-3">
                  <select
                    value={selectedPEOptions[selectedCourse] || ''}
                    onChange={(e) => {
                      setSelectedPEOptions(prev => ({
                        ...prev,
                        [selectedCourse]: e.target.value
                      }));
                      setSelectedPEActivity(prev => ({
                        ...prev,
                        [selectedCourse]: null
                      }));
                      setOtherPEActivity(prev => ({
                        ...prev,
                        [selectedCourse]: ''
                      }));
                    }}
                    className="w-full p-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                  >
                    <option value="">Select PE Type</option>
                    <option value="PE 1">PE 1</option>
                    <option value="PE 2">PE 2</option>
                  </select>

                  {selectedPEOptions[selectedCourse] === 'PE 2' && (
                    <>
                      <select
                        value={selectedPEActivity[selectedCourse] || ''}
                        onChange={(e) => {
                          setSelectedPEActivity(prev => ({
                            ...prev,
                            [selectedCourse]: e.target.value
                          }));
                          if (e.target.value !== 'other') {
                            setOtherPEActivity(prev => ({
                              ...prev,
                              [selectedCourse]: ''
                            }));
                          }
                        }}
                        className="w-full p-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      >
                        <option value="">Select Activity</option>
                        {courseData[selectedCourse].options['PE 2'].activities.map((activity) => (
                          <option key={activity.code} value={activity.code}>
                            {activity.name}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>

                      {selectedPEActivity[selectedCourse] === 'other' && (
                        <input
                          type="text"
                          value={otherPEActivity[selectedCourse]}
                          onChange={(e) => {
                            setOtherPEActivity(prev => ({
                              ...prev,
                              [selectedCourse]: e.target.value
                            }));
                          }}
                          placeholder="Enter other PE 2 activity"
                          className="w-full p-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                        />
                      )}
                    </>
                  )}
                </div>
              )}
              <p className="mt-3 mb-2">
                {selectedCourse.startsWith('PE-') ? (
                  selectedPEOptions[selectedCourse] === 'PE 1' ? (
                    courseData[selectedCourse].options['PE 1'].description
                  ) : selectedPEOptions[selectedCourse] === 'PE 2' ? (
                    selectedPEActivity[selectedCourse] ? (
                      selectedPEActivity[selectedCourse] === 'other' ? (
                        otherPEActivity[selectedCourse] ? 
                        `PE 2 - ${otherPEActivity[selectedCourse]}` :
                        'Enter other PE 2 activity'
                      ) : (
                        `PE 2 - ${courseData[selectedCourse].options['PE 2'].activities.find(a => a.code === selectedPEActivity[selectedCourse]).name}`
                      )
                    ) : (
                      'Select a PE 2 activity'
                    )
                  ) : (
                    'Select a PE type'
                  )
                ) : (
                  courseData[selectedCourse].description
                )}
              </p>
              <p className="font-medium">
                Units: {courseData[selectedCourse].units}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCourseStatusChange(selectedCourse, 'not_taken')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                courseStatus[selectedCourse] === 'not_taken'
                  ? 'bg-neutral-200 text-neutral-800'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Not Taken
            </button>
            <button
              onClick={() => handleCourseStatusChange(selectedCourse, 'in_progress')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                courseStatus[selectedCourse] === 'in_progress'
                  ? 'bg-orange-200 text-orange-800'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => handleCourseStatusChange(selectedCourse, 'completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                courseStatus[selectedCourse] === 'completed'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              Completed
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default CourseFlow; 