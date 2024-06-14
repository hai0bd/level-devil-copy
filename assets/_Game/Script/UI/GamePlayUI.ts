import { _decorator, Component, game, Game, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { MapUI } from './MapUI';
import { ScrollPopUp } from './ScrollPopUp';
const { ccclass, property } = _decorator;

@ccclass('GamePlayUI')
export class GamePlayUI extends Component {
    @property(ScrollPopUp)
    map: ScrollPopUp;

    @property(Node)
    settingNode: Node = null;

    onClickEsc() {
        this.node.active = false;
        GameManager.instance.gate.destroy();
        this.map.node.active = true;
        this.map.init();
    }

    onButtonReplay() {
        GameManager.instance.gateControl.playAgain();
    }

    onButtonSetting() {
        if (this.settingNode) {
            this.settingNode.active = true;
        }
    }
}



