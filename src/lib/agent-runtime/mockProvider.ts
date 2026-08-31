import { getAgent, type Agent } from "@/lib/data/agents";
import type { AgentProvider } from "./types";

/**
 * Sleep utility for streaming delays
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Random delay between min and max milliseconds
 */
const randomDelay = (min: number, max: number) => 
  min + Math.floor(Math.random() * (max - min + 1));

/**
 * Check if message contains escalation keywords
 */
const containsEscalationKeywords = (message: string): boolean => {
  const escalationKeywords = [
    "human",
    "escalate",
    "speak to someone",
    "talk to someone",
    "call me back",
    "call me",
    "speak with someone",
    "real person",
    "actual person",
  ];
  
  const lowerMessage = message.toLowerCase();
  return escalationKeywords.some(keyword => lowerMessage.includes(keyword));
};

/**
 * Find best matching FAQ for a user message
 */
const findBestFaqMatch = (
  message: string,
  faqs: Agent["faqs"]
): string | null => {
  if (!faqs || faqs.length === 0) return null;

  const lowerMessage = message.toLowerCase();
  let bestMatch: { faq: typeof faqs[0]; score: number } | null = null;

  for (const faq of faqs) {
    const lowerQuestion = faq.q.toLowerCase();
    
    // Exact match (case-insensitive)
    if (lowerMessage === lowerQuestion) {
      return faq.a;
    }

    // Calculate score based on keyword matches
    const questionWords = lowerQuestion.split(/\s+/);
    const messageWords = lowerMessage.split(/\s+/);
    
    let score = 0;
    
    // Check if message contains the full question
    if (lowerMessage.includes(lowerQuestion)) {
      score += 10;
    }
    
    // Check if question contains the full message
    if (lowerQuestion.includes(lowerMessage)) {
      score += 8;
    }
    
    // Count matching words
    for (const qWord of questionWords) {
      if (qWord.length > 3 && messageWords.some(mWord => mWord.includes(qWord) || qWord.includes(mWord))) {
        score += 1;
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { faq, score };
    }
  }

  // Return best match if score is significant enough
  return bestMatch && bestMatch.score >= 2 ? bestMatch.faq.a : null;
};

/**
 * Generate fallback response based on agent specializations
 */
const generateFallbackResponse = (agent: Agent, userMessage: string): string => {
  const isEscalation = containsEscalationKeywords(userMessage);

  if (isEscalation) {
    return `I understand you'd like to speak with a human expert. I've noted your request for escalation. You can also use the "Schedule a human call" option to book a consultation directly with one of our ${agent.name} specialists.`;
  }

  const specializations = agent.specializations?.join(", ") || "various topics";
  
  return `Thank you for reaching out! I'm ${agent.name}, and I specialize in ${specializations}. While I don't have a specific answer to your question at the moment, I'd be happy to help in other ways. You can ask me about my areas of expertise, or if you'd prefer, you can schedule a call with a human specialist using the "Schedule a human call" option.`;
};

/**
 * Stream text word-by-word with realistic delays
 */
const streamText = async (
  text: string,
  onChunk: (assembled: string) => void,
): Promise<void> => {
  const words = text.split(/(\s+)/);
  let assembled = "";

  for (const word of words) {
    assembled += word;
    onChunk(assembled);
    await sleep(randomDelay(18, 35));
  }
};

/**
 * Mock agent provider implementation
 */
export const mockAgentProvider: AgentProvider = {
  streamReply: async (
    agentSlug: string,
    userMessage: string,
    onChunk: (chunk: string) => void
  ): Promise<void> => {
    try {
      // Get agent data
      const agent = getAgent(agentSlug);
      
      if (!agent) {
        await streamText(
          "I apologize, but I couldn't find the agent you're looking for. Please try again or contact support.",
          onChunk
        );
        return;
      }

      // Try to find matching FAQ
      const faqAnswer = findBestFaqMatch(userMessage, agent.faqs);
      
      let response: string;
      
      if (faqAnswer) {
        // Use FAQ answer if found
        response = faqAnswer;
      } else {
        // Generate fallback response
        response = generateFallbackResponse(agent, userMessage);
      }

      // Stream the response
      await streamText(response, onChunk);
      
    } catch (error) {
      console.error("Error in mockAgentProvider.streamReply:", error);
      await streamText(
        "I apologize, but I encountered an error processing your request. Please try again or contact support.",
        onChunk
      );
    }
  },

  requestHumanCall: async (payload: Record<string, unknown>): Promise<void> => {
    console.log("Human call requested with payload:", payload);
    // Mock implementation - in production this would trigger actual scheduling
    return Promise.resolve();
  },
};
