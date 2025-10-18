
import { useNavigate } from "react-router-dom";
//import CourseCard from "./CourseCard";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "../components/design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { coursesData } from "../constants";


const CourseList = () => {
  const navigate = useNavigate();

  // const courses = [
  //   {
  //     title: "Python Fundamentals",
  //     description: "Start your programming journey with Python step-by-step.",
  //     id: "python",
  //   },
  //   {
  //     title: "C++ Fundamentals",
  //     description: "Master C++ basics, logic, and problem-solving foundations.",
  //     id: "cpp",
  //   },
  // ];

  return (
    <>
     <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Chat Smarter, Not Harder with Brainwave"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {coursesData.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.description}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider"
                   onClick={() => navigate(`/course/${item.id}`)}
                  >
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
    </>
    // <div className="min-h-screen bg-gray-50 py-12 px-8">
    //   <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
    //   <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    //     {courses.map((course) => (
    //       <CourseCard
    //         key={course.id}
    //         title={course.title}
    //         description={course.description}
    //         onStart={() => navigate(`/course/${course.id}`)}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
};

export default CourseList;
