import { _decorator, CCFloat, Collider2D, Component, Contact2DType, IPhysics2DContact, tween } from 'cc';
import { CollisionTag } from './Manager/GameManager';
import { TrapMove } from './TrapMove';
import { AudioSourceControl, SoundType } from './Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('TrapSensor')
export class TrapSensor extends Component {
    @property(Collider2D)
    trapSensorCollider: Collider2D;

    @property(TrapMove)
    trapMove: TrapMove[] = [];

    @property(CCFloat)
    timeDelay: number = 0;

    index: number = 0;

    start() {
        this.checkCollider()
    }
    checkCollider() {
        const collier = this.trapSensorCollider;
        if (collier) {
            collier.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    offCollider() {
        const collier = this.trapSensorCollider;
        if (collier) {
            collier.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == CollisionTag.Player) {
            this.enableTrap();
            this.offCollider();
        }
    }

    enableTrap() {
        this.playSfx(SoundType.Trap_Move);
        if (this.index >= this.trapMove.length) return;
        tween(this.node)
            .delay(this.timeDelay)
            .call(() => {
                this.trapMove[this.index].enabled = true;
                this.index++;
                this.enableTrap();
            })
            .start();
    }
    playSfx(sound: SoundType){
        const audio = AudioSourceControl.instance;
        audio.playSound(sound);
    }
}

