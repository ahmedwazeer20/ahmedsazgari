"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import HeroMedia from "./HeroMedia";
import ProjectCard from "./ProjectCard";

export default function HomeClient() {
  const [featuredProjects, setFeaturedProjects] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedProjects() {
      const { data, error } = await supabaseClient
        .from("project")
        .select("*")
        .eq("featured", true);

      if (error) {
        console.error("Error fetching featured projects:", error);
        return;
      }
      if (!cancelled) setFeaturedProjects(data || []);
    }

    loadFeaturedProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-card">
            <div className="hero-media" id="hero-media">
              <HeroMedia projects={featuredProjects} />
            </div>
            <div className="hero-overlay"></div>

            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot"></span>
                Helsinki, Finland
              </div>

              <h1>
                Capturing the World
                <br />
                from a <span className="accent-text">Higher Perspective</span>
              </h1>

              <p>
                I&apos;m ahmed an experience aerial drone and media specialist crafting cinematic
                visuals, immersive 360 tours, and commercial content across Finland and Europe.
              </p>

              <div className="hero-actions">
                <Link href="/projects" className="btn btn-primary">
                  View Portfolio →
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES HIGHLIGHTS ================= */}
      <section className="section">
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">What I Do</span>
            <h2 className="section-title">Premium Aerial Media Services</h2>
            <p className="section-subtitle">
              From real estate showcases to cinematic brand films professional drone
              solutions tailored to your vision.
            </p>
          </div>

          <div className="service-grid">
            <div className="service-card fade-up">
              <div className="service-icon">🎥</div>
              <h3>Aerial Cinematography</h3>
              <p>
                Stunning 4K drone footage for films, commercials, and events.
                Smooth cinematic moves with professional color grading.
              </p>
            </div>

            <div className="service-card fade-up">
              <div className="service-icon">🌐</div>
              <h3>360 Virtual Tours</h3>
              <p>
                Immersive interactive tours for real estate, hotels, and venues.
                Let clients explore spaces from anywhere in the world.
              </p>
            </div>

            <div className="service-card fade-up">
              <div className="service-icon">📸</div>
              <h3>Commercial Production</h3>
              <p>
                High-end aerial and ground photography for brands, agencies,
                and editorial use. Crisp, clean, and market-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section className="section">
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">Featured Work</span>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-subtitle">
              A glimpse into recent aerial productions across Helsinki and beyond.
            </p>
          </div>

          <div className="project-grid" id="featured-projects-container">
            {featuredProjects === null ? null : featuredProjects.length === 0 ? (
              <p className="text-center col-span-full py-8" style={{ color: "var(--text-muted)" }}>
                No featured projects found.
              </p>
            ) : (
              featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>

          <div className="text-center mt-5">
            <Link href="/projects" className="btn btn-outline">
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CONTACT PREVIEW ================= */}
      <section className="section">
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">Let&apos;s Work Together</span>
            <h2 className="section-title">Have a Project in Mind?</h2>
            <p className="section-subtitle">
              Whether it&apos;s a single aerial shot or a full production — I&apos;d love to hear
              about your vision.
            </p>
          </div>

          <div className="text-center fade-up">
            <Link href="/contact" className="btn btn-primary">
              Start Your Inquiry →
            </Link>
            <p className="text-muted mt-3" style={{ fontSize: "0.9rem" }}>
              hello@ahmedsazgari.com · Helsinki, Finland
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
