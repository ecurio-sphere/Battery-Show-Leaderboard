document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { group: 1, rank: '', points: 6 },
        { group: 2, rank: '', points: 0 },
        { group: 3, rank: '', points: 0 },
        { group: 'Tobi', rank: '', points: 0 },
    ];

    const tbody = document.querySelector('#overall-points tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.group}</td>
            <td>${item.rank}</td>
            <td>${item.points}</td>
        `;
        tbody.appendChild(row);
    });
});
