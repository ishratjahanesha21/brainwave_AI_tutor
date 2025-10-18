import { Book, Check, ChevronRight, Trophy } from "lucide-react";

function CourseDetailPage({ course, onNavigate, userProgress }) {
    const calculateProgress = (milestone) => {
      const completed = milestone.concepts.filter(c => userProgress[`${course.id}_${c.id}`]).length;
      return (completed / milestone.concepts.length) * 100;
    };
  
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-6xl">{course.icon}</div>
            <div>
              <h1 className="text-4xl font-bold">{course.title}</h1>
              <p className="text-white/80 mt-2">{course.description}</p>
            </div>
          </div>
          <div className="flex space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <Book className="w-5 h-5" />
              <span>{course.lessons} Lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
  
        <h2 className="text-2xl font-bold text-white mb-6">Learning Path</h2>
        <div className="space-y-6">
          {course.milestones.map((milestone, idx) => (
            <div key={milestone.id} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-3">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
                    {idx + 1}
                  </span>
                  <span>{milestone.title}</span>
                </h3>
                <span className="text-sm text-gray-400">{milestone.concepts.length} concepts</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${calculateProgress(milestone)}%` }}
                />
              </div>
              <div className="space-y-2">
                {milestone.concepts.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => onNavigate('concept', { course, milestone, concept })}
                    className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition group"
                  >
                    <div className="flex items-center space-x-3">
                      {userProgress[`${course.id}_${concept.id}`] ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                      )}
                      <span className="text-white">{concept.title}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  export default  CourseDetailPage;