import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

interface AuthenticationRouteProps {
  isLoading: boolean | null;
  isAuthenticated: boolean;
  children: React.ReactNode;
}

function AuthenticationRoute({ isLoading, isAuthenticated, children }: AuthenticationRouteProps) {
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

  if (isAuthenticated) {
    // คืนค่า null ขณะที่ Navigate ทำการเปลี่ยนเส้นทาง
    return <Navigate to="/" replace />;
  }

  // ผู้ใช้ยังไม่ล็อกอิน สามารถเข้าถึงหน้า Login/Register ได้
  return <>{children}</>;
}

export default AuthenticationRoute;

