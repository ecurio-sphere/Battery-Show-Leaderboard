document.addEventListener('DOMContentLoaded', function() {
    let groups = [];

    const fetchGroups = async () => {
        const response = await fetch('https://leaderboard-backend.herokuapp.com/api/groups'); // Update URL with your Heroku app URL
        groups = await response.json();
        updateTables();
    };

    const updateGroups = async (data) => {
        const response = await fetch('https://leaderboard-backend.herokuapp.com/api/update', { // Update URL with your Heroku app URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success) {
            await fetchGroups();
            alert('You have added your points');
        } else {
            alert('Error updating points');
        }
    };

    const resetGroups = async (password) => {
        const response = await fetch('https://leaderboard-backend.herokuapp.com/api/reset', { // Update URL with your Heroku app URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        const result = await response.json();
        if (result.success) {
            await fetchGroups();
            alert('Scores have been reset');
        } else {
            alert('Error resetting scores');
        }
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
    }

    document.getElementById('task-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const group = document.getElementById('group').value;
        const task = document.getElementById('task').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (group && task && quantity) {
            await updateGroups({ group, task, quantity });
            document.getElementById('group').value = '';
            document.getElementById('task').value = '';
            document.getElementById('quantity').value = '';
        }
    });

    document.getElementById('reset-button').addEventListener('click', async function() {
        const password = prompt('Please enter the password to reset scores:');
        if (password) {
            await resetGroups(password);
        }
    });

    fetchGroups();
});
