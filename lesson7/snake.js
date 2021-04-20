'use strict';
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
}

const config = {
    settings,

    init(userSettings){
        Object.assign(this.settings, userSettings);
    },
    getRowsCount(){
        return this.settings.rowsCount;

    },
    getColsCount(){
        return this.settings.colsCount;
    },
    getSpeed(){
        return this.settings.speed;
    },
    getWinFoodCount(){
        return this.settings.winFoodCount;
    },

    isValidSettings(){
        let result = {
            isValid: true,
            errors: [],
        }

        if (this.getRowsCount() > 30 || this.getRowsCount() < 10){
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }
        if (this.getColsCount() > 30 || this.getColsCount() < 10){
            result.isValid = false;
            result.errors.push('Неверные настройки, значение ColsCount должно быть в диапазоне [10, 30].');
        }
        if (this.getSpeed() > 10 || this.getSpeed() < 1){
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }
        if (this.getWinFoodCount() > 50 || this.getWinFoodCount() < 1){
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [1, 50].');
        }
        
        return result;
    }

}

const map = {
    cells: null,
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {}; // {x1_y1: td, x1_y2: td}
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, barrierPointsArray){
        for(const cell of this.usedCells) {
            cell.className = 'cell';
        }
        this.usedCells = [];

        snakePointsArray.forEach((point, idx) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
        
        // добавление к элементам препятствия класса
        barrierPointsArray.forEach((barrierPoint) => {
            const barrierCell = this.cells[`x${barrierPoint.x}_y${barrierPoint.y}`];
            barrierCell.classList.add('barrier');
            this.usedCells.push(barrierCell);
        });
    }
}

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init (startBody, direction){
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },
    getBody(){
        return this.body;
    },
    getLastStepDirection(){
        return this.lastStepDirection;
    },
    isOnPoint(point){
        return this.getBody().some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },
    makeStep(){
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },
    growUp(){
        const lastBodyIdx = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIdx];
        const lastBodyPointClone = Object.assign({},lastBodyPoint);
        this.body.push(lastBodyPointClone);
    },

    getNextStepHeadPoint(){
        const headPoint = this.getBody()[0];

        switch (this.direction) {
            case 'up':
                return {x: headPoint.x, y: headPoint.y - 1};
            case 'left':
                return {x: headPoint.x - 1, y: headPoint.y};
            case 'right':
                return {x: headPoint.x + 1, y: headPoint.y};
            case 'down':
                return {x: headPoint.x, y: headPoint.y + 1};
        }
    },
    
    setDirection(direction) {
        this.direction = direction;
    },

}

const food = {
    x: null,
    y: null,
    
    getCoordinates(){
        return {
            x: this.x,
            y: this.y,
        }
    },

    setCoordinates(point){
        this.x = point.x;
        this.y = point.y;

    },
    isOnPoint(point){
       return this.x === point.x && this.y === point.y;
    }
}
// объект препятствия
const barrier = {
    coordinates: [],
    getBarrierCoordinates() {
        return this.coordinates;
    },

    setBarrierCoordinates(point){
        return this.coordinates = [
            {x: point.x - 1, y: point.y - 1},
            {x: point.x, y: point.y},
            {x: point.x + 1, y: point.y + 1},
        ];  
    },

    isOnPoint(point){
        return this.getBarrierCoordinates().some(barrierPoint => barrierPoint.x === point.x && barrierPoint.y === point.y);
    },  
}

const status = {
    condition: null,

    setPlaying(){
        this.condition = 'playing';
    },
    setStopped(){
        this.condition = 'stopped';
    },
    setFinished(){
        this.condition = 'finished';
    },

    isPlaying(){
        return this.condition === 'playing';
    },
    isStopped(){
        return this.condition === 'stopped';
    }
}

