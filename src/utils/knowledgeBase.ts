export interface KnowledgeEntry {
  patterns: RegExp[];
  responses: string[];
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    patterns: [
      /(?:who|what)\s+(?:is|was)\s+albert\s+einstein/i,
      /tell\s+me\s+about\s+einstein/i
    ],
    responses: [
      "Albert Einstein was a renowned physicist who developed the theory of relativity. He was born in 1879 and is famous for the equation E=mc².",
      "Einstein was one of the most influential scientists of the 20th century. He revolutionized our understanding of space, time, and gravity."
    ]
  },
  {
    patterns: [
      /(?:what|tell\s+me)\s+(?:is|about)\s+(?:the\s+)?meaning\s+of\s+life/i
    ],
    responses: [
      "The meaning of life is a philosophical and personal question that has been debated throughout history. Some find meaning in relationships, others in personal growth or contributing to society.",
      "That's a deep question! While there's no universal answer, many philosophers suggest it's about finding purpose, happiness, and making a positive impact on others."
    ]
  },
  {
    patterns: [
      /(?:how|why)\s+(?:does|do)\s+(?:the\s+)?(?:internet|web)\s+work/i
    ],
    responses: [
      "The internet works through a vast network of connected computers that communicate using protocols like TCP/IP. When you visit a website, data is transferred between servers and your device.",
      "The internet is a global network where computers share information using standardized protocols. It involves servers, routers, and various technologies working together to deliver content to users."
    ]
  },
  {
    patterns: [
      /what\s+(?:is|are)\s+(?:the\s+)?(?:best|good)\s+ways?\s+to\s+learn\s+programming/i
    ],
    responses: [
      "The best way to learn programming is through practice and building projects. Start with basic concepts, choose a language like Python or JavaScript, use online resources, and work on real projects.",
      "To learn programming effectively: 1) Start with fundamentals 2) Practice coding daily 3) Build personal projects 4) Join coding communities 5) Learn from others' code 6) Don't be afraid to make mistakes."
    ]
  },
  {
    patterns: [
      /(?:how|why)\s+(?:is|does)\s+(?:the\s+)?weather\s+(?:change|work)/i
    ],
    responses: [
      "Weather changes due to the interaction of temperature, air pressure, humidity, and wind patterns. These factors are influenced by the sun's heat, Earth's rotation, and geographic features.",
      "Weather is a complex system driven by solar radiation, atmospheric conditions, and Earth's various cycles. Factors like temperature differences and air pressure create the weather patterns we experience."
    ]
  }
];