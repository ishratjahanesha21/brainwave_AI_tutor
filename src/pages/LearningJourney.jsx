import { Book, Check, ChevronRight, Code, LogOut, Menu, Play, Sparkles, Trophy, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { coursesData } from "../constants";
import CourseDetailPage from "./CourseDetailPage";

const conceptDetails = {
  python_c1: {
    theory: `# Variables & Data Types in Python

Variables are containers for storing data values. Python has several built-in data types:

## Basic Data Types:
- **int**: Integer numbers (e.g., 42, -10)
- **float**: Decimal numbers (e.g., 3.14, -0.5)
- **str**: Text strings (e.g., "Hello", 'World')
- **bool**: Boolean values (True or False)

## Example:
\`\`\`python
name = "Alice"
age = 25
height = 5.6
is_student = True
\`\`\`

Variables in Python are dynamically typed, meaning you don't need to declare their type explicitly.`,
    challenge: {
      title: 'Create Variables',
      description: 'Create three variables: a string called "greeting", an integer called "year", and a float called "temperature".',
      starterCode: '# Create your variables here\n',
      solution: 'greeting = "Hello"\nyear = 2024\ntemperature = 23.5',
      testCases: [
        { input: '', expected: 'Variables created successfully' }
      ]
    }
  }
};


function LearningJourney() {
  const [page, setPage] = useState('courses');
  const [user, setUser] = useState({ email: 'demo@example.com', uid: 'demo' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   mockAuth.currentUser = { email: 'demo@example.com', uid: 'demo' };
  // }, []);

  const navigateTo = (newPage, data = {}) => {
    setPage(newPage);
    if (data.course) setSelectedCourse(data.course);
    if (data.milestone) setSelectedMilestone(data.milestone);
    if (data.concept) setSelectedConcept(data.concept);
    setMobileMenuOpen(false);
  };

  // const handleSignOut = () => {
  //   mockAuth.signOut();
  //   setUser(null);
  //   setPage('landing');
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {user && (
        <nav className="bg-slate-900/50 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <button onClick={() => navigateTo('courses')} className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CodeMaster
                </button>
                <div className="hidden md:flex space-x-4">
                  <button onClick={() => navigateTo('courses')} className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition">
                    Courses
                  </button>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-gray-400 text-sm">{user.email}</span>
                {/* //onClick={handleSignOut} */}
                <button  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-800/90 backdrop-blur-lg border-t border-purple-500/20">
              <div className="px-4 py-3 space-y-2">
                <button onClick={() => navigateTo('courses')} className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10">
                  Courses
                </button>
                {/* onClick={handleSignOut} */}
                <button  className="block w-full text-left text-red-300 px-3 py-2 rounded-lg hover:bg-red-500/20">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </nav>
      )}

      {page === 'landing' && <LandingPage onNavigate={navigateTo} setUser={setUser} />}
      {page === 'courses' && <CoursesPage courses={coursesData} onNavigate={navigateTo} />}
      {page === 'course-detail' && <CourseDetailPage course={selectedCourse} onNavigate={navigateTo} userProgress={userProgress} />}
      {page === 'concept' && <ConceptPage course={selectedCourse} milestone={selectedMilestone} concept={selectedConcept} onNavigate={navigateTo} userProgress={userProgress} setUserProgress={setUserProgress} />}
    </div>
  );
}

function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);

  // const handleAuth = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   if (isLogin) {
  //     //const result = await mockAuth.signIn(email, password);
  //     setUser(result.user);
  //   } else {
  //     //const result = await mockAuth.signUp(email, password);
  //     setUser(result.user);
  //   }
    
  //   setLoading(false);
  //   onNavigate('courses');
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
                AI-Powered Learning
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Master Coding with
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Interactive AI
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Learn Python, JavaScript, Java, and C++ through interactive challenges, real-time coding, and AI assistance.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                <Code className="w-5 h-5 text-purple-400" />
                <span>Live Code Editor</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span>AI Assistant</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
                <Trophy className="w-5 h-5 text-cyan-400" />
                <span>Track Progress</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            {/* onSubmit={handleAuth} */}
            <form  className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              {/* <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                )}
              </button> */}
            </form>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose CodeMaster?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Structured Learning</h3>
              <p className="text-gray-300">Follow carefully designed curriculums for each language</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Real-Time Practice</h3>
              <p className="text-gray-300">Code directly in the browser with instant feedback</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI Assistance</h3>
              <p className="text-gray-300">`Get hints and help whenever you are stuck`</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesPage({ courses, onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Path</h1>
        <p className="text-xl text-gray-300">Master programming fundamentals with interactive courses</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => onNavigate('course-detail', { course })}
            className="group cursor-pointer bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className={`text-5xl mb-4 p-4 bg-gradient-to-br ${course.color} rounded-xl inline-block`}>
              {course.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
            <p className="text-gray-400 mb-4">{course.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{course.lessons} lessons</span>
              <span>{course.duration}</span>
            </div>
            <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300">
              <span className="font-semibold">Start Learning</span>
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// function CourseDetailPage({ course, onNavigate, userProgress }) {
//   const calculateProgress = (milestone) => {
//     const completed = milestone.concepts.filter(c => userProgress[`${course.id}_${c.id}`]).length;
//     return (completed / milestone.concepts.length) * 100;
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-12">
//       <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-8 mb-8 text-white`}>
//         <div className="flex items-center space-x-4 mb-4">
//           <div className="text-6xl">{course.icon}</div>
//           <div>
//             <h1 className="text-4xl font-bold">{course.title}</h1>
//             <p className="text-white/80 mt-2">{course.description}</p>
//           </div>
//         </div>
//         <div className="flex space-x-6 mt-6">
//           <div className="flex items-center space-x-2">
//             <Book className="w-5 h-5" />
//             <span>{course.lessons} Lessons</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Trophy className="w-5 h-5" />
//             <span>{course.duration}</span>
//           </div>
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold text-white mb-6">Learning Path</h2>
//       <div className="space-y-6">
//         {course.milestones.map((milestone, idx) => (
//           <div key={milestone.id} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-white flex items-center space-x-3">
//                 <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
//                   {idx + 1}
//                 </span>
//                 <span>{milestone.title}</span>
//               </h3>
//               <span className="text-sm text-gray-400">{milestone.concepts.length} concepts</span>
//             </div>
//             <div className="w-full bg-white/10 rounded-full h-2 mb-4">
//               <div
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
//                 style={{ width: `${calculateProgress(milestone)}%` }}
//               />
//             </div>
//             <div className="space-y-2">
//               {milestone.concepts.map((concept) => (
//                 <button
//                   key={concept.id}
//                   onClick={() => onNavigate('concept', { course, milestone, concept })}
//                   className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition group"
//                 >
//                   <div className="flex items-center space-x-3">
//                     {userProgress[`${course.id}_${concept.id}`] ? (
//                       <Check className="w-5 h-5 text-green-400" />
//                     ) : (
//                       <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
//                     )}
//                     <span className="text-white">{concept.title}</span>
//                   </div>
//                   <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
<CourseDetailPage />

function ConceptPage({ course, milestone, concept, onNavigate, userProgress, setUserProgress }) {
  const [tab, setTab] = useState('theory');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [aiHelp, setAiHelp] = useState('');

  const conceptKey = `${course.id}_${concept.id}`;
  const details = conceptDetails[conceptKey] || {
    theory: '# Coming Soon\n\nThis concept is being prepared.',
    challenge: {
      title: 'Challenge',
      description: 'Complete the coding challenge',
      starterCode: '# Write your code here\n',
      solution: '',
      testCases: []
    }
  };

  useEffect(() => {
    setCode(details.challenge.starterCode);
  }, [concept.id]);

  const runCode = () => {
    setOutput('Code executed successfully!\n\n✓ All test cases passed');
  };

  const submitCode = () => {
    const newProgress = { ...userProgress, [conceptKey]: true };
    setUserProgress(newProgress);
    setOutput('✓ Challenge completed! Moving to next concept...');
    setTimeout(() => {
      const currentIdx = milestone.concepts.findIndex(c => c.id === concept.id);
      if (currentIdx < milestone.concepts.length - 1) {
        onNavigate('concept', { course, milestone, concept: milestone.concepts[currentIdx + 1] });
      } else {
        onNavigate('course-detail', { course });
      }
    }, 1500);
  };

  const getAIHelp = () => {
    setShowAI(true);
    setAiHelp('💡 **AI Hint**: Start by creating variables with the specified names. Remember that strings use quotes, integers are whole numbers, and floats have decimal points.\n\nTry this pattern:\n```\nvariable_name = value\n```');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => onNavigate('course-detail', { course })}
          className="text-purple-400 hover:text-purple-300 flex items-center space-x-2 mb-4"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Back to {course.title}</span>
        </button>
        <h1 className="text-3xl font-bold text-white">{concept.title}</h1>
        <p className="text-gray-400 mt-2">{milestone.title}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setTab('theory')}
              className={`flex-1 px-6 py-3 font-semibold transition ${
                tab === 'theory'
                  ? 'bg-purple-500/20 text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Theory
            </button>
            <button
              onClick={() => setTab('challenge')}
              className={`flex-1 px-6 py-3 font-semibold transition ${
                tab === 'challenge'
                  ? 'bg-purple-500/20 text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Challenge
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[600px]">
            {tab === 'theory' ? (
              <div className="text-gray-300 prose prose-invert max-w-none">
                {details.theory.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mb-4">{line.slice(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-purple-300 mt-6 mb-3">{line.slice(3)}</h2>;
                  if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.slice(2)}</li>;
                  if (line.startsWith('```')) return null;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="mb-2">{line}</p>;
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">{details.challenge.title}</h2>
                <p className="text-gray-300">{details.challenge.description}</p>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="text-purple-300 font-semibold mb-2">✓ Success Criteria</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Code runs without errors</li>
                    <li>• All variables are correctly defined</li>
                    <li>• Proper data types are used</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-white/10">
              <span className="text-gray-400 text-sm">Code Editor</span>
              <div className="flex space-x-2">
                <button
                  onClick={runCode}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 transition text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </button>
                <button
                  onClick={submitCode}
                  className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit</span>
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-slate-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
          </div>

          {output && (
            <div className="bg-slate-900 rounded-xl border border-white/10 p-4">
              <h3 className="text-gray-400 text-sm mb-2">Output:</h3>
              <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">{output}</pre>
            </div>
          )}

          <button
            onClick={getAIHelp}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition"
          >
            <Sparkles className="w-5 h-5" />
            <span>Ask AI for Help</span>
          </button>

          {showAI && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-purple-300 font-semibold mb-2 flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>AI Assistant</span>
              </h3>
              <div className="text-gray-300 text-sm whitespace-pre-wrap">{aiHelp}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LearningJourney;