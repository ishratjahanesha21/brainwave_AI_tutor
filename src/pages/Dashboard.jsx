import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Book, CheckCircle } from "lucide-react";
import { useAuth } from "../hook/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    points: 0,
    streak: 0,
    totalCourses: 0,
    completedCourses: 0,
  });

  // Fetch user data and course info
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [enrolledRes, statsRes] = await Promise.all([
          fetch("http://localhost:3002/api/courses/enrolled"),
          fetch("http://localhost:3002/api/courses/stats"),
        ]);

        const enrolledData = await enrolledRes.json();
        const statsData = await statsRes.json();

        setEnrolledCourses(enrolledData.enrolledCourses || []);
        setStats(statsData || {});
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-12">
      <div className="max-w-6xl mx-auto text-white">
        {/* User Profile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name || "Developer"} 👋
            </h1>
            <p className="text-gray-300 text-sm">{user?.email}</p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <div className="bg-white/10 px-4 py-2 rounded-lg text-center">
              <p className="text-lg font-semibold text-yellow-400">
                ⭐ {stats.points}
              </p>
              <p className="text-gray-400 text-xs">Points</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg text-center">
              <p className="text-lg font-semibold text-orange-400">
                🔥 {stats.streak}
              </p>
              <p className="text-gray-400 text-xs">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 p-6 rounded-xl flex items-center gap-4">
            <Book className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-xl font-semibold">{stats.totalCourses}</h3>
              <p className="text-gray-400 text-sm">Total Enrolled</p>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-xl flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-xl font-semibold">{stats.completedCourses}</h3>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-xl flex items-center gap-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-xl font-semibold">{stats.points}</h3>
              <p className="text-gray-400 text-sm">Points Earned</p>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
        {loading ? (
          <p className="text-gray-400">Loading your courses...</p>
        ) : enrolledCourses.length === 0 ? (
          <p className="text-gray-400">You haven’t enrolled in any courses yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.courseId}
                onClick={() => navigate(`/courses/${course.courseId}`)}
                className="bg-white/10 hover:bg-white/20 p-6 rounded-xl transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <span>{course.courseIcon}</span> {course.courseName}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      course.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${
                      course.status === "completed"
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${course.progress || 0}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Progress: {course.progress || 0}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
