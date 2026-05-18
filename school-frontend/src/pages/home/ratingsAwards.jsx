const highlights = [
  { title: "Parent Rating", value: "4.8 / 5", note: "From 2,000+ reviews" },
  { title: "National Awards", value: "24+", note: "Academics & innovation" },
  { title: "Board Results", value: "98.6%", note: "Average pass percentage" },
  { title: "Student Satisfaction", value: "96%", note: "Annual survey score" },
];

const RatingsAwards = () => {
    return(
        <>
         <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Ratings & Awards
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-stone-100 bg-white/10 backdrop-blur-md p-5 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/10"
            >
              <p className="text-sm font-semibold text-blue-600  dark:text-blue-400">
                {item.title}
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </section>
        </>
    )
}
export default RatingsAwards;