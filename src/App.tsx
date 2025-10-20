import "./App.css";
import NavBar from './components/ui/NavBar';
import HeroSection from './components/ui/HeroSection';
import Footer from "./components/ui/Footer";
import ArticleSection from "./components/ui/ArticleSection";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
}

export default App;

