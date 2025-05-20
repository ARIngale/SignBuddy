

import { useState, useEffect } from "react"
import { Search, X, Download, Filter, Calendar } from "lucide-react"

export default function ViewResponses() {
  const [responses, setResponses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedForm, setSelectedForm] = useState("all")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [forms, setForms] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const mockForms = [
        { id: 1, title: "Customer Feedback" },
        { id: 2, title: "User Satisfaction" },
        { id: 3, title: "Product Survey" },
        { id: 4, title: "Website Feedback" },
      ]

      const mockResponses = [
        {
          id: 1,
          formId: 1,
          formTitle: "Customer Feedback",
          email: "user1@example.com",
          date: "2023-10-15",
          answers: { rating: 4, comment: "Great service, very satisfied!" },
          sentiment: "positive",
        },
        {
          id: 2,
          formId: 1,
          formTitle: "Customer Feedback",
          email: "user2@example.com",
          date: "2023-10-16",
          answers: { rating: 2, comment: "Service was slow and unresponsive." },
          sentiment: "negative",
        },
        {
          id: 3,
          formId: 2,
          formTitle: "User Satisfaction",
          email: "user3@example.com",
          date: "2023-10-17",
          answers: { satisfaction: 3, improvements: "Could be more intuitive." },
          sentiment: "neutral",
        },
        {
          id: 4,
          formId: 3,
          formTitle: "Product Survey",
          email: "user4@example.com",
          date: "2023-10-18",
          answers: { wouldRecommend: true, features: ["Easy to use", "Fast"] },
          sentiment: "positive",
        },
        {
          id: 5,
          formId: 4,
          formTitle: "Website Feedback",
          email: "user5@example.com",
          date: "2023-10-19",
          answers: { usability: 5, design: 4, speed: 3 },
          sentiment: "positive",
        },
      ]

      setForms(mockForms)
      setResponses(mockResponses)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleExportCSV = () => {
    alert("Export functionality would be implemented here")
  }

  const applyFilters = () => {
    setShowFilters(false)
  }

  const resetFilters = () => {
    setSelectedForm("all")
    setDateRange({ from: "", to: "" })
    setShowFilters(false)
  }

  const filteredResponses = responses.filter((response) => {
    const matchesSearch =
      response.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.formTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.stringify(response.answers).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesForm = selectedForm === "all" || response.formId.toString() === selectedForm

    let matchesDateRange = true
    if (dateRange.from) {
      matchesDateRange = matchesDateRange && response.date >= dateRange.from
    }
    if (dateRange.to) {
      matchesDateRange = matchesDateRange && response.date <= dateRange.to
    }

    return matchesSearch && matchesForm && matchesDateRange
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">View Responses</h1>
          <p className="text-gray-600 mt-1">Review feedback from your forms</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Filter className="w-5 h-5 mr-2 text-gray-500" />
            Filters
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors shadow-sm"
          >
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
          <h3 className="font-medium text-gray-800 mb-4">Filter Responses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Form</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
              >
                <option value="all">All Forms</option>
                {forms.map((form) => (
                  <option key={form.id} value={form.id.toString()}>
                    {form.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 shadow-sm"
          placeholder="Search responses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setSearchTerm("")}>
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Form Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex flex-nowrap min-w-full">
          <button
            className={`px-4 py-2 border-b-2 whitespace-nowrap ${
              selectedForm === "all"
                ? "border-indigo-600 text-indigo-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setSelectedForm("all")}
          >
            All Forms
          </button>
          {forms.map((form) => (
            <button
              key={form.id}
              className={`px-4 py-2 border-b-2 whitespace-nowrap ${
                selectedForm === form.id.toString()
                  ? "border-indigo-600 text-indigo-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setSelectedForm(form.id.toString())}
            >
              {form.title}
            </button>
          ))}
        </div>
      </div>

      {/* Responses Table */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Form
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Answers
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sentiment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResponses.length > 0 ? (
                filteredResponses.map((response) => (
                  <tr key={response.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{response.formTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{response.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{response.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {Object.entries(response.answers).map(([key, value]) => (
                          <div key={key} className="mb-1">
                            <span className="font-medium capitalize">{key}: </span>
                            {typeof value === "object"
                              ? Array.isArray(value)
                                ? value.join(", ")
                                : JSON.stringify(value)
                              : value.toString()}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          response.sentiment === "positive"
                            ? "bg-green-100 text-green-800"
                            : response.sentiment === "negative"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {response.sentiment}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No responses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
