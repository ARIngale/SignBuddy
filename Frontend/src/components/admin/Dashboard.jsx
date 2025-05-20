
import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Users, FileText, MessageSquare, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalForms: 0,
    totalResponses: 0,
    recentActivity: [],
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 245,
        totalForms: 18,
        totalResponses: 1243,
        recentActivity: [
          { date: "Mon", responses: 12 },
          { date: "Tue", responses: 19 },
          { date: "Wed", responses: 15 },
          { date: "Thu", responses: 25 },
          { date: "Fri", responses: 32 },
          { date: "Sat", responses: 18 },
          { date: "Sun", responses: 14 },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const sentimentData = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ]

  const COLORS = ["#6366f1", "#94a3b8", "#f87171"]

  const formTypeData = [
    { name: "Feedback", count: 8 },
    { name: "Survey", count: 5 },
    { name: "Contact", count: 3 },
    { name: "Other", count: 2 },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100 hover:shadow-md transition-shadow">
          <div className="rounded-full bg-indigo-100 p-3 mr-4">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-800 mr-2">{stats.totalUsers}</h3>
              <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                12%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100 hover:shadow-md transition-shadow">
          <div className="rounded-full bg-emerald-100 p-3 mr-4">
            <FileText className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Forms</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-800 mr-2">{stats.totalForms}</h3>
              <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                8%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100 hover:shadow-md transition-shadow">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Responses</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-800 mr-2">{stats.totalResponses}</h3>
              <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                24%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100 hover:shadow-md transition-shadow">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <TrendingUp className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Response Rate</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-800 mr-2">12.5%</h3>
              <span className="text-xs font-medium text-red-600 flex items-center bg-red-50 px-1.5 py-0.5 rounded">
                <ArrowDown className="h-3 w-3 mr-0.5" />
                3%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.recentActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="responses"
                  stroke="#6366f1"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Sentiment Breakdown</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Form Types */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Form Types</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
