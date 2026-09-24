import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useProjects, useServices } from '@/hooks/useApi';

function App() {
  const projects = useProjects();
  const services = useServices();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Projects
          projects={projects.data}
          loading={projects.loading}
          error={projects.error}
        />
        <Services
          services={services.data}
          loading={services.loading}
          error={services.error}
        />
        <About />
        <Contact services={services.data} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
