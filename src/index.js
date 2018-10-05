module.exports = function solveSudoku(matrix) {
    function substitutionNum() {
        let row = -1;
        let col = -1;
        let elem = searchElement(matrix, row, col);
        row = elem[0];
        col = elem[1];

        if (row == -1) {
            console.log('done');
            return true;
        }

        for (var newNum = 1; newNum <= 9; newNum++) {
            if (checkRow(matrix, row, newNum) && checkCol(newNum, matrix, col) && checkSquare(newNum, matrix, row, col)) {
                matrix[row][col] = newNum;
                if (substitutionNum()) {
                    return true;
                }

                matrix[row][col] = 0;
            }
        }

        return false;
    }

    function checkRow(arr, row, newNum) {
        if (arr[row].indexOf(newNum) == -1) {
            return true;
        }
        return false;
    }

    function checkCol(num, arr, col) {
        for (let k = 0; k < 9; k++) {
            if (arr[k][col] == num) {
                return false;
            }
        }
        return true;
    }

    function checkSquare(num, arr, row, col) {
        let littleRow = getInterval(row);
        let littleCol = getInterval(col);

        for (let l = littleRow; l < 3 + littleRow; l++) {
            for (let b = littleCol; b < 3 + littleCol; b++) {
                if (arr[l][b] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    function getInterval(num) {
        let interval;
        if (num < 3) {
            interval = 0;
        } else if (num < 6 && num > 2) {
            interval = 3;
        } else {
            interval = 6;
        }

        return interval;
    }

    function searchElement(arr, row = -1, col = -1) {
        let elem = [row, col];
        outterLoop: for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] == 0) {
                    elem[0] = i;
                    elem[1] = j;
                    break outterLoop;
                } else {
                    elem = [-1, -1];
                    if (row < 8) {
                        row++
                    } else {
                        col++;
                        row = 0;
                    }
                }
            }
        }

        return elem;

    }

    substitutionNum();
    return matrix;
};