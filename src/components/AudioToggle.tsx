import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Floating ambient-music toggle. Audio only ever starts on a user gesture,
 * which also unlocks video audio should we ever enable it.
 */
export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = new Audio("/audio/let-it-happen.mp3");
    a.loop = true;
    a.preload = "auto";
    audioRef.current = a;
    const onReady = () => setReady(true);
    a.addEventListener("canplaythrough", onReady);
    return () => {
      a.removeEventListener("canplaythrough", onReady);
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      title="ambient music"
      className="fixed top-5 right-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-cobalt-glow/60 hover:text-white"
    >
      {ready && playing ? (
        <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="eq-bar w-[2px] rounded-full bg-cobalt-glow"
              style={{
                height: "100%",
                animationDelay: `${i * 0.16}s`,
                animationDuration: `${0.9 + (i % 2) * 0.35}s`,
              }}
            />
          ))}
        </span>
      ) : playing ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  );
}