const game = {
    config,
    map,
    snake,
    food,
    barrier,
    status,
    tickInterval: null,

    init(userSettings = {}){
        this.config.init(userSettings);
        const validation = this.config.isValidSettings();

        if(!validation.isValid){
            for (const err of validation.errors){
                console.error(err);
            }
        return;
        }
        
        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers(); 
        this.reset();
    },

    reset(){
        this.stop();
        this.snake.init(this.getStartBodyPoint(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.barrier.setBarrierCoordinates(this.getBarrierRndPoint());
        // this.barrierClone().setBarrierCoordinates(this.getBarrierRndPoint());
        this.setScore();
        this.render();
    },

    // получение рандомной точки для генерации препятствия
    getBarrierRndPoint(){
        while(true){
            const rndBarrierPoint = this.getRandomFreeCoordinates();
        
            if (this.isValidBarrierPoint(rndBarrierPoint)){
            return rndBarrierPoint;
            }
        }
    },
    // валидация рандомной точки препятствия из условия, чтобы препятсвие не выходило за границы поля 
    isValidBarrierPoint(point){
        if(
            point.x < this.config.getColsCount() - 1 &&
            point.y < this.config.getRowsCount() - 1 &&
            point.x > 0 &&
            point.y > 0
        ){
            return true;
        }
    },
    
    // Как на основе имеющегося объекта barrier сделать подобные, чтобы увеличить количество препятствий?

    // barrierClone(){
    //     Object.assign(barrierClone, this.barrier);
    // },

    getStartBodyPoint(){
        return [
            {
                x: Math.floor(this.config.getRowsCount() / 2),
                y: Math.floor(this.config.getColsCount() / 2),
            },
        ]
    },

    getRandomFreeCoordinates(){
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.barrier.getBarrierCoordinates()];

        while(true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getRowsCount()),
                y: Math.floor(Math.random() * this.config.getColsCount()),
            };
            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)){
                return rndPoint;
            }
        }
        
    },

    play(){
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop(){
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finished(){
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(textContents, isDisabled = false){
        const playButton = document.getElementById('playButton');
        playButton.textContent = textContents;

        isDisabled  ? playButton.classList.add('disabled')
                    : playButton.classList.remove('disabled');
    },

    tickHandler(){
        if(!this.canMakeStep()) return this.finished();

        if(this.food.isOnPoint(this.snake.getNextStepHeadPoint())){
            this.snake.growUp();
            this.setScore((this.snake.getBody().length - 1));
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            if(this.isGameWon()) this.finished();
        }

        this.snake.makeStep();
        this.render();
    },

    isGameWon(){
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },
    // установка счета из условия, что счет всегда равен длине змейки - 1
    setScore(value = 0){
        const score = document.getElementById('score');
        score.textContent = value;
    },

    canMakeStep(){
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return  !this.snake.isOnPoint(nextHeadPoint)&&
                !this.barrier.isOnPoint(nextHeadPoint)&& // ограничение на пересечение змейкой препятствия
                nextHeadPoint.x < this.config.getColsCount() &&
                nextHeadPoint.y < this.config.getRowsCount() &&
                nextHeadPoint.x >= 0 &&
                nextHeadPoint.y >= 0;
    },

    setEventHandlers(){
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
    },

    playClickHandler(){
        if(this.status.isPlaying()){
            this.stop();
        }
        else if(this.status.isStopped()){
            this.play();
        }
    },

    keyDownHandler(event){
        if(!this.status.isPlaying()) return;
        const direction = this.getDirectionByCode(event.code);
        if(this.canSetDirection(direction)) return this.snake.setDirection(direction);
    },

    getDirectionByCode(code){
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
        }

    },

    canSetDirection(direction){
        const lastStepDirection = this.snake.getLastStepDirection();

        return  direction === 'up' && lastStepDirection !== 'down' ||
                direction === 'down' && lastStepDirection !== 'up' ||
                direction === 'left' && lastStepDirection !== 'right' ||
                direction === 'right' && lastStepDirection !== 'left';

    },

    newGameClickHandler(){
        this.reset();
    },

    render(){
        this.map.render(this.snake.getBody(), this.food.getCoordinates(),this.barrier.getBarrierCoordinates());
    },

}
game.init({speed:10});
