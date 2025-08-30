import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'maruko';
  emotion?: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  currentEmotion: string;
}

export const ChatInterface = ({ messages, onSendMessage, onClose, currentEmotion }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Emotion to emoji mapping
  const getEmotionEmoji = (emotion: string): string => {
    const emotionMap: Record<string, string> = {
      happy: "😊",
      sad: "😢",
      excited: "🤩",
      thinking: "🤔",
      cheering: "🎉",
      surprised: "😮",
      confused: "😕",
      angry: "😠",
      sleepy: "😴",
      love: "💕",
      worried: "😰",
      laughing: "😂",
      default: "🌸"
    };
    return emotionMap[emotion.toLowerCase()] || emotionMap.default;
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="absolute bottom-20 right-0 w-[500px] h-[720px] shadow-2xl border-2 border-primary/20 bg-white/95 backdrop-blur-md animate-scale-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-lg">🌸</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Maruko Chat</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Emotion Display Frame */}
      <div className="p-4 border-b border-primary/10">
        <div className="w-full h-[400px] bg-gradient-to-br from-primary/5 to-primary-glow/10 rounded-xl border-2 border-primary/20 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Floating particles */}
          <div className="absolute inset-0">
            <div className="absolute top-4 left-4 w-2 h-2 bg-primary/30 rounded-full animate-bounce"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-primary-glow/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-primary-glow/60 rounded-full animate-pulse delay-500"></div>
          </div>
          
          {/* Main emotion display */}
          <div className="text-center z-10">
            <div className="text-8xl mb-4 animate-fade-in">
              {getEmotionEmoji(currentEmotion)}
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/20 shadow-lg">
              <p className="text-lg font-semibold text-primary capitalize">
                {currentEmotion} Mode
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 h-[220px]" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary border-2 border-primary/30'
              }`}>
                {message.sender === 'user' ? '👤' : '🌸'}
              </div>

              {/* Message Container */}
              <div className={`flex-1 max-w-[75%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {/* Emotion Badge for Maruko */}
                {message.sender === 'maruko' && message.emotion && (
                  <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-primary capitalize">
                      {getEmotionEmoji(message.emotion)} {message.emotion}
                    </span>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`inline-block p-4 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-br-md'
                      : 'bg-white border border-primary/10 text-foreground rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed mb-1">{message.text}</p>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-primary/10 bg-gradient-to-r from-secondary/30 to-accent/30">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border-primary/20 focus:border-primary"
          />
          <Button
            onClick={handleSend}
            size="sm"
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-md transition-all duration-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};