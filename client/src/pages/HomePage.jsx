import { Link } from "react-router-dom";

function HomePage() {
  return (
  <section className="bg-zinc-800 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <h1 className="text-5xl py-2 font-bold">Plataforma de reserva de vuelos</h1>
      <p className="text-md text-slate-200">
        Plataforma desarrollada para la administración de reserva de vuelos para usuarios registrados en la plataforma.
      </p>
    </header>
  </section>
  );
}

export default HomePage;
