fetch('https://discord.com/api/v9/guilds/GUILD_ID/widget.json', {
  headers: {
    'Authorization': 'MTIzMzkxNjIwMjQzNTM0NjQzMg.Gr0DQI.f24JTowvE1NTjhdeO-P3VofiAoqNQMZ7WkEHyw'
  }
})
.then(response => response.json())
.then(data => {
  const botStatus = data.instant_invite ? 'Online' : 'Offline';
  const botUsersCount = data.members.length;
  document.getElementById('botStatus').textContent = botStatus;
  document.getElementById('botUsersCount').textContent = botUsersCount;
})
.catch(error => console.error('Błąd pobierania danych o bocie:', error));
