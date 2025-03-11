const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

let users = [
    { id: 1, name: "Aimad", email: "aimad@gmail.com" },
    { id: 2, name: "PMN", email: "pmn@test.com" }
];

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: "Utilisateur supprimé" });
});

app.get('/api/users/:id/details', async (req, res) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des données externes" });
    }
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
