import { createCanvas, loadImage } from 'canvas';

// x,y is the location on the canvas that the image will rotate around
// cx,cy is the coordinates on the image that is rotated around
// angle is the amount of rotation in radians
export function drawImageRotated(image, ctx, x,y,cx,cy,angle){
    ctx.setTransform(1,0,0,1,x,y);  // set the rotation origin
    ctx.rotate(angle); // rotate
    ctx.drawImage(image,-cx,-cy); // draw image offset to put cx,cy at the point of rotation
    ctx.setTransform(1,0,0,1,0,0); // restore the transform
}

export function degToRad(degree) {
    return Math.PI * degree / 180;
}