'use strict';

const chessBoard = {
    rowCount: 8,
    colCount: 8,
    backGroundColorBlack: '#000',
    backGroundColorWhite: '#FFF',
    containerElement: null,
    cellElement: [],
    setCells(){
        this.containerElement = document.getElementById('chess');
        this.containerElement.innerHTML = '';
        this.cellElements = [];
        
        for(let row = 0; row < this.rowCount; row++){
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
                
            for(let col = 0; col < this.colCount; col++){
                const tdElem = document.createElement('td');
                trElem.appendChild(tdElem);
                this.cellElement.push(tdElem);
                
            }
        }
        const cellsBlackEven = document.querySelectorAll('tr:nth-child(2n)>td:nth-child(2n)');
        cellsBlackEven.forEach(cellsBlackItem => {
            cellsBlackItem.style.backgroundColor = this.backGroundColorBlack;
            });
        const cellsBlackOdd = document.querySelectorAll('tr:nth-child(2n+1)>td:nth-child(2n+1)');
        cellsBlackOdd.forEach(cellsBlackItem => {
            cellsBlackItem.style.backgroundColor = this.backGroundColorBlack;
            });
    },
    


}
chessBoard.setCells();