import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { ScrollPopUp } from './ScrollPopUp';
const { ccclass, property } = _decorator;

@ccclass('MapUI')
export class MapUI extends Component {
    @property(Node)
    playUI: Node = null;

    @property(Node)
    mainMenu: Node;

    @property(ScrollPopUp)
    popup: ScrollPopUp;

    isOpen = false;

    onClickBack() {
        this.popup.onClickEsc();
        this.mainMenu.active = true;
    }

    onClickGate(deltaTime: number, customEvenData: string) {
        this.playUI.active = true;
        this.popup.onClickEsc();
        GameManager.instance.instantieGate(parseInt(customEvenData));
        // this.node.active = false;
    }
}


