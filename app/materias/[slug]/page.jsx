"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Link from "next/link";
import { useParams } from "next/navigation";

function titulo(slug) {
  return String(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function MateriaPage() {
  const { slug } = useParams();               // ← usamos slug directamente
  const nombreMateria = titulo(slug);

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [err, setErr] = useState("");
  const [triedAuto, setTriedAuto] = useState(false); // para saber si intentamos auto-cargar

  // 1) Carga automática desde /public/csv/<slug>.csv
  useEffect(() => {
    if (!slug) return;
    setErr("");
    setTriedAuto(false);
    setQuestions([]);
    setIndex(0);
    setShowAnswer(false);

    const csvPath = `/csv/${slug}.csv`;

    Papa.parse(csvPath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = Array.isArray(results.data) ? results.data : [];
        const clean = data.filter((r) => r?.Question || r?.Front); // por si tenés otro esquema
        setQuestions(clean);
        setTriedAuto(true);
      },
      error: (e) => {
        setErr(e?.message || "No pude leer el CSV");
        setTriedAuto(true);
      },
    });
  }, [slug]);

  // 2) Fallback manual (si el archivo público no existe o preferís subir otro)
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = Array.isArray(results.data) ? results.data : [];
        const clean = data.filter((r) => r?.Question || r?.Front);
        setQuestions(clean);
        setIndex(0);
        setShowAnswer(false);
      },
      error: (e) => setErr(e?.message || "No pude leer el CSV"),
    });
  };

  const current = questions[index];

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "white", padding: 24 }}>
      {/* Barra superior */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <Link
          href="/"
          style={{
            padding: "8px 12px",
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 10,
            color: "white",
            textDecoration: "none",
          }}
        >
          ← Volver
        </Link>
        <div style={{ fontWeight: 700, fontSize: 18, opacity: 0.9 }}>M.T WORLD</div>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 800 }}>{nombreMateria}</h1>

      {/* Estado / errores */}
      {err && <p style={{ marginTop: 8, color: "#ff6b6b" }}>Error: {err}</p>}
      {!questions.length && triedAuto && (
        <p style={{ opacity: 0.8, marginTop: 6 }}>
          No encontré preguntas en <code>/public/csv/{String(slug)}.csv</code>. Podés subir un CSV manualmente:
        </p>
      )}

      {/* Input manual (fallback) */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        style={{ marginTop: 12, padding: 8, background: "#111", border: "1px solid #2a2a2a", borderRadius: 10 }}
      />

      {current ? (
        <div
          style={{
            marginTop: 20,
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 14,
            padding: 18,
          }}
        >
          {/* Soporta esquema Question/A/B/C/D/Answer/Explanation */}
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
            {current.Question || current.Front || "Pregunta"}
          </div>

          {["A", "B", "C", "D"].map((opt) =>
            current[opt] ? (
              <button
                key={opt}
                onClick={() => setShowAnswer(true)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  marginTop: 10,
                  padding: 12,
                  background: "#0c0c0c",
                  color: "white",
                  border: "1px solid #2a2a2a",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                <span style={{ opacity: 0.6, marginRight: 8 }}>{opt}.</span> {current[opt]}
              </button>
            ) : null
          )}

          {showAnswer && (
            <div
              style={{
                marginTop: 16,
                background: "#161b22",
                color: "white",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: 14,
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 800, marginBottom: 6 }}>
                Respuesta correcta: {current.Answer || current.Back || "—"}
              </div>
              <div style={{ whiteSpace: "pre-wrap" }}>{current.Explanation || "Sin explicación."}</div>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  onClick={() => {
                    setShowAnswer(false);
                    setIndex((prev) => (prev + 1 < questions.length ? prev + 1 : 0));
                  }}
                  style={{
                    padding: "10px 14px",
                    background: "#0a84ff",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Siguiente
                </button>

                <button
                  onClick={() => setShowAnswer(false)}
                  style={{
                    padding: "10px 14px",
                    background: "#2a2a2a",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Ocultar respuesta
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p style={{ marginTop: 20, opacity: 0.8 }}>
          {triedAuto ? "Subí un archivo CSV para comenzar." : "Cargando preguntas…"}
        </p>
      )}
    </div>
  );
}
