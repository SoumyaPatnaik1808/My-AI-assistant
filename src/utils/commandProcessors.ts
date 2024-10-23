import { knowledgeBase } from './knowledgeBase';

const calculateMath = (expression: string): string => {
  try {
    const sanitizedExpression = expression.replace(/[^0-9+\-*/.()\s]/g, '');
    const result = Function(`'use strict'; return (${sanitizedExpression})`)();
    return `The result of ${expression} is ${result}`;
  } catch {
    return "Sorry, I couldn't calculate that expression.";
  }
};

const getJoke = (): string => {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why did the developer go broke? Because he used up all his cache!",
    "What's a programmer's favorite hangout spot? The Foo Bar!",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25!",
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
};

const processGeneralQuestion = (question: string): string | null => {
  // Convert question to lowercase for better matching
  const lowerQuestion = question.toLowerCase();
  
  for (const entry of knowledgeBase) {
    for (const pattern of entry.patterns) {
      if (pattern.test(lowerQuestion)) {
        // Return a random response from the available responses
        return entry.responses[Math.floor(Math.random() * entry.responses.length)];
      }
    }
  }

  // Check for general question patterns
  if (/^(?:what|who|how|why|when|where|can|could)\s+/i.test(question)) {
    return "That's an interesting question! While I have knowledge about various topics, I'm still learning. Could you try asking in a different way or ask about something else?";
  }

  return null;
};

export const commandProcessors = [
  {
    pattern: /^(?:hi|hello|hey)(?:\s|$)/i,
    handler: () => "Hello! How can I help you today?",
  },
  {
    pattern: /what(?:'s|\s+is)\s+the\s+time/i,
    handler: () => `The current time is ${new Date().toLocaleTimeString()}`,
  },
  {
    pattern: /what(?:'s|\s+is)\s+(?:the\s+)?date/i,
    handler: () => `Today is ${new Date().toLocaleDateString()}`,
  },
  {
    pattern: /calculate\s+([\d+\-*/\s().]+)/i,
    handler: (matches) => calculateMath(matches[1]),
  },
  {
    pattern: /tell\s+(?:me\s+)?a\s+joke/i,
    handler: () => getJoke(),
  },
  {
    pattern: /what(?:'s|\s+is)\s+(?:your\s+)?name/i,
    handler: () => "I'm your AI Assistant, you can call me Bolt!",
  },
  {
    pattern: /how\s+(?:are\s+)?you/i,
    handler: () => "I'm functioning perfectly! Thanks for asking. How can I assist you?",
  },
  {
    pattern: /what\s+can\s+you\s+do/i,
    handler: () => "I can help you with various tasks like telling time, date, calculating math expressions, telling jokes, and answering questions about various topics. Just ask away!",
  },
  {
    pattern: /thank(?:s|\s+you)/i,
    handler: () => "You're welcome! Let me know if you need anything else.",
  },
  {
    pattern: /(?:convert|translate)\s+([\d.]+)\s*(c|f)\s*(?:to\s*)?(c|f)?/i,
    handler: (matches) => {
      const value = parseFloat(matches[1]);
      const from = matches[2].toLowerCase();
      const to = (matches[3] || (from === 'c' ? 'f' : 'c')).toLowerCase();
      
      if (from === 'c' && to === 'f') {
        const result = (value * 9/5) + 32;
        return `${value}°C is equal to ${result.toFixed(1)}°F`;
      } else if (from === 'f' && to === 'c') {
        const result = (value - 32) * 5/9;
        return `${value}°F is equal to ${result.toFixed(1)}°C`;
      }
      return "I couldn't process that conversion.";
    },
  },
  {
    // This should be the last processor as it's the most general one
    pattern: /.+/i,
    handler: (matches) => {
      const response = processGeneralQuestion(matches[0]);
      return response ?? "I'm not sure about that. Try asking me something else or rephrase your question!";
    },
  },
] as const;