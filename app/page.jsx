"use client";
import Link from "next/link";

const materias = [
  { slug: "pediatria", nombre: "Pediatría" },
  { slug: "infectologia", nombre: "Infectología" },
  { slug: "medicina-familiar", nombre: "Medicina Familiar" },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "white",
        padding: 32,
      }}
    >
      <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: 1 }}>
        M.T WORLD
      </h1>

      {/* Texto principal más chico */}
      <h5
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 0.5,
          marginTop: 6,
          marginBottom: 8,
        }}
      >
        Memento mori - Estudia y logra eso que tanto deseas.
      </h5>

      {/* Nueva línea con Cafecito */}
      <p style={{ fontSize: 15, opacity: 0.85, marginBottom: 16 }}>
        Si querés colaborar para que esto siga creciendo:{" "}
        <a
          href="https://cafecito.app/mtworld"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0a84ff",
            textDecoration: "underline",
            fontWeight: 600,
          }}
        >
          ☕ cafecito.app/mtworld
        </a>
      </p>

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Elegí una materia para practicar.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {materias.map((m) => (
          <Link
            key={m.slug}
            href={`/materias/${m.slug}`}
            style={{
              display: "block",
              padding: 20,
              background: "#151515",
              border: "1px solid #2a2a2a",
              borderRadius: 14,
              textDecoration: "none",
              color: "white",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700 }}>{m.nombre}</div>
            <div
              style={{
                fontSize: 14,
                opacity: 0.7,
                marginTop: 6,
              }}
            >
              Entrar
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
