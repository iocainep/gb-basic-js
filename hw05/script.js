window.onload = function () {
    var mainBlock = document.querySelector('.block-chess'),
        block,
        flag = true,
        letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        units = {
            0: ['-263px -19px', '-484px -22px', '-372px -17px', '-150px -16px', '-150px -16px', '-372px -17px', '-484px -22px', '-263px -19px'],
            1: ['-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px'],
            6: ['-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px'],
            7: ['-263px -116px', '-484px -116px', '-372px -116px', '-150px -116px', '-150px -116px', '-372px -116px', '-484px -116px', '-263px -116px'],
        };

        for(let n = 0; n < 8; n++){
            numbersItem = document.createElement('div');
            numbersItem.className = 'numbers number' + (n + 1);
            numbersItem.innerText = n + 1;
            mainBlock.appendChild(numbersItem);
        }


    for (let i = 0; i < 9; i++) {

        if (i == 8) {
            blockLetters = document.createElement('div');
            blockLetters.className = 'block-letters';
            mainBlock.appendChild(blockLetters);
            for (let l = 0; l < 8; l++) {
                letterItem = document.createElement('div');
                letterItem.className = 'letter';
                letterItem.innerText = letters[l];
                blockLetters.appendChild(letterItem);
            }
        }
        for (let j = 0; j < 8; j++) {
            if (i == 8) return;

            if (j == 0) flag = !flag;

            block = document.createElement('div');

            if (flag && i !== 8) {
                block.className = 'block black';
            } else {
                block.className = 'block white';
            };

            if(units[i] !== undefined && units[i][j] !== undefined) {
                block.style.backgroundImage = "url('chess.png')";
                block.style.backgroundPosition = units[i][j];
            };

            mainBlock.appendChild(block);
            flag = !flag;
        }
    }
}