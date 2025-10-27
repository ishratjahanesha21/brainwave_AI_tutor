/* eslint-disable react/no-unknown-property */

import { useNavigate } from "react-router-dom";
import Section from "../../components/Section";
import Heading from "../../components/Heading";
import Arrow from "../../assets/svg/Arrow";
import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import { coursesData } from "../../constants";
import { useAuth } from "../../hook/useAuth";
import { useCourses } from "../../hook/useCourses";
import { Check, ChevronRight, Loader } from "lucide-react";

const CourseList = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { enrollInCourse, isEnrolled, loading } = useCourses();

  // 🔹 Handle enrollment logic
  const handleEnroll = async (course) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const result = await enrollInCourse({
      courseId: course.id,
      courseName: course.title,
      courseIcon: course.icon,
    });

    if (result.success) {
      alert("✅ Successfully enrolled!");
    } else {
      alert("⚠️ Enrollment failed. Try again.");
    }
  };

  return (
    <>
      <Section id="features">
        <div className="container relative z-2">
          <Heading
            className="md:max-w-md lg:max-w-2xl"
            title="Choose Your Learning Path"
          />

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center my-8">
              <Loader className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          )}

          {/* Courses Grid */}
          <div className="flex flex-wrap gap-10 mb-10">
            {coursesData.map((item) => {
              const enrolled = isEnrolled(item.id);

              return (
                <div
                  key={item.id}
                  className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundImage: `url(${item.backgroundUrl})`,
                  }}
                  onClick={() => {
                    if (enrolled) {
                      navigate(`/courses/${item.id}`);
                    }
                  }}
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

                      {/* Enroll or Continue */}
                      {enrolled ? (
                        <p className="ml-auto flex items-center gap-1 font-code text-xs font-bold text-green-400 uppercase tracking-wider pointer-events-auto">
                          <Check className="w-4 h-4" /> Continue
                        </p>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnroll(item);
                          }}
                          className="ml-auto flex items-center gap-1 font-code text-xs font-bold text-purple-400 uppercase tracking-wider pointer-events-auto hover:text-purple-300 transition"
                        >
                          Enroll Now <ChevronRight className="w-3 h-3" />
                        </button>
                      )}

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
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
};

export default CourseList;
