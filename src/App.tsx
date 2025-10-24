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
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import IconTest from './pages/IconTest';
import ButtonTest from './pages/ButtonTest';
import TabTest from './pages/TabTest';
import AlertTest from './pages/AlertTest';
import InputTest from './pages/InputTest';
import TextAreaTest from './pages/TextAreaTest';
import CommentTest from './pages/CommentTest';
import ColorTest from './pages/ColorTest';
import FontSizeTest from './pages/FontSizeTest';
import ProfileDropdownTest from './pages/ProfileDropdownTest';
import NavBarTest from './pages/NavBarTest';
import NotificationTest from './pages/NotificationTest';

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/icon-test" element={<IconTest />} />
        <Route path="/button-test" element={<ButtonTest />} />
        <Route path="/tab-test" element={<TabTest />} />
        <Route path="/alert-test" element={<AlertTest />} />
        <Route path="/input-test" element={<InputTest />} />
        <Route path="/textarea-test" element={<TextAreaTest />} />
        <Route path="/comment-test" element={<CommentTest />} />
        <Route path="/color-test" element={<ColorTest />} />
        <Route path="/fontsize-test" element={<FontSizeTest />} />
        <Route path="/profile-dropdown-test" element={<ProfileDropdownTest />} />
        <Route path="/navbar-test" element={<NavBarTest />} />
        <Route path="/notification-test" element={<NotificationTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

