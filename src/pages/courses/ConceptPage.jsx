import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight,Zap, Play, Check, Sparkles, Code, Loader, AlertCircle, Book } from "lucide-react";
import { useState } from "react";
import { executeCode } from "../../services/codeEditor/codeExecutionService";
import { getAIAssistance } from "../../services/Openai/aiService";

function ConceptPage() {
  const { courseId, milestoneId, conceptId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('theory');
  const [code, setCode] = useState('# Write your code here\n');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiHelp, setAiHelp] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [executionError, setExecutionError] = useState(null);
  // Sample concept data
  const conceptData = {
    title: 'Variables & Data Types',
    milestone: 'Getting Started',
    theory: `# Variables & Data Types

Variables store data in your program.

## Types:
- **int**: Numbers
- **string**: Text
- **boolean**: True/False

## Example:
name = "Alice"
age = 25`,
    challenge: {
      title: 'Create Variables',
      description: 'Create a variable called "greeting" and print it.',
      starterCode: '# Create your variable here\ngreeting = "Hello"\nprint(greeting)'
    }
  };

 let conceptKey = `${courseId}_${milestoneId}_${conceptId}`;
  const runCode = async () => {
    setIsRunning(true);
    setOutput('⏳ Running code with Judge0 API...\n');
    setExecutionError(null);
    
    try {
      const result = await executeCode(code, conceptData.id);
      
      if (result.success) {
        setOutput(`✓ Success!\n\n${result.output}\n\n⏱️ Execution Time: ${result.executionTime}`);
      } else {
        setOutput(`❌ Error:\n\n${result.output}\n\n⏱️ Execution Time: ${result.executionTime}`);
        setExecutionError(result.output);
      }
    } catch (error) {
      setOutput(`❌ Unexpected Error:\n\n${error.message}`);
      setExecutionError(error.message);
    }
    
    setIsRunning(false);
  };

  const submitCode = async () => {
    setIsRunning(true);
    setOutput('⏳ Submitting code for evaluation...\n');
    setExecutionError(null);
    
    try {
      const result = await executeCode(code, conceptData.id);
      
      if (result.success) {
        setOutput(`🎉 Challenge Completed!\n\n${result.output}\n\n⏱️ Execution Time: ${result.executionTime}`);
        // Update user progress logic here (e.g., context or API call)
      } else {
        setOutput(`❌ Submission Error:\n\n${result.output}\n\n⏱️ Execution Time: ${result.executionTime}`);
        setExecutionError(result.output);
      }
    } catch (error) {
      setOutput(`❌ Submission Error:\n\n${error.message}`);
      setExecutionError(error.message);
    }
    
    setIsRunning(false);
  };

  const getAIHelp = async (mode) => {
    setShowAI(true);
    setAiLoading(true);
    //updateStats('ai_help');
    
    const response = await getAIAssistance(code, conceptData.challenge.title, mode, conceptData.id);
    setAiHelp(response);
    setAiLoading(false);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="text-purple-400 hover:text-purple-300 flex items-center space-x-2 mb-4"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Back to Course</span>
        </button>
        <h1 className="text-3xl font-bold text-white">{conceptData.title}</h1>
        <p className="text-gray-400 mt-2">{conceptData.milestone}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Theory/Challenge */}
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
              <div className="text-gray-300 whitespace-pre-wrap">
                {conceptData.theory}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  {conceptData.challenge.title}
                </h2>
                <p className="text-gray-300">{conceptData.challenge.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-white/10">
              <span className="text-gray-400 text-sm flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>{conceptData.title} Editor</span>
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 transition text-sm disabled:opacity-50"
                >
                  {isRunning ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  <span>Run</span>
                </button>
                <button
                  onClick={submitCode}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-sm disabled:opacity-50"
                >
                  {isRunning ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>Submit</span>
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-slate-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
              placeholder="Write your code here..."
              disabled={isRunning}
            />
          </div>

          {output && (
            <div className={`bg-slate-900 rounded-xl border ${executionError ? 'border-red-500/30' : 'border-white/10'} p-4`}>
              <h3 className="text-gray-400 text-sm mb-2 flex items-center space-x-2">
                {executionError ? <AlertCircle className="w-4 h-4 text-red-400" /> : <Zap className="w-4 h-4" />}
                <span>Output:</span>
              </h3>
              <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">{output}</pre>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => getAIHelp('hint')}
              disabled={aiLoading}
              className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition text-sm disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hint</span>
            </button>
            <button
              onClick={() => getAIHelp('debug')}
              disabled={aiLoading}
              className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition text-sm disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>Debug</span>
            </button>
            <button
              onClick={() => getAIHelp('explain')}
              disabled={aiLoading}
              className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition text-sm disabled:opacity-50"
            >
              <Book className="w-4 h-4" />
              <span>Explain</span>
            </button>
          </div>

          {showAI && (
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-purple-300 font-semibold mb-3 flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>AI Assistant</span>
                {aiLoading && <Loader className="w-4 h-4 animate-spin" />}
              </h3>
              {aiLoading ? (
                <div className="flex items-center space-x-2 text-gray-400">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>AI is thinking...</span>
                </div>
              ) : (
                <div className="text-gray-300 text-sm whitespace-pre-wrap">{aiHelp}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConceptPage;
// ```

// ---

// ## ✅ **What This Does:**

// ### **Routing Structure:**
// ```
// / → Landingpage
// /courses → CourseList (all courses)
// /courses/python → CourseDetailPage (milestones)
// /courses/python/milestone/m1/concept/c1 → ConceptPage (theory + code editor)