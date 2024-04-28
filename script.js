fetch('(link unavailable)')
  .then(response => response.json())
  .then(data => {
    document.getElementById('server-count').textContent = data.guilds;
    document.getElementById('user-count').textContent = data.users;
    document.getElementById('command-count').textContent = data.commandsExecuted;
  });
