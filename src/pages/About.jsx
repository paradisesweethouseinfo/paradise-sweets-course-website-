import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          About Paradise Sweets Academy</h1>

    <p>
      Paradise Sweets Academy is a professional bakery training institute in Sri Lanka,
      created by the team behind the well-established Paradise Sweet House, which has over
      20 years of experience in the bakery and confectionery industry.
    </p>

    <p>
      Our academy is built on real industry knowledge, offering practical, hands-on training
      in cake baking, decoration, and traditional Sri Lankan sweets. We aim to share the
      skills and techniques used in a real bakery environment, helping students learn both
      modern and traditional methods.
    </p>

    <p>
      At Paradise Sweets Academy, we focus on quality training, creativity, and practical
      experience. Whether you are a beginner or looking to improve your baking skills, our
      courses are designed to guide you step by step toward becoming a confident baker.
    </p>

</section>
    </>
  );
}