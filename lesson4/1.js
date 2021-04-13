'use strict';

// let obj = {
//     сотни: null,
//     десятки: null,
//     еденицы: null,
//     numberAdd(){

//         while(true) {
//             let num = +prompt ('Введите целое число от 0 до 999 или -1 для выхода');
//             if (num === -1) break;
//             if (!Number.isInteger(num) || num < 0 || num > 999){
//                 alert('Число не является целым, либо не находится в диапазоне от 0 до 999');
//                 continue;
//             } 
//             this.еденицы = num % 10;
//             this.десятки = Math.floor(num / 10) % 10;
//             this.сотни = Math.floor(num / 100);
//             return;
//         }       
//     }
// }
// obj.numberAdd();
// console.log(obj);

let obj1 = {
    сотни: null,
    десятки: null,
    еденицы: null, 
}

function  numberAdd(obj){

    while(true) {
        let num = +prompt ('Введите целое число от 0 до 999 или -1 для выхода');
        if (num === -1) break;
        if (!Number.isInteger(num) || num < 0 || num > 999){
            alert('Число не является целым, либо не находится в диапазоне от 0 до 999');
            continue;
        } 
        obj.еденицы = num % 10;
        obj.десятки = Math.floor(num / 10) % 10;
        obj.сотни = Math.floor(num / 100);
        return;
    }       
}
numberAdd(obj1);
console.log(obj1);