import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      {/* Footer will be added here later */}
    </>
  );
}