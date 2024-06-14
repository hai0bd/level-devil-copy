import { _decorator, CCInteger, Component, math, Node, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeathAnim')
export class DeathAnim extends Component {
    @property(RigidBody2D)
    deathAnim: RigidBody2D[] = [];

    @property(Node)
    player: Node = null;

    jumpForce: Vec2 = new Vec2();

    start() {
        this.node.setPosition(this.player.position);
        for (let i = 0; i < this.deathAnim.length; i++) {
            this.getRand(-100, 100);
            this.deathAnim[i].applyLinearImpulseToCenter(new Vec2(this.jumpForce.x, this.jumpForce.y), true);
        }
    }

    getRand(min: number, max: number) {
        this.jumpForce.x = Math.floor(math.random() * (max - min + 1) + min);
        this.jumpForce.y = Math.floor(math.random() * (max - min - 1) + min - 1);

    }

    update(deltaTime: number) {
        const pos = this.node.getPosition();
        pos.y -= 5;
        this.node.setPosition(pos);
    }
}


