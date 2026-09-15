"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import ProjectCard from "../components/ProjectCard";

const DEFAULT_CATEGORIES = ["drone", "360", "commercial", "reels"];

export default function ProjectsClient() {
  const [allProjects, setAllProjects] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      const { data, error } = await supabaseClient.from("project").select("*");
      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }
      if (!cancelled) setAllProjects(data || []);
    }

    loadProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const dbCategories = (allProjects || [])
      .map((p) => p.category?.toLowerCase().trim())
      .filter(Boolean);
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...dbCategories]));
  }, [allProjects]);

  const visibleProjects = useMemo(() => {
    if (!allProjects) return [];
    if (activeFilter === "all") return allProjects;
    return allProjects.filter(
      (p) => p.category?.toLowerCase().trim() === activeFilter.toLowerCase()
    );
  }, [allProjects, activeFilter]);

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">Portfolio</span>
            <h1 className="section-title">Featured Projects</h1>
            <p className="section-subtitle">
              A curated collection of aerial cinematography, 360 tours, commercial
              productions, and social reels.
            </p>
          </div>

          {allProjects && (
            <div className="filter-tabs fade-up">
              <button
                className={`filter-btn${activeFilter === "all" ? " active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn${activeFilter === cat ? " active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= PROJECT GALLERY ================= */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section-container">
          <div className="project-grid" id="projects-container">
            {allProjects === null ? null : visibleProjects.length === 0 ? (
              <p className="text-center col-span-full py-8" style={{ color: "var(--text-muted)" }}>
                No projects found in this category.
              </p>
            ) : (
              visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section">
        <div className="section-container text-center fade-up">
          <h2 className="section-title">Like What You See?</h2>
          <p className="section-subtitle mb-4">Let&apos;s create something extraordinary together.</p>
          <Link href="/contact" className="btn btn-primary">
            Start Your Project →
          </Link>
        </div>
      </section>
    </>
  );
}
