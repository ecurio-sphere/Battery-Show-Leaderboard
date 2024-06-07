document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { group: 1, rank: '', points: 6, partyInvites: 2, brochures: '', meetings: '', demo: '', points1: 3, points2: 5, points3: 7, points4: 10 },
        { group: 2, rank: '', points: 0, partyInvites: '', brochures: '', meetings: '', demo: '', points1: 3, points2: 5, points3: 7, points4: 10 },
        { group: 3, rank: '', points: 0, partyInvites: '', brochures: '', meetings: '', demo: '', points1: 3, points2: 5, points3: 7, points4: 10 },
        { group: 'Tobi', rank: '', points: 0, partyInvites: '', brochures: '', meetings: '', demo: '', points1: 3, points2: 5, points3: 7, points4: 10 },
    ];

    const tbody = document.querySelector('#task-breakdown tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.group}</td>
            <td>${item.rank}</td>
            <td>${item.points}</td>
            <td>${item.partyInvites}</td>
            <td>${item.brochures}</td>
            <td>${item.meetings}</td>
            <td>${item.demo}</td>
            <td>${item.points1}</td>
            <td>${item.points2}</td>
            <td>${item.points3}</td>
            <td>${item.points4}</td>
        `;
        tbody.appendChild(row);
    });
});
