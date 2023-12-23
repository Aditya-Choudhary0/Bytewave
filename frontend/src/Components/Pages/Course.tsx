

import CourseCard from "../Pages/CourseCard";

const courseData = [
  {
    title: "NODE",
    description: "Learn the essentials for becoming a skilled NODE JS Developer.",
    image:
      "https://miro.medium.com/v2/resize:fit:750/0*zBLVTyHfWIDGVRxS.jpg",
  },
  {
    title: "JAVA",
    description: "Explore the fundamentals necessary for excelling as a JAVA  Developer.",
    image:
      "https://th.bing.com/th/id/OIP.-PpueYZ_g4I0noGF_QSgCAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    title: "MERN",
    description: "Master the technologies required to thrive as a MERN Developer.",
    image:
      "https://th.bing.com/th/id/OIP.4RKXibgCLWjgaD9hNLYn4AHaEK?w=1280&h=720&rs=1&pid=ImgDetMain",
  },
];

// ... rest of the code remains the same


const Course = () => {
  return (
    <div className="bg-[#55CDFC] flex items-center justify-center min-h-screen">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-screen-xl">
        {courseData.map((card, index) => (
          <div key={index} className="p-4">
            <CourseCard
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
