
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Moon, Sun, CheckCircle2, XCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple, FaGithub } from "react-icons/fa"

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      setDarkMode(event.matches)
      if (event.matches) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    })
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Check password strength
    if (name === "password") {
      let strength = 0
      if (value.length >= 8) strength += 1
      if (/[A-Z]/.test(value)) strength += 1
      if (/[0-9]/.test(value)) strength += 1
      if (/[^A-Za-z0-9]/.test(value)) strength += 1
      setPasswordStrength(strength)
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match. Please make sure your passwords match.")
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      alert("Registration successful! Your account has been created.")
    }, 1500)
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-gray-200 dark:bg-gray-700"
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-green-400"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200 dark:bg-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900/100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full  text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-200"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mr-2 shadow-lg">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              SignBuddy
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Join SignBuddy to start breaking communication barriers
          </p>
        </div>

        <div className=" rounded-2xl shadow-xl overflow-hidden  transition-all duration-200">
          <form onSubmit={handleRegisterSubmit} className="p-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-name"
                    name="name"
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm transition-colors duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                    className="block w-full pl-10 pr-3 py-3  rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm transition-colors duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    className="block w-full pl-10 pr-10 py-3  rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm transition-colors duration-200"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
                {registerData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < passwordStrength ? getPasswordStrengthColor() : "bg-gray-200 dark:bg-gray-700"
                          } transition-colors duration-200`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${
                        passwordStrength === 0
                          ? "text-gray-500 dark:text-gray-400"
                          : passwordStrength === 1
                            ? "text-red-500"
                            : passwordStrength === 2
                              ? "text-yellow-500"
                              : "text-green-500"
                      } transition-colors duration-200`}
                    >
                      {passwordStrength === 0 && "Use 8+ characters with a mix of letters, numbers & symbols"}
                      {passwordStrength === 1 && "Weak - Add numbers or symbols"}
                      {passwordStrength === 2 && "Fair - Add uppercase letters"}
                      {passwordStrength === 3 && "Good - Add special characters"}
                      {passwordStrength === 4 && "Strong password"}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm transition-colors duration-200"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
                {registerData.password && registerData.confirmPassword && (
                  <div className="mt-2 flex items-center">
                    {registerData.password === registerData.confirmPassword ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                        <p className="text-xs text-green-500">Passwords match</p>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <p className="text-xs text-red-500">Passwords don't match</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree-terms"
                  name="agreeTerms"
                  checked={registerData.agreeTerms}
                  onChange={handleRegisterChange}
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded transition-colors duration-200"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    privacy policy
                  </Link>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4  rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full "></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4  rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FcGoogle className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4  rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FaFacebook className="h-5 w-5 text-blue-600" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4  rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FaApple className="h-5 w-5 dark:text-white" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4  rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FaGithub className="h-5 w-5 dark:text-white" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 inline-flex items-center transition-colors duration-200"
            >
              Sign in
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
