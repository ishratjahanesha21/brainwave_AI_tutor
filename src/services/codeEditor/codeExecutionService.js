/* eslint-disable no-case-declarations */
import axios from 'axios';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '3154e8cffbmsh817d96b3c29946bp1d375ajsna20a6d8278e7';
const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';

// Language IDs for Judge0 API
const LANGUAGE_IDS = {
  python: 71,      // Python 3.8.1
  javascript: 63,  // JavaScript (Node.js 12.14.0)
  java: 62,        // Java (OpenJDK 13.0.1)
  cpp: 54,         // C++ (GCC 9.2.0)
};

/**
 * Execute code using Judge0 API via RapidAPI
 * @param {string} code - The source code to execute
 * @param {string} language - Programming language (python, javascript, java, cpp)
 * @returns {Promise<Object>} - Execution result
 */
export const executeCode = async (code, language) => {
  // Check if API key is configured
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY === '' || RAPIDAPI_KEY === 'your_rapidapi_key_here') {
    return {
      success: false,
      output: '❌ **Configuration Error**\n\nJudge0 API key is not configured.\n\nPlease add your RapidAPI key to the .env file:\nVITE_RAPIDAPI_KEY=your_actual_key_here\n\nGet your free API key at:\nhttps://rapidapi.com/judge0-official/api/judge0-ce',
      executionTime: '0s',
    };
  }

  // Validate language
  if (!LANGUAGE_IDS[language]) {
    return {
      success: false,
      output: `❌ Unsupported language: ${language}\n\nSupported languages: python, javascript, java, cpp`,
      executionTime: '0s',
    };
  }

  // Validate code is not empty
  if (!code || code.trim() === '') {
    return {
      success: false,
      output: '❌ Cannot execute empty code.\n\nPlease write some code first!',
      executionTime: '0s',
    };
  }

  try {
    console.log(`🚀 Submitting ${language} code to Judge0...`);

    // Step 1: Create submission (without wait parameter for async execution)
    const createResponse = await axios.post(
      `${JUDGE0_API_URL}/submissions?base64_encoded=false`,
      {
        source_code: code,
        language_id: LANGUAGE_IDS[language],
        stdin: '',
        expected_output: null,
        cpu_time_limit: 2,
        memory_limit: 128000,
      },
      {
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
        timeout: 10000,
      }
    );

    const token = createResponse.data.token;
    console.log(`📝 Submission token: ${token}`);

    // Step 2: Poll for result
    const result = await pollSubmissionResult(token);
    
    console.log('✅ Judge0 Response:', result);

    // Step 3: Format and return result
    return formatExecutionResult(result, language);

  } catch (error) {
    console.error('❌ Judge0 API Error:', error);

    // Handle specific errors
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401 || status === 403) {
        return {
          success: false,
          output: '❌ **Authentication Error**\n\nYour RapidAPI key is invalid or expired.\n\nPlease check:\n1. API key is correct in .env file\n2. You are subscribed to Judge0 on RapidAPI\n3. Your subscription is active\n\nVisit: https://rapidapi.com/judge0-official/api/judge0-ce',
          executionTime: '0s',
        };
      } else if (status === 429) {
        return {
          success: false,
          output: '⏱️ **Rate Limit Exceeded**\n\nYou have exceeded the API rate limit.\n\nFree tier: 50 requests/day\n\nPlease:\n1. Wait a few minutes and try again\n2. Upgrade your RapidAPI plan for more requests\n3. Check usage: https://rapidapi.com/developer/analytics',
          executionTime: '0s',
        };
      } else if (status === 422) {
        return {
          success: false,
          output: `❌ **Validation Error**\n\n${data.message || 'Invalid request parameters'}\n\nPlease check your code syntax.`,
          executionTime: '0s',
        };
      } else if (status >= 500) {
        return {
          success: false,
          output: '🔧 **Server Error**\n\nJudge0 service is temporarily unavailable.\n\nPlease try again in a few moments.',
          executionTime: '0s',
        };
      }
    } else if (error.request) {
      return {
        success: false,
        output: '🌐 **Network Error**\n\nUnable to reach Judge0 API.\n\nPlease check:\n1. Your internet connection\n2. Firewall/proxy settings\n3. VPN if enabled',
        executionTime: '0s',
      };
    } else if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        output: '⏱️ **Timeout Error**\n\nCode execution took too long.\n\nThis might be due to:\n1. Infinite loops in your code\n2. Heavy computations\n3. Network delays\n\nTry simplifying your code.',
        executionTime: '0s',
      };
    }

    // Generic error
    return {
      success: false,
      output: `❌ **Unexpected Error**\n\n${error.message}\n\nPlease try again or contact support.`,
      executionTime: '0s',
    };
  }
};

