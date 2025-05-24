const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            res.json({ email: user.email, role: user.role });
        } else {
            res.status(401).json({ error: 'Credenziali non valide' });
        }
    } catch (err) {
        console.error('Errore nel login:', err);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

app.post('/api/register', (req, res) => {
    try {
        const { email, password } = req.body;
        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Utente già registrato' });
        }

        const newUser = {
            email,
            password,
            role: 'user',
        };

        users.push(newUser);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
        res.status(201).json({ email: newUser.email, role: newUser.role });
    } catch (err) {
        console.error('Errore nella registrazione:', err);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

const xlsx = require('xlsx');

app.get('/api/products/:category', (req, res) => {
    const category = req.params.category;
    const filePath = path.join(__dirname, '../client/public/data', `${category}.xlsx`);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File non trovato per questa categoria' });
        }

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        res.json(data);
    } catch (err) {
        console.error('Errore durante la lettura del file Excel:', err);
        res.status(500).json({ error: 'Errore nel caricamento dei prodotti' });
    }
});

app.put('/api/products/:category/:index', (req, res) => {
    const { category, index } = req.params; // Parametri dalla URL
    const updatedData = req.body;
    const filePath = path.join(__dirname, '../client/public/data', `${category}.xlsx`);

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        data[index] = updatedData;

        const newSheet = xlsx.utils.json_to_sheet(data);
        workbook.Sheets[sheetName] = newSheet;
        xlsx.writeFile(workbook, filePath); // Scrive sul file Excel

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Errore durante update:', err);
        res.status(500).json({ error: 'Errore aggiornamento prodotto' });
    }
});

app.delete('/api/products/:category/:index', (req, res) => {
    const { category, index } = req.params;
    const filePath = path.join(__dirname, '../client/public/data', `${category}.xlsx`);

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        data.splice(index, 1);

        const newSheet = xlsx.utils.json_to_sheet(data);
        workbook.Sheets[sheetName] = newSheet;
        xlsx.writeFile(workbook, filePath);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Errore durante delete:', err);
        res.status(500).json({ error: 'Errore eliminazione prodotto' });
    }
});

app.post('/api/products/:category', (req, res) => {
    const { category } = req.params;
    const newProduct = req.body;
    const filePath = path.join(__dirname, '../client/public/data', `${category}.xlsx`);

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        data.push(newProduct);

        const newSheet = xlsx.utils.json_to_sheet(data);
        workbook.Sheets[sheetName] = newSheet;
        xlsx.writeFile(workbook, filePath);

        res.status(201).json({ success: true });
    } catch (err) {
        console.error('Errore durante add:', err);
        res.status(500).json({ error: 'Errore aggiunta prodotto' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server backend avviato su http://localhost:${PORT}`);
});