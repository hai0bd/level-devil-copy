import { _decorator, Button, Component, Game, Input, Node, Scene } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { BouncePopUp } from './BouncePopUp';
import { ScrollPopUp } from './ScrollPopUp';
import { ScreenShake } from '../ScreenShake';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property(Button)
    startButton: Button;

    @property(Button)
    optionButton: Button;

    @property(Button)
    shopButton: Button;

    @property(ScrollPopUp)
    map: ScrollPopUp;

    @property(BouncePopUp)
    shopUI: BouncePopUp = null;
/* 
    start() {
        this.startButton.node.on(Input.EventType.TOUCH_START, this.onButtonStartClick, this);
    } */

    onButtonStartClick() {
        this.playSfx(SoundType.Button_Click);
        this.node.active = false;
        this.map.node.active = true;
        this.map.init();
    }

    onButtonOptionClick() {
        this.playSfx(SoundType.Button_Click);
        GameManager.instance.screenShake();
    }

    onButtonShopClick() {
        this.playSfx(SoundType.Button_Click);
        this.shopUI.node.active = true;
        this.shopUI.init();
    }

    playSfx(sound: SoundType) {
        const audio = AudioSourceControl.instance;
        audio.playSound(sound);
    }
}
