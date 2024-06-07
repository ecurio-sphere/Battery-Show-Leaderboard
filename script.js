document.addEventListener('DOMContentLoaded', function() {
    const groups = [
        { group: 1, rank: '', points: 6, partyInvites: 2, brochures: 0, meetings: 0, demo: 0 },
        { group: 2, rank: '', points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
        { group: 3, rank: '', points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
        { group: 'Tobi', rank: '', points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
    ];

    const pointsPerTask = { points1: 3, points2: 5, points3: 7, points4: 10 };

    function updateTables() {
        const overallTbody = document.querySelector('#overall-points tbody');
        const taskTbody = document.querySelector('#task-breakdown tbody');
        overallTbody.innerHTML = '';
        taskTbody.innerHTML = '';

        groups.forEach(group => {
            const overallRow = document.createElement('tr');
            overallRow.innerHTML = `
                <td>${group.group}</td>
                <td>${group.rank}</td>
                <td>${group.points}</td>
            `;
            overallTbody.appendChild(overallRow);

            const taskRow = document.createElement('tr');
            taskRow.innerHTML = `
                <td>${group.group}</td>
                <td>${group.rank}</td>
                <td>${group.points}</td>
                <td>${group.partyInvites}</td>
                <td>${group.brochures}</td>
                <td>${group.meetings}</td>
                <td>${group.demo}</td>
                <td>${pointsPerTask.points1}</td>
                <td>${pointsPerTask.points2}</td>
                <td>${pointsPerTask.points3}</td>
                <td>${pointsPerTask.points4}</td>
            `;
            taskTbody.appendChild(taskRow);
        });
    }

    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const group = document.getElementById('group').value;
        const task = document.getElementById('task').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        const groupData = groups.find(g => g.group == group);
        groupData[task] += quantity;
        groupData.points += quantity * pointsPerTask[task];

        updateTables();
    });

    updateTables();
});

