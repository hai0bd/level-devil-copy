import { _decorator, Animation, Component, RigidBody2D } from 'cc';
import { DeathAnim } from '../DeathAnim';
import { PlayerController } from '../PlayerController';
const { ccclass, property } = _decorator;

@ccclass("MapControl")
export class MapControl extends Component {
    /* @property(Player)
    player: Player; */

    @property(Animation)
    gateAnim: Animation | null = null;

    @property(DeathAnim)
    playerDeathAnim: DeathAnim;

    @property(PlayerController)
    player: PlayerController;

    /* update(deltaTime: number) {
        if(this.player.isTrapped > 0){
            console.log("isTrapped");
            this.moveTrap(this.player.isTrapped);
        }
    }
    moveTrap(index: number){
        this.groundTrap[index].enabled = true;
    } */
}
