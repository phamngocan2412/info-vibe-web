import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { Footer, Contact } from './components/Footer';
import NotFound from './components/NotFound';
import { useGitHubData } from './hooks/useGitHubData';
import { FloatingShapesBackground } from '@/components/animate-ui/components/backgrounds/floating-shapes';

// Lazy Load Heavy Components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const CVManager = lazy(() => import('./components/admin/CVManager'));

function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Priority handling for Home/Root
    if (pathname === '/' || pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Scroll to section based on path (e.g. /projects -> #projects)
    const sectionId = pathname.replace('/', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}

function MainContent() {
  const { user, repos, loading } = useGitHubData();

  return (
    <main>
      {/* Hero loaded immediately for LCP */}
      <Hero user={user} loading={loading} />

      {/* Lazy load below-the-fold content */}
      <Suspense fallback={<div className="h-screen" />}>
        <About user={user} />
        <Experience />
        <Skills repos={repos} loading={loading} />
        <Projects repos={repos} loading={loading} />
        <Contact />
      </Suspense>
    </main>
  );
}

function App() {
  return (
    <div className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text font-sans antialiased transition-colors duration-300 relative min-h-screen overflow-x-hidden w-full">
      <ScrollHandler />
      {/* Unified Background: Floating Shapes for both Light and Dark modes */}
      <FloatingShapesBackground
        className="fixed inset-0 z-0 pointer-events-none"
      />

      <Header />
      <div className="relative z-10">

        {/* We use Routes but render the same MainContent for all valid sections to preserve the Single Page feel */}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/home" element={<MainContent />} />
          <Route path="/about" element={<MainContent />} />
          <Route path="/experience" element={<MainContent />} />
          <Route path="/skills" element={<MainContent />} />
          <Route path="/projects" element={<MainContent />} />

          {/* Hidden Admin Route */}
          <Route path="/cv-mn" element={
            <Suspense fallback={<div>Loading Admin...</div>}>
              <CVManager />
            </Suspense>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
