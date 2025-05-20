
import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Award,
  UserPlus,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"

import Dashboard from "./Dashboard"
import ViewResponses from "./ViewResponses"
import AddSponsor from "./AddSponsor"
import AddContributors from "./AddContributors"
import AdminSettings from "./AdminSettings"

export default function AdminPanel() {
  const [currentUser, setCurrentUser] = useState({
    displayName: "Admin User",
    email: "admin@example.com",
    photoURL: "images/man.png",
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser({
        displayName: "Admin",
        email: "admin@example.com",
        photoURL: "/images/man.png",
      })
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    navigate("/login")
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { id: "view-responses", label: "View Responses", icon: MessageSquare, path: "/admin/responses" },
    { id: "add-sponsor", label: "Add Sponsor", icon: Award, path: "/admin/sponsors" },
    { id: "add-contributors", label: "Add Contributors", icon: UserPlus, path: "/admin/contributors" },
    { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
  ]

  const getActiveMenuItem = () => {
    const path = location.pathname
    const activeItem = menuItems.find((item) => {
      if (item.path === "/admin" && path === "/admin") {
        return true
      }
      return path.startsWith(item.path) && item.path !== "/admin"
    })
    return activeItem?.id || "dashboard"
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your platform</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(item.path)
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false)
                      }
                    }}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                      getActiveMenuItem() === item.id
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${getActiveMenuItem() === item.id ? "text-indigo-600" : ""}`} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Admin Info & Logout */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL ||  "/images/man.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || "A"}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{currentUser?.displayName || currentUser?.email}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2 text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : ""}`}>
        <div className="h-full overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/responses" element={<ViewResponses />} />
            <Route path="/sponsors" element={<AddSponsor />} />
            <Route path="/contributors" element={<AddContributors />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
