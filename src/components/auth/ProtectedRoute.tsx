import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  isLoading: boolean | null;
  isAuthenticated: boolean;
  userRole?: string;
  requiredRole?: string;
  children: React.ReactNode;
}

function ProtectedRoute({
  isLoading,
  isAuthenticated,
  userRole,
  requiredRole,
  children,
}: ProtectedRouteProps) {
  if (isLoading === null || isLoading) {
    // สถานะกำลังโหลดข้อมูลหรือยังไม่มีข้อมูล
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  // ถ้ายังไม่ล็อกอิน ให้ redirect ไปหน้า login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ถ้ากำหนด requiredRole แต่ userRole ไม่ตรงกับ requiredRole ให้ redirect ไปหน้า login
  // Backend returns role as "admin" or "authenticated" (for regular users)
  if (requiredRole) {
    const normalizedUserRole = userRole?.toLowerCase();
    const normalizedRequiredRole = requiredRole.toLowerCase();
    
    // For "user" role, backend returns "authenticated", so we need to handle both
    if (normalizedRequiredRole === 'user' && normalizedUserRole === 'authenticated') {
      // Allow access for regular users
    } else if (normalizedUserRole !== normalizedRequiredRole) {
      // Role doesn't match - redirect to login
      return <Navigate to="/login" replace />;
    }
  }

  // ผู้ใช้มีการยืนยันตัวตนและมีบทบาทที่ถูกต้อง
  return <>{children}</>;
}

export default ProtectedRoute;

