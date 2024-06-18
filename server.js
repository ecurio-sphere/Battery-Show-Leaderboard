// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let groups = [
    { group: 1, rank: 1, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
    { group: 2, rank: 2, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
    { group: 3, rank: 3, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
    { group: 'Tobi', rank: 4, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
];

// Load initial data from file
if (fs.existsSync('data.json')) {
    const rawData = fs.readFileSync('data.json');
    groups = JSON.parse(rawData);
}

// Save data to file
const saveData = () => {
    fs.writeFileSync('data.json', JSON.stringify(groups));
};

app.get('/api/groups', (req, res) => {
    res.json(groups);
});

app.post('/api/update', (req, res) => {
    const { group, task, quantity } = req.body;
    const pointsPerTask = {
        partyInvites: 3,
        brochures: 5,
        meetings: 7,
        demo: 10,
    };

    const groupData = groups.find(g => g.group == group);
    if (groupData) {
        groupData[task] += quantity;
        groupData.points += quantity * pointsPerTask[task];
        groups.sort((a, b) => b.points - a.points);
        groups.forEach((group, index) => {
            group.rank = index + 1;
        });
        saveData();
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid group' });
    }
});

app.post('/api/reset', (req, res) => {
    const { password } = req.body;
    if (password === 'SphereEnergy') {
        groups = [
            { group: 1, rank: 1, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
            { group: 2, rank: 2, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
            { group: 3, rank: 3, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
            { group: 'Tobi', rank: 4, points: 0, partyInvites: 0, brochures: 0, meetings: 0, demo: 0 },
        ];
        saveData();
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid password' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
