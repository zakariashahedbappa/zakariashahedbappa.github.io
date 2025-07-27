fetch('zakaria_portfolio.json')
    .then(response => response.json())
    .then(data => {
        // Header
        document.getElementById('profile-image').src = data.profile_image;
        document.getElementById('name').textContent = data.name;
        document.getElementById('title').textContent = data.title;
        document.getElementById('location').textContent = data.location;
        document.getElementById('email').textContent = data.email;
        document.getElementById('email').href = 'mailto:' + data.email;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('phone').href = 'tel:' + data.phone;
        document.getElementById('linkedin').href = data.linkedin;
        document.getElementById('github').href = data.github;
        document.getElementById('stackoverflow').href = data.stackoverflow;
        document.getElementById('hackerone').href = data.hackerone;

        // Summary
        document.querySelector('#summary p').textContent = data.summary;

        // Experience
        const experienceSection = document.getElementById('experience');
        data.experience.forEach(exp => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h4>${exp.role} at ${exp.company}</h4>
                <p><em>${exp.period}</em></p>
                <ul>
                    ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
            `;
            experienceSection.appendChild(div);
        });

        // Education
        const educationSection = document.getElementById('education');
        data.education.forEach(edu => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h4>${edu.degree}</h4>
                <p>${edu.university} | ${edu.period}</p>
                <p><em>Thesis:</em> ${edu.thesis}</p>
            `;
            educationSection.appendChild(div);
        });

        // Projects
        const projectsSection = document.getElementById('projects');
        data.projects.forEach(proj => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h4>${proj.name}</h4>
                <p><strong>Duration:</strong> ${proj.duration}</p>
                <p><strong>Stack:</strong> ${proj.stack}</p>
                <p><strong>Role:</strong> ${proj.role}</p>
            `;
            projectsSection.appendChild(div);
        });

        // Certifications
        const certificationsSection = document.getElementById('certifications');
        data.certifications.forEach(cert => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><a href="${cert.url}" target="_blank">${cert.name}</a> - ${cert.source} (${cert.id || ''})</p>
            `;
            certificationsSection.appendChild(div);
        });

        // Bug Bounty
        const bugBountySection = document.getElementById('bug-bounty');
        bugBountySection.innerHTML += `
            <p>Platforms: ${data.bug_bounty.platforms.map(p => `<a href="${p}" target="_blank">${p}</a>`).join(', ')}</p>
            <ul>
                ${data.bug_bounty.badges.map(b => `<li>${b}</li>`).join('')}
            </ul>
        `;

        // Technical Skills
        const technicalSkillsList = document.querySelector('#technical-skills ul');
        data.technical_skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            technicalSkillsList.appendChild(li);
        });

        // Languages
        const languagesSection = document.getElementById('languages');
        data.languages.forEach(lang => {
            const div = document.createElement('div');
            if (typeof lang.proficiency === 'string') {
                div.innerHTML = `<p>${lang.language}: ${lang.proficiency}</p>`;
            } else {
                div.innerHTML = `<p>${lang.language}: Reading - ${lang.proficiency.Reading}, Writing - ${lang.proficiency.Writing}, Speaking - ${lang.proficiency.Speaking}</p>`;
            }
            languagesSection.appendChild(div);
        });

        // Achievements
        const achievementsList = document.querySelector('#achievements ul');
        data.achievements.forEach(ach => {
            const li = document.createElement('li');
            li.textContent = ach;
            achievementsList.appendChild(li);
        });

        // Recommendations
        const recommendationsSection = document.getElementById('recommendations');
        data.recommendations.forEach(rec => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>"${rec.quote}"</p>
                <p><em>- ${rec.given_by}, ${rec.company}</em></p>
            `;
            recommendationsSection.appendChild(div);
        });

        // Interests
        const interestsList = document.querySelector('#interests ul');
        data.interests.forEach(interest => {
            const li = document.createElement('li');
            li.textContent = interest;
            interestsList.appendChild(li);
        });
    });