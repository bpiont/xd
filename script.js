// Sprawdzanie, czy użytkownik jest zalogowany
const isLoggedIn = () => {
    const token = localStorage.getItem('discordToken');
    return token !== null;
};

// Wyświetlanie odpowiedniego widoku w zależności od tego, czy użytkownik jest zalogowany
const renderView = () => {
    const loginDiv = document.getElementById('login');
    const userPanelDiv = document.getElementById('user-panel');

    if (isLoggedIn()) {
        loginDiv.style.display = 'none';
        userPanelDiv.style.display = 'block';
        // Pobierz dane użytkownika i wyświetl je w panelu
        getUserData();
    } else {
        loginDiv.style.display = 'block';
        userPanelDiv.style.display = 'none';
    }
};

// Funkcja do pobierania danych użytkownika z Discorda
const getUserData = () => {
    // Pobierz token dostępu z localStorage
    const token = localStorage.getItem('discordToken');
    // Wykonaj zapytanie do API Discorda, aby uzyskać dane użytkownika
    fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Wyświetl nazwę użytkownika w panelu
        document.getElementById('username').textContent = data.username;
    })
    .catch(error => {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
    });
};

// Funkcja wywoływana po zalogowaniu
const onLogin = () => {
    // Tutaj możesz zapisać token dostępu do Discorda w localStorage
    // (na potrzeby przykładu, zapiszmy fikcyjny token)
    const fakeToken = 'fakeToken';
    localStorage.setItem('discordToken', fakeToken);
    // Przeładuj stronę po zalogowaniu
    window.location.reload();
};

// Funkcja wylogowywania
const logout = () => {
    // Usuń token dostępu z localStorage
    localStorage.removeItem('discordToken');
    // Przeładuj stronę po wylogowaniu
    window.location.reload();
};

// Nasłuchiwanie kliknięcia na przycisk logowania
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#login a');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            // Funkcja do wykonania po kliknięciu przycisku logowania
            onLogin();
        });
    }

    // Renderuj widok po załadowaniu strony
    renderView();
});

