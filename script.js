document.addEventListener('DOMContentLoaded', function() {
    let groups = JSON.parse(localStorage.getItem('groups')) || [
        { group: 1, rank: 1, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
        { group: 2, rank: 2, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
        { group: 3, rank: 3, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
        { group: 'Tobi', rank: 4, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
    ];

    const pointsPerTask = {
        partyInvites: 3,
        brochures: 5,
        meetings: 7,
        demo: 10
    };

    function updateRanks() {
        groups.sort((a, b) => b.points - a.points);
        groups.forEach((group, index) => {
            group.rank = index + 1;
        });
    }

    function updateTables() {
        updateRanks();

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
            `;
            taskTbody.appendChild(taskRow);
        });

        localStorage.setItem('groups', JSON.stringify(groups));
    }

    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const group = document.getElementById('group').value;
        const task = document.getElementById('task').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (group && task && quantity) {
            const groupData = groups.find(g => g.group == group);
            groupData[task] += quantity;
            groupData.points += quantity * pointsPerTask[task];

            updateTables();

            alert('You have added your points');

            document.getElementById('group').value = '';
            document.getElementById('task').value = '';
            document.getElementById('quantity').value = '';
        }
    });

    document.getElementById('reset-button').addEventListener('click', function() {
        const password = prompt('Please enter the password to reset scores:');
        if (password === 'SphereEnergy') {
            groups = [
                { group: 1, rank: 1, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
                { group: 2, rank: 2, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
                { group: 3, rank: 3, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
                { group: 'Tobi', rank: 4, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
            ];
            updateTables();
            alert('Scores have been reset');
        }
    });

    updateTables();
});
