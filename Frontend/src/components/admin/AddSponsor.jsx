
import { useState, useEffect } from "react"
import { Upload, Edit, Trash2, ExternalLink } from "lucide-react"

export default function AddSponsor() {
  const [sponsors, setSponsors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    logo: null,
  })
  const [previewUrl, setPreviewUrl] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setSponsors([
        { id: 1, name: "Acme Inc", link: "https://acme.example.com", logo: "/images/logo.png" },
        { id: 2, name: "TechCorp", link: "https://techcorp.example.com", logo: "/images/logo.png" },
        { id: 3, name: "Globex", link: "https://globex.example.com", logo: "/images/logo.png" },
        { id: 4, name: "Initech", link: "https://initech.example.com", logo: "/images/logo.png" },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, logo: file })

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  
    const logoUrl = previewUrl || "/placeholder.svg?height=80&width=200"

    if (editingId) {
      // Update existing sponsor
      setSponsors(
        sponsors.map((sponsor) =>
          sponsor.id === editingId ? { ...sponsor, name: formData.name, link: formData.link, logo: logoUrl } : sponsor,
        ),
      )
    } else {
      const newSponsor = {
        id: Date.now(),
        name: formData.name,
        link: formData.link,
        logo: logoUrl,
      }
      setSponsors([...sponsors, newSponsor])
    }

    setFormData({ name: "", link: "", logo: null })
    setPreviewUrl("")
    setEditingId(null)
  }

  const handleEdit = (sponsor) => {
    setFormData({
      name: sponsor.name,
      link: sponsor.link,
      logo: null,
    })
    setPreviewUrl(sponsor.logo)
    setEditingId(sponsor.id)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sponsor?")) {
      setSponsors(sponsors.filter((sponsor) => sponsor.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData({ name: "", link: "", logo: null })
    setPreviewUrl("")
    setEditingId(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Sponsor</h1>
        <p className="text-gray-600 mt-1">Add and manage sponsors for your platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add/Edit Sponsor Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {editingId ? "Edit Sponsor" : "Add New Sponsor"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Website/Social Link</label>
                <input
                  type="url"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="mb-3">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Logo preview"
                          className="mx-auto h-20 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl("")
                            setFormData({ ...formData, logo: null })
                          }}
                          className="mt-2 text-sm text-rose-600 hover:text-rose-500"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                {editingId && (
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  {editingId ? "Update Sponsor" : "Add Sponsor"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sponsors Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Current Sponsors</h2>

            {sponsors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No sponsors added yet</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-800">{sponsor.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(sponsor)}
                          className="text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(sponsor.id)}
                          className="text-rose-600 hover:text-rose-800 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 rounded-lg mb-3">
                      <img
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={`${sponsor.name} logo`}
                        className="max-h-16 object-contain"
                      />
                    </div>
                    <a
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline truncate flex items-center"
                    >
                      {sponsor.link}
                      <ExternalLink className="w-3 h-3 ml-1 inline" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
