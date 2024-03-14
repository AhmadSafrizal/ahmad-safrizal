import './Main.css';
import About from './about/About';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import Header from './header/Header';
import Home from './home/Home';
import { ScrollUp } from './scrollup/ScrollUp';
import Skills from './skills/Skills';
import Work from './work/Work';

function App() {
  return (
    <>
    <Header />
    <main className='main'>
      <Home />
      <About />
      <Skills />
      <Work />
      <Contact />
    </main>
    <Footer />
    <ScrollUp />
    </>
  );
}

export default App;
