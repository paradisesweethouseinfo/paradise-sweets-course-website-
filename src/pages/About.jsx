import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          About Paradise Sweets Academy
        </h1>

        <p className="text-lg text-gray-600 leading-8">
          Paradise Sweets Academy is dedicated to teaching professional cake,
          bakery, sweets, and food preparation through high-quality online
          courses. Our mission is to help students learn practical skills from
          anywhere using organized video lessons.
        </p>
      </section>
    </>
  );
}