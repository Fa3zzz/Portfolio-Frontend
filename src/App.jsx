import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Custom components
import FloatingOrb from './components/FloatingOrb';
import GlitchText from './components/GlitchText';
// Shadcn UI / Radix UI components
import { Button } from './components/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from './components/card';
import { Badge } from './components/badge';
// Icons (lucide-react)
import { Mail, Terminal, Code, Database, ExternalLink, Calendar, Cpu, Globe, Zap } from 'lucide-react';

function App() {
  // State variables for storing the fetched data
  const [whoData, setWhoData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  
  // State for managing loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to run the fetch operation when the component mounts
  useEffect(() => {
    // Async function to handle all data fetching
    const fetchData = async () => {
      try {
        console.log('Starting data fetch...');
        
        // Fetch 'who' data from the Express backend
        console.log('Fetching who data...');
        const whoResponse = await fetch('http://localhost:3001/api/who');
        console.log('Who response:', whoResponse.status, whoResponse.statusText);
        
        if (!whoResponse.ok) {
          throw new Error(`Failed to fetch About Me data: ${whoResponse.status}`);
        }
        const whoJson = await whoResponse.json();
        console.log('Who data:', whoJson);
        setWhoData(whoJson);

        // Fetch skills data
        console.log('Fetching skills data...');
        const skillsResponse = await fetch('http://localhost:3001/api/skills');
        console.log('Skills response:', skillsResponse.status, skillsResponse.statusText);
        
        if (!skillsResponse.ok) {
          throw new Error(`Failed to fetch skills: ${skillsResponse.status}`);
        }
        const skillsJson = await skillsResponse.json();
        console.log('Skills data:', skillsJson);
        setSkillsData(skillsJson);

        // Fetch projects data
        console.log('Fetching projects data...');
        const projectResponse = await fetch('http://localhost:3001/api/projects');
        console.log('Projects response:', projectResponse.status, projectResponse.statusText);
        
        if (!projectResponse.ok) {
          throw new Error(`Failed to fetch projects: ${projectResponse.status}`);
        }
        const projectJson = await projectResponse.json();
        console.log('Projects data:', projectJson);
        setProjectData(projectJson);

        // Fetch experience data
        console.log('Fetching experience data...');
        const experienceResponse = await fetch('http://localhost:3001/api/experience');
        console.log('Experience response:', experienceResponse.status, experienceResponse.statusText);
        
        if (!experienceResponse.ok) {
          throw new Error(`Failed to fetch experience data: ${experienceResponse.status}`);
        }
        const experienceJson = await experienceResponse.json();
        console.log('Experience data:', experienceJson);
        setExperienceData(experienceJson);

        console.log('All data fetched successfully!');
      } catch (e) {
        console.error('Fetch error:', e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once

  // --- JSX Rendering Logic ---
  // Display a loading message while fetching data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-xl text-gray-700">Loading data...</div>
      </div>
    );
  }

  // Display an error message if the fetch failed
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 p-4">
        <div className="text-xl text-red-700">Error: {error}</div>
      </div>
    );
  }

  // Add null checks - don't render until all data is loaded
  if (!whoData || !experienceData || !skillsData || !projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-xl text-gray-700">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.1),transparent_30%,rgba(147,51,234,0.1),transparent_70%,rgba(59,130,246,0.1))]" />
        <FloatingOrb className="top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400 to-purple-500" delay={0} />
        <FloatingOrb className="top-60 right-32 w-24 h-24 bg-gradient-to-r from-pink-400 to-blue-500" delay={2} />
        <FloatingOrb className="bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-cyan-500" delay={4} />
        <FloatingOrb className="bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500" delay={1} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-8"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(147,51,234,0.3)",
                  "0 0 40px rgba(59,130,246,0.3)",
                  "0 0 20px rgba(147,51,234,0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-sm font-medium text-cyan-300">Available for new opportunities</span>
            </motion.div>

            <GlitchText className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              {whoData?.name || 'Loading...'}
            </GlitchText>

            <motion.div
              className="text-xl md:text-3xl text-gray-300 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {whoData?.title || 'Loading...'}
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="relative flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-full backdrop-blur-sm"
              >
                <Terminal className="w-5 h-5 mr-2" />
                View Projects
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-purple-400 to-transparent rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/30 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 group">
              <CardContent className="p-12">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                  <p className="text-lg md:text-xl leading-relaxed text-gray-300 relative z-10">
                    {whoData?.summary || 'Loading summary...'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-12">
            {experienceData?.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <Card className="max-w-2xl bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/30 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 group hover:scale-105">
                  <CardHeader className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <CardTitle className="text-xl md:text-2xl text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </CardTitle>
                      <div className="flex items-center text-purple-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{exp.years}</span>
                      </div>
                    </div>
                    <CardDescription className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {exp.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )) || <div>Loading experiences...</div>}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-green-900/50 border border-green-500/30 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillsData?.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <Badge
                        className="w-full px-6 py-4 text-base font-medium bg-gradient-to-r from-slate-700/50 to-green-800/50 border border-green-500/30 text-green-300 hover:from-green-600/50 hover:to-cyan-600/50 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-green-500/25"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Code className="w-4 h-4" />
                          {skill}
                        </div>
                      </Badge>
                    </motion.div>
                  )) || <div>Loading skills...</div>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid gap-8">
            {projectData?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-pink-900/50 border border-pink-500/30 backdrop-blur-xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 overflow-hidden">
                  <CardHeader className="relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-yellow-400" />
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl md:text-3xl text-white group-hover:text-pink-300 transition-colors flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded-lg border border-pink-500/30">
                          <Database className="w-6 h-6 text-pink-400" />
                        </div>
                        {project.title}
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-pink-500/50 text-pink-300 hover:bg-pink-500/10 backdrop-blur-sm"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )) || <div>Loading projects...</div>}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to build something extraordinary together? I'm always excited about new challenges and innovative projects.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-medium relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="relative flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  Start a Conversation
                  <Zap className="w-5 h-5 ml-3" />
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-purple-500/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              © 2025 {whoData?.name || 'Loading...'}. Crafted with precision & passion.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <Globe className="w-4 h-4" />
                Open to remote opportunities
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;