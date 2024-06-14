import { _decorator, Button, Component, Input } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('ButtonMove')
export class ButtonMove extends Component {
    @property(Button)
    buttonLeft: Button;

    @property(Button)
    buttonRight: Button;

    @property(Button)
    buttonJump: Button;

    start() {
        this.checkEndEvent();
        this.checkStartEvent();
    }
    checkStartEvent() {
        this.buttonLeft.node.on(Input.EventType.TOUCH_START, this.onClickButtonLeft, this);
        this.buttonRight.node.on(Input.EventType.TOUCH_START, this.onClickButtonRight, this);
        this.buttonJump.node.on(Input.EventType.TOUCH_START, this.onClickButtonJump, this);
    }
    checkEndEvent() {
        this.buttonLeft.node.on(Input.EventType.TOUCH_END, this.offClickButton, this);
        this.buttonRight.node.on(Input.EventType.TOUCH_END, this.offClickButton, this);
        this.buttonLeft.node.on(Input.EventType.TOUCH_CANCEL, this.offClickButton, this);
        this.buttonRight.node.on(Input.EventType.TOUCH_CANCEL, this.offClickButton, this);
    }

    onClickButtonLeft() {
        GameManager.instance.gateControl.mapControl.player.playerMoveLeft();
    }
    onClickButtonRight() {
        GameManager.instance.gateControl.mapControl.player.playerMoveRight();
    }
    onClickButtonJump() {
        GameManager.instance.gateControl.mapControl.player.playerJump();
    }
    offClickButton() {
        GameManager.instance.gateControl.mapControl.player.stopMove();
    }
}


