// Funkcja pobierająca i aktualizująca dane o bocie z Discord API
function fetchAndUpdateBotData() {
  fetch('https://discord.com/api/v9/guilds/GUILD_ID/widget.json', {
    headers: {
      'Authorization': 'MTIzMzkxNjIwMjQzNTM0NjQzMg.Gr0DQI.f24JTowvE1NTjhdeO-P3VofiAoqNQMZ7WkEHyw'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Aktualizuj dane o bocie na stronie
    document.getElementById('botUsersCount').textContent = data.approximate_guild_count;
    document.getElementById('botStatus').textContent = data.status;
  })
  .catch(error => console.error('Błąd pobierania danych o bocie:', error));
}

// Wywołaj funkcję fetchAndUpdateBotData() po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
  fetchAndUpdateBotData();
  // Uruchom funkcję fetchAndUpdateBotData() co minutę
  setInterval(fetchAndUpdateBotData, 60000);
});

