import { useState, useRef, useEffect } from "react"
import { Volume2, Pause, Play, RefreshCw } from "lucide-react"

export default function SignToVoice() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [predictedSign, setPredictedSign] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const videoRef = useRef(null)
  const [hasPermission, setHasPermission] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("text")

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const mockSigns = ["Hello", "Thank you", "Please", "Help", "Yes", "No", "Good", "Bad"]

  useEffect(() => {
    let interval = null

    if (isStreaming) {
      // Simulate sign detection with random signs
      interval = setInterval(() => {
        const randomSign = mockSigns[Math.floor(Math.random() * mockSigns.length)]
        setPredictedSign(randomSign)
        setTranslatedText((prev) => (prev ? `${prev} ${randomSign}` : randomSign))
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isStreaming])

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setHasPermission(true)
      setIsStreaming(true)
    } catch (error) {
      console.error("Error accessing webcam:", error)
      setHasPermission(false)
    }
  }

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }

  const toggleWebcam = () => {
    if (isStreaming) {
      stopWebcam()
    } else {
      startWebcam()
    }
  }

  const resetTranslation = () => {
    setTranslatedText("")
    setPredictedSign("")
  }

  const speakText = () => {
    if (translatedText && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Sign Language to Voice Translation</h1>
        <p className="text-muted-foreground mb-6 sm:mb-8">
          Use your webcam to translate sign language gestures into text and voice in real-time.
        </p>

        {isMobile ? (
          // Mobile layout - stacked
          <div className="space-y-6">
            {/* Webcam Feed */}
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Webcam Feed</h3>
                <p className="text-sm text-muted-foreground">
                  Position yourself in frame and make sign gestures clearly
                </p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                  {!isStreaming && !hasPermission && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground">Webcam feed will appear here</p>
                    </div>
                  )}
                  {hasPermission === false && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-destructive">Camera permission denied</p>
                    </div>
                  )}
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={toggleWebcam}
                    className={`flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 ${
                      isStreaming
                        ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
                    }`}
                  >
                    {isStreaming ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" /> Stop
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" /> Start
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetTranslation}
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring h-10"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Current Sign */}
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Current Sign</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="bg-muted p-4 rounded-lg min-h-12 flex items-center justify-center">
                  <p className="text-xl font-semibold">{predictedSign || "No sign detected"}</p>
                </div>
              </div>
            </div>

            {/* Translation Output */}
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Translation Output</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex border-b">
                  <button
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      activeTab === "text"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("text")}
                  >
                    Text
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      activeTab === "voice"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("voice")}
                  >
                    Voice
                  </button>
                </div>

                {activeTab === "text" ? (
                  <div className="bg-muted p-4 rounded-lg min-h-[150px]">
                    <p>{translatedText || "Translated text will appear here"}</p>
                  </div>
                ) : (
                  <div className="bg-muted p-4 rounded-lg min-h-[150px] flex flex-col items-center justify-center">
                    <button
                      onClick={speakText}
                      disabled={!translatedText}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 gap-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Volume2 className="h-5 w-5" />
                      Speak Text
                    </button>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Click to hear the translated text spoken aloud
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout - side by side
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">Webcam Feed</h3>
                  <p className="text-sm text-muted-foreground">
                    Position yourself in frame and make sign gestures clearly
                  </p>
                </div>
                <div className="p-6 pt-0 flex flex-col items-center">
                  <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    {!isStreaming && !hasPermission && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Webcam feed will appear here</p>
                      </div>
                    )}
                    {hasPermission === false && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-destructive">Camera permission denied</p>
                      </div>
                    )}
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-4 w-full">
                    <button
                      onClick={toggleWebcam}
                      className={`flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 ${
                        isStreaming
                          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
                      }`}
                    >
                      {isStreaming ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" /> Stop Camera
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Start Camera
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetTranslation}
                      className="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring h-10"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">Translation Output</h3>
                  <p className="text-sm text-muted-foreground">Detected signs will appear here</p>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Current Sign</h3>
                    <div className="bg-muted p-4 rounded-lg min-h-12 flex items-center justify-center">
                      <p className="text-xl font-semibold">{predictedSign || "No sign detected"}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex border-b mb-4">
                      <button
                        className={`flex-1 px-4 py-2 text-sm font-medium ${
                          activeTab === "text"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setActiveTab("text")}
                      >
                        Text
                      </button>
                      <button
                        className={`flex-1 px-4 py-2 text-sm font-medium ${
                          activeTab === "voice"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setActiveTab("voice")}
                      >
                        Voice
                      </button>
                    </div>

                    {activeTab === "text" ? (
                      <div className="bg-muted p-4 rounded-lg min-h-[200px]">
                        <p>{translatedText || "Translated text will appear here"}</p>
                      </div>
                    ) : (
                      <div className="bg-muted p-4 rounded-lg min-h-[200px] flex flex-col items-center justify-center">
                        <button
                          onClick={speakText}
                          disabled={!translatedText}
                          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 gap-2 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <Volume2 className="h-5 w-5" />
                          Speak Text
                        </button>
                        <p className="text-sm text-muted-foreground mt-4">
                          Click to hear the translated text spoken aloud
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
