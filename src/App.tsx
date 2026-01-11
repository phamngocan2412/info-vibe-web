import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import { Contact, Footer } from './components/Footer';
import Experience from './components/Experience';
import { useGitHubData } from './hooks/useGitHubData';

import { useTheme } from './hooks/useTheme';
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';

function App() {
  const { user, repos, loading } = useGitHubData();
  const { theme } = useTheme();

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-dark-bg dark:text-dark-text font-sans antialiased transition-colors duration-300 relative min-h-screen">
      {theme === 'dark' && (
        <GravityStarsBackground className="fixed inset-0 z-0 pointer-events-none" />
      )}
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
