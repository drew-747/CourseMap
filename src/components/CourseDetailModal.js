import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const technicalContent = {
  'CS 10': {
    title: 'Introduction to Computing',
    description: 'History, components, and impact of computers. Data storage, trends, and issues in computing.',
    topics: [
      'History of Computing',
      'Computer Hardware & Software',
      'Data Storage',
      'Binary & Number Systems',
      'Trends in Computing'
    ],
    technicalDetails: {
      languages: ['None (Conceptual)'],
      tools: ['Computer', 'Calculator'],
      concepts: [
        { name: 'Computer Architecture', examples: ['CPU', 'Memory', 'I/O Devices'] },
        { name: 'Data Representation', examples: ['Binary', 'Hexadecimal', 'ASCII'] }
      ],
      practicalApplications: [
        { title: 'Build a Simple Computer Model', description: 'Diagram the parts of a computer and explain their functions.', code: '// Draw and label CPU, RAM, Storage, I/O' }
      ]
    }
  },
  'CS 11': {
    title: 'Computer Programming I',
    description: 'Basic programming, logic, and problem-solving using Python.',
    topics: [
      'Variables & Data Types',
      'Control Structures',
      'Functions',
      'Basic Algorithms',
      'Input/Output'
    ],
    technicalDetails: {
      languages: ['Python'],
      tools: ['VS Code', 'Python IDLE'],
      concepts: [
        { name: 'Programming Logic', examples: ['If-Else', 'Loops', 'Functions'] },
        { name: 'Problem Solving', examples: ['Algorithm Design', 'Debugging'] }
      ],
      practicalApplications: [
        { title: 'Simple Calculator', description: 'Write a Python program to perform basic arithmetic operations.', code: 'def add(a, b):\n    return a + b' }
      ]
    }
  },
  'CS 12': {
    title: 'Computer Programming II',
    description: 'Object-oriented programming and advanced programming techniques in Java.',
    topics: [
      'OOP Principles',
      'Classes & Objects',
      'Inheritance',
      'Polymorphism',
      'Exception Handling'
    ],
    technicalDetails: {
      languages: ['Java'],
      tools: ['Eclipse', 'JUnit'],
      concepts: [
        { name: 'OOP Principles', examples: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'] },
        { name: 'Design Patterns', examples: ['Singleton', 'Factory'] }
      ],
      practicalApplications: [
        { title: 'Student Management System', description: 'Create a system to manage student records using OOP.', code: 'public class Student {\n    private String name;\n    // ...\n}' }
      ]
    }
  },
  'CS 20': {
    title: 'Digital Electronics and Circuits',
    description: 'Introduction to digital logic, circuits, and electronics.',
    topics: [
      'Logic Gates',
      'Boolean Algebra',
      'Combinational Circuits',
      'Sequential Circuits',
      'Flip-Flops'
    ],
    technicalDetails: {
      languages: ['None (Hardware)'],
      tools: ['Breadboard', 'Logic Simulator'],
      concepts: [
        { name: 'Digital Logic', examples: ['AND, OR, NOT', 'Truth Tables'] },
        { name: 'Circuit Design', examples: ['Adder', 'Multiplexer'] }
      ],
      practicalApplications: [
        { title: 'Build a Logic Circuit', description: 'Design and simulate a simple adder circuit.', code: '// Use logic simulator to build adder' }
      ]
    }
  },
  'CS 21': {
    title: 'Computer Organization and Architecture',
    description: 'Study of computer hardware organization and architecture principles.',
    topics: [
      'CPU Architecture',
      'Memory Hierarchy',
      'I/O Systems',
      'Assembly Language',
      'Performance Analysis'
    ],
    technicalDetails: {
      languages: ['Assembly', 'C'],
      tools: ['MARS', 'GDB'],
      concepts: [
        { name: 'CPU Design', examples: ['Pipelining', 'Cache Memory'] },
        { name: 'Assembly Programming', examples: ['Registers', 'Memory Operations'] }
      ],
      practicalApplications: [
        { title: 'Assembly Program', description: 'Write an assembly program to perform basic operations.', code: '.data\n    # Data section\n.text\n    # Code section' }
      ]
    }
  },
  'CS 30': {
    title: 'Discrete Mathematics for CS I',
    description: 'Foundational mathematical concepts for computer science.',
    topics: [
      'Logic and Proofs',
      'Sets and Functions',
      'Relations',
      'Combinatorics',
      'Graph Theory'
    ],
    technicalDetails: {
      languages: ['None (Mathematical)'],
      tools: ['LaTeX', 'Graph Visualization Tools'],
      concepts: [
        {
          name: 'Mathematical Logic', 
          examples: [
            'Propositional Logic: $p \\rightarrow q \\equiv \\neg p \\lor q$',
            'Predicate Logic: $\\forall x \\in S, P(x)$',
            'Proof by Induction: $P(1) \\land (P(n) \\rightarrow P(n+1)) \\rightarrow \\forall n, P(n)$'
          ] 
        },
        { 
          name: 'Graph Theory', 
          examples: [
            'Graph Types: $G = (V,E)$',
            'Path Finding: $d(u,v) = \\min\\{w(P) | P \\text{ is a path from } u \\text{ to } v\\}$',
            'Euler Circuit: $\\deg(v) \\text{ is even } \\forall v \\in V$'
          ] 
        }
      ],
      practicalApplications: [
        {
          title: 'Graph Algorithm', 
          description: 'Implement a graph traversal algorithm with formal proofs.',
          code: '// Graph traversal implementation\n// Theorem: $\\forall v \\in V, \\exists$ path from $s$ to $v$\n// Proof: By induction on path length' 
        }
      ]
    }
  },
  'CS 31': {
    title: 'Discrete Mathematics for CS II',
    description: 'Advanced discrete mathematics and probability for computer science.',
    topics: [
      'Probability Theory',
      'Statistics',
      'Number Theory',
      'Cryptography',
      'Advanced Graph Theory'
    ],
    technicalDetails: {
      languages: ['Python', 'None (Mathematical)'],
      tools: ['Jupyter Notebook', 'Statistical Software'],
      concepts: [
        {
          name: 'Probability', 
          examples: [
            'Random Variables: $E[X] = \\sum_{x} x \\cdot P(X=x)$',
            'Distributions: $P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}$',
            'Bayes Theorem: $P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$'
          ] 
        },
        { 
          name: 'Cryptography', 
          examples: [
            'RSA: $c = m^e \\bmod n$',
            'Hash Functions: $H(m) \\rightarrow \\{0,1\\}^n$',
            'Diffie-Hellman: $K = g^{ab} \\bmod p$'
          ] 
        }
      ],
      practicalApplications: [
        {
          title: 'Cryptographic System', 
          description: 'Implement a basic cryptographic system with formal security proofs.',
          code: 'def encrypt(message, key):\n    # Encryption implementation\n    # Security: $\\forall m_1,m_2, P(E(m_1) = E(m_2)) \\leq \\epsilon$' 
        }
      ]
    }
  },
  'CS 32': {
    title: 'Data Structures and Algorithms I',
    description: 'Fundamental data structures and algorithm analysis.',
    topics: [
      'Arrays and Lists',
      'Stacks and Queues',
      'Trees',
      'Sorting Algorithms',
      'Algorithm Analysis'
    ],
    technicalDetails: {
      languages: ['Java', 'Python'],
      tools: ['IDE', 'Algorithm Visualization Tools'],
      concepts: [
        { name: 'Data Structures', examples: ['Linked Lists', 'Binary Trees'] },
        { name: 'Algorithm Analysis', examples: ['Big O Notation', 'Complexity Analysis'] }
      ],
      practicalApplications: [
        { title: 'Sorting Implementation', description: 'Implement and compare different sorting algorithms.', code: 'def quickSort(arr):\n    # Quick sort implementation' }
      ]
    }
  },
  'CS 33': {
    title: 'Data Structures and Algorithms II',
    description: 'Advanced data structures and algorithm design techniques.',
    topics: [
      'Graphs',
      'Dynamic Programming',
      'Greedy Algorithms',
      'Advanced Trees',
      'Complexity Classes'
    ],
    technicalDetails: {
      languages: ['Java', 'Python'],
      tools: ['IDE', 'Algorithm Visualization Tools'],
      concepts: [
        { name: 'Graph Algorithms', examples: ['Dijkstra', 'Kruskal'] },
        { name: 'Dynamic Programming', examples: ['Memoization', 'Tabulation'] }
      ],
      practicalApplications: [
        { title: 'Shortest Path Finder', description: 'Implement Dijkstra\'s algorithm for shortest path.', code: '// Dijkstra\'s algorithm implementation' }
      ]
    }
  },
  'CS 132': {
    title: 'Introduction to Data Science',
    description: 'Fundamentals of data science and analytics.',
    topics: [
      'Data Analysis',
      'Machine Learning',
      'Statistical Methods',
      'Data Visualization',
      'Big Data'
    ],
    technicalDetails: {
      languages: ['Python', 'R'],
      tools: ['Jupyter Notebook', 'Pandas', 'Scikit-learn'],
      concepts: [
        { name: 'Data Analysis', examples: ['Data Cleaning', 'Feature Engineering'] },
        { name: 'Machine Learning', examples: ['Classification', 'Regression'] }
      ],
      practicalApplications: [
        { title: 'Data Analysis Project', description: 'Analyze a dataset and create visualizations.', code: 'import pandas as pd\nimport matplotlib.pyplot as plt' }
      ]
    }
  },
  'CS 133': {
    title: 'Automata Theory and Complexity',
    description: 'Study of computational models and complexity theory.',
    topics: [
      'Finite Automata',
      'Regular Languages',
      'Context-Free Grammars',
      'Turing Machines',
      'Complexity Classes'
    ],
    technicalDetails: {
      languages: ['None (Theoretical)'],
      tools: ['Automata Simulator'],
      concepts: [
        { name: 'Automata', examples: ['DFA', 'NFA', 'PDA'] },
        { name: 'Complexity', examples: ['P vs NP', 'Reductions'] }
      ],
      practicalApplications: [
        { title: 'Automata Simulator', description: 'Implement a simple automata simulator.', code: '// Automata simulation code' }
      ]
    }
  },
  'CS 136': {
    title: 'Elementary Numerical Computing I',
    description: 'Introduction to numerical methods and scientific computing.',
    topics: [
      'Numerical Methods',
      'Linear Algebra',
      'Root Finding',
      'Integration',
      'Differential Equations'
    ],
    technicalDetails: {
      languages: ['Python', 'MATLAB'],
      tools: ['NumPy', 'SciPy'],
      concepts: [
        { 
          name: 'Numerical Methods', 
          examples: [
            'Newton\'s Method: $x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}$',
            'Gaussian Elimination: $Ax = b \\rightarrow Ux = c$',
            'Error Analysis: $|x - \\hat{x}| \\leq \\epsilon$'
          ] 
        },
        { 
          name: 'Scientific Computing', 
          examples: [
            'Matrix Operations: $A^{-1} = \\frac{1}{\\det(A)}\\text{adj}(A)$',
            'ODE Solvers: $\\frac{dy}{dx} = f(x,y)$',
            'Numerical Integration: $\\int_a^b f(x)dx \\approx \\sum_{i=1}^n w_i f(x_i)$'
          ] 
        }
      ],
      practicalApplications: [
        { 
          title: 'Numerical Solver', 
          description: 'Implement numerical methods for solving equations with error bounds.',
          code: 'import numpy as np\nfrom scipy import optimize\n\n# Solve $f(x) = 0$ with error bound $\\epsilon$\ndef newton_method(f, f_prime, x0, epsilon):\n    # Implementation' 
        }
      ]
    }
  },
  'CS 138': {
    title: 'Elementary Numerical Computing II',
    description: 'Advanced numerical computing and scientific applications.',
    topics: [
      'Advanced Numerical Methods',
      'Optimization',
      'Monte Carlo Methods',
      'Parallel Computing',
      'Scientific Applications'
    ],
    technicalDetails: {
      languages: ['Python', 'C++'],
      tools: ['NumPy', 'MPI'],
      concepts: [
        { 
          name: 'Optimization', 
          examples: [
            'Gradient Descent: $x_{n+1} = x_n - \\alpha \\nabla f(x_n)$',
            'Convex Optimization: $\\min_{x} f(x) \\text{ s.t. } g_i(x) \\leq 0$',
            'Lagrange Multipliers: $\\nabla f = \\lambda \\nabla g$'
          ] 
        },
        { 
          name: 'Parallel Computing', 
          examples: [
            'MPI: $T_p = \\frac{T_1}{p} + T_{comm}$',
            'OpenMP: $\\text{speedup} = \\frac{T_1}{T_p}$',
            'Load Balancing: $\\max_i t_i - \\min_i t_i \\leq \\epsilon$'
          ] 
        }
      ],
      practicalApplications: [
        { 
          title: 'Parallel Solver', 
          description: 'Implement a parallel numerical solver with performance analysis.',
          code: 'from mpi4py import MPI\nimport numpy as np\n\n# Solve $Ax = b$ in parallel\n# Performance: $T_p = O(\\frac{n^3}{p} + \\log p)$' 
        }
      ]
    }
  },
  'CS 140': {
    title: 'Operating Systems',
    description: 'Study of operating system concepts and implementation.',
    topics: [
      'Process Management',
      'Memory Management',
      'File Systems',
      'I/O Systems',
      'Synchronization'
    ],
    technicalDetails: {
      languages: ['C', 'Assembly'],
      tools: ['Linux', 'GDB'],
      concepts: [
        { name: 'Process Management', examples: ['Scheduling', 'Threading'] },
        { name: 'Memory Management', examples: ['Virtual Memory', 'Paging'] }
      ],
      practicalApplications: [
        { title: 'Process Scheduler', description: 'Implement a simple process scheduler.', code: '// Process scheduling implementation' }
      ]
    }
  },
  'CS 145': {
    title: 'Computer Networks',
    description: 'Study of computer networks and protocols.',
    topics: [
      'Network Architecture',
      'Protocols',
      'Routing',
      'Security',
      'Wireless Networks'
    ],
    technicalDetails: {
      languages: ['Python', 'C'],
      tools: ['Wireshark', 'Cisco Packet Tracer'],
      concepts: [
        { name: 'Network Protocols', examples: ['TCP/IP', 'HTTP'] },
        { name: 'Network Security', examples: ['Firewalls', 'Encryption'] }
      ],
      practicalApplications: [
        { title: 'Network Analyzer', description: 'Create a simple network packet analyzer.', code: 'import scapy.all as scapy' }
      ]
    }
  },
  'CS 150': {
    title: 'Programming Languages',
    description: 'Study of programming language design and implementation.',
    topics: [
      'Language Design',
      'Compilers',
      'Interpreters',
      'Type Systems',
      'Language Paradigms'
    ],
    technicalDetails: {
      languages: ['Multiple Languages'],
      tools: ['Compiler Tools', 'Language Design Tools'],
      concepts: [
        { name: 'Language Design', examples: ['Syntax', 'Semantics'] },
        { name: 'Compilation', examples: ['Lexical Analysis', 'Parsing'] }
      ],
      practicalApplications: [
        { title: 'Simple Interpreter', description: 'Implement a basic language interpreter.', code: '// Interpreter implementation' }
      ]
    }
  },
  'CS 153': {
    title: 'Introduction to Computer Security',
    description: 'Study of computer security principles and practices.',
    topics: [
      'Cryptography',
      'Network Security',
      'System Security',
      'Web Security',
      'Security Policies'
    ],
    technicalDetails: {
      languages: ['Python', 'C'],
      tools: ['Security Tools', 'Cryptography Libraries'],
      concepts: [
        { name: 'Cryptography', examples: ['Symmetric', 'Asymmetric'] },
        { name: 'Security Protocols', examples: ['SSL/TLS', 'SSH'] }
      ],
      practicalApplications: [
        { title: 'Security Tool', description: 'Implement a basic security tool.', code: 'from cryptography.fernet import Fernet' }
      ]
    }
  },
  'CS 155': {
    title: 'Compiler Construction',
    description: 'Study of compiler design and implementation.',
    topics: [
      'Lexical Analysis',
      'Syntax Analysis',
      'Semantic Analysis',
      'Code Generation',
      'Optimization'
    ],
    technicalDetails: {
      languages: ['C++', 'Java'],
      tools: ['Compiler Tools', 'Parser Generators'],
      concepts: [
        { name: 'Compiler Phases', examples: ['Lexing', 'Parsing'] },
        { name: 'Code Generation', examples: ['IR', 'Assembly'] }
      ],
      practicalApplications: [
        { title: 'Simple Compiler', description: 'Implement a basic compiler for a small language.', code: '// Compiler implementation' }
      ]
    }
  },
  'CS 165': {
    title: 'Database Systems',
    description: 'Study of database design and management.',
    topics: [
      'Database Design',
      'SQL',
      'Transactions',
      'Indexing',
      'Query Optimization'
    ],
    technicalDetails: {
      languages: ['SQL', 'Python'],
      tools: ['PostgreSQL', 'MySQL'],
      concepts: [
        { name: 'Database Design', examples: ['ER Diagrams', 'Normalization'] },
        { name: 'Query Processing', examples: ['Query Plans', 'Indexing'] }
      ],
      practicalApplications: [
        { title: 'Database Application', description: 'Create a database-driven application.', code: 'import sqlite3\nconn = sqlite3.connect(\'database.db\')' }
      ]
    }
  },
  'CS 180': {
    title: 'Artificial Intelligence',
    description: 'Study of AI principles and applications.',
    topics: [
      'Search Algorithms',
      'Machine Learning',
      'Neural Networks',
      'Natural Language Processing',
      'Computer Vision'
    ],
    technicalDetails: {
      languages: ['Python'],
      tools: ['TensorFlow', 'PyTorch'],
      concepts: [
        { name: 'Machine Learning', examples: ['Supervised Learning', 'Unsupervised Learning'] },
        { name: 'Neural Networks', examples: ['CNN', 'RNN'] }
      ],
      practicalApplications: [
        { title: 'AI Model', description: 'Implement a simple AI model.', code: 'import tensorflow as tf\nmodel = tf.keras.Sequential()' }
      ]
    }
  },
  'CS 191': {
    title: 'Software Engineering I',
    description: 'Introduction to software engineering principles.',
    topics: [
      'Software Lifecycle',
      'Requirements',
      'Design',
      'Testing',
      'Project Management'
    ],
    technicalDetails: {
      languages: ['Multiple Languages'],
      tools: ['Git', 'JIRA'],
      concepts: [
        { name: 'Software Design', examples: ['UML', 'Design Patterns'] },
        { name: 'Testing', examples: ['Unit Testing', 'Integration Testing'] }
      ],
      practicalApplications: [
        { title: 'Software Project', description: 'Develop a software project following SE principles.', code: '// Project implementation' }
      ]
    }
  },
  'CS 192': {
    title: 'Software Engineering II',
    description: 'Advanced software engineering and project development.',
    topics: [
      'Architecture',
      'Quality Assurance',
      'Deployment',
      'Maintenance',
      'Team Development'
    ],
    technicalDetails: {
      languages: ['Multiple Languages'],
      tools: ['CI/CD Tools', 'Testing Frameworks'],
      concepts: [
        { name: 'Software Architecture', examples: ['Microservices', 'Cloud'] },
        { name: 'DevOps', examples: ['CI/CD', 'Containerization'] }
      ],
      practicalApplications: [
        { title: 'Team Project', description: 'Develop a team software project.', code: '// Team project implementation' }
      ]
    }
  },
  'CS 194': {
    title: 'Undergraduate Research Seminar',
    description: 'Introduction to research methods and presentation.',
    topics: [
      'Research Methods',
      'Literature Review',
      'Paper Writing',
      'Presentation Skills',
      'Research Ethics'
    ],
    technicalDetails: {
      languages: ['None (Research)'],
      tools: ['LaTeX', 'Reference Managers'],
      concepts: [
        { name: 'Research Methods', examples: ['Experimental Design', 'Data Analysis'] },
        { name: 'Academic Writing', examples: ['Paper Structure', 'Citations'] }
      ],
      practicalApplications: [
        { title: 'Research Paper', description: 'Write a research paper on a CS topic.', code: '// Research paper in LaTeX' }
      ]
    }
  },
  'CS 195': {
    title: 'Practicum',
    description: 'Industry internship and practical experience.',
    topics: [
      'Industry Practices',
      'Project Development',
      'Team Collaboration',
      'Professional Skills',
      'Industry Tools'
    ],
    technicalDetails: {
      languages: ['Industry Specific'],
      tools: ['Industry Tools'],
      concepts: [
        { name: 'Industry Practices', examples: ['Agile', 'DevOps'] },
        { name: 'Professional Skills', examples: ['Communication', 'Leadership'] }
      ],
      practicalApplications: [
        { title: 'Industry Project', description: 'Complete an industry project.', code: '// Industry project implementation' }
      ]
    }
  },
  'CS 196': {
    title: 'Seminar on EPIC',
    description: 'Study of ethical and professional issues in computing.',
    topics: [
      'Ethics',
      'Professionalism',
      'Social Impact',
      'Legal Issues',
      'Sustainability'
    ],
    technicalDetails: {
      languages: ['None (Discussion)'],
      tools: ['Case Studies'],
      concepts: [
        { name: 'Ethics', examples: ['Privacy', 'Security'] },
        { name: 'Professionalism', examples: ['Codes of Conduct', 'Best Practices'] }
      ],
      practicalApplications: [
        { title: 'Ethics Case Study', description: 'Analyze and present an ethics case study.', code: '// Ethics analysis' }
      ]
    }
  },
  'CS 198': {
    title: 'Special Project I',
    description: 'First part of the capstone project.',
    topics: [
      'Project Planning',
      'Research',
      'Design',
      'Implementation',
      'Documentation'
    ],
    technicalDetails: {
      languages: ['Project Specific'],
      tools: ['Project Tools'],
      concepts: [
        { name: 'Project Management', examples: ['Planning', 'Execution'] },
        { name: 'Technical Skills', examples: ['Development', 'Testing'] }
      ],
      practicalApplications: [
        { title: 'Capstone Project', description: 'Develop the first part of the capstone project.', code: '// Project implementation' }
      ]
    }
  },
  'CS 199': {
    title: 'Special Project II',
    description: 'Completion of the capstone project.',
    topics: [
      'Project Completion',
      'Testing',
      'Deployment',
      'Documentation',
      'Presentation'
    ],
    technicalDetails: {
      languages: ['Project Specific'],
      tools: ['Project Tools'],
      concepts: [
        { name: 'Project Completion', examples: ['Final Testing', 'Deployment'] },
        { name: 'Documentation', examples: ['User Manual', 'Technical Docs'] }
      ],
      practicalApplications: [
        { title: 'Final Project', description: 'Complete and present the capstone project.', code: '// Final project implementation' }
      ]
    }
  }
};

function renderWithLatex(text) {
  // If the string contains $...$, render as LaTeX, else as plain text
  const latexRegex = /\$(.+?)\$/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = latexRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    parts.push(<InlineMath key={key++}>{match[1]}</InlineMath>);
    lastIndex = latexRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return parts;
}

function CourseDetailModal({ isOpen, onClose, courseCode, bestPractices = [], resources = [] }) {
  const course = technicalContent[courseCode];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {courseCode}{course ? `: ${course.title}` : ''}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {course ? course.description : 'No detailed information available for this course.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            {course && (
            <div className="space-y-8">
              {/* Topics */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Topics Covered</h3>
                <div className="grid grid-cols-2 gap-2">
                  {course.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-2 text-sm"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Stack */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Technical Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.technicalDetails.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.technicalDetails.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Concepts */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Concepts</h3>
                <div className="space-y-4">
                  {course.technicalDetails.concepts.map((concept, index) => (
                    <div
                      key={index}
                      className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-4"
                    >
                      <h4 className="font-medium mb-2">{concept.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {concept.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-neutral-200 dark:bg-neutral-600 rounded text-sm"
                          >
                              {renderWithLatex(example)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Applications */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Practical Applications</h3>
                <div className="space-y-4">
                  {course.technicalDetails.practicalApplications.map((app, index) => (
                    <div
                      key={index}
                      className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-4"
                    >
                      <h4 className="font-medium mb-2">{app.title}</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        {app.description}
                      </p>
                      <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
                          <code>
                            {app.code.split('\n').map((line, idx) =>
                              line.includes('$') ? <BlockMath key={idx}>{line.match(/\$(.+?)\$/)?.[1] || line}</BlockMath> : <div key={idx}>{line}</div>
                            )}
                          </code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            )}

            {/* Best Practices */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Best Practices & Insights</h3>
              {bestPractices.length > 0 ? (
                <ul className="space-y-2">
                  {bestPractices.map((bp, idx) => (
                    <li key={idx} className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3">
                      <span className="font-semibold text-yellow-800 dark:text-yellow-200">{bp.author}:</span> {bp.tip}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-neutral-500 text-sm">No best practices or insights available for this course yet.</div>
              )}
            </div>

            {/* Resources */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Resources</h3>
              {resources.length > 0 ? (
                <ul className="space-y-2">
                  {resources.map((res, idx) => (
                    <li key={idx}>
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 underline">
                        {res.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-neutral-500 text-sm">No resources available for this course yet.</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CourseDetailModal; 