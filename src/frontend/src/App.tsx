import { useCallback, useEffect, useRef, useState } from "react";

// ======================== TYPES ========================

type Screen = 0 | 1 | 2 | 3 | 4;

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

// ======================== MUSIC BUTTON ========================

interface MusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  visible: boolean;
}

function MusicButton({ isPlaying, onToggle, visible }: MusicButtonProps) {
  if (!visible) return null;
  return (
    <button
      type="button"
      data-ocid="music.toggle"
      className="music-btn"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? "🔇" : "🎵"}
    </button>
  );
}

// ======================== BACKGROUND LAYER ========================

function BackgroundLayer() {
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
      <div className="animated-bg" style={{ position: "absolute", inset: 0 }} />
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

        <div
          style={{
            width: "80px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #ec4899, #a855f7, transparent)",
            borderRadius: "2px",
          }}
        />

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
          }}
          aria-label="Begin the special journey for Haaramma"
        >
          Click here, my dear Haaramma ❤️
        </button>

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
    48,
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
        <div className="float-gentle" style={{ fontSize: "2.5rem" }}>
          💌
        </div>

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
              // biome-ignore lint/suspicious/noArrayIndexKey: stable order
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

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

interface QuestionAnswerProps {
  questionIndex: number;
  value: string;
  onChange: (val: string) => void;
}

function QuestionAnswer({
  questionIndex,
  value,
  onChange,
}: QuestionAnswerProps) {
  return (
    <textarea
      data-ocid={`question.textarea.${questionIndex + 1}`}
      className="answer-input"
      rows={3}
      placeholder="Write your answer here... 💕"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ minHeight: "80px" }}
    />
  );
}

interface QuestionCardProps {
  question: string;
  index: number;
  total: number;
  animClass: string;
  answer: string;
  onAnswerChange: (val: string) => void;
  onNext: () => void;
  isTransitioning: boolean;
}

function QuestionCard({
  question,
  index,
  total,
  animClass,
  answer,
  onAnswerChange,
  onNext,
  isTransitioning,
}: QuestionCardProps) {
  return (
    <div
      className={animClass}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "1.5rem 1.5rem 8rem",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="glass-card-glow"
        style={{
          maxWidth: 640,
          width: "100%",
          padding: "2.5rem 2rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
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
        <p
          className="font-playfair text-glow-pink"
          style={{
            fontSize: "clamp(1.1rem, 3.5vw, 1.45rem)",
            color: "#fce7f3",
            lineHeight: 1.7,
            fontStyle: "italic",
            letterSpacing: "0.01em",
          }}
        >
          {question}
        </p>

        {/* Answer area */}
        <div
          style={{ width: "100%", animation: "fade-in 0.5s ease 0.2s both" }}
        >
          <QuestionAnswer
            questionIndex={index}
            value={answer}
            onChange={onAnswerChange}
          />
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

        {/* Next / Finish button inside card on mobile */}
        <button
          type="button"
          data-ocid="question.primary_button"
          className="btn-glow"
          onClick={onNext}
          disabled={isTransitioning}
          style={{
            padding: "0.85rem 2.2rem",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            opacity: isTransitioning ? 0.7 : 1,
            marginTop: "0.25rem",
          }}
          aria-label={index === total - 1 ? "Finish journey" : "Next question"}
        >
          {index === total - 1 ? "Finish 💕" : "Next ➡️"}
        </button>
      </div>
    </div>
  );
}

interface Screen2Props {
  onFinish: (answers: string[]) => void;
}

function Screen2({ onFinish }: Screen2Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [animClass, setAnimClass] = useState("slide-in-right");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [answers, setAnswers] = useState<string[]>(
    Array(QUESTIONS.length).fill(""),
  );

  const handleAnswerChange = useCallback(
    (val: string) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[questionIndex] = val;
        return next;
      });
    },
    [questionIndex],
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    if (questionIndex === QUESTIONS.length - 1) {
      onFinish(answers);
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
    }, 350);
  }, [isTransitioning, questionIndex, onFinish, answers]);

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
          answer={answers[questionIndex]}
          onAnswerChange={handleAnswerChange}
          onNext={handleNext}
          isTransitioning={isTransitioning}
        />
      )}
    </div>
  );
}

// ======================== SCREEN 4 — FORMSPREE SUBMISSION ========================

interface Screen4Props {
  answers: string[];
  onSuccess: () => void;
}

