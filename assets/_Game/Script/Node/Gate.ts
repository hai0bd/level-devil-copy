import { _decorator, Component, Game, instantiate, Node, Prefab } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { MapControl } from './MapControl';
const { ccclass, property } = _decorator;

@ccclass('Gate')
export class Gate extends Component {
    @property(Prefab)
    mapPrefab: Prefab[] = [];

    levelIndex: number = 0;
    isHandling: boolean = false;
    map: Node;
    mapControl: MapControl;

    start() {
        GameManager.instance.gateControl = this;
        this.instantieMap();
    }

    update(deltaTime: number) {
        if (this.isHandling) return;

        const player = this.mapControl.player;
        if (player.isWin) {
            this.isHandling = true;
            player.playerAnim.node.active = false;
            this.mapControl.gateAnim.enabled = true;

            this.scheduleOnce(this.nextLevel, 0.67);
        }
        else if (player.isLose) {
            this.isHandling = true;
            GameManager.instance.screenShake();
            player.node.active = false;
            this.mapControl.playerDeathAnim.enabled = true;
            this.scheduleOnce(this.playAgain, 1);
        }
    }

    nextLevel() {
        // this.map.active = false;
        this.isHandling = false;
        this.map.destroy();
        this.levelIndex++;

        if (this.levelIndex >= this.mapPrefab.length) {
            alert("To be continue");
            GameManager.instance.nextGate();
            return;
        }
        this.instantieMap();
    }

    playAgain() {
        this.isHandling = false;
        this.map.active = false;
        this.map.destroy();
        this.instantieMap();
    }

    instantieMap() {
        this.map = instantiate(this.mapPrefab[this.levelIndex])
        this.node.addChild(this.map);

        this.mapControl = this.map.getComponent(MapControl);
    }
}


