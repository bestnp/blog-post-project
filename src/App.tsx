import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavBar from './components/ui/NavBar';
import HeroSection from './components/ui/HeroSection';
import Footer from "./components/ui/Footer";
import ArticleSection from "./components/ui/ArticleSection";
import ArticleDetail from './pages/ArticleDetail';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import IconTest from './pages/IconTest';

function App() {
  return (
    <div className="min-h-screen bg-brown-100">
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />
            <HeroSection />
            <ArticleSection />
            <Footer />
          </>
        } />
        <Route path="/post/:postId" element={<ArticleDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/icon-test" element={<IconTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

