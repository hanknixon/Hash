import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Brain,
  Zap,
  Flame,
  X
} from 'lucide-react';

// Quiz data
const quizData = {
  topic: "Data Structures and Algorithms",
  subject: "Computer Science",
  teacher: "Dr. Manoj T Joy",
  questions: [
    // Easy Questions
    {
      id: 1,
      difficulty: "easy",
      question: "What is the time complexity of searching an element in a sorted array using binary search?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(n²)"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      difficulty: "easy",
      question: "Which data structure follows the LIFO principle?",
      options: [
        "Queue",
        "Stack",
        "Linked List",
        "Tree"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      difficulty: "easy",
      question: "What is the space complexity of an array?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n²)"
      ],
      correctAnswer: 1
    },
    // Medium Questions
    {
      id: 4,
      difficulty: "medium",
      question: "What is the worst-case time complexity of quicksort?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(n²)"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      difficulty: "medium",
      question: "In a min-heap, what is true about the root node?",
      options: [
        "It's the largest element",
        "It's the smallest element",
        "It's always the median",
        "It's random"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      difficulty: "medium",
      question: "What is the time complexity of inserting an element in a balanced BST?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      difficulty: "medium",
      question: "Which traversal of a binary tree visits the root node last?",
      options: [
        "Inorder",
        "Preorder",
        "Postorder",
        "Level order"
      ],
      correctAnswer: 2
    },
    // Hard Questions
    {
      id: 8,
      difficulty: "hard",
      question: "What is the time complexity of Floyd-Warshall algorithm?",
      options: [
        "O(n²)",
        "O(n³)",
        "O(2ⁿ)",
        "O(n log n)"
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      difficulty: "hard",
      question: "In a Red-Black tree, what is the maximum possible height of a tree with n nodes?",
      options: [
        "log n",
        "2 log n",
        "n/2",
        "n"
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      difficulty: "hard",
      question: "What is the space complexity of storing all possible subsets of a set with n elements?",
      options: [
        "O(n)",
        "O(n²)",
        "O(2ⁿ)",
        "O(n!)"
      ],
      correctAnswer: 2
    }
  ]
};

const QuizPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const getUnansweredQuestions = () => {
    return quizData.questions.filter(q => answers[q.id] === undefined);
  };

  const scrollToQuestion = (questionId) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = () => {
    const unanswered = getUnansweredQuestions();
    if (unanswered.length > 0) {
      setErrorMessage(`Please answer all questions. ${unanswered.length} questions remaining.`);
      setShowError(true);
      scrollToQuestion(unanswered[0].id);
      setTimeout(() => setShowError(false), 3000);
    } else {
      // Handle submission
      navigate("/ResultsPage");
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return <Brain className="text-green-400" size={20} />;
      case 'medium':
        return <Zap className="text-yellow-400" size={20} />;
      case 'hard':
        return <Flame className="text-red-400" size={20} />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'border-green-400';
      case 'medium':
        return 'border-yellow-400';
      case 'hard':
        return 'border-red-400';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#2D2B3D]">
      {/* Navbar */}
      <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
        <div className="text-white">
          <h1 className="text-xl font-bold">{quizData.topic}</h1>
          <p className="text-sm text-gray-400">{quizData.subject} • {quizData.teacher}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-white">Welcome, User</span>
          <motion.img
            whileHover={{ scale: 1.1 }}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative">
        {/* Questions */}
        <div className="space-y-8 mb-20">
          {quizData.questions.map((question, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={question.id}
              id={`question-${question.id}`}
              className={`bg-[#1E1C2E] rounded-xl p-6 border-l-4 ${getDifficultyColor(question.difficulty)}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#2D2B3D] rounded-full flex items-center justify-center">
                  {answers[question.id] !== undefined ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <span className="text-white">{question.id}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-4">
                    {getDifficultyIcon(question.difficulty)}
                    <span className="text-gray-400 text-sm capitalize">{question.difficulty}</span>
                  </div>
                  <h3 className="text-white text-lg mb-4">{question.question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, optionIndex) => (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={optionIndex}
                        onClick={() => handleAnswer(question.id, optionIndex)}
                        className={`p-4 rounded-lg text-left transition-all duration-200 ${
                          answers[question.id] === optionIndex
                            ? 'bg-purple-500 text-white'
                            : 'bg-[#2D2B3D] text-gray-300 hover:bg-[#3A3750]'
                        }`}
                      >
                        <span className="mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-1/2 right-4 transform -translate-y-1/2"
        >
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-[#1E1C2E] p-3 rounded-full shadow-lg text-white hover:bg-[#3A3750] transition-colors duration-200"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>

        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#1E1C2E] shadow-xl p-6 overflow-y-auto"
            >
              <button
                onClick={() => setShowSidebar(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <h3 className="text-white text-xl font-bold mb-6">Navigation</h3>

              {/* Difficulty Sections */}
              <div className="space-y-4 mb-8">
                <h4 className="text-gray-400 text-sm">Jump to Difficulty</h4>
                <div className="space-y-2">
                  {['easy', 'medium', 'hard'].map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => {
                        const firstQuestion = quizData.questions.find(q => q.difficulty === difficulty);
                        if (firstQuestion) {
                          scrollToQuestion(firstQuestion.id);
                          setShowSidebar(false);
                        }
                      }}
                      className="flex items-center space-x-2 w-full p-2 rounded-lg bg-[#2D2B3D] text-white hover:bg-[#3A3750] transition-colors duration-200"
                    >
                      {getDifficultyIcon(difficulty)}
                      <span className="capitalize">{difficulty}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Unanswered Questions */}
              <div className="space-y-4">
                <h4 className="text-gray-400 text-sm">Unanswered Questions</h4>
                <div className="space-y-2">
                  {getUnansweredQuestions().map(question => (
                    <button
                      key={question.id}
                      onClick={() => {
                        scrollToQuestion(question.id);
                        setShowSidebar(false);
                      }}
                      className="flex items-center space-x-2 w-full p-2 rounded-lg bg-[#2D2B3D] text-white hover:bg-[#3A3750] transition-colors duration-200"
                    >
                      <AlertCircle size={16} className="text-yellow-400" />
                      <span>Question {question.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-[#1E1C2E] p-4 shadow-lg"
        >
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white">
              <span className="text-gray-400">Progress: </span>
              {Object.keys(answers).length}/10 answered
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Submit Quiz</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Error Toast */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
            >
              <AlertTriangle size={20} />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;