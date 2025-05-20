
import { useState, useRef, useEffect } from "react"
import { Volume2, Pause, Play, RefreshCw, Loader2, MessageSquare, Mic } from 'lucide-react'
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { ModelAdapter } from "./model-adapter.jsx"

export default function SignToVoice() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [predictedSigns, setPredictedSigns] = useState([])
  const [translatedText, setTranslatedText] = useState("")
  const [hasPermission, setHasPermission] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("text")
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [error, setError] = useState("")
  const [promptInput, setPromptInput] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState({ handpose: false, signModel: false })

  const videoRef = useRef(null)
  const modelRef = useRef(null)
  const handposeModelRef = useRef(null)
  const animationRef = useRef(null)

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Set backend to WebGL for better performance
        await tf.setBackend("webgl")

        // Load handpose model first
        console.log("Loading handpose model...")
        setLoadingProgress(prev => ({ ...prev, handpose: true }))
        handposeModelRef.current = await handpose.load()
        console.log("Handpose model loaded successfully")
        setLoadingProgress(prev => ({ ...prev, handpose: false }))

        // Load the sign language model
        console.log("Loading sign language model...")
        setLoadingProgress(prev => ({ ...prev, signModel: true }))
        try {
          // First attempt: Try loading with explicit input shape
          const modelConfig = {
            inputShape: [63], // 21 landmarks × 3 coordinates (x, y, z)
          }
          const loadedModel = await tf.loadLayersModel("/model/model.json", modelConfig)
          modelRef.current = loadedModel
          console.log("Sign language model loaded successfully with explicit shape")
        } catch (modelError) {
          console.warn("Could not load model with explicit shape, trying adapter approach:", modelError)

          // Second attempt: Load model without shape and use adapter
          const loadedModel = await tf.loadLayersModel("/model/model.json")

          // Use ModelAdapter to ensure proper input shape
          modelRef.current = await ModelAdapter.ensureModelInputShape(loadedModel)
          console.log("Sign language model loaded and configured with adapter")
        }
        setLoadingProgress(prev => ({ ...prev, signModel: false }))
        setIsModelLoaded(true)
      } catch (error) {
        console.error("Error loading models:", error)
        setError(`Failed to load models: ${error.message}`)
        setLoadingProgress({ handpose: false, signModel: false })
      }
    }

    loadModel()
  }, [])

  // Process video frames and detect signs
  const detectSigns = async () => {
    if (!isStreaming || !videoRef.current || !modelRef.current || !handposeModelRef.current) {
      return
    }

    try {
      // Get hand landmarks using handpose
      const predictions = await handposeModelRef.current.estimateHands(videoRef.current)

      console.log("Hand predictions:", predictions)

      if (predictions.length > 0) {
        // Use ModelAdapter to preprocess landmarks for model input
        const inputTensor = ModelAdapter.preprocessLandmarks(predictions[0].landmarks)

        console.log("Input shape:", inputTensor.shape);


        // Get prediction from model
        const prediction = await modelRef.current.predict(inputTensor)
        const classIndex = prediction.argMax(1).dataSync()[0]

        // Map class index to sign label (replace with your actual labels)
        const signLabels = ["hello"]

        const predictedSign = signLabels[classIndex] || "unknown"

        console.log("Hand predictions sign:", predictedSign)


        // Add to predicted signs array
        setPredictedSigns((prev) => [...prev, predictedSign])

        // Dispose tensors to prevent memory leaks
        inputTensor.dispose()
        prediction.dispose()
      }

      // Continue detection loop
      animationRef.current = requestAnimationFrame(detectSigns)
    } catch (error) {
      console.error("Error in sign detection:", error)
      setError(`Detection error: ${error.message}`)
      // Continue the loop even if there's an error
      animationRef.current = requestAnimationFrame(detectSigns)
    }
  }

  // Convert sequence of signs to proper sentence using Gemini
  const convertToSentence = async (signs) => {
    if (!signs || signs.length === 0) return ""
    
    setIsTranslating(true)
    
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const prompt = `
        You are a sign language translation assistant specialized in converting sequences of sign language words into grammatically correct English sentences.
        
        Convert the following sequence of sign language words into a proper English sentence:
        Sign Language Words: ${signs.join(" ")}
        
        Just return the corrected sentence without any explanations or additional text.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text().trim()
      
      setIsTranslating(false)
      return text
    } catch (error) {
      console.error("Error with Gemini API:", error)
      setError("Failed to convert signs to sentence")
      setIsTranslating(false)
      return signs.join(" ")
    }
  }

  // Start webcam
  const startWebcam = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
        }
      }

      setHasPermission(true)
      setIsStreaming(true)
      setError("")

      // Start detection loop
      animationRef.current = requestAnimationFrame(detectSigns)
    } catch (error) {
      console.error("Error accessing webcam:", error)
      setHasPermission(false)
      setError(`Camera access denied: ${error.message}`)
    }
  }

  // Stop webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    setIsStreaming(false)
  }

  // Toggle webcam
  const toggleWebcam = () => {
    if (isStreaming) {
      stopWebcam()
    } else {
      startWebcam()
    }
  }

  // Reset translation
  const resetTranslation = () => {
    setPredictedSigns([])
    setTranslatedText("")
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  // Generate sentence from signs and speak it
  const generateAndSpeak = async () => {
    if (predictedSigns.length === 0) return

    // Convert signs to sentence
    const sentence = await convertToSentence(predictedSigns)
    setTranslatedText(sentence)

    // Speak the sentence
    if (sentence && "speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(sentence)
      
      utterance.onend = () => {
        setIsSpeaking(false)
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
        setError("Speech synthesis failed")
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Generate sentence from signs using custom prompt
  const generateWithPrompt = async () => {
    if (predictedSigns.length === 0) return
    
    setIsTranslating(true)

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const customPrompt = `
        You are a sign language translation assistant.
        
        Convert the following sequence of sign language words into a proper English sentence,
        following this instruction: ${promptInput || "Make a complete, grammatically correct sentence"}
        
        Sign Language Words: ${predictedSigns.join(" ")}
        
        Just return the corrected sentence without any explanations or additional text.
      `

      const result = await model.generateContent(customPrompt)
      const response = await result.response
      const text = response.text().trim()

      setTranslatedText(text)
      setIsTranslating(false)

      // Speak the sentence if in voice tab
      if (activeTab === "voice" && text && "speechSynthesis" in window) {
        setIsSpeaking(true)
        const utterance = new SpeechSynthesisUtterance(text)
        
        utterance.onend = () => {
          setIsSpeaking(false)
        }
        
        utterance.onerror = () => {
          setIsSpeaking(false)
          setError("Speech synthesis failed")
        }
        
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error("Error with Gemini API:", error)
      setError("Failed to convert signs to sentence with prompt")
      setIsTranslating(false)
    }
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Sign Language to Voice Translation</h1>
        <p className="text-muted-foreground mb-6 sm:mb-8">
          Use your webcam to translate sign language gestures into text and voice in real-time.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
            <button 
              onClick={() => setError("")} 
              className="ml-auto text-red-700 hover:text-red-900"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {!isModelLoaded && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center mb-2">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              <span className="font-medium">Loading models...</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm w-32">Handpose Model:</span>
                <div className="w-full bg-amber-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${loadingProgress.handpose ? 'bg-amber-600 animate-pulse' : 'bg-green-500'}`} 
                    style={{ width: loadingProgress.handpose ? '60%' : '100%' }}
                  ></div>
                </div>
                <span className="ml-2 text-xs">{loadingProgress.handpose ? 'Loading...' : 'Complete'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm w-32">Sign Model:</span>
                <div className="w-full bg-amber-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${loadingProgress.signModel ? 'bg-amber-600 animate-pulse' : 'bg-green-500'}`} 
                    style={{ width: loadingProgress.signModel ? '40%' : '100%' }}
                  ></div>
                </div>
                <span className="ml-2 text-xs">{loadingProgress.signModel ? 'Loading...' : 'Complete'}</span>
              </div>
            </div>
          </div>
        )}

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
                    disabled={!isModelLoaded}
                    className={`flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 ${
                      isStreaming
                        ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
                    } ${!isModelLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
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

            {/* Current Signs */}
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Detected Signs</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="bg-muted p-4 rounded-lg min-h-12">
                  {predictedSigns.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {predictedSigns.map((sign, index) => (
                        <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                          {sign}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No signs detected yet</p>
                  )}
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
                    <MessageSquare className="h-4 w-4 inline mr-1" />
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
                    <Mic className="h-4 w-4 inline mr-1" />
                    Voice
                  </button>
                </div>

                {activeTab === "text" ? (
                  <div className="bg-muted p-4 rounded-lg min-h-[150px]">
                    {isTranslating ? (
                      <div className="flex items-center justify-center h-20">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <p>Translating signs to text...</p>
                      </div>
                    ) : (
                      <div className="min-h-[100px]">
                        {translatedText ? (
                          <p className="text-lg">{translatedText}</p>
                        ) : (
                          <p className="text-muted-foreground">Translated text will appear here</p>
                        )}
                      </div>
                    )}
                    
                    {predictedSigns.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <div className="flex flex-col space-y-2">
                          <input
                            type="text"
                            value={promptInput}
                            onChange={(e) => setPromptInput(e.target.value)}
                            placeholder="Enter prompt for sentence completion..."
                            className="w-full px-3 py-2 border rounded-md text-sm"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={generateAndSpeak}
                              disabled={isTranslating}
                              className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isTranslating ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Translating...
                                </>
                              ) : (
                                <>Generate Sentence</>
                              )}
                            </button>
                            <button
                              onClick={generateWithPrompt}
                              disabled={isTranslating}
                              className="flex-1 inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isTranslating ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...
                                </>
                              ) : (
                                <>Complete Sentence</>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-muted p-4 rounded-lg min-h-[150px] flex flex-col items-center justify-center">
                    <div className="space-y-4 w-full">
                      {isSpeaking ? (
                        <div className="mb-4">
                          <div className="flex justify-center mb-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-1 h-8 bg-primary rounded-full animate-sound-wave"></div>
                              <div className="w-1 h-12 bg-primary rounded-full animate-sound-wave animation-delay-200"></div>
                              <div className="w-1 h-10 bg-primary rounded-full animate-sound-wave animation-delay-400"></div>
                              <div className="w-1 h-16 bg-primary rounded-full animate-sound-wave animation-delay-600"></div>
                              <div className="w-1 h-10 bg-primary rounded-full animate-sound-wave animation-delay-400"></div>
                              <div className="w-1 h-12 bg-primary rounded-full animate-sound-wave animation-delay-200"></div>
                              <div className="w-1 h-8 bg-primary rounded-full animate-sound-wave"></div>
                            </div>
                          </div>
                          <p className="text-center text-sm mb-4">Speaking: "{translatedText}"</p>
                          <button
                            onClick={stopSpeaking}
                            className="w-full inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive h-10 gap-2"
                          >
                            <Pause className="h-4 w-4" />
                            Stop Speaking
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={generateAndSpeak}
                            disabled={predictedSigns.length === 0 || isTranslating}
                            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 gap-2 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            {isTranslating ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Translating...
                              </>
                            ) : (
                              <>
                                <Volume2 className="h-5 w-5" /> Generate & Speak
                              </>
                            )}
                          </button>
                          <button
                            onClick={generateWithPrompt}
                            disabled={predictedSigns.length === 0 || isTranslating}
                            className="w-full inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 h-10 gap-2 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            {isTranslating ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                              </>
                            ) : (
                              <>
                                <Volume2 className="h-5 w-5" /> Complete & Speak
                              </>
                            )}
                          </button>
                        </>
                      )}
                      <p className="text-sm text-muted-foreground text-center">
                        {predictedSigns.length === 0 
                          ? "Detect signs first to convert to speech" 
                          : "Click to convert detected signs to speech"}
                      </p>
                    </div>
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
                      disabled={!isModelLoaded}
                      className={`flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 ${
                        isStreaming
                          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
                      } ${!isModelLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
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
                    <h3 className="text-sm font-medium mb-2">Detected Signs</h3>
                    <div className="bg-muted p-4 rounded-lg min-h-12">
                      {predictedSigns.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {predictedSigns.map((sign, index) => (
                            <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                              {sign}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No signs detected yet</p>
                      )}
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
                        <MessageSquare className="h-4 w-4 inline mr-1" />
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
                        <Mic className="h-4 w-4 inline mr-1" />
                        Voice
                      </button>
                    </div>

                    {activeTab === "text" ? (
                      <div className="bg-muted p-4 rounded-lg min-h-[200px]">
                        {isTranslating ? (
                          <div className="flex items-center justify-center h-20">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            <p>Translating signs to text...</p>
                          </div>
                        ) : (
                          <div className="min-h-[100px]">
                            {translatedText ? (
                              <p className="text-lg">{translatedText}</p>
                            ) : (
                              <p className="text-muted-foreground">Translated text will appear here</p>
                            )}
                          </div>
                        )}
                        
                        {predictedSigns.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <div className="flex flex-col space-y-2">
                              <input
                                type="text"
                                value={promptInput}
                                onChange={(e) => setPromptInput(e.target.value)}
                                placeholder="Enter prompt for sentence completion..."
                                className="w-full px-3 py-2 border rounded-md text-sm"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={generateAndSpeak}
                                  disabled={isTranslating}
                                  className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isTranslating ? (
                                    <>
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Translating...
                                    </>
                                  ) : (
                                    <>Generate Sentence</>
                                  )}
                                </button>
                                <button
                                  onClick={generateWithPrompt}
                                  disabled={isTranslating}
                                  className="flex-1 inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isTranslating ? (
                                    <>
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...
                                    </>
                                  ) : (
                                    <>Complete Sentence</>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-muted p-4 rounded-lg min-h-[200px] flex flex-col items-center justify-center">
                        <div className="space-y-4 w-full">
                          {isSpeaking ? (
                            <div className="mb-4">
                              <div className="flex justify-center mb-2">
                                <div className="flex items-center space-x-1">
                                  <div className="w-1 h-8 bg-primary rounded-full animate-sound-wave"></div>
                                  <div className="w-1 h-12 bg-primary rounded-full animate-sound-wave animation-delay-200"></div>
                                  <div className="w-1 h-10 bg-primary rounded-full animate-sound-wave animation-delay-400"></div>
                                  <div className="w-1 h-16 bg-primary rounded-full animate-sound-wave animation-delay-600"></div>
                                  <div className="w-1 h-10 bg-primary rounded-full animate-sound-wave animation-delay-400"></div>
                                  <div className="w-1 h-12 bg-primary rounded-full animate-sound-wave animation-delay-200"></div>
                                  <div className="w-1 h-8 bg-primary rounded-full animate-sound-wave"></div>
                                </div>
                              </div>
                              <p className="text-center text-sm mb-4">Speaking: "{translatedText}"</p>
                              <button
                                onClick={stopSpeaking}
                                className="w-full inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive h-10 gap-2"
                              >
                                <Pause className="h-4 w-4" />
                                Stop Speaking
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={generateAndSpeak}
                                disabled={predictedSigns.length === 0 || isTranslating}
                                className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10 gap-2 disabled:opacity-50 disabled:pointer-events-none"
                              >
                                {isTranslating ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" /> Translating...
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="h-5 w-5" /> Generate & Speak
                                  </>
                                )}
                              </button>
                              <button
                                onClick={generateWithPrompt}
                                disabled={predictedSigns.length === 0 || isTranslating}
                                className="w-full inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 h-10 gap-2 disabled:opacity-50 disabled:pointer-events-none"
                              >
                                {isTranslating ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="h-5 w-5" /> Complete & Speak
                                  </>
                                )}
                              </button>
                            </>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {predictedSigns.length === 0 
                              ? "Detect signs first to convert to speech" 
                              : "Click to convert detected signs to speech"}
                          </p>
                        </div>
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
