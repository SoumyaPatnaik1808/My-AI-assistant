export interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface CommandProcessor {
  pattern: RegExp;
  handler: (matches: RegExpMatchArray) => string;
}