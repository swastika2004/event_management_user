import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Layouts
import OuterLayout from '../components/layout/OuterLayout.jsx'
import InnerLayout from '../components/layout/InnerLayout.jsx'
import AdminLayout from '../components/layout/AdminLayout.jsx'

// Public Pages
import HomePage from '../pages/HomePage.jsx'
import EventsPage from '../pages/EventsPage.jsx'
import EventDetailPage from '../pages/EventDetailPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import AboutPage from '../pages/AboutPage.jsx'

// Protected User Pages
import MyBookingsPage from '../pages/MyBookingsPage.jsx'
import BookingDetailPage from '../pages/BookingDetailPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx'
import AdminEventsPage from '../pages/admin/AdminEventsPage.jsx'
import AdminBookingsPage from '../pages/admin/AdminBookingsPage.jsx'
import AdminUsersPage from '../pages/admin/AdminUsersPage.jsx'
import AdminAnalyticsPage from '../pages/admin/AdminAnalyticsPage.jsx'

function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role } = useSelector(s => s.auth)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Outer Routes */}
      <Route element={<OuterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* Authenticated / Inner Routes */}
      <Route
        element={
          <ProtectedRoute>
            <InnerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/my-bookings/:id" element={<BookingDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/events" element={<AdminEventsPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
