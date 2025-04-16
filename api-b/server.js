const express = require('express');
const app = express();
const PORT = 3001;

// Array de objetos
const weatherData = [
    { city: 'São Paulo', temp: 25, unit: 'Celsius' },
    { city: 'Rio de Janeiro', temp: 30, unit: 'Celsius' },
    { city: 'Porto Alegre', temp: 15, unit: 'Celsius' },
    { city: 'Belo Horizonte', temp: 22, unit: 'Celsius' },
];

// Endpoint GET /weather/:city
app.get('/weather/:city', (req, res) => {
    const requestedCity = req.params.city.toLowerCase();
    
    // Busca a cidade no array (ignorando maiúsculas/minúsculas e acentos)
    const cityData = weatherData.find(item => 
        item.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") === 
        requestedCity.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    );

    if (cityData) {
        res.json(cityData);
    } else {
        res.status(404).json({ error: 'Cidade não encontrada' });
    }
});

app.listen(PORT, () => {
    console.log(`API B rodando em http://localhost:${PORT}`);
});