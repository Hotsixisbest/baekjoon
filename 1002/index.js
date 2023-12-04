const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const data = input.split('\n').map((e, i) => {
    if(i > 0){
        return e.trim().split(' ').map(el => Number(el));
    }
}).filter(e => e);

let R = data.map(e => {
    let type = getType(...e);
    return result = check(...e, type);
})

console.log(R.join('\n'));

//내부 외부 체크
function getType(x1, y1, r1, x2, y2, r2){
    if(x1 === x2 && y1 === y2){
        if(r1 === r2){
            return 'same';
        }
        else{
            return 'none';
        }
    }

    let r = Math.max(r1, r2) ** 2;

    let d = getDistanceSquare(x1, y1, x2, y2);
    if(d < r){
        return 'in';
    }
    else if(d === r){
        return 'border';
    }
    else{
        return 'out';
    }
}

//경우
function check(x1, y1, r1, x2, y2, r2, type){
    switch(type){
        case 'in':{//내부
            let R = (r1 - r2) ** 2;
            let D = getDistanceSquare(x1,y1,x2,y2);
            if(R > D){
                return 0;
            }
            else if(R === D){
                return 1;
            }
            else{
                return 2;
            }
        }
        case 'border':{//경계
            return 2;
        }
        case 'out':{//외부
            let R = (r1 + r2) ** 2;
            let D = getDistanceSquare(x1,y1,x2,y2);
            if(R > D){
                return 2;
            }
            if(R == D){
                return 1;
            }
            return 0;
        }
        case 'same':{//같은원
            return -1;
        }
        case 'none':{//동심원이지만 반지름이 다름
            return 0;
        }
    }
}

function getDistanceSquare(x1, y1, x2, y2){
    return (x1-x2) ** 2 + (y1-y2) ** 2;
}