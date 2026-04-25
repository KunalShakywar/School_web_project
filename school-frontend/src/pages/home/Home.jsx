
import schoolimage from "../../assets/schoolpromax.jpg"



const teachers = [
  { name: "Anita Sharma", subject: "Mathematics", exp: "10+ years", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80" },
  { name: "Rahul Verma", subject: "Physics", exp: "8+ years", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
  { name: "Sikha Devanand", subject: "English", exp: "12+ years", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80" },
  { name: "Arjun Das", subject: "Chemistry", exp: "9+ years", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80" },
  { name: "Sana Khan", subject: "Computer Science", exp: "7+ years", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80" },
];

const highlights = [
  { title: "Parent Rating", value: "4.8 / 5", note: "From 2,000+ reviews" },
  { title: "National Awards", value: "24+", note: "Academics & innovation" },
  { title: "Board Results", value: "98.6%", note: "Average pass percentage" },
  { title: "Student Satisfaction", value: "96%", note: "Annual survey score" },
];

const campusImages = [
  {

    img: "src/assets/schoolbus.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms"
  },

  {
    img: "src/assets/lunchplace.jpeg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms"
  },

  {
    img: "src/assets/playground.jpeg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms",
  },

  {
    img: "src/assets/maam.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms"
  },
  {
    img: "src/assets/goodday.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms"
  },
  {
    img: "src/assets/exams.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms"

  },
];

const Home = () => {
  const loopTeachers = [...teachers, ...teachers];

  return (
    <div className="space-y-10 text-slate-900 dark:text-slate-100 ">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden ">
        <img
          src={schoolimage}
          alt="School"
          className="h-[100vh] w-full object-cover object-to  "
        />
       
<div className="absolute inset-x-0 bottom-0 h-44 
bg-gradient-to-b from-transparent to-slate-50/40 
dark:to-slate-950/40">
</div>
      </div>

      <section className="space-y-4">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-center">Welcome to Aethelred Academy School</h1>
        <p className="w-full text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          BrightFuture School is a learning community focused on academic  excellence, creativity, and strong values.
          We provide a supportive environment where students build confidence, communication skills, and leadership
          through classrooms, labs, sports, and cultural activities.
        </p>
        <p className="max-w-4xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Our mission is to prepare every student for higher education and real-world success with discipline, curiosity,
          and compassion. We believe every child can grow when guided by committed teachers and modern learning methods.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Ratings & Awards</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-stone-100 bg-white/10 backdrop-blur-md p-5 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/10"
            >
              <p className="text-sm font-semibold text-blue-600  dark:text-blue-400">{item.title}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{item.value}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Our Teachers</h2>
        </div>
        <div className="relative">
          <div className="overflow-hidden px-8 pb-2">
            <div className="marquee-track flex w-max gap-4 hover:[animation-play-state:paused]">
              {loopTeachers.map((teacher, index) => (
                <article
                  key={`${teacher.name}-${index}`}
                  className="w-[240px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white/10 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/10 backdrop-blur-md"
                >
                  <img src={teacher.img} alt={teacher.name} className="h-52 w-full object-cover" />
                  <div className="space-y-1 p-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{teacher.name}</h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{teacher.subject}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{teacher.exp}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950"></div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Campus Highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Important part of images */}
          {campusImages.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white/10 shadow-sm dark:border-slate-700 dark:bg-slate-900/10 backdrop-blur-md">
              <img
                src={img.img}
                alt={`Campus highlight ${index + 1}`}
                className="h-52 w-full object-cover transition duration-300 hover:scale-105"
              />

              {/* Text */}
              <div className="relative  left-4  dark:text-white">
                <h3 className="text-lg font-semibold">
                  {img.title}
                </h3>
                <p className="text-sm">
                  {img.desc}
                </p>
              </div>
            </div>

          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
