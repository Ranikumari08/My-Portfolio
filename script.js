const API_BASE = "https://my-portfolio-1-pes7.onrender.com";

/* ---------- PROFILE ---------- */
fetch(`${API_BASE}/profile`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load profile");
    return res.json();
  })
  .then(p => {
    document.getElementById("name").innerText = p.name || "";
    document.getElementById("email").innerText = p.email || "";
  })
  .catch(err => console.error("Profile error:", err));


/* ---------- LINKS ---------- */
fetch(`${API_BASE}/links`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load links");
    return res.json();
  })
  .then(l => {
    document.getElementById("github").href = l.github || "#";
    document.getElementById("linkedin").href = l.linkedin || "#";
    document.getElementById("portfolio").href = l.portfolio || "#";
  })
  .catch(err => console.error("Links error:", err));


/* ---------- EDUCATION ---------- */
fetch(`${API_BASE}/education`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load education");
    return res.json();
  })
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
fetch(`${API_BASE}/skills/top`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load skills");
    return res.json();
  })
  .then(skills => {
    const div = document.getElementById("skills");
    div.innerHTML = "";

    skills.forEach(skill => {
      div.innerHTML += `<span>${skill}</span>`;
    });
  })
  .catch(err => console.error("Skills error:", err));


/* ---------- CERTIFICATIONS ---------- */
fetch(`${API_BASE}/certifications`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load certifications");
    return res.json();
  })
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
fetch(`${API_BASE}/work`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load work experience");
    return res.json();
  })
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
fetch(`${API_BASE}/projects`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load projects");
    return res.json();
  })
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
