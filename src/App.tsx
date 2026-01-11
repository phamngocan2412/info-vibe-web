import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import { Contact, Footer } from './components/Footer';
import Experience from './components/Experience';
import { useGitHubData } from './hooks/useGitHubData';



import { FloatingShapesBackground } from '@/components/animate-ui/components/backgrounds/floating-shapes';

function App() {
  const { user, repos, loading } = useGitHubData();

  return (
    <div className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text font-sans antialiased transition-colors duration-300 relative min-h-screen">
      {/* Unified Background: Floating Shapes for both Light and Dark modes */}
      <FloatingShapesBackground
        className="fixed inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero user={user} loading={loading} />
          <About user={user} />
          <Experience />

          <Skills repos={repos} loading={loading} />
          <Projects repos={repos} loading={loading} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
