import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Dictionary from "./components/Dictionary"
import HowToContribute from "./components/HowToContribute"
import Login from "./components/Login"
import SignToVoice from "./components/SignToVoice"
import VoiceToSign from "./components/VoiceToSign"
import NotFound from "./components/Notfound"
import AdminPanel from "./components/admin/AdminPanel"
import "./index.css"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dictionary" element={<Dictionary />} />
                  <Route path="/how-to-contribute" element={<HowToContribute />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/sign-to-voice" element={<SignToVoice />} />
                  <Route path="/voice-to-sign" element={<VoiceToSign />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  )
}
