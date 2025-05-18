
import { useState } from "react"
import { Search, Filter } from "lucide-react"

// Mock dictionary data
const mockDictionary = [
  { id: 1, word: "Hello", category: "Greetings", image: "/images/Hello.png" },
  { id: 2, word: "Thank you", category: "Courtesy", image: "/images/Hello.png" },
  { id: 3, word: "Please", category: "Courtesy", image: "/images/Hello.png" },
  { id: 4, word: "Yes", category: "Common", image: "/images/Hello.png" },
  { id: 5, word: "No", category: "Common", image: "/images/Hello.png" },
  { id: 6, word: "Help", category: "Emergency", image: "/images/Hello.png" },
  { id: 7, word: "Family", category: "Relationships", image: "/images/Hello.png" },
  { id: 8, word: "Friend", category: "Relationships", image: "/images/Hello.png" },
  { id: 9, word: "Food", category: "Basic Needs", image: "/images/Hello.png" },
  { id: 10, word: "Water", category: "Basic Needs", image: "/images/Hello.png" },
  { id: 11, word: "Home", category: "Places", image: "/images/Hello.png" },
  { id: 12, word: "School", category: "Places", image: "/images/Hello.png" },
]

const categories = ["All", "Greetings", "Courtesy", "Common", "Emergency", "Relationships", "Basic Needs", "Places"]

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSign, setSelectedSign] = useState(null)
  const [activeTab, setActiveTab] = useState("visual")

  const filteredSigns = mockDictionary.filter((sign) => {
    const matchesSearch = sign.word.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || sign.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sign Language Dictionary</h1>
        <p className="text-muted-foreground mb-8">
          Browse through our comprehensive collection of sign language gestures and their meanings.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Search & Filter</h3>
                <p className="text-sm text-muted-foreground">Find specific signs or browse by category</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search signs..."
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Filter className="h-4 w-4" /> Filter by Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md bg-transparent text-black border border-input px-3 py-2 text-sm "
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Results ({filteredSigns.length})</h3>
                  <div className="bg-muted rounded-lg overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto">
                      {filteredSigns.length > 0 ? (
                        <div className="divide-y divide-border">
                          {filteredSigns.map((sign) => (
                            <button
                              key={sign.id}
                              className={`w-full text-left p-3 hover:bg-accent transition-colors ${
                                selectedSign?.id === sign.id ? "bg-accent" : ""
                              }`}
                              onClick={() => setSelectedSign(sign)}
                            >
                              <div className="font-medium">{sign.word}</div>
                              <div className="text-sm text-muted-foreground">{sign.category}</div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          No signs found matching your criteria
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  {selectedSign ? selectedSign.word : "Sign Details"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedSign ? `Category: ${selectedSign.category}` : "Select a sign from the list to view details"}
                </p>
              </div>
              <div className="p-6 pt-0">
                {selectedSign ? (
                  <div>
                    <div className="flex border-b">
                      <button
                        className={`px-4 py-2 text-sm font-medium ${
                          activeTab === "visual"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setActiveTab("visual")}
                      >
                        Visual
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium ${
                          activeTab === "description"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setActiveTab("description")}
                      >
                        Description
                      </button>
                    </div>
                    <div className="mt-4">
                      {activeTab === "visual" ? (
                        <div className="bg-muted p-6 rounded-lg min-h-[400px] flex items-center justify-center">
                          <div className="relative w-[300px] h-[300px]">
                            <img
                              src={selectedSign.image || "/placeholder.svg"}
                              alt={selectedSign.word}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-muted p-6 rounded-lg min-h-[400px]">
                          <h3 className="text-lg font-medium mb-4">{selectedSign.word}</h3>
                          <p className="mb-4">
                            This is how you sign "{selectedSign.word}" in American Sign Language (ASL).
                          </p>
                          <h4 className="font-medium mt-6 mb-2">How to perform this sign:</h4>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Position your hands as shown in the image</li>
                            <li>Make the movement indicated by the arrows</li>
                            <li>Pay attention to the facial expression, which is an important part of the sign</li>
                          </ol>
                          <h4 className="font-medium mt-6 mb-2">Usage examples:</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>In casual conversation</li>
                            <li>In formal settings</li>
                            <li>Regional variations may exist</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted p-6 rounded-lg min-h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Select a sign from the list to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
