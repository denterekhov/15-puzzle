document.addEventListener('DOMContentLoaded', () => {
  const newGame = () => {
    const BOARD_SIZE = 4;
    const tilesNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    let disorderParameter;
    let randomTileNumbers;
    let counter = 0;
    document.getElementById('counter').textContent = 'Moves: 0';

    do {
      disorderParameter = 0;
      randomTileNumbers = tilesNumbers.slice(0, 15).sort(() => Math.random() - 0.5);
      for (let i = 0; i < randomTileNumbers.length - 1; i++) {
        for (let j = i + 1; j < randomTileNumbers.length; j++) {
          if (randomTileNumbers[i] > randomTileNumbers[j]) {
            disorderParameter++;
          }
        }
      }
    } while (disorderParameter % 2);// use Sam Loyd's proof

    [...document.querySelectorAll('.tile')].forEach((element, index) => {
      element.textContent = randomTileNumbers[index];
    });

    const moveCounter = document.getElementById('counter');
    const tileMove = (event) => {
      const tiles = [...document.querySelectorAll('.tile')];
      const emptyElement = document.querySelector('.empty');
      const targetElement = event.target;
      const emptyElementIndex = tiles.indexOf(emptyElement);
      const targetIndex = tiles.indexOf(targetElement);
      const currentOrder = [];

      if (Math.abs(targetIndex - emptyElementIndex) === 1 || Math.abs(targetIndex - emptyElementIndex) === BOARD_SIZE) {
        if (!(targetIndex % 4) && (targetIndex - emptyElementIndex === 1)) return false;
        if ((targetIndex % 4 === 3) && (targetIndex - emptyElementIndex === -1)) return false;
        [emptyElement.outerHTML, targetElement.outerHTML] = [targetElement.outerHTML, emptyElement.outerHTML];
        counter++;
        moveCounter.textContent = `Moves: ${counter}`;
        [...document.querySelectorAll('.tile')].reduce((arr, el) => {
          arr.push(+el.textContent);
          return arr;
        }, currentOrder);
      }

      if (currentOrder.join(',') === tilesNumbers.join(',')) {
        document.querySelector('.congrats').classList.remove('invisible');
        document.removeEventListener('click', tileMove);
      }
    };
    document.addEventListener('click', tileMove);
  };

  document.querySelector('.newGame').addEventListener('click', () => {
    document.querySelector('.congrats').classList.add('invisible');
    newGame();
  });
  newGame();
});
