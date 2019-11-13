import {
    createCanvas,
    loadImage
} from 'canvas';
import {
    checkServerIdentity
} from 'tls';

export const styleDefault =  {
    cellWidth: 15,
    cellHeight: 15,
    fontSize: 12,
    padding: 5
}

// x,y is the location on the canvas that the image will rotate around
// cx,cy is the coordinates on the image that is rotated around
// angle is the amount of rotation in radians
export function drawImageRotated(image, ctx, x, y, cx, cy, angle) {
    ctx.setTransform(1, 0, 0, 1, x, y); // set the rotation origin
    ctx.rotate(angle); // rotate
    ctx.drawImage(image, -cx, -cy); // draw image offset to put cx,cy at the point of rotation
    ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
}

export function degToRad(degree) {
    return Math.PI * degree / 180;
}

var getWallToDraw = (x, y, board, inBetweenWall = false) => {
    var toDraw = [];
    if (!inBetweenWall) {
        if (x - 1 < 0 || !board[y][x - 1]) {
            toDraw.push('left');
        }
        if (y + 1 >= board.length || !board[y + 1][x]) {
            toDraw.push('bottom');
        }
        if (x + 1 >= board[0].length || !board[y][x + 1]) {
            toDraw.push('right');
        }
        if (y - 1 < 0 || !board[y - 1][x]) {
            toDraw.push('top')
        }
    } else {
        toDraw = ['left', 'bottom', 'right', 'top']
    }

    return toDraw
}
export function drawGrid(board, showLetter = true, upperCase = true, inBetweenWall = false, wordIndex = false, style = styleDefault) {
    let {
        cellWidth,
        cellHeight,
        padding
    } = style;
    const w = board[0].length;
    const h = board.length
    var canvas = createCanvas(w * cellWidth + padding, h * cellHeight + padding)
    var ctx = canvas.getContext('2d');
    padding = padding / 2.0;
   
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (board[y][x]) {
                var walls = getWallToDraw(x, y, board, inBetweenWall);
                walls.forEach(wall => {
                    switch (wall) {
                        case "left":
                            ctx.moveTo(x * cellWidth + padding, y * cellHeight + padding);
                            ctx.lineTo(x * cellWidth + padding, (y + 1) * cellHeight + padding)
                            break
                        case "bottom":
                            ctx.moveTo(x * cellWidth + padding, (y + 1) * cellHeight + padding);
                            ctx.lineTo((x + 1) * cellWidth + padding, (y + 1) * cellHeight + padding)
                            break
                        case "top":
                            ctx.moveTo(x * cellWidth + padding, y * cellHeight + padding);
                            ctx.lineTo((x + 1) * cellWidth + padding, y * cellHeight + padding)
                            break
                        case "right":
                            ctx.moveTo((x + 1) * cellWidth + padding, y * cellHeight + padding);
                            ctx.lineTo((x + 1) * cellWidth + padding, (y + 1) * cellHeight + padding)
                            break
                        default:
                            console.error("Invalid Wall", wall);
                    }
                    ctx.stroke();
                })
                if (showLetter) {
                    ctx.font = `normal ${style.fontSize}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';                
                    let letter = upperCase ? board[y][x].toLocaleUpperCase() : board[y][x];
                    ctx.fillText(letter, x * cellWidth + (cellWidth / 2) + padding, (y * cellHeight) + (cellHeight / 2) + padding)
                }
                if (wordIndex) {
                    // console.log(wordIndex);
                    let index = wordIndex.filter((val) => val.x === y && val.y === x);
                    if(index.length > 0 && index[0]) {
                        index = index[0]
                        console.log(index)
                        ctx.font = `normal ${6}px sans-serif`;
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'top';
                        ctx.fillText(index.number, x * cellWidth + (cellWidth / 10.0) + padding, (y * cellHeight) + (cellHeight / 10.0) + padding)
                    }
                }
            }
        }
    }

    // if(wordIndex) {
    //     wordIndex.forEach(word => {
    //         ctx.font = `normal ${8}px sans-serif`;
    //         ctx.textAlign = 'left';
    //         ctx.textBaseline = 'top'
    //         ctx.fillText(word.number, word.x * cellWidth + (cellWidth / 5.0) + padding, (word.y * cellHeight) + (cellHeight / 5.0) + padding)
    //     })
    // }

    return canvas.toBuffer();
}
