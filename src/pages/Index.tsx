import { MarukoChatbot } from "@/components/MarukoChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-primary-glow/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Welcome to Maruko Chat! 🌸
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Meet Maruko-chan, your friendly AI companion! Click the chat button to start a conversation 
            and learn about online safety while having fun together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-primary/20 shadow-soft">
              <div className="text-3xl mb-4">💭</div>
              <h3 className="font-semibold mb-2">Chat & Learn</h3>
              <p className="text-sm text-muted-foreground">
                Have conversations while learning important safety tips
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-primary/20 shadow-soft">
              <div className="text-3xl mb-4">🎭</div>
              <h3 className="font-semibold mb-2">Expressive Emotions</h3>
              <p className="text-sm text-muted-foreground">
                Watch Maruko's emotions change based on your conversation
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-primary/20 shadow-soft">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-semibold mb-2">Safety First</h3>
              <p className="text-sm text-muted-foreground">
                Learn digital safety tips in a fun and engaging way
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <MarukoChatbot />
    </div>
  );
};

export default Index;
