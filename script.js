const emojis = ['🎉', '🎈', '🍕', '🐶', '🍎', '🚗', '🌟', '⚽'];
let cards = [...emojis, ...emojis];
cards.sort(() => 0.5 - Math.random());

let gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard;
let lock = false;

cards.forEach(emoji => {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = '?';
  card.dataset.emoji = emoji;
  card.addEventListener('click', () => {
    if (lock || card.classList.contains('matched') || card === firstCard) return;

    card.textContent = card.dataset.emoji;

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lock = true;

      if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetCards();
      } else {
        setTimeout(() => {
          firstCard.textContent = '?';
          secondCard.textContent = '?';
          resetCards();
        }, 1000);
      }
    }
  });
  gameBoard.appendChild(card);
});

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}
