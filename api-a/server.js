const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; // Porta diferente da API B

// Endpoint GET /recommendation/:city
app.get('/recommendation/:city', async (req, res) => {
    const city = req.params.city;

    try {
        // Consulta a API B para obter o clima
        const weatherResponse = await axios.get(`http://localhost:3001/weather/${city}`);
        const { city: cityName, temp } = weatherResponse.data;

        // Gera a recomendação com base na temperatura
        let recommendation;
        if (temp > 30) {
            recommendation = "Está muito quente! Hidrate-se e use protetor solar.";
        } else if (temp >= 15 && temp <= 30) {
            recommendation = "Clima agradável. Ótimo dia para um passeio!";
        } else {
            recommendation = "Frio lá fora! Leve um casaco.";
        }

        // Retorna a resposta formatada
        res.json({
            city: cityName,
            temperature: temp,
            unit: "Celsius",
            recommendation,
        });

    } catch (error) {
        // Trata erros (ex: cidade não encontrada ou API B offline)
        res.status(500).json({
            error: "Não foi possível obter dados do clima.",
            details: error.message,
        });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`API A (Recomendações) rodando em http://localhost:${PORT}`);
});