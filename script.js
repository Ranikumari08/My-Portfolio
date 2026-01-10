const API_BASE = "http://127.0.0.1:10000";

/* fetching profile data*/
fetch(`${API_BASE}/profile`)
    .then(res => res.json())
    .then(p => {
        document.getElementById("name").innerText = p.Name;
        document.getElementById("email").innerText = p.Email;
    });

/* fetching links */
fetch(`${API_BASE}/links`)
    .then(res => res.json())
    .then(l => {
        document.getElementById("github").href = l.github;
        document.getElementById("linkedin").href = l.linkedin;
        document.getElementById("portfolio").href = l.portfolio;
    });

/* fetch education  */
fetch(`${API_BASE}/education`)
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("education");
        ul.innerHTML = "";

        data.forEach(e => {
            ul.innerHTML += `
                <li>
                    <b>${e.degree}</b> – ${e.board_university}
                    (${e.start_year} - ${e.end_year})<br>
                    <span style="color:#a5b4fc;">${e.score}</span>
                </li>
            `;
        });
    });

/* fetch skills */
fetch(`${API_BASE}/skills/top`)
    .then(res => res.json())
    .then(skills => {
        const div = document.getElementById("skills");
        skills.forEach(skill => {
            div.innerHTML += `<span>${skill}</span>`;
        });
    });

/* fetch certifications */
fetch(`${API_BASE}/certifications`)
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("certifications");
        data.forEach(c => {
            ul.innerHTML += `
                <li>
                    <b>${c.title}</b> – ${c.provider}
                    (${c.year}) – ${c.score}
                </li>`;
        });
    });

/* fetch work */
fetch(`${API_BASE}/work`)
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("work");
        ul.innerHTML = "";

        data.forEach(w => {
            const start = new Date(w.start_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            });

            const end = new Date(w.end_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            });

            ul.innerHTML += `
                <li>
                    <div class="work-role">${w.role}</div>
                    <div class="work-company">${w.company}</div>
                    <div class="work-dates">${start} – ${end}</div>
                    <div class="work-desc">${w.description}</div>
                </li>
            `;
        });
    });



/* fetch project */
fetch(`${API_BASE}/projects`)
    .then(res => res.json())
    .then(projects => {
        const ul = document.getElementById("projects");
        ul.innerHTML = "";

        projects.forEach(p => {
            ul.innerHTML += `
                <li class="project-item">
                    <div class="project-title">${p.Title}</div>
                    <div class="project-tools">${p.Tools}</div>
                    <div class="project-desc">${p.Description}</div>
                    <a href="${p.Links}" target="_blank" class="project-link">
                        GitHub
                    </a>
                </li>
            `;
        });
    });

