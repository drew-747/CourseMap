import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const technicalContent = {
  'CS 11': {
    title: 'Introduction to Computer Science',
    description: 'Foundation course covering programming fundamentals and computational thinking.',
    topics: [
      'Basic Programming Concepts',
      'Data Types and Variables',
      'Control Structures',
      'Functions and Modularity',
      'Basic Data Structures'
    ],
    technicalDetails: {
      languages: ['Python'],
      tools: ['VS Code', 'Python IDLE', 'Git'],
      concepts: [
        {
          name: 'Algorithm Analysis',
          examples: ['Time Complexity', 'Space Complexity', 'Big-O Notation']
        },
        {
          name: 'Problem Solving',
          examples: ['Decomposition', 'Pattern Recognition', 'Abstraction']
        }
      ],
      practicalApplications: [
        {
          title: 'Console Calculator',
          description: 'Build a calculator that handles basic arithmetic operations using functions and error handling.',
          code: `def calculate(num1, num2, operator):
    try:
        if operator == '+':
            return num1 + num2
        elif operator == '-':
            return num1 - num2
        elif operator == '*':
            return num1 * num2
        elif operator == '/':
            return num1 / num2
        else:
            raise ValueError("Invalid operator")
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except ValueError as e:
        return str(e)`
        }
      ]
    }
  },
  'CS 12': {
    title: 'Computer Programming',
    description: 'Advanced programming concepts and object-oriented programming.',
    topics: [
      'Object-Oriented Programming',
      'Classes and Objects',
      'Inheritance and Polymorphism',
      'Exception Handling',
      'File I/O'
    ],
    technicalDetails: {
      languages: ['Java'],
      tools: ['Eclipse IDE', 'JUnit', 'Git'],
      concepts: [
        {
          name: 'OOP Principles',
          examples: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction']
        },
        {
          name: 'Design Patterns',
          examples: ['Singleton', 'Factory', 'Observer']
        }
      ],
      practicalApplications: [
        {
          title: 'Student Management System',
          description: 'Create a system to manage student records using OOP principles.',
          code: `public class Student {
    private String id;
    private String name;
    private List<Course> courses;

    public Student(String id, String name) {
        this.id = id;
        this.name = name;
        this.courses = new ArrayList<>();
    }

    public void enrollCourse(Course course) {
        if (course.hasPrerequisites(this)) {
            courses.add(course);
        } else {
            throw new PrerequisiteException("Prerequisites not met");
        }
    }
}`
        }
      ]
    }
  }
  // Add more courses as needed
};

function CourseDetailModal({ isOpen, onClose, courseCode }) {
  const course = technicalContent[courseCode];

  if (!course) return null;

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
                  {courseCode}: {course.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {course.description}
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
                            {example}
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
                        <code>{app.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CourseDetailModal; 