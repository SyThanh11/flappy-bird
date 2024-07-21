import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import HELPER from '../helper/helper'

const LIST_OF_INPUTS = {
    LIST_OF_GROUNDS_INFO: {
        NUMBER_OF_GROUNDS: 4,
        GROUND_INFO: {
            PATH: '../assets/images/base.png',
            POSITION: new Transform(),
            WIDTH: 336,
            HEIGHT: 112,
            CANVAS_POSITION: new Transform(new Vector2D(200, 510 - 112)),
            CANVAS_WIDTH: 336,
            CANVAS_HEIGHT: 112,
            SPEED: 100,
        },
        INDEX_START: 0,
    },

    LIST_OF_BACKGROUNDS_INFO: {
        NUMBER_OF_BACKGROUNDS: 3,
        BACKGROUND_INFO: {
            PATH: '../assets/images/background-night.png',
            POSITION: new Vector2D(0, 0),
            WIDTH: 288,
            HEIGHT: 512,
            CANVAS_POSITION: new Vector2D(288, 0),
            CANVAS_WIDTH: 288,
            CANVAS_HEIGHT: 512,
            SPEED: 0,
        },
        INDEX_START: 0,
    },

    LIST_OF_PIPES_INFO: {
        NUMBER_OF_PIPES: 4,
        PIPE_INFO: {
            PATH_UP: '../../assets/images/pipe-green.png',
            PATH_DOWN: '../../assets/images/pipe-green-down.png',
            POSITION: new Transform(),
            WIDTH: 52,
            HEIGHT: 320,
            CANVAS_POSITION: new Transform(
                new Vector2D(HELPER.random(800, 820), HELPER.random(-100, -200))
            ),
            CANVAS_WIDTH: 52,
            CANVAS_HEIGHT: 320,
            SPEED: 200,
            SPACE: 80,
        },
        INDEX_START: 1,
    },

    BIRD_INFO: {
        PATH: '../../assets/images/yellowbird-midflap.png',
        POSITION: new Transform(),
        WIDTH: 34,
        HEIGHT: 24,
        CANVAS_WIDTH: 33,
        CANVAS_HEIGHT: 30,
        SPEED: 0,
        JUMP_SPEED: 250,
    },

    MESSAGE_INFO: {
        PATH: '../assets/images/message.png',
        POSITION: new Transform(),
        WIDTH: 184,
        HEIGHT: 267,
        CANVAS_WIDTH: 184,
        CANVAS_HEIGHT: 267,
        SPEED: 0,
        DY: 80,
    },

    GAME_OVER_MESSAGE_INFO: {
        PATH: '../../assets/images/sprite.png',
        POSITION: new Transform(new Vector2D(194, 231)),
        WIDTH: 184,
        HEIGHT: 33,
        CANVAS_WIDTH: 187 * 1.3,
        CANVAS_HEIGHT: 33 * 1.3,
        SPEED: 0,
        DY: 50,
    },

    BOARD_INFO: {
        PATH: '../../assets/images/sprite.png',
        POSITION: new Transform(new Vector2D(175, 272)),
        WIDTH: 225,
        HEIGHT: 116,
        CANVAS_WIDTH: 225 * 1.3,
        CANVAS_HEIGHT: 116 * 1.3,
        SPEED: 0,
        DY: -3,
    },

    BUTTON_INFO: {
        PATH: '../../assets/images/sprite.png',
        POSITION: new Transform(new Vector2D(246, 400)),
        WIDTH: 82,
        HEIGHT: 28,
        CANVAS_WIDTH: 82 * 1.5,
        CANVAS_HEIGHT: 30 * 1.5,
        SPEED: 0,
        DY: 70,
    },

    SCORE_INFO: {
        PATH: '',
        POSITION: new Transform(),
        WIDTH: 0,
        HEIGHT: 0,
        CANVAS_POSITION: new Transform(),
        CANVAS_WIDTH: 24,
        CANVAS_HEIGHT: 36,
    },
}

export default LIST_OF_INPUTS
