import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IntroProvider, SmoothScroll, ScrollManager } from "@/components/Providers";
import { Thread } from "@/components/Thread";
import { Cursor, Grain } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { ScrollCue } from "@/components/ScrollCue";
import Home from "@/pages/Home";
import ChapterOne from "@/pages/ChapterOne";
import OurStory from "@/pages/OurStory";
import { Privacy, Terms, NotFound } from "@/pages/TextPages";

function App() {
  return (
    <BrowserRouter>
      <IntroProvider>
        <SmoothScroll />
        <ScrollManager />
        <a href="#main" className="skip-link" data-testid="skip-link">
          Skip to content
        </a>
        <Grain />
        <Cursor />
        <Thread />
        <Nav />
        <ScrollCue />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapter-one" element={<ChapterOne />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </IntroProvider>
    </BrowserRouter>
  );
}

export default App;
