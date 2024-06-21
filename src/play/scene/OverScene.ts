import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import MouseEventHandler from '../../engine/controller/MouseEventHandler'
import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'
import Button from '../button/Button'
import ButtonBuilder from '../button/ButtonBuilder'
import GameOverMessageBuilder from '../message/GameOverMessageBuilder'
import BoardBuilder from '../record/BoardBuilder'
import Score from '../score/Score'
import PlayScene from './PlayScene'

class OverScene extends Scene {
    private score: Score;   
    private highScore: Score;

    constructor() {
        super()

        this.createObjects()
    }

    public createObjects(): void {
        // Constructor
        const gamOverMessageBuilder = new GameOverMessageBuilder()
        const boardBuilder = new BoardBuilder()
        const buttonBuilder = new ButtonBuilder()

        this.score = new Score(
            new Image(),
            new Transform(),
            0,
            0,
            new Transform(),
            20,
            25,
            new Vector2D(482, 190)
        )

        this.highScore = new Score(
            new Image(),
            new Transform(),
            0,
            0,
            new Transform(),
            20,
            25,
            new Vector2D(482, 245)
        )

        localStorage.getItem('HIGH_SCORE') ? this.highScore.setScore(Number(localStorage.getItem('HIGH_SCORE'))) : 0

        gamOverMessageBuilder.addToScene(this)
        boardBuilder.addToScene(this)
        buttonBuilder.addToScene(this)
        this.score.addToScene(this)
        this.highScore.addToScene(this)

        this.score.setLayer(1)
        this.highScore.setLayer(1)

        MouseEventHandler.getInstance().addObject(buttonBuilder.build())
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
        
        if(localStorage.getItem('SCORE')){
            this.score.setScore(Number(localStorage.getItem('SCORE')))
        }
        
        if (localStorage.getItem('HIGH_SCORE') != null) {
            if (Number(localStorage.getItem('HIGH_SCORE')) < this.score.getScore()) {
                localStorage.setItem('HIGH_SCORE', this.score.getScore().toString())
                this.highScore.setScore(this.score.getScore())
            }
        } else {
            localStorage.setItem('HIGH_SCORE', this.score.getScore().toString())
            this.highScore.setScore(Number(localStorage.getItem('HIGH_SCORE')))
        }

        if (this.checkIsClicked()) {
            SceneManager.getInstance().getScene('gameOver').setIsActive(false)

            SceneManager.getInstance().updateScene('gamePlay', new PlayScene())
            SceneManager.getInstance().getScene('gamePlay').setIsActive(true)
        }
    }

    public checkIsClicked(): boolean {
        let button: Button | undefined
        for (let i = 0; i < this.listOfGameObjects.length; i++) {
            if (this.listOfGameObjects[i] instanceof Button) {
                button = this.listOfGameObjects[i] as Button
                break
            }
        }

        if (button) {
            if (button.getIsClicked()) {
                return true
            }
        }
        return false
    }

}

export default OverScene
