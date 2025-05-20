import { useState, useEffect } from "react"
import { Upload, Edit, Trash2, Github, Linkedin } from "lucide-react"

export default function AddContributors() {
  const [contributors, setContributors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    github: "",
    linkedin: "",
    photo: null,
  })
  const [previewUrl, setPreviewUrl] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setContributors([
        {
          id: 1,
          name: "Alex Johnson",
          role: "Lead Developer",
          github: "https://github.com/alexj",
          linkedin: "https://linkedin.com/in/alexj",
          photo: "/images/man.png",
        },
        {
          id: 2,
          name: "Sam Wilson",
          role: "UI/UX Designer",
          github: "https://github.com/samw",
          linkedin: "https://linkedin.com/in/samw",
          photo:"/images/man.png",
        },
        {
          id: 3,
          name: "Taylor Smith",
          role: "Backend Developer",
          github: "https://github.com/taylors",
          linkedin: "https://linkedin.com/in/taylors",
          photo:"/images/man.png",
        },
        {
          id: 4,
          name: "Jordan Lee",
          role: "QA Engineer",
          github: "https://github.com/jordanl",
          linkedin: "https://linkedin.com/in/jordanl",
          photo:"/images/man.png",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, photo: file })

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    const photoUrl = previewUrl || "/placeholder.svg?height=100&width=100"

    if (editingId) {
      setContributors(
        contributors.map((contributor) =>
          contributor.id === editingId
            ? {
                ...contributor,
                name: formData.name,
                role: formData.role,
                github: formData.github,
                linkedin: formData.linkedin,
                photo: photoUrl,
              }
            : contributor,
        ),
      )
    } else {
      const newContributor = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        github: formData.github,
        linkedin: formData.linkedin,
        photo: photoUrl,
      }
      setContributors([...contributors, newContributor])
    }

    setFormData({ name: "", role: "", github: "", linkedin: "", photo: null })
    setPreviewUrl("")
    setEditingId(null)
  }

  const handleEdit = (contributor) => {
    setFormData({
      name: contributor.name,
      role: contributor.role,
      github: contributor.github,
      linkedin: contributor.linkedin,
      photo: null,
    })
    setPreviewUrl(contributor.photo)
    setEditingId(contributor.id)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contributor?")) {
      setContributors(contributors.filter((contributor) => contributor.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData({ name: "", role: "", github: "", linkedin: "", photo: null })
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
        <h1 className="text-2xl font-bold text-gray-800">Add Contributors</h1>
        <p className="text-gray-600 mt-1">Add and manage contributors to your platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add/Edit Contributor Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {editingId ? "Edit Contributor" : "Add New Contributor"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL (optional)</label>
                <input
                  type="url"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL (optional)</label>
                <input
                  type="url"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="mb-3">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Profile preview"
                          className="mx-auto h-24 w-24 rounded-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl("")
                            setFormData({ ...formData, photo: null })
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
                  {editingId ? "Update Contributor" : "Add Contributor"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contributors Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Current Contributors</h2>

            {contributors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No contributors added yet</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contributors.map((contributor) => (
                  <div
                    key={contributor.id}
                    className="border border-gray-200 rounded-lg p-6 flex flex-col items-center relative hover:shadow-sm transition-shadow"
                  >
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(contributor)}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(contributor.id)}
                        className="text-rose-600 hover:text-rose-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <img
                      src={contributor.photo || "/placeholder.svg"}
                      alt={contributor.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-100"
                    />

                    <h3 className="font-semibold text-lg text-gray-800">{contributor.name}</h3>
                    <p className="text-gray-600 mb-4">{contributor.role}</p>

                    <div className="flex space-x-3">
                      {contributor.github && (
                        <a
                          href={contributor.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}

                      {contributor.linkedin && (
                        <a
                          href={contributor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
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
