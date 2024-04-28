// Funkcja pobierająca dane o bocie z Discord API
function fetchBotData() {
  fetch('https://discord.com/api/bots/BOT_ID', {
    headers: {
      'Authorization': 'MTIzMzkxNjIwMjQzNTM0NjQzMg.G21EGf.X6jycfCjAcJZ5d0nE17wqFdYmX4yrDg5ggPmc4'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Tutaj przetwarzaj dane i aktualizuj zawartość strony
    updatePageWithBotData(data);
  })
  .catch(error => console.error('Błąd pobierania danych o bocie:', error));
}

// Funkcja aktualizująca zawartość strony z danymi o bocie
function updatePageWithBotData(botData) {
  document.getElementById('botUsersCount').textContent = botData.usersCount;
  document.getElementById('botStatus').textContent = botData.status;
}

// Wywołanie funkcji pobierającej dane po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
  fetchBotData();
  // Możesz również dodać setInterval(fetchBotData, 60000); aby regularnie odświeżać dane co minutę
});
