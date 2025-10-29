"use client";
import Link from "next/link";

const materias = [
  { slug: "pediatria", nombre: "Pediatría" },
  { slug: "infectologia", nombre: "Infectología" },
  { slug: "medicina-familiar", nombre: "Medicina Familiar" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "white", padding: 32 }}>
      <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: 1 }}>M.T WORLD</h1>
      <h5 style={{ fontSize: 40, fontWeight: 800, letterSpacing: 1 }}>Tu herramienta para lograr lo que mas queres.</h5>
      <p style={{ opacity: 0.8, marginTop: 8 }}>Elegí una materia para practicar.</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        marginTop: 24
      }}>
        {materias.map(m => (
          <Link key={m.slug} href={`/materias/${m.slug}`}
            style={{
              display: "block",
              padding: 20,
              background: "#151515",
              border: "1px solid #2a2a2a",
              borderRadius: 14,
              textDecoration: "none",
              color: "white"
            }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{m.nombre}</div>
            <div style={{ fontSize: 14, opacity: 0.7, marginTop: 6 }}>Entrar</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
