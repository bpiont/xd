document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '1000';

        const modalContent = document.createElement('div');
        modalContent.style.background = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '10px';
        modalContent.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        modalContent.innerHTML = `
            <h2>Witaj na CustomBot!</h2>
            <p>Dołącz do naszego serwera na Discord i odkryj wszystkie funkcje!</p>
            <button onclick="modal.style.display='none';">Zamknij</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Zamknięcie modalu po kliknięciu poza jego treść
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }, 5000); // Czas oczekiwania przed pokazaniem modalu - 5000ms (5 sekund)
});
