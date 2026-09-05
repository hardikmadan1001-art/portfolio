import NoiseOverlay from "./components/NoiseOverlay";
import AudioToggle from "./components/AudioToggle";
import Hero from "./acts/Hero";
import CobaltAct from "./acts/CobaltAct";
import World from "./acts/World";
import Projects from "./acts/Projects";
import Obsessions from "./acts/Obsessions";
import Archive from "./acts/Archive";
import Manifesto from "./acts/Manifesto";
import Finale from "./acts/Finale";

/**
 * NIMBUS — a cinematic scroll through the things that keep me up at night.
 *
 *  ACT 1  Video hero — "NOT DONE YET."
 *  —       Cloud transition into pear-cobalt, signature reveal
 *  ACT 2  Enter the world (black) — the four memories
 *  ACT 3  The project universe — destinations, not cards
 *  ACT 4  Obsessions — infinite word wall
 *  ACT 5  The archive — polaroids & notes
 *  ACT 6  The manifesto
 *  ACT 7  Final boss — "THAT'S THE POINT."
 */
export default function App() {
  return (
    <main className="relative overflow-x-clip bg-ink font-manrope text-white antialiased">
      <NoiseOverlay />
      <AudioToggle />
      <Hero />
      <CobaltAct />
      <World />
      <Projects />
      <Obsessions />
      <Archive />
      <Manifesto />
      <Finale />
    </main>
  );
}
