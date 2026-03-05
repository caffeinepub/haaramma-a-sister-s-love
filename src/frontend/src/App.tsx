import { useCallback, useEffect, useRef, useState } from "react";

// ======================== TYPES ========================

type Screen = 0 | 1 | 2 | 3;

// ======================== HOOKS ========================

function useTypingEffect(text: string, speed = 50, startTyping = false) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!startTyping) {
      setDisplayedText("");
      setIsComplete(false);
      indexRef.current = 0;
      return;
    }

    setDisplayedText("");
    setIsComplete(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, startTyping]);

  return { displayedText, isComplete };
}

// ======================== BACKGROUND LAYER ========================

interface FloatingHeart {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  bottom: number;
}

interface SparkleDot {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

// Parallax heart tiers: far (blurred, tiny, slow), mid (normal), close (large, vivid, fast, glowing)
interface ParallaxHeart extends FloatingHeart {
  layer: "far" | "mid" | "close";
}

function BackgroundLayer() {
  const hearts: ParallaxHeart[] = [
    // — FAR layer: small, blurred, slow, low opacity —
    {
      id: 101,
      emoji: "❤️",
      left: 7,
      size: 10,
      duration: 18,
      delay: 0,
      bottom: 0,
      layer: "far",
    },
    {
      id: 102,
      emoji: "💜",
      left: 22,
      size: 9,
      duration: 22,
      delay: 2.5,
      bottom: 15,
      layer: "far",
    },
    {
      id: 103,
      emoji: "🩷",
      left: 37,
      size: 11,
      duration: 19,
      delay: 5,
      bottom: 5,
      layer: "far",
    },
    {
      id: 104,
      emoji: "💕",
      left: 53,
      size: 8,
      duration: 24,
      delay: 1.2,
      bottom: 20,
      layer: "far",
    },
    {
      id: 105,
      emoji: "❤️",
      left: 68,
      size: 10,
      duration: 20,
      delay: 7,
      bottom: 10,
      layer: "far",
    },
    {
      id: 106,
      emoji: "💜",
      left: 84,
      size: 9,
      duration: 17,
      delay: 3.5,
      bottom: 30,
      layer: "far",
    },
    {
      id: 107,
      emoji: "🩷",
      left: 14,
      size: 8,
      duration: 23,
      delay: 9,
      bottom: 40,
      layer: "far",
    },
    {
      id: 108,
      emoji: "💕",
      left: 77,
      size: 11,
      duration: 21,
      delay: 4.8,
      bottom: 8,
      layer: "far",
    },

    // — MID layer: medium, soft, natural speed —
    {
      id: 201,
      emoji: "🩷",
      left: 10,
      size: 17,
      duration: 11,
      delay: 0.5,
      bottom: 0,
      layer: "mid",
    },
    {
      id: 202,
      emoji: "💕",
      left: 28,
      size: 19,
      duration: 13,
      delay: 3,
      bottom: 12,
      layer: "mid",
    },
    {
      id: 203,
      emoji: "❤️",
      left: 46,
      size: 16,
      duration: 10,
      delay: 1,
      bottom: 5,
      layer: "mid",
    },
    {
      id: 204,
      emoji: "💜",
      left: 62,
      size: 20,
      duration: 12,
      delay: 4.5,
      bottom: 22,
      layer: "mid",
    },
    {
      id: 205,
      emoji: "🩷",
      left: 79,
      size: 15,
      duration: 14,
      delay: 0.8,
      bottom: 35,
      layer: "mid",
    },
    {
      id: 206,
      emoji: "🫶",
      left: 32,
      size: 22,
      duration: 16,
      delay: 6,
      bottom: 18,
      layer: "mid",
    },
    {
      id: 207,
      emoji: "🫶",
      left: 68,
      size: 20,
      duration: 15,
      delay: 2.2,
      bottom: 28,
      layer: "mid",
    },
    {
      id: 208,
      emoji: "💕",
      left: 91,
      size: 17,
      duration: 11,
      delay: 5.5,
      bottom: 45,
      layer: "mid",
    },

    // — CLOSE layer: large, vivid, fast, glowing drop-shadow —
    {
      id: 301,
      emoji: "❤️",
      left: 4,
      size: 28,
      duration: 7,
      delay: 0,
      bottom: 0,
      layer: "close",
    },
    {
      id: 302,
      emoji: "🩷",
      left: 18,
      size: 32,
      duration: 8,
      delay: 1.8,
      bottom: 8,
      layer: "close",
    },
    {
      id: 303,
      emoji: "💜",
      left: 42,
      size: 26,
      duration: 6,
      delay: 3.2,
      bottom: 20,
      layer: "close",
    },
    {
      id: 304,
      emoji: "🫶",
      left: 60,
      size: 34,
      duration: 9,
      delay: 0.5,
      bottom: 0,
      layer: "close",
    },
    {
      id: 305,
      emoji: "💕",
      left: 76,
      size: 29,
      duration: 7,
      delay: 4,
      bottom: 15,
      layer: "close",
    },
    {
      id: 306,
      emoji: "❤️",
      left: 89,
      size: 24,
      duration: 8,
      delay: 2.5,
      bottom: 30,
      layer: "close",
    },
    {
      id: 307,
      emoji: "🫶",
      left: 50,
      size: 36,
      duration: 10,
      delay: 7,
      bottom: 42,
      layer: "close",
    },
  ];

  const sparkles: SparkleDot[] = [
    {
      id: 1,
      left: 10,
      top: 20,
      size: 4,
      duration: 2,
      delay: 0,
      color: "rgba(249,168,212,0.7)",
    },
    {
      id: 2,
      left: 20,
      top: 35,
      size: 3,
      duration: 2.5,
      delay: 0.3,
      color: "rgba(196,181,253,0.8)",
    },
    {
      id: 3,
      left: 30,
      top: 15,
      size: 5,
      duration: 1.8,
      delay: 0.7,
      color: "rgba(255,255,255,0.6)",
    },
    {
      id: 4,
      left: 45,
      top: 60,
      size: 3,
      duration: 2.2,
      delay: 1,
      color: "rgba(249,168,212,0.9)",
    },
    {
      id: 5,
      left: 55,
      top: 25,
      size: 4,
      duration: 3,
      delay: 0.5,
      color: "rgba(196,181,253,0.7)",
    },
    {
      id: 6,
      left: 65,
      top: 75,
      size: 6,
      duration: 2,
      delay: 1.4,
      color: "rgba(255,255,255,0.5)",
    },
    {
      id: 7,
      left: 75,
      top: 40,
      size: 3,
      duration: 2.5,
      delay: 0.2,
      color: "rgba(249,168,212,0.8)",
    },
    {
      id: 8,
      left: 85,
      top: 55,
      size: 5,
      duration: 1.9,
      delay: 0.9,
      color: "rgba(196,181,253,0.6)",
    },
    {
      id: 9,
      left: 90,
      top: 10,
      size: 4,
      duration: 2.8,
      delay: 1.6,
      color: "rgba(255,255,255,0.7)",
    },
    {
      id: 10,
      left: 5,
      top: 70,
      size: 3,
      duration: 2.1,
      delay: 0.4,
      color: "rgba(249,168,212,0.6)",
    },
    {
      id: 11,
      left: 38,
      top: 85,
      size: 5,
      duration: 2.4,
      delay: 1.2,
      color: "rgba(196,181,253,0.8)",
    },
    {
      id: 12,
      left: 52,
      top: 45,
      size: 4,
      duration: 2,
      delay: 0.6,
      color: "rgba(255,255,255,0.6)",
    },
    {
      id: 13,
      left: 70,
      top: 90,
      size: 3,
      duration: 3,
      delay: 2,
      color: "rgba(249,168,212,0.7)",
    },
    {
      id: 14,
      left: 25,
      top: 50,
      size: 6,
      duration: 2.2,
      delay: 0.8,
      color: "rgba(236,72,153,0.5)",
    },
    {
      id: 15,
      left: 95,
      top: 30,
      size: 4,
      duration: 1.7,
      delay: 1.5,
      color: "rgba(196,181,253,0.7)",
    },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Animated gradient base */}
      <div
        className="animated-bg"
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/* Radial overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(168,85,247,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Conic light rays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(249,168,212,0.04) 30deg, transparent 60deg, rgba(196,181,253,0.04) 90deg, transparent 120deg, rgba(249,168,212,0.03) 150deg, transparent 180deg, rgba(196,181,253,0.04) 210deg, transparent 240deg, rgba(249,168,212,0.03) 270deg, transparent 300deg, rgba(196,181,253,0.04) 330deg, transparent 360deg)",
          opacity: 0.7,
        }}
      />

      {/* Floating hearts — three parallax depth layers */}
      {hearts.map((heart) => {
        const layerClass =
          heart.layer === "far"
            ? "float-heart-far"
            : heart.layer === "close"
              ? "float-heart-close"
              : "float-heart-mid";
        return (
          <div
            key={heart.id}
            className={layerClass}
            style={
              {
                position: "absolute",
                left: `${heart.left}%`,
                bottom: `${heart.bottom}%`,
                fontSize: `${heart.size}px`,
                "--duration": `${heart.duration}s`,
                "--delay": `${heart.delay}s`,
                lineHeight: 1,
              } as React.CSSProperties
            }
          >
            {heart.emoji}
          </div>
        );
      })}