function Screen4({ answers, onSuccess }: Screen4Props) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    // Auto-submit on mount
    const submit = async () => {
      setStatus("submitting");
      try {
        const formData: Record<string, string> = {};
        QUESTIONS.forEach((q, i) => {
          formData[`Question ${i + 1}: ${q}`] = answers[i] || "(no answer)";
        });

        const res = await fetch("https://formspree.io/f/xvzwpygp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    submit();
  }, [answers]);

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
          maxWidth: 560,
          width: "100%",
          padding: "3rem 2.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.8rem",
        }}
      >
        {status === "submitting" && (
          <>
            <div style={{ fontSize: "2.5rem" }} className="float-gentle">
              💌
            </div>
            <p
              className="font-playfair text-glow-pink"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                color: "#fce7f3",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              Sending your memories...
            </p>
            <div
              data-ocid="submission.loading_state"
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid rgba(236,72,153,0.3)",
                borderTop: "3px solid #ec4899",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ fontSize: "3rem" }}>❤️</div>
            <p
              data-ocid="submission.success_state"
              className="font-playfair text-glow-pink"
              style={{
                fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
                color: "#fce7f3",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              Thank you for sharing your memories with your brother ❤️
            </p>
            <button
              type="button"
              data-ocid="submission.primary_button"
              className="btn-glow"
              onClick={onSuccess}
              style={{
                padding: "0.9rem 2.2rem",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                marginTop: "0.5rem",
              }}
            >
              See the final surprise 💕
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ fontSize: "2.5rem" }}>💜</div>
            <p
              data-ocid="submission.error_state"
              className="font-playfair text-glow-pink"
              style={{
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                color: "#fce7f3",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              Something went wrong sending your answers. Please try again.
            </p>
            <button
              type="button"
              data-ocid="submission.secondary_button"
              className="btn-glow"
              onClick={onSuccess}
              style={{
                padding: "0.85rem 2rem",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Continue anyway 💕
            </button>
          </>
        )}
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
  // 5 hearts — one per emoji type, simple fixed positions, lightweight
  const finalHearts = [
    { id: 1, emoji: "❤️", left: 10, size: 20, duration: 9, delay: 0, bottom: 0 },
    {
      id: 2,
      emoji: "💕",
      left: 25,
      size: 18,
      duration: 11,
      delay: 2,
      bottom: 5,
    },
    {
      id: 3,
      emoji: "💜",
      left: 50,
      size: 22,
      duration: 10,
      delay: 1,
      bottom: 0,
    },
    {
      id: 4,
      emoji: "🩷",
      left: 70,
      size: 18,
      duration: 9,
      delay: 3,
      bottom: 8,
    },
    {
      id: 5,
      emoji: "🫶",
      left: 88,
      size: 20,
      duration: 12,
      delay: 0.5,
      bottom: 3,
    },
  ];

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
            "url('/assets/uploads/Screenshot_20260306_021018-1-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Light overlay — just enough for text readability without hiding the photo */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.25)",
          zIndex: 2,
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
            className="float-heart-final"
            style={
              {
                position: "absolute",
                left: `${h.left}%`,
                bottom: `${h.bottom}%`,
                fontSize: `${h.size}px`,
                "--duration": `${h.duration}s`,
                "--delay": `${h.delay}s`,
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
            animation: "fade-in 1.2s ease 0.3s both",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Top sparkle row */}
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
              backdropFilter: "blur(16px) saturate(130%)",
              WebkitBackdropFilter: "blur(16px) saturate(130%)",
              background:
                "linear-gradient(160deg, rgba(30,10,40,0.45) 0%, rgba(10,5,20,0.5) 50%, rgba(30,10,50,0.4) 100%)",
              borderTop: "1px solid rgba(255,255,255,0.22)",
              borderLeft: "1px solid rgba(249,168,212,0.18)",
              borderRight: "1px solid rgba(196,181,253,0.12)",
              borderBottom: "1px solid rgba(168,85,247,0.08)",
              borderRadius: "28px",
              padding: "3rem 2.5rem",
              boxShadow: [
                "0 32px 80px rgba(0,0,0,0.4)",
                "0 8px 24px rgba(0,0,0,0.3)",
                "0 0 80px rgba(236,72,153,0.15)",
                "inset 0 2px 0 rgba(255,255,255,0.2)",
                "inset 0 -1px 0 rgba(196,181,253,0.1)",
              ].join(", "),
            }}
          >
            <div style={{ animation: "fade-in 1.5s ease 0.8s both" }}>
              <p
                className="font-playfair text-glow-white"
                style={{
                  fontSize: "clamp(1rem, 2.8vw, 1.22rem)",
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
              animation: "fade-in 1s ease 2.2s both",
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
              animation: "fade-in 0.8s ease 3.2s both",
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
  const [musicStarted, setMusicStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [collectedAnswers, setCollectedAnswers] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(
      "/assets/Sai%20Pallavi's%20Intro%20(From%20Amaran)%20(1).mp3",
    );
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startMusic = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setMusicStarted(true);
      })
      .catch(() => {
        // Autoplay blocked — will retry on next user interaction
      });
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isPlaying]);

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

  const handleScreen0Next = useCallback(() => {
    startMusic();
    transitionTo(1);
  }, [transitionTo, startMusic]);

  const handleScreen1Next = useCallback(() => transitionTo(2), [transitionTo]);
  const handleScreen2Finish = useCallback(
    (answers: string[]) => {
      setCollectedAnswers(answers);
      transitionTo(4);
    },
    [transitionTo],
  );
  const handleSubmissionSuccess = useCallback(
    () => transitionTo(3),
    [transitionTo],
  );
  const handleRestart = useCallback(() => {
    setCurrentScreen(0);
    setVisibleScreen(0);
    setIsTransitioning(false);
    setCollectedAnswers([]);
  }, []);

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
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
          {visibleScreen === 4 && (
            <Screen4
              answers={collectedAnswers}
              onSuccess={handleSubmissionSuccess}
            />
          )}
          {visibleScreen === 3 && <Screen3 onRestart={handleRestart} />}
        </ScreenTransition>
      </div>

      {/* Floating music control button */}
      <MusicButton
        isPlaying={isPlaying}
        onToggle={toggleMusic}
        visible={musicStarted}
      />

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: "0.6rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          pointerEvents:
            currentScreen === 2 || currentScreen === 3 || currentScreen === 4
              ? "none"
              : "auto",
          opacity:
            currentScreen === 2 || currentScreen === 3 || currentScreen === 4
              ? 0
              : 0.4,
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
