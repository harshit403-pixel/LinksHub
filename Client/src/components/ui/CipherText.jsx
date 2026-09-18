import { useEffect, useRef, useState } from "react";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const CipherText = ({ children, duration = 1000 }) => {
  const originalText = String(children);
  const [text, setText] = useState(originalText);
  const intervalRef = useRef(null);

  const scramble = () => {
    let frame = 0;
    const interval = 45;
    const totalFrames = Math.ceil(duration / interval);

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frame += 1;

      const progress = frame / totalFrames;

      const nextText = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";

          const lockProgress = index / originalText.length;

          if (progress >= lockProgress + 0.2) {
            return char;
          }

          return CHARACTERS[
            Math.floor(Math.random() * CHARACTERS.length)
          ];
        })
        .join("");

      setText(nextText);

      if (frame >= totalFrames) {
        clearInterval(intervalRef.current);
        setText(originalText);
      }
    }, interval);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span
      className="relative inline-block min-w-max font-mono"
      onMouseEnter={scramble}
    >
      <span className="invisible whitespace-nowrap">
        {originalText}
      </span>

      <span className="absolute inset-0 whitespace-nowrap">
        {text}
      </span>
    </span>
  );
};

export default CipherText;