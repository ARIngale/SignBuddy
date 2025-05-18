
import { useState, useEffect } from "react"
import { Mic, MicOff, RefreshCw, Play, Pause } from "lucide-react"

export default function VoiceToSign() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [signImages, setSignImages] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("animation")

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mock sign images for demonstration
  const mockSignImages = [
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ]

  // Simulate speech recognition
  useEffect(() => {
    let interval = null

    if (isListening) {
      // Simulate speech recognition with random words
      const words = ["Hello", "How", "Are", "You", "Today", "Friend", "Thank", "You"]
      interval = setInterval(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)]
        setTranscript((prev) => (prev ? `${prev} ${randomWord}` : randomWord))

        // Add a sign image for each word
        setSignImages((prev) => [...prev, mockSignImages[Math.floor(Math.random() * mockSignImages.length)]])
      }, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isListening])

  // Simulate sign animation playback
  useEffect(() => {
    let interval = null

    if (isPlaying && signImages.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          if (prev >= signImages.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, signImages])

  const toggleListening = () => {
    setIsListening(!isListening)
  }

  const resetTranslation = () => {
    setTranscript("")
    setSignImages([])
    setCurrentImageIndex(0)
    setIsPlaying(false)
  }

  const togglePlayback = () => {
    if (signImages.length === 0) return
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Voice to Sign Language Translation</h1>
        <p className="text-muted-foreground mb-6 sm:mb-8">
          Speak into your microphone to translate your voice into sign language visuals.
        </p>

        {isMobile ? (
          // Mobile layout - stacked
          <div className="space-y-6">
            {/* Voice Input */}
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Voice Input</h3>
                <p className="text-sm text-muted-foreground">Speak clearly into your microphone</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="bg-muted p-6 rounded-lg flex flex-col items-center justify-center min-h-[150px]">
                  {isListening ? (
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                      <div className="relative bg-primary rounded-full w-full h-full flex items-center justify-center">
                        <Mic className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ) : (
                    <Mic className="h-12 w-12 text-muted-foreground" />
                  )}
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    {isListening ? "Listening..." : "Click the button below to start"}
                  </p>
                </div>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={toggleListening}
                    className={`flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 ${
                      isListening
                        ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="mr-2 h-4 w-4" /> Stop
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" /> Start
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

                <div>
                  <h3 className="text-sm font-medium mb-2">Transcript</h3>
                  <div className="bg-muted p-4 rounded-lg min-h-[80px]">
                    <p>{transcript || "Your spoken words will appear here"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Language Output */}
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Sign Language Output</h3>
                <p className="text-sm text-muted-foreground">Visual representation of your spoken words</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex border-b">
                  <button
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      activeTab === "animation"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("animation")}
                  >
                    Animation
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      activeTab === "individual"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("individual")}
                  >
                    Individual Signs
                  </button>
                </div>

                {activeTab === "animation" ? (
                  <div className="bg-muted p-4 rounded-lg min-h-[250px] flex flex-col items-center justify-center">
                    {signImages.length > 0 ? (
                      <>
                        <div className="relative w-[180px] h-[180px] mb-4">
                          <img
                            src={signImages[currentImageIndex] || "/placeholder.svg"}
                            alt={`Sign ${currentImageIndex + 1}`}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={togglePlayback}
                            disabled={signImages.length === 0}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" /> Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" /> Play
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Sign language animation will appear here</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-muted p-4 rounded-lg min-h-[250px]">
                    {signImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {signImages.map((src, index) => (
                          <div key={index} className="relative aspect-square">
                            <img
                              src={src || "/placeholder.svg"}
                              alt={`Sign ${index + 1}`}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Individual signs will appear here</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout - side by side
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">Voice Input</h3>
                  <p className="text-sm text-muted-foreground">Speak clearly into your microphone</p>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div className="bg-muted p-6 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
                    {isListening ? (
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                        <div className="relative bg-primary rounded-full w-full h-full flex items-center justify-center">
                          <Mic className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <Mic className="h-16 w-16 text-muted-foreground" />
                    )}
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                      {isListening ? "Listening..." : "Click the button below to start"}
                    </p>
                  </div>

                  <div className="flex gap-4 w-full">
                    <button
                      onClick={toggleListening}
                      className={`flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 ${
                        isListening
                          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
                      }`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="mr-2 h-4 w-4" /> Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-4 w-4" /> Start Listening
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

                  <div>
                    <h3 className="text-sm font-medium mb-2">Transcript</h3>
                    <div className="bg-muted p-4 rounded-lg min-h-[100px]">
                      <p>{transcript || "Your spoken words will appear here"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">Sign Language Output</h3>
                  <p className="text-sm text-muted-foreground">Visual representation of your spoken words</p>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div className="flex border-b mb-4">
                    <button
                      className={`flex-1 px-4 py-2 text-sm font-medium ${
                        activeTab === "animation"
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveTab("animation")}
                    >
                      Animation
                    </button>
                    <button
                      className={`flex-1 px-4 py-2 text-sm font-medium ${
                        activeTab === "individual"
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveTab("individual")}
                    >
                      Individual Signs
                    </button>
                  </div>

                  {activeTab === "animation" ? (
                    <div className="bg-muted p-6 rounded-lg min-h-[300px] flex flex-col items-center justify-center">
                      {signImages.length > 0 ? (
                        <>
                          <div className="relative w-[200px] h-[200px] mb-4">
                            <img
                              src={signImages[currentImageIndex] || "/placeholder.svg"}
                              alt={`Sign ${currentImageIndex + 1}`}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={togglePlayback}
                              disabled={signImages.length === 0}
                              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              {isPlaying ? (
                                <>
                                  <Pause className="mr-2 h-4 w-4" /> Pause
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" /> Play
                                </>
                              )}
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-muted-foreground">Sign language animation will appear here</p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-muted p-4 rounded-lg min-h-[300px]">
                      {signImages.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {signImages.map((src, index) => (
                            <div key={index} className="relative aspect-square">
                              <img
                                src={src || "/placeholder.svg"}
                                alt={`Sign ${index + 1}`}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">Individual signs will appear here</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
