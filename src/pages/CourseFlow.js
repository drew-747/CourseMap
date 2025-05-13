import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
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
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaStickyNote } from 'react-icons/fa';

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

// 1. Define which courses are majors (CS, Math, Physics)
const isMajorCourse = code => (
  code.startsWith('CS') || code.startsWith('Math') || code.startsWith('Physics')
);

// Helper to categorize non-majors
const isGE = code => [
  'KAS 1', 'PHILO 1', 'ENG 13', 'SPEECH 30', 'FIL 40', 'ENG 30', 'STS 1', 'ARTS 1', 'PI 100',
  'SOCSCI 1', 'SOCSCI 2', 'DRMAPS'
].includes(code);
const isPE = code => code.startsWith('PE');
const isNSTP = code => code.startsWith('NSTP');

// Node positions based on semesters (you may need to adjust these values)
const getNodePosition = (code) => {
  // Visually separated bands: CS (rows 0-2), Math (row 4), Physics (row 6)
  const getCoordinates = (col, row) => ({ x: col * 160, y: row * 90 });

  // Each (col, row) is unique to avoid overlap. Grouped by subject and semester.
  // Row 0-2: CS, Row 4: Math, Row 6: Physics, Row 8+: Project/Other
  const positions = {
    // Year 1, 1st Sem (col 0)
    'CS 11': getCoordinates(0, 0),
    'CS 30': getCoordinates(0, 1),
    'CS 10': getCoordinates(0, 2),
    'Math 21': getCoordinates(0, 4),
    // Physics not in 1st sem

    // Year 1, 2nd Sem (col 1)
    'CS 12': getCoordinates(1, 0),
    'CS 31': getCoordinates(1, 1),
    // No CS in row 2 this sem
    'Math 22': getCoordinates(1, 4),
    'Physics 71': getCoordinates(1, 6),

    // Year 2, 1st Sem (col 2)
    'CS 20': getCoordinates(2, 0),
    'CS 32': getCoordinates(2, 1),
    'CS 136': getCoordinates(2, 2),
    'Math 23': getCoordinates(2, 4),
    'Physics 72': getCoordinates(2, 6),

    // Year 2, 2nd Sem (col 3)
    'CS 21': getCoordinates(3, 0),
    'CS 33': getCoordinates(3, 1),
    'CS 138': getCoordinates(3, 2),
    'Math 40': getCoordinates(3, 4),
    // No Physics this sem

    // Year 3, 1st Sem (col 4)
    'CS 140': getCoordinates(4, 0),
    'CS 150': getCoordinates(4, 1),
    'CS 191': getCoordinates(4, 2),
    // No Math/Physics this sem

    // Year 3, 2nd Sem (col 5)
    'CS 145': getCoordinates(5, 0),
    'CS 153': getCoordinates(5, 1),
    'CS 165': getCoordinates(5, 2),
    'CS 192': getCoordinates(5, 3),
    // No Math/Physics this sem

    // Midyear (col 6)
    'CS 195': getCoordinates(6, 3),

    // Year 4, 1st Sem (col 7)
    'CS 155': getCoordinates(7, 0),
    'CS 180': getCoordinates(7, 1),
    'CS 133': getCoordinates(7, 2),
    'CS 198': getCoordinates(7, 3),

    // Year 4, 2nd Sem (col 8)
    'CS 132': getCoordinates(8, 2),
    'CS 199/200': getCoordinates(8, 3),

    // Other courses (GE, PE, etc.) can be placed below or in separate columns as needed
    'CS 196': getCoordinates(9, 5),
    'CS 194': getCoordinates(9, 6),
    // ... add more as needed for your curriculum
  };

  // Organize non-majors into rows: GE (row 0), PE (row 1), NSTP (row 2)
  if (!isMajorCourse(code)) {
    let row = 0;
    let codesInRow = [];
    if (isGE(code)) {
      row = 0;
      codesInRow = Object.keys(courseData).filter(isGE).sort();
    } else if (isPE(code)) {
      row = 1;
      codesInRow = Object.keys(courseData).filter(isPE).sort();
    } else if (isNSTP(code)) {
      row = 2;
      codesInRow = Object.keys(courseData).filter(isNSTP).sort();
    }
    const idx = codesInRow.indexOf(code);
    // Place at y = 600 + row*70, spaced horizontally (was 900)
    return { x: idx * 160, y: 600 + row * 70 };
  }

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

  // Filter state: 'all', 'majors', 'gepe'
  const [filter, setFilter] = useState('all');

  const [userCurrentYear, setUserCurrentYear] = useState(null);

  const [courseNotes, setCourseNotes] = useState({});

  const [locked, setLocked] = useState(true); // Locked by default

  // Create nodes
  const initialNodes = useMemo(() => 
    Object.entries(courseData).map(([code, data]) => {
      const position = getNodePosition(code);
      // Determine if prerequisites are unmet and course is not completed
      const hasUnmetPrereqs = data.prerequisites && data.prerequisites.length > 0 &&
        data.prerequisites.some(prereq => courseStatus[prereq] !== 'completed') &&
        courseStatus[code] !== 'completed';
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
          hasUnmetPrereqs,
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

  // Filtered nodes and edges
  const filteredNodes = useMemo(() => {
    if (filter === 'majors') return nodes.filter(n => isMajorCourse(n.id));
    if (filter === 'gepe') return nodes.filter(n => isGE(n.id) || isPE(n.id) || isNSTP(n.id));
    return nodes;
  }, [nodes, filter]);

  const filteredNodeIds = useMemo(() => filteredNodes.map(n => n.id), [filteredNodes]);
  const filteredEdges = useMemo(() =>
    edges.filter(e => filteredNodeIds.includes(e.source) && filteredNodeIds.includes(e.target)),
    [edges, filteredNodeIds]
  );

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Center nodes on filter change and on initial mount
  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [filter, filteredNodes, reactFlowInstance]);

  // Center on initial mount as well
  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [reactFlowInstance]);

  // Fetch user's current year from Firestore
  useEffect(() => {
    const fetchCurrentYear = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserCurrentYear(docSnap.data().currentYear || null);
          }
        }
      } catch (err) {
        setUserCurrentYear(null);
      }
    };
    fetchCurrentYear();
  }, []);

  // Fetch notes for the user on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().courseNotes) {
            setCourseNotes(docSnap.data().courseNotes);
          }
        }
      } catch (err) {}
    };
    fetchNotes();
  }, []);

  // Save note for a course
  const saveNote = async (courseCode, note) => {
    setCourseNotes(prev => ({ ...prev, [courseCode]: note }));
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, { [`courseNotes.${courseCode}`]: note });
      }
    } catch (err) {}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col"
    >
      {/* Navigation Bar */}
      <NavBar />
      {/* Modern, compact header */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-3 bg-white/80 dark:bg-neutral-800/80 shadow-sm rounded-xl mt-4 mb-2 max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
            Course Flow
          </h1>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Track your academic progress</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full md:w-auto">
          {/* Lock/Unlock Toggle */}
          <button
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors text-sm shadow-sm ${locked ? 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-white' : 'bg-green-600 text-white'}`}
            onClick={() => setLocked(l => !l)}
            title={locked ? 'Unlock to drag nodes' : 'Lock node positions'}
          >
            {locked ? '🔒 Locked' : '🔓 Unlocked'}
          </button>
          {/* Filter Buttons */}
          <div className="flex gap-2 order-2 md:order-1">
            <button
              className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors text-sm shadow-sm ${filter === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white border-primary hover:bg-primary/10'}`}
              onClick={() => setFilter('all')}
            >
              Show All
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors text-sm shadow-sm ${filter === 'majors' ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white border-primary hover:bg-primary/10'}`}
              onClick={() => setFilter('majors')}
            >
              Only CS, Math, Physics
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors text-sm shadow-sm ${filter === 'gepe' ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white border-primary hover:bg-primary/10'}`}
              onClick={() => setFilter('gepe')}
            >
              Only PE, NSTP, GE
            </button>
          </div>
          {/* Progress Bar */}
          <div className="order-1 md:order-2 flex flex-col items-end bg-white/70 dark:bg-neutral-900/70 rounded-xl px-4 py-2 shadow-md min-w-[220px]">
            <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">Total Progress</span>
            <span className="text-lg md:text-2xl font-bold text-[#8B0000] tracking-tight">{completedUnits}/{totalUnits} units</span>
            <div className="w-full mt-1">
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((completedUnits / totalUnits) * 100)}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-semibold">
                {Math.round((completedUnits / totalUnits) * 100)}% Complete
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Flowchart with updated dimensions and zoom settings */}
      <div className="flex-1 bg-neutral-50 dark:bg-neutral-900 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={filteredNodes}
          edges={filteredEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          attributionPosition="bottom-right"
          style={{ width: '100%', height: '100%' }}
          onInit={setReactFlowInstance}
          nodesDraggable={!locked}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      {/* Visual divider and label for non-majors */}
      {/* Removed since all nodes are now handled by ReactFlow and filter */}
      {/* Course Status Panel */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md"
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 flex items-center gap-2">
              {selectedCourse}
              {courseNotes[selectedCourse] && <FaStickyNote className="text-primary" title="Has note" />}
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
            {/* Notes Section */}
            <div className="mb-2">
              <label className="block font-semibold mb-1 text-neutral-800 dark:text-neutral-200">Notes/Comments</label>
              <textarea
                value={courseNotes[selectedCourse] || ''}
                onChange={e => saveNote(selectedCourse, e.target.value)}
                placeholder="Add a note for this course (e.g., 'Take with a friend!')"
                className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white min-h-[60px]"
              />
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