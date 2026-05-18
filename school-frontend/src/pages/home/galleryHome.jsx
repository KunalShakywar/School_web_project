const campusImages = [
  {
    // img: "src/assets/schoolbus.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms",
  },

  {
    // img: "src/assets/lunchplace.jpeg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms",
  },

  {
    // img: "src/assets/playground.jpeg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms",
  },

  {
    // img: "src/assets/maam.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms",
  },
  {
    // img: "src/assets/goodday.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms",
  },
  {
    // img: "src/assets/exams.jpg",
    title: "Main Building",
    desc: "Modern infrastructure with smart classrooms",
  },
];


const Homegallery = () => {
    return(
        <>
         <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Campus Highlights
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Important part of images */}
          {campusImages.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white/10 shadow-sm dark:border-slate-700 dark:bg-slate-900/10 backdrop-blur-md"
            >
              <img
                src={img.img}
                alt={`Campus highlight ${index + 1}`}
                className="h-52 w-full object-cover transition duration-300 hover:scale-105"
              />

              {/* Text */}
              <div className="relative  left-4  dark:text-white">
                <h3 className="text-lg font-semibold">{img.title}</h3>
                <p className="text-sm">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
        </>
    )
}
export default Homegallery;