/**
 * Poll for submission result
 * @param {string} token - Submission token
 * @returns {Promise<Object>} - Submission result
 */
const pollSubmissionResult = async (token) => {
  const maxAttempts = 10;
  const pollInterval = 1000; // 1 second

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await axios.get(
        `${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false&fields=*`,
        {
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
          },
          timeout: 5000,
        }
      );

      const statusId = response.data.status.id;

      // Status IDs: 1 = In Queue, 2 = Processing
      if (statusId === 1 || statusId === 2) {
        console.log(`⏳ Polling attempt ${attempt + 1}/${maxAttempts} - Status: ${response.data.status.description}`);
        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        continue;
      }

      // Execution completed (success or error)
      return response.data;

    } catch (error) {
      console.error(`Polling error on attempt ${attempt + 1}:`, error.message);
      
      if (attempt === maxAttempts - 1) {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  }

  // Max attempts reached
  throw new Error('Execution timeout - max polling attempts reached');
};

/**
 * Format Judge0 API response into a standard format
 * @param {Object} result - Judge0 API response
 * @param {string} language - Programming language
 * @returns {Object} - Formatted result
 */
const formatExecutionResult = (result, language) => {
  const statusId = result.status.id;
  const time = result.time || '0';
  const memory = result.memory || 0;

  // Status ID reference from Judge0 documentation:
  // 1: In Queue, 2: Processing, 3: Accepted
  // 4: Wrong Answer, 5: Time Limit Exceeded
  // 6: Compilation Error, 7-12: Runtime Errors
  // 13: Internal Error, 14: Exec Format Error

  const statusMessages = {
    1: 'In Queue',
    2: 'Processing',
    3: 'Accepted',
    4: 'Wrong Answer',
    5: 'Time Limit Exceeded',
    6: 'Compilation Error',
    7: 'Runtime Error (SIGSEGV)',
    8: 'Runtime Error (SIGXFSZ)',
    9: 'Runtime Error (SIGFPE)',
    10: 'Runtime Error (SIGABRT)',
    11: 'Runtime Error (NZEC)',
    12: 'Runtime Error (Other)',
    13: 'Internal Error',
    14: 'Exec Format Error',
  };

  console.log(`📊 Status: ${statusMessages[statusId] || 'Unknown'} (ID: ${statusId})`);

  switch (statusId) {
    case 3: // Accepted - Success!
      const output = result.stdout || '';
      const cleanOutput = output.trim();
      
      return {
        success: true,
        output: cleanOutput ? 
          `✅ **Success!**\n\n${cleanOutput}\n\n━━━━━━━━━━━━━━━━━━━\n✓ All tests passed!` : 
          '✅ **Success!**\n\nCode executed without errors.\n\n━━━━━━━━━━━━━━━━━━━\n✓ All tests passed!',
        executionTime: `${time}s`,
        memory: `${memory} KB`,
      };

    case 6: // Compilation Error
      const compileError = result.compile_output || 'Unknown compilation error';
      return {
        success: false,
        output: `❌ **Compilation Error**\n\n${compileError}\n\n💡 **Tip**: Check your ${language} syntax carefully!\n\n**Common issues:**\n${getCompilationErrorHelp(language)}`,
        executionTime: `${time}s`,
      };

    case 5: // Time Limit Exceeded
      return {
        success: false,
        output: `⏱️ **Time Limit Exceeded**\n\nYour code is taking too long to execute (limit: 2 seconds).\n\n**Common causes:**\n• Infinite loops (check your loop conditions)\n• Heavy computations\n• Waiting for input that never comes\n\n💡 **Tip**: Add print statements to debug where your code gets stuck.`,
        executionTime: `${time}s`,
      };

    case 11: // Runtime Error (NZEC)
    case 12: // Runtime Error (Other)
      const runtimeError = result.stderr || result.status.description || 'Unknown runtime error';
      return {
        success: false,
        output: `❌ **Runtime Error**\n\n${runtimeError}\n\n**Common causes in ${language}:**\n${getRuntimeErrorHelp(language)}\n\n💡 **Tip**: Read the error message carefully - it usually tells you what's wrong!`,
        executionTime: `${time}s`,
      };

    case 7: // SIGSEGV - Memory access error
      return {
        success: false,
        output: `❌ **Memory Access Error (SIGSEGV)**\n\n${result.stderr || 'Segmentation fault'}\n\n**Common causes:**\n• Accessing invalid memory (null pointers)\n• Array index out of bounds\n• Stack overflow (too much recursion)\n\n💡 **Tip**: Check your array indices and pointer usage!`,
        executionTime: `${time}s`,
      };

    case 8: // SIGXFSZ - Output size exceeded
      return {
        success: false,
        output: `❌ **Output Size Exceeded**\n\nYour program is producing too much output.\n\n**Common causes:**\n• Infinite loop with print statements\n• Printing too much data\n\n💡 **Tip**: Check your loops and limit your output.`,
        executionTime: `${time}s`,
      };

    case 9: // SIGFPE - Arithmetic error
      return {
        success: false,
        output: `❌ **Arithmetic Error (SIGFPE)**\n\n${result.stderr || 'Floating point exception'}\n\n**Common causes:**\n• Division by zero\n• Invalid mathematical operations\n• Integer overflow\n\n💡 **Tip**: Check your calculations, especially divisions!`,
        executionTime: `${time}s`,
      };

    case 13: // Internal Error
      return {
        success: false,
        output: `🔧 **Internal Error**\n\nJudge0 encountered an internal error while processing your code.\n\nThis is not your fault. Please try again in a moment.`,
        executionTime: `${time}s`,
      };

    case 14: // Exec Format Error
      return {
        success: false,
        output: `❌ **Execution Format Error**\n\nThere was an issue running your code in the execution environment.\n\nPlease try again or contact support if this persists.`,
        executionTime: `${time}s`,
      };

    default:
      // Unknown status
      return {
        success: false,
        output: `❓ **Unknown Status** (ID: ${statusId})\n\n${result.stderr || result.compile_output || result.status.description || 'Unknown error occurred'}\n\nPlease try again.`,
        executionTime: `${time}s`,
      };
  }
};

