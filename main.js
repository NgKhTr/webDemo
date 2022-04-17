let mainCanvas = document.getElementById('mainCanvas'),
    mainCanvas_context = mainCanvas.getContext('2d');
const constHeight = 600,
    constWidth = 1000,
    constCentralRadius = 20,
    constBulletRadius = 5;
mainCanvas.width = constWidth;
mainCanvas.height = constHeight;

function clear() {
    mainCanvas_context.clearRect(0, 0, constWidth, constHeight);
}

function drawCenter() {
    mainCanvas_context.beginPath();
    mainCanvas_context.arc(constWidth/2, constHeight/2, constCentralRadius, 0, Math.PI*2);
    mainCanvas_context.fillStyle = 'RED';
    mainCanvas_context.fill();
}
class Bullet {
    constructor( distance, angle) {
        this.distance = distance;
        this.angle = angle;
        this.x = constWidth/2 + distance*Math.cos(angle);
        this.y = constHeight/2 + distance*Math.sin(angle);
    }
    move() {
        this.distance += 5;
        this.x = constWidth/2 + this.distance*Math.cos(this.angle);
        this.y = constHeight/2 + this.distance*Math.sin(this.angle);
    }
    draw() {
        mainCanvas_context.beginPath();
        mainCanvas_context.arc(
            this.x,
            this.y, 
            constBulletRadius, 0, Math.PI*2);
        mainCanvas_context.fillStyle = 'RED';
        mainCanvas_context.fill();
    }
    removeIfNecessary( bulletS) {
        if ((this.x <= -constBulletRadius || this.x >= constWidth + constBulletRadius)
            || (this.y <= -constBulletRadius || this.y >= constHeight + constBulletRadius)) {
            let result = [];
            for (let bullet of bulletS) {
                if (bullet != this) {
                    result.push(bullet);
                }
            }
            return result;
        }
        else return bulletS;
    }
}

function drawABullet( distance, angle) {
    console.log('Đã vào bullte:', distance);
    let x = constWidth/2 + distance*Math.cos(angle),
        y = constHeight/2 + distance*Math.sin(angle);
    mainCanvas_context.beginPath();
    mainCanvas_context.arc(
        x,
        y, 
        constBulletRadius, 0, Math.PI*2);
    mainCanvas_context.fillStyle = 'RED';
    mainCanvas_context.fill();
    // if ((x >= -constBulletRadius && x <= constWidth + constBulletRadius)
    //     && (y >= -constBulletRadius && y <= constHeight + constBulletRadius)) {
    //     requestAnimationFrame(() => drawABullet( distance + 5, angle));
    // }
    
}

function drawBulletS () {
    bulletS.push(new Bullet( 0, a));
    for(let bullet of bulletS) {
        bullet.move();
        bullet.draw();
        bulletS = bullet.removeIfNecessary(bulletS);
    }
    a += 1;
}

let a = 0, frame = 0, bulletS = [];
function render() {
    if (frame%2 == 0) {
        clear();
        //drawCenter();
        drawBulletS();
        console.log(bulletS);
    }
    frame++;
    requestAnimationFrame(render);
}

requestAnimationFrame(render)
