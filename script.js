const API_BASE = "https://my-portfolio-1-pes7.onrender.com";

/* Utility function for fetch */
async function fetchData(url, errorMessage) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(errorMessage);
  return res.json();
}

/* ---------- PROFILE ---------- */
fetchData(`${API_BASE}/profile`, "Failed to load profile")
  .then(p => {
    document.getElementById("name").innerText = p.name ?? "";
    document.getElementById("email").innerText = p.email ?? "";
  })
  .catch(err => console.error("Profile error:", err));


/* ---------- LINKS ---------- */
fetchData(`${API_BASE}/links`, "Failed to load links")
  .then(l => {
    document.getElementById("github").href = l.github || "#";
    document.getElementById("linkedin").href = l.linkedin || "#";
    document.getElementById("portfolio").href = l.portfolio || "#";
  })
  .catch(err => console.error("Links error:", err));


/* ---------- EDUCATION ---------- */
fetchData(`${API_BASE}/education`, "Failed to load education")
  .then(data => {
    const ul = document.getElementById("education");
    ul.innerHTML = "";

    data.forEach(e => {
      ul.innerHTML += `
        <li>
          <b>${e.degree}</b> – ${e.board_university}
          (${e.start_year} – ${e.end_year})<br>
          <span style="color:#a5b4fc;">${e.score}</span>
        </li>
      `;
    });
  })
  .catch(err => console.error("Education error:", err));


/* ---------- SKILLS ---------- */
fetchData(`${API_BASE}/skills/top`, "Failed to load skills")
  .then(skills => {
    const div = document.getElementById("skills");
    div.innerHTML = "";

    skills.forEach(skill => {
      div.innerHTML += `<span>${skill}</span>`;
    });
  })
  .catch(err => console.error("Skills error:", err));


/* ---------- CERTIFICATIONS ---------- */
fetchData(`${API_BASE}/certifications`, "Failed to load certifications")
  .then(data => {
    const ul = document.getElementById("certifications");
    ul.innerHTML = "";

    data.forEach(c => {
      ul.innerHTML += `
        <li>
          <b>${c.title}</b> – ${c.provider}
          (${c.year}) – ${c.score}
        </li>
      `;
    });
  })
  .catch(err => console.error("Certifications error:", err));


/* ---------- WORK EXPERIENCE ---------- */
fetchData(`${API_BASE}/work`, "Failed to load work experience")
  .then(data => {
    const ul = document.getElementById("work");
    ul.innerHTML = "";

    data.forEach(w => {
      const start = new Date(w.start_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      });

      const end = w.end_date
        ? new Date(w.end_date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
          })
        : "Present";

      ul.innerHTML += `
        <li>
          <div class="work-role">${w.role}</div>
          <div class="work-company">${w.company}</div>
          <div class="work-dates">${start} – ${end}</div>
          <div class="work-desc">${w.description}</div>
        </li>
      `;
    });
  })
  .catch(err => console.error("Work error:", err));


/* ---------- PROJECTS ---------- */
fetchData(`${API_BASE}/projects`, "Failed to load projects")
  .then(projects => {
    const ul = document.getElementById("projects");
    ul.innerHTML = "";

    projects.forEach(p => {
      ul.innerHTML += `
        <li class="project-item">
          <div class="project-title">${p.title}</div>
          <div class="project-tools">${p.tools}</div>
          <div class="project-desc">${p.description}</div>
          ${
            p.link
              ? `<a href="${p.link}" target="_blank" class="project-link">GitHub</a>`
              : ""
          }
        </li>
      `;
    });
  })
  .catch(err => console.error("Projects error:", err));
