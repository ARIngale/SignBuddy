
import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, RefreshCw, Play, Pause } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function VoiceToSign() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [signImages, setSignImages] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("animation")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  // Speech recognition reference
  const recognitionRef = useRef(null)
  const animationRef = useRef(null)

  // Replace with your actual API key
  const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"

  // Sign language dictionary - maps words to sign images
  // In a real application, this would be a comprehensive database
  const signDictionary = {
    hello: "/signs/hello.png",
    hi: "/signs/hello.png",
    how: "/signs/how.png",
    are: "/signs/are.png",
    you: "/signs/you.png",
    thank: "/signs/thank.png",
    thanks: "/signs/thank.png",
    good: "/signs/good.png",
    bad: "/signs/bad.png",
    yes: "/signs/yes.png",
    no: "/signs/no.png",
    please: "/signs/please.png",
    sorry: "/signs/sorry.png",
    help: "/signs/help.png",
    want: "/signs/want.png",
    need: "/signs/need.png",
    // Add more sign mappings as needed
  }

  // For words not in our dictionary, we'll use placeholder images
  const placeholderSigns = [
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ]

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Browser compatibility for SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()

        if (recognitionRef.current) {
          recognitionRef.current.continuous = true
          recognitionRef.current.interimResults = true
          recognitionRef.current.lang = "en-US"

          recognitionRef.current.onresult = (event) => {
            let interimTranscript = ""
            let finalTranscript = ""

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript
              if (event.results[i].isFinal) {
                finalTranscript += transcript
              } else {
                interimTranscript += transcript
              }
            }

            if (finalTranscript) {
              setTranscript((prev) => {
                const newTranscript = prev ? `${prev} ${finalTranscript}` : finalTranscript
                processTranscriptToSigns(finalTranscript)
                return newTranscript
              })
            }
          }

          recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error", event.error)
            setError(`Speech recognition error: ${event.error}`)
            setIsListening(false)
          }
        }
      } else {
        setError("Speech recognition is not supported in this browser")
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Process transcript to sign images using simple word mapping
  const processTranscriptToSigns = async (text) => {
    setIsProcessing(true)
    try {
      // Clean and normalize the text
      const words = text.toLowerCase().trim().split(/\s+/)

      // Map words to sign images
      const newSignImages = words.map((word) => {
        // Remove punctuation
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")

        // Check if we have this word in our dictionary
        if (signDictionary[cleanWord]) {
          return signDictionary[cleanWord]
        }

        // If not in dictionary, use a placeholder
        return placeholderSigns[Math.floor(Math.random() * placeholderSigns.length)]
      })

      setSignImages((prev) => [...prev, ...newSignImages])
    } catch (error) {
      console.error("Error processing transcript:", error)
      setError("Error processing speech to signs")
    } finally {
      setIsProcessing(false)
    }
  }

  // Process transcript to sign images using Gemini for more context-aware translation
  const processWithGemini = async (text) => {
    setIsProcessing(true)
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const prompt = `
        You are a sign language translation assistant.
        Convert the following English text into a sequence of individual sign language words.
        Only return the list of signs needed, one per line:
        
        English: ${text}
        Sign Language Sequence:
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const signSequence = response.text().trim().split("\n")

      // Process the sign sequence to images
      const newSignImages = signSequence.map((sign) => {
        const cleanSign = sign.toLowerCase().trim()
        if (signDictionary[cleanSign]) {
          return signDictionary[cleanSign]
        }
        return placeholderSigns[Math.floor(Math.random() * placeholderSigns.length)]
      })

      setSignImages((prev) => [...prev, ...newSignImages])
    } catch (error) {
      console.error("Error with Gemini API:", error)
      setError("Error processing with AI")

      // Fallback to simple word mapping
      processTranscriptToSigns(text)
    } finally {
      setIsProcessing(false)
    }
  }

  // Simulate sign animation playback
  useEffect(() => {
    if (isPlaying && signImages.length > 0) {
      animationRef.current = setInterval(() => {
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
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isPlaying, signImages])

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setError("")
        setIsListening(true)
      } else {
        setError("Speech recognition is not available")
      }
    }
  }

  const resetTranslation = () => {
    setTranscript("")
    setSignImages([])
    setCurrentImageIndex(0)
    setIsPlaying(false)
    setError("")
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

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

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
                    {isProcessing && <p className="text-sm text-muted-foreground mt-2">Processing...</p>}
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
                            src={signImages[currentImageIndex] || "/placeholder.svg?height=200&width=200"}
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
                              src={src || "/placeholder.svg?height=200&width=200"}
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
                      {isProcessing && <p className="text-sm text-muted-foreground mt-2">Processing...</p>}
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
                              src={signImages[currentImageIndex] || "/placeholder.svg?height=200&width=200"}
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
                                src={src || "/placeholder.svg?height=200&width=200"}
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
