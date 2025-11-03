import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/context/authentication';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthenticationRoute from './components/auth/AuthenticationRoute';
import NavBar from './components/ui/NavBar';
import HeroSection from './components/ui/HeroSection';
import Footer from "./components/ui/Footer";
import ArticleSection from "./components/ui/ArticleSection";
import ArticleDetail from './pages/ArticleDetail';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MemberProfile from './pages/MemberProfile';
import Notification from './pages/Notification';
import ResetPassword from './pages/ResetPassword';
import ArticleManagement from './pages/ArticleManagement';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import CategoryManagement from './pages/CategoryManagement';
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
  const { isAuthenticated, state } = useAuth();
  return (
    <div className="min-h-screen bg-brown-100">
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
        
        {/* เส้นทางที่เฉพาะผู้ที่ยังไม่ล็อกอินเข้าถึงได้ */}
        <Route
          path="/login"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <Login />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUp />
            </AuthenticationRoute>
          }
        />

        {/* เส้นทางที่เฉพาะผู้ใช้ทั่วไปที่ล็อกอินแล้วเข้าถึงได้ */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="user"
            >
              <MemberProfile />
            </ProtectedRoute>
          }
        />

        {/* เส้นทางที่เฉพาะผู้ดูแลระบบ (admin) เข้าถึงได้ */}
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reset-password"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <ArticleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles/create"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <CreateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles/edit/:id"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <EditArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <CategoryManagement />
            </ProtectedRoute>
          }
        />
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

