

const CourseCard = ({ title, description, onStart }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <button
      onClick={onStart}
      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
    >
      Start Journey
    </button>
  </div>
);

export default CourseCard;