      {/* Sparkle dots */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle-dot"
          style={
            {
              position: "absolute",
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              background: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
              "--duration": `${s.duration}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ======================== SCREEN 0 — OPENING ========================

interface Screen0Props {
  onNext: () => void;
}

function Screen0({ onNext }: Screen0Props) {
  return (
    <div
      className="screen-fade-in"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1.5rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="glass-card-glow"
        style={{
          maxWidth: 520,
          width: "100%",
          padding: "3rem 2.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Decorative top hearts */}
        <div style={{ fontSize: "2rem", display: "flex", gap: "0.5rem" }}>
          <span
            className="float-gentle"
            style={{ display: "inline-block", animationDelay: "0s" }}
          >
            🩷
          </span>
          <span
            className="float-gentle"
            style={{ display: "inline-block", animationDelay: "0.5s" }}
          >
            🫶
          </span>
          <span
            className="float-gentle"
            style={{ display: "inline-block", animationDelay: "1s" }}
          >
            💜
          </span>
        </div>

        {/* Main title */}
        <h1
          className="font-playfair text-glow-pink"
          style={{
            fontSize: "clamp(3rem, 10vw, 5rem)",
            fontWeight: 700,
            color: "#fce7f3",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
          }}
        >
          Haaramma
        </h1>

        {/* Decorative divider */}
        <div
          style={{
            width: "80px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #ec4899, #a855f7, transparent)",
            borderRadius: "2px",
          }}
        />

        {/* Subtitle */}
        <p
          className="font-inter text-glow-soft"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            fontWeight: 300,
            color: "#e9d5ff",
            lineHeight: 1.6,
            letterSpacing: "0.05em",
          }}
        >
          A special journey, just for you 💕
        </p>

        {/* CTA Button */}
        <button
          type="button"
          data-ocid="opening.primary_button"
          className="btn-glow"
          onClick={onNext}
          style={{
            padding: "1.1rem 2.5rem",
            fontSize: "clamp(1rem, 3vw, 1.15rem)",
            fontWeight: 600,
            letterSpacing: "0.03em",
            marginTop: "0.5rem",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          aria-label="Begin the special journey for Haaramma"
        >
          Click here, my dear Haaramma ❤️
        </button>

        {/* Bottom note */}
        <p
          className="font-inter"
          style={{
            fontSize: "0.8rem",
            color: "rgba(233,213,255,0.5)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          with endless love &amp; warmth
        </p>
      </div>
    </div>
  );
}

// ======================== SCREEN 1 — EMOTIONAL MESSAGE ========================

interface Screen1Props {
  onNext: () => void;
  isVisible: boolean;
}

const EMOTIONAL_MESSAGE = `Before you continue this little journey…
remember one thing.

Among all the people in this world,
you are the most special person in my life.`;

function Screen1({ onNext, isVisible }: Screen1Props) {
  const { displayedText, isComplete } = useTypingEffect(
    EMOTIONAL_MESSAGE,
    50,
    isVisible,
  );

  const lines = displayedText.split("\n");

  return (
    <div
      className="screen-fade-in"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1.5rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Extra floating hands behind card */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {[
          { left: "8%", bottom: "20%", size: 32, delay: "0s", duration: "15s" },
          {
            left: "85%",
            bottom: "30%",
            size: 28,
            delay: "3s",
            duration: "12s",
          },
          {
            left: "50%",
            bottom: "10%",
            size: 36,
            delay: "6s",
            duration: "18s",
          },
        ].map((h) => (
          <div
            key={`hand-${h.left}-${h.bottom}`}
            className="float-heart-slow"
            style={
              {
                position: "absolute",
                left: h.left,
                bottom: h.bottom,
                fontSize: `${h.size}px`,
                "--delay": h.delay,
                "--duration": h.duration,
              } as React.CSSProperties
            }
          >
            🫶
          </div>
        ))}
      </div>

      <div
        className="glass-card-glow"
        style={{
          maxWidth: 600,
          width: "100%",
          padding: "3rem 2.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Icon */}
        <div className="float-gentle" style={{ fontSize: "2.5rem" }}>
          💌
        </div>

        {/* Typed message */}
        <div
          style={{
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            className={`font-playfair ${!isComplete ? "typing-cursor" : ""}`}
            style={{
              fontSize: "clamp(1.05rem, 3vw, 1.3rem)",
              color: "#fce7f3",
              lineHeight: 1.9,
              fontStyle: "italic",
              letterSpacing: "0.01em",
              whiteSpace: "pre-wrap",
              textShadow:
                "0 0 12px rgba(249,168,212,0.5), 0 0 24px rgba(236,72,153,0.3)",
            }}
          >
            {lines.map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: line order is stable
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        {/* CTA button — shown after typing completes */}
        {isComplete && (
          <div
            style={{
              animation: "fade-in 0.8s ease forwards",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "1.5rem", display: "flex", gap: "0.4rem" }}>
              <span>🌸</span>
              <span>🌸</span>
              <span>🌸</span>
            </div>
            <button
              type="button"
              data-ocid="message.primary_button"
              className="btn-glow"
              onClick={onNext}
              style={{
                padding: "1rem 2.2rem",
                fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                fontWeight: 600,
                letterSpacing: "0.03em",
                transition: "transform 0.2s ease",
              }}
              aria-label="Start memory journey"
            >
              Start our little memory journey 🌸
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ======================== SCREEN 2 — QUESTIONS ========================

const QUESTIONS = [
  "Manam iddaram kalisina roju gurthundha thalli ? 🌸",
  "What is the happiest memory you have with your buddu brother? 💕",
  "If you had to describe your Annayya in one single word, what would it be? ✨",
  "Which moment with me made your heart feel the happiest? 💗",
  "If you had to choose, would you want me in your life as your brother, your Friend, or your Father, or your son? 🫶",
  "How much does your Annayya truly mean to you? 💜",
  "Do you believe that the bond between siblings can stay strong forever, no matter what life brings? ❤️",
  "Naaaku Naa chelle prapancham anthe mari nenu neeku raa Bangaaru thalli 💛",
];

interface QuestionCardProps {
  question: string;
  index: number;
  total: number;
  animClass: string;
}

function QuestionCard({
  question,
  index,
  total,
  animClass,
}: QuestionCardProps) {
  const localHearts = [
    { emoji: "❤️", left: "5%", top: "20%", size: 20, dur: 7, del: 0 },
    { emoji: "🩷", left: "90%", top: "15%", size: 16, dur: 9, del: 1 },
    { emoji: "💜", left: "3%", top: "70%", size: 18, dur: 8, del: 0.5 },
    { emoji: "💕", left: "92%", top: "65%", size: 22, dur: 6, del: 2 },
    { emoji: "❤️", left: "50%", top: "5%", size: 14, dur: 10, del: 1.5 },
    { emoji: "🩷", left: "20%", top: "90%", size: 18, dur: 7, del: 0.8 },
    { emoji: "💜", left: "75%", top: "85%", size: 20, dur: 9, del: 3 },
    { emoji: "💕", left: "45%", top: "88%", size: 16, dur: 8, del: 1.2 },
  ];

  return (
    <div
      className={animClass}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "1.5rem",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {/* Local floating hearts */}
      {localHearts.map((h) => (
        <div
          key={`q-heart-${h.left}-${h.top}`}
          aria-hidden="true"
          className="float-heart"
          style={
            {
              position: "absolute",
              left: h.left,
              top: h.top,
              fontSize: `${h.size}px`,
              "--duration": `${h.dur}s`,
              "--delay": `${h.del}s`,
              pointerEvents: "none",
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </div>
      ))}

      <div
        className="glass-card-glow"
        style={{
          maxWidth: 640,
          width: "100%",
          padding: "3rem 2.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          position: "relative",
        }}
      >
        {/* Question number */}
        <div
          className="font-inter"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(196,181,253,0.7)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "#f9a8d4" }}>✦</span>
          Question {index + 1} of {total}
          <span style={{ color: "#f9a8d4" }}>✦</span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: "3px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((index + 1) / total) * 100}%`,
              background: "linear-gradient(90deg, #ec4899, #a855f7)",
              borderRadius: "2px",
              boxShadow: "0 0 8px rgba(236,72,153,0.6)",
              transition: "width 0.5s ease",
            }}
          />
        </div>

        {/* Question text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "120px",
          }}
        >
          <p
            className="font-playfair text-glow-pink"
            style={{
              fontSize: "clamp(1.15rem, 3.5vw, 1.55rem)",
              color: "#fce7f3",
              lineHeight: 1.7,
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}
          >
            {question}
          </p>
        </div>

        {/* Progress dots */}
        <div
          style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
        >
          {Array.from({ length: total }, (_, i) => `dot-${i}`).map(
            (dotKey, i) => (
              <div
                key={dotKey}
                style={{
                  width: i === index ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    i <= index
                      ? "linear-gradient(90deg, #ec4899, #a855f7)"
                      : "rgba(255,255,255,0.2)",
                  boxShadow:
                    i === index ? "0 0 8px rgba(236,72,153,0.7)" : "none",
                  transition: "all 0.4s ease",
                }}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

interface Screen2Props {
  onFinish: () => void;
}

function Screen2({ onFinish }: Screen2Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [animClass, setAnimClass] = useState("slide-in-right");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCard, setShowCard] = useState(true);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    if (questionIndex === QUESTIONS.length - 1) {
      onFinish();
      return;
    }

    setIsTransitioning(true);
    setAnimClass("slide-out-left");

    setTimeout(() => {
      setShowCard(false);
      setQuestionIndex((prev) => prev + 1);
      setAnimClass("slide-in-right");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowCard(true);
          setIsTransitioning(false);
        });
      });
    }, 400);
  }, [isTransitioning, questionIndex, onFinish]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {showCard && (
        <QuestionCard
          question={QUESTIONS[questionIndex]}
          index={questionIndex}
          total={QUESTIONS.length}
          animClass={animClass}
        />
      )}

      {/* Fixed Next/Finish button */}
      <div
        style={{
          position: "fixed",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      >
        <button
          type="button"
          data-ocid="question.primary_button"
          className="btn-glow"
          onClick={handleNext}
          disabled={isTransitioning}
          style={{
            padding: "0.9rem 2.5rem",
            fontSize: "1.05rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            opacity: isTransitioning ? 0.7 : 1,
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
          aria-label={
            questionIndex === QUESTIONS.length - 1
              ? "Finish journey"
              : "Next question"
          }
        >
          {questionIndex === QUESTIONS.length - 1 ? "Finish 💕" : "Next ➡️"}
        </button>
      </div>
    </div>
  );
}

// ======================== SCREEN 3 — FINAL ========================

interface Screen3Props {
  onRestart: () => void;
}

const FINAL_MESSAGE = `You are not just my sister…
you are the greatest blessing my life has ever received.

Having you as my sister is the most beautiful gift this world has given me.

In every lifetime, in every universe, if I had the chance to choose again,
I would still choose you as my sister.

Because no one in this world could ever replace you.

You filled my life with laughter,
with memories,
with love that will never fade.

No matter where life takes us,
no matter how far time carries us,
you will always be my forever sister.

And I will always be the luckiest brother alive.`;

function Screen3({ onRestart }: Screen3Props) {
  const finalHearts = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    emoji: ["❤️", "💕", "💜", "🩷"][i % 4],
    left: Math.round((i / 14) * 90 + 5),
    size: 16 + (i % 4) * 4,
    duration: 8 + (i % 5) * 2,
    delay: i * 0.7,
    bottom: Math.round((i % 5) * 10),
  }));

  return (
    <div
      className="screen-fade-in"
      style={{
        position: "relative",
        minHeight: "100vh",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Fullscreen photo background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "url('/assets/uploads/Screenshot_20260306_021018-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.52)",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay for text readability */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)",
          zIndex: 3,
        }}
        aria-hidden="true"
      />

      {/* Floating hearts over the photo */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 4,
          overflow: "hidden",
        }}
      >
        {finalHearts.map((h) => (
          <div
            key={h.id}
            className="float-heart"
            style={
              {
                position: "absolute",
                left: `${h.left}%`,
                bottom: `${h.bottom}%`,
                fontSize: `${h.size}px`,
                "--duration": `${h.duration}s`,
                "--delay": `${h.delay}s`,
                filter: "drop-shadow(0 0 6px rgba(249,168,212,0.8))",
              } as React.CSSProperties
            }
          >
            {h.emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "3rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            width: "100%",
            textAlign: "center",
            animation: "fade-in 1.2s ease 0.5s both",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Top sparkle */}
          <div style={{ fontSize: "2rem", display: "flex", gap: "0.6rem" }}>
            <span className="float-gentle" style={{ animationDelay: "0s" }}>
              💕
            </span>
            <span className="float-gentle" style={{ animationDelay: "0.7s" }}>
              🫶
            </span>
            <span className="float-gentle" style={{ animationDelay: "1.4s" }}>
              💕
            </span>
          </div>

          {/* Main emotional message */}
          <div
            style={{
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
              /* Deep glass that picks up the photo warmth beneath */
              background:
                "linear-gradient(160deg, rgba(30,10,40,0.55) 0%, rgba(10,5,20,0.62) 50%, rgba(30,10,50,0.5) 100%)",
              borderTop: "1px solid rgba(255,255,255,0.22)",
              borderLeft: "1px solid rgba(249,168,212,0.18)",
              borderRight: "1px solid rgba(196,181,253,0.12)",
              borderBottom: "1px solid rgba(168,85,247,0.08)",
              borderRadius: "28px",
              padding: "3.5rem 2.5rem",
              boxShadow: [
                "0 32px 80px rgba(0,0,0,0.65)",
                "0 8px 24px rgba(0,0,0,0.5)",
                "0 0 80px rgba(236,72,153,0.2)",
                "0 0 160px rgba(168,85,247,0.12)",
                "inset 0 2px 0 rgba(255,255,255,0.2)",
                "inset 0 -1px 0 rgba(196,181,253,0.1)",
              ].join(", "),
            }}
          >
            {/* Wrapper handles fade-in; inner p handles the persistent glow pulse */}
            <div style={{ animation: "fade-in 1.5s ease 1s both" }}>
              <p
                className="font-playfair text-glow-white"
                style={{
                  fontSize: "clamp(1rem, 2.8vw, 1.25rem)",
                  color: "#fff",
                  lineHeight: 2,
                  fontStyle: "italic",
                  letterSpacing: "0.01em",
                  whiteSpace: "pre-wrap",
                }}
              >
                {FINAL_MESSAGE}
              </p>
            </div>
          </div>

          {/* Signature */}
          <div
            style={{
              animation: "fade-in 1s ease 2.5s both",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(249,168,212,0.6), transparent)",
              }}
            />
            <p
              className="font-playfair"
              style={{
                fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                color: "#f9a8d4",
                fontStyle: "italic",
                letterSpacing: "0.03em",
                textShadow:
                  "0 0 12px rgba(249,168,212,0.7), 0 0 24px rgba(236,72,153,0.5)",
              }}
            >
              From your Annayya, with endless And Infinity love ❤️
            </p>
          </div>

          {/* Restart button */}
          <button
            type="button"
            data-ocid="final.secondary_button"
            onClick={onRestart}
            className="font-inter"
            style={{
              animation: "fade-in 0.8s ease 3.5s both",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(249,168,212,0.3)",
              borderRadius: "9999px",
              color: "rgba(233,213,255,0.7)",
              padding: "0.6rem 1.6rem",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(236,72,153,0.15)";
              (e.currentTarget as HTMLButtonElement).style.color = "#f9a8d4";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(236,72,153,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(233,213,255,0.7)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(249,168,212,0.3)";
            }}
            aria-label="Begin the journey again"
          >
            Begin again 🔄
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================== TRANSITION WRAPPER ========================

interface ScreenTransitionProps {
  screen: Screen;
  children: React.ReactNode;
}

function ScreenTransition({ screen, children }: ScreenTransitionProps) {
  return (
    <div
      key={screen}
      style={{
        position: "absolute",
        inset: 0,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

// ======================== APP ROOT ========================

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleScreen, setVisibleScreen] = useState<Screen>(0);

  const transitionTo = useCallback(
    (nextScreen: Screen) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentScreen(nextScreen);
        setVisibleScreen(nextScreen);
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning],
  );

  const handleScreen0Next = useCallback(() => transitionTo(1), [transitionTo]);
  const handleScreen1Next = useCallback(() => transitionTo(2), [transitionTo]);
  const handleScreen2Finish = useCallback(
    () => transitionTo(3),
    [transitionTo],
  );
  const handleRestart = useCallback(() => {
    setCurrentScreen(0);
    setVisibleScreen(0);
    setIsTransitioning(false);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Always-on background */}
      <BackgroundLayer />

      {/* Screen container */}
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <ScreenTransition screen={currentScreen}>
          {visibleScreen === 0 && <Screen0 onNext={handleScreen0Next} />}
          {visibleScreen === 1 && (
            <Screen1
              onNext={handleScreen1Next}
              isVisible={currentScreen === 1}
            />
          )}
          {visibleScreen === 2 && <Screen2 onFinish={handleScreen2Finish} />}
          {visibleScreen === 3 && <Screen3 onRestart={handleRestart} />}
        </ScreenTransition>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: "0.6rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          pointerEvents:
            currentScreen === 2 || currentScreen === 3 ? "none" : "auto",
          opacity: currentScreen === 2 || currentScreen === 3 ? 0 : 0.4,
          transition: "opacity 0.5s ease",
        }}
      >
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter"
          style={{
            fontSize: "0.7rem",
            color: "rgba(233,213,255,0.5)",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          © {new Date().getFullYear()}. Built with ❤️ using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
