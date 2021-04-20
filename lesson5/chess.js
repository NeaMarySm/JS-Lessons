'use strict';

function chessGenerator() {
    let rowCount = 9;
    let colCount = 9;
    let colorBlackCell = '#24160B';
    let chessBoardContainer = document.getElementById('chess');
    chessBoardContainer.innerHTML = '';
    let cellElements = [];
    let letters = ['A','B','C','D','E','F','G','H'];
    let numbers = ['1','2','3','4','5','6','7','8'];

        for(let row = 0; row < rowCount; row++){
                    const trElem = document.createElement('tr');
                    chessBoardContainer.appendChild(trElem);
                        
                    for(let col = 0; col < colCount; col++){
                        const tdElem = document.createElement('td');
                        trElem.appendChild(tdElem);
                        cellElements.push(tdElem);         
                    }
        }
    
    const cellsBlackEven = document.querySelectorAll('tr:nth-child(2n)>td:nth-child(2n)');
        cellsBlackEven.forEach(cell => {
            cell.classList.add('black-cell');
         });

    const cellsBlackOdd = document.querySelectorAll('tr:nth-child(2n+1)>td:nth-child(2n+1)');
        cellsBlackOdd.forEach(cell => {
            cell.classList.add('black-cell');
         });

    const letterCells = document.querySelectorAll('tr:first-child>td');
        letterCells.forEach(cell => {
            cell.classList.remove('black-cell');
        });
        
        for (let i = 1; i < letterCells.length; i++){
            letterCells[i].textContent = letters[(i-1)];  
        }

    const numberCells = document.querySelectorAll('tr>td:first-child');
        numberCells.forEach(cell => {
            cell.classList.remove('black-cell');
        });
        
        for (let i = 1; i < numberCells.length; i++){
            numberCells[i].textContent = numbers[(i-1)];  
        }

    const cellsBlack = document.querySelectorAll('.black-cell');
        cellsBlack.forEach(cellsBlackItem => {
                    cellsBlackItem.style.backgroundColor = colorBlackCell;
        });
    
}

chessGenerator();
 