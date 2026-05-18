// Fake data for left slide of home page
const teachers = [
  {
    name: "Teacher-1",
    subject: "Mathematics",
    exp: "10+ years",
    // img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Teacher-2",
    subject: "Physics",
    exp: "8+ years",
    // img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Teacher-3",
    subject: "English",
    exp: "12+ years",
    // img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Teacher-4",
    subject: "Chemistry",
    exp: "9+ years",
    // img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Teacher-5",
    subject: "Computer Science",
    exp: "7+ years",
    // img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80",
  },
];


const LeftSlide = () => {
    const loopTeachers = [...teachers, ...teachers];
    return(
        <>
        {/* left scroll teacher images */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4 ">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Our Teachers
          </h2>
        </div>
        <div className="relative">
          <div className="overflow-hidden px-3 pb-2 ">
            <div className="marquee-track flex w-max gap-4 hover:[animation-play-state:paused]">
              {loopTeachers.map((teacher, index) => (
                <article
                  key={`${teacher.name}-${index}`}
                  className="w-[240px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white/10 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/10 backdrop-blur-md "
                >
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="h-52 w-full object-cover transition duration-300 hover:scale-105"
                  />
                  <div className="space-y-1 p-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {teacher.name}
                    </h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {teacher.subject}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {teacher.exp}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950"></div>
        </div>
      </section>
        </>
    )
}
export default LeftSlide;