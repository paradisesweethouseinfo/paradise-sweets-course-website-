import { memo } from "react";

function CourseCard({
  image,
  title,
  description,
  onViewCourse,
}) {
  return (
    <article className="card group overflow-hidden transform-gpu">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-64 w-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
        />
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-bold text-gray-900">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-gray-600">
          {description}
        </p>

        <button
          type="button"
          onClick={onViewCourse}
          className="btn btn-primary mt-6 transition-transform duration-300 active:scale-95 md:hover:-translate-y-0.5"
        >
          View Course
        </button>
      </div>
    </article>
  );
}

export default memo(CourseCard);