import ProjectMedia from "./ProjectMedia";

export default function ProjectCard({ project }) {
  return (
    <div className="editorial-card">
      <div className="editorial-card-media">
        <ProjectMedia project={project} />
        <span className="tag-pill tag-pill-info editorial-card-tag">
          {project.category || "General"}
        </span>
      </div>
      <div className="editorial-card-body">
        <h3 className="text-xl mb-2">{project.title}</h3>
        <p className="text-sm">{project.description}</p>
      </div>
    </div>
  );
}
