import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CharacterDisplay } from "./CharacterDisplay";
import { ChatInterface } from "./ChatInterface";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'maruko';
  emotion?: string;
  timestamp: Date;
}

export const MarukoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm Maruko! I'm here to chat with you and share some safety tips!",
      sender: 'maruko',
      emotion: 'happy',
      timestamp: new Date()
    }
  ]);
  const [currentEmotion, setCurrentEmotion] = useState('happy');

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate API call to Ollama
    try {
      // This would be replaced with actual Ollama API call
      const response = await simulateMarukoResponse(text);
      
      // Extract emotion from response and clean content
      const emotion = response.emotion.toLowerCase();
      const cleanContent = response.output.replace(/\*[^*]*\*/g, '').trim();
      
      const marukoMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: cleanContent,
        sender: 'maruko',
        emotion: emotion,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, marukoMessage]);
      setCurrentEmotion(emotion);
    } catch (error) {
      console.error('Error getting response:', error);
    }
  };

  // Simulate Ollama response - replace with actual API call
  const simulateMarukoResponse = async (userInput: string): Promise<{emotion: string, output: string}> => {
    // Mock responses for demo
    const responses = [
      {
        emotion: "happy",
        output: "That's wonderful! *happy* Remember to always keep your personal information safe online!"
      },
      {
        emotion: "thinking",
        output: "Hmm, let me think about that! *thinking* It's important to use strong passwords for all your accounts."
      },
      {
        emotion: "cheering",
        output: "Great question! *cheering* Always verify links before clicking them to stay safe!"
      }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Character Display - Always visible */}
      <div className="mb-4">
        <CharacterDisplay emotion={currentEmotion} />
      </div>

      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary-glow hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
          currentEmotion={currentEmotion}
        />
      )}
    </div>
  );
};