/**
 * Get language-specific compilation error help
 */
const getCompilationErrorHelp = (language) => {
  const help = {
    python: '• Check indentation (use 4 spaces)\n• Missing colons after if/for/while/def\n• Quotes match for strings\n• Parentheses are balanced',
    javascript: '• Missing semicolons\n• Brackets/parentheses balanced\n• Quotes match for strings\n• Variable declared with let/const',
    java: '• Missing semicolons\n• Class name matches code\n• All brackets balanced\n• Missing import statements',
    cpp: '• Missing semicolons\n• Include statements at top\n• Brackets balanced\n• Return statement in main()',
  };
  return help[language] || '• Check syntax carefully\n• Look for typos\n• Verify brackets match';
};

/**
 * Get language-specific runtime error help
 */
const getRuntimeErrorHelp = (language) => {
  const help = {
    python: '• Undefined variables\n• Type errors (e.g., adding string + number)\n• Index out of range\n• Missing imports',
    javascript: '• Undefined variables\n• Calling undefined functions\n• Type errors\n• Missing return statements',
    java: '• NullPointerException\n• ArrayIndexOutOfBoundsException\n• ClassNotFoundException\n• Missing imports',
    cpp: '• Null pointer dereference\n• Array out of bounds\n• Uninitialized variables\n• Missing return statements',
  };
  return help[language] || '• Check your syntax\n• Verify variable names\n• Look for typos';
};

/**
 * Check if Judge0 API is configured
 * @returns {boolean}
 */
export const isJudge0Configured = () => {
  return RAPIDAPI_KEY && RAPIDAPI_KEY !== '' && RAPIDAPI_KEY !== 'your_rapidapi_key_here';
};

/**
 * Get available languages
 * @returns {Object} - Language configuration
 */
export const getAvailableLanguages = () => {
  return {
    python: {
      id: LANGUAGE_IDS.python,
      name: 'Python 3',
      version: '3.8.1',
      icon: '🐍',
    },
    javascript: {
      id: LANGUAGE_IDS.javascript,
      name: 'JavaScript (Node.js)',
      version: '12.14.0',
      icon: '⚡',
    },
    java: {
      id: LANGUAGE_IDS.java,
      name: 'Java',
      version: '13.0.1',
      icon: '☕',
    },
    cpp: {
      id: LANGUAGE_IDS.cpp,
      name: 'C++',
      version: '9.2.0',
      icon: '⚙️',
    },
  };
};

/**
 * Test API connection
 * @returns {Promise<boolean>}
 */
export const testConnection = async () => {
  try {
    const testCode = 'print("Hello, Judge0!")';
    const result = await executeCode(testCode, 'python');
    return result.success;
  } catch {
    return false;
  }
};