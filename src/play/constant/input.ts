import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import { random } from '../helper/helper'

const LIST_OF_INPUTS = {
    listOfGroundsInfo: {
        numberOfGrounds: 4,
        groundInfo: {
            path: '../assets/images/base.png',
            position: new Transform(),
            width: 336,
            height: 112,
            canvasPosition: new Transform(new Vector2D(200, 510 - 112)),
            canvasWidth: 336,
            canvasHeight: 112,
            speed: 100,
        },
        indexStart: 0,
    },

    listOfBackgroundsInfo: {
        numberOfBackgrounds: 3,
        backgroundInfo: {
            path: '../assets/images/background-night.png',
            position: new Vector2D(0, 0),
            width: 288,
            height: 512,
            canvasPosition: new Vector2D(288, 0),
            canvasWidth: 288,
            canvasHeight: 512,
            speed: 0,
        },
        indexStart: 0,
    },

    listOfPipesInfo: {
        numberOfPipes: 4,
        pipeInfo: {
            pathUp: '../../assets/images/pipe-green.png',
            pathDown: '../../assets/images/pipe-green-down.png',
            position: new Transform(),
            width: 52,
            height: 320,
            canvasPosition: new Transform(new Vector2D(random(800, 820), random(-100, -200))),
            canvasWidth: 52,
            canvasHeight: 320,
            speed: 200,
            space: 80,
        },
        indexStart: 1,
    },

    birdInfo: {
        path: '../../assets/images/yellowbird-midflap.png',
        position: new Transform(),
        width: 34,
        height: 24,
        canvasWidth: 33,
        canvasHeight: 30,
        speed: 0,
        jumpSpeed: 200,
    },

    messageInfo: {
        path: '../assets/images/message.png',
        position: new Transform(),
        width: 184,
        height: 267,
        canvasWidth: 184,
        canvasHeight: 267,
        speed: 0,
        dY: 80,
    },

    gameOverMessageInfo: {
        path: '../../assets/images/sprite.png',
        position: new Transform(new Vector2D(194, 231)),
        width: 184,
        height: 33,
        canvasWidth: 187 * 1.3,
        canvasHeight: 33 * 1.3,
        speed: 0,
        dY: 50,
    },

    boardInfo: {
        path: '../../assets/images/sprite.png',
        position: new Transform(new Vector2D(175, 272)),
        width: 225,
        height: 116,
        canvasWidth: 225 * 1.3,
        canvasHeight: 116 * 1.3,
        speed: 0,
        dY: -3,
    },

    buttonInfo: {
        path: '../../assets/images/sprite.png',
        position: new Transform(new Vector2D(246, 400)),
        width: 82,
        height: 28,
        canvasWidth: 82 * 1.5,
        canvasHeight: 30 * 1.5,
        speed: 0,
        dY: 70,
    },

    scoreInfo: {
        path: '',
        position: new Transform(),
        width: 0,
        height: 0,
        canvasPosition: new Transform(),
        canvasWidth: 24,
        canvasHeight: 36,
    },
}

export default LIST_OF_INPUTS
