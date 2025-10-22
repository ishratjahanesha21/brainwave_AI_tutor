import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Get AI assistance using OpenAI GPT API
 */
export const getAIAssistance = async (code, challenge, useCase, language) => {
  // Fallback if no API key
  if (!OPENAI_API_KEY || OPENAI_API_KEY === '' || OPENAI_API_KEY === 'sk-your_openai_key_here') {
    return getFallbackResponse(useCase, language, challenge);
  }

  try {
    const systemPrompt = `You are an expert programming tutor helping students learn ${language}. 
Be encouraging, clear, and educational. Keep responses concise (under 200 words).
Never give complete solutions - guide students to discover answers themselves.`;

    const userPrompts = {
      hint: `I'm learning ${language} and working on: "${challenge}".

My current code:
\`\`\`${language}
${code}
\`\`\`

Give me a helpful hint to move forward (not the complete solution). Focus on:
1. What I should think about next
2. A small step to try
3. A programming concept to remember`,

      debug: `I'm stuck on this ${language} code for "${challenge}":

\`\`\`${language}
${code}
\`\`\`

Help me debug this. Tell me:
1. What error or issue you see
2. Why it's happening
3. How to fix it (general guidance, not exact code)`,

      explain: `Explain the programming concept of "${challenge}" in ${language}.

Context - here's what I'm working with:
\`\`\`${language}
${code}
\`\`\`

Make it beginner-friendly with:
1. What this concept does
2. Why it's useful
3. A simple analogy or example`
    };

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompts[useCase] || userPrompts.hint }
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 10000,
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    
    const emoji = { hint: '💡', debug: '🔍', explain: '📚' };
    return `${emoji[useCase]} **AI ${useCase.charAt(0).toUpperCase() + useCase.slice(1)}**:\n\n${aiResponse}`;

  } catch (error) {
    console.error('OpenAI API Error:', error);

    if (error.response) {
      if (error.response.status === 401) {
        return '❌ **API Error**: Invalid OpenAI API key. Please check your .env file.';
      } else if (error.response.status === 429) {
        return '⏱️ **Rate Limit**: Too many requests. Please wait a moment.';
      } else if (error.response.status === 500) {
        return '🔧 **Server Error**: OpenAI service is temporarily unavailable.';
      }
    }

    return getFallbackResponse(useCase, language, challenge);
  }
};

/**
 * Fallback responses when AI API is unavailable
 */
const getFallbackResponse = (useCase, language, challenge) => {
  const fallbacks = {
    hint: {
      python: `💡 **Python Hint**:

For "${challenge}", remember:
1. Python uses indentation (4 spaces)
2. Strings need quotes: "text" or 'text'
3. Use print() to display output
4. Check variable names for typos

Try running your code step by step!`,

      javascript: `💡 **JavaScript Hint**:

For "${challenge}":
1. Use const for values that won't change
2. Use let for values that will change
3. End statements with semicolons
4. Use console.log() to see output

Test small pieces of code first!`,

      java: `💡 **Java Hint**:

For "${challenge}":
1. Declare variable types: int, String, double
2. Every statement needs a semicolon
3. Use System.out.println() to print
4. Class names must match exactly

Compile and test frequently!`,

      cpp: `💡 **C++ Hint**:

For "${challenge}":
1. Include headers: #include <iostream>
2. Use namespace std or std:: prefix
3. End statements with semicolons
4. Use cout << for output

Start simple and build up!`
    },

    debug: {
      python: `🔍 **Debug Checklist**:

Common Python issues:
✓ Check indentation (4 spaces)
✓ Missing colons after if/for/while
✓ Variable name typos
✓ Quotes match for strings
✓ Parentheses balanced

Read error messages - they show line numbers!`,

      javascript: `🔍 **Debug Checklist**:

Common JavaScript issues:
✓ Missing const/let keyword
✓ Quotes don't match
✓ Missing semicolons
✓ console.log() spelled correctly
✓ Brackets balanced

Check browser console (F12) for errors!`,

      java: `🔍 **Debug Checklist**:

Common Java issues:
✓ Missing semicolons
✓ Variable types declared
✓ Class name matches filename
✓ main method signature correct
✓ Missing imports

Fix the first error first!`,

      cpp: `🔍 **Debug Checklist**:

Common C++ issues:
✓ #include statements at top
✓ Missing semicolons
✓ using namespace std
✓ Return statement in main()
✓ Brackets balanced

Compiler errors tell you what's wrong!`
    },

    explain: {
      python: `📚 **Understanding Python**:

"${challenge}" is a fundamental concept in Python.

Python is designed to be readable and simple. Think of it like writing instructions for a friend - clear and easy to understand.

Key: Python uses indentation to show which code belongs together.

Try it: Start with the simplest version that works!`,

      javascript: `📚 **Understanding JavaScript**:

"${challenge}" is essential for JavaScript.

JavaScript runs in browsers and servers. It's the "brain" that makes websites interactive.

Remember: JavaScript is forgiving but can surprise you. Use const/let and test often!`,

      java: `📚 **Understanding Java**:

"${challenge}" is a core Java concept.

Java is like building with LEGO blocks - everything must fit together perfectly. This makes it reliable.

Best practice: Write clearly, compile often, fix errors one at a time.`,

      cpp: `📚 **Understanding C++**:

"${challenge}" is fundamental to C++.

C++ gives you power and control. It's like driving manual - more control but requires skill!

Important: Initialize variables, manage memory carefully, compile frequently.`
    }
  };

  return fallbacks[useCase][language] || fallbacks[useCase].python;
};

/**
 * Check if OpenAI API is configured
 */
export const isAIConfigured = () => {
  return OPENAI_API_KEY && OPENAI_API_KEY !== '' && OPENAI_API_KEY !== 'sk-your_openai_key_here';
};