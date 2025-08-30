interface CharacterDisplayProps {
  emotion: string;
}

export const CharacterDisplay = ({ emotion }: CharacterDisplayProps) => {
  return (
    <div className="relative">
      {/* Character container with emotion border */}
      <div 
        className="w-[370px] h-[300px] rounded-2xl bg-gradient-to-br from-secondary to-accent border-4 border-primary/30 shadow-soft overflow-hidden transition-all duration-500 hover:shadow-glow"
        style={{
          background: `linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent)))`
        }}
      >
        {/* Emotion border overlay */}
        <div className="absolute inset-0 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-primary-glow/10" />
        
        {/* Character image placeholder */}
        <div className="absolute inset-4 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            {/* This would be replaced with actual emotion sticker */}
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-4xl">🌸</span>
            </div>
            <div className="text-lg font-semibold text-foreground/80 capitalize">
              {emotion}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Maruko-chan
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-primary-glow/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-12 left-8 w-2.5 h-2.5 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      {/* Character name label */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-primary/20">
          <span className="text-sm font-medium text-foreground">Maruko</span>
        </div>
      </div>
    </div>
  );
};