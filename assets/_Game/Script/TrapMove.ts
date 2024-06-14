import { _decorator, CCFloat, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TrapMove")
export class TrapMove extends Component {
    @property({ type: Node })
    targetNode: Node[] = [];

    @property({ type: CCFloat })
    timeSpeed: number = 0;
    
    @property({ type: CCFloat })
    delayTime: number = 0;

    index: number = 0;

    trapPos: Vec3 = new Vec3(0, 0, 0);
    currentTarget: Vec3;

    canMove: boolean = true;

    start() {
        // this.move();
        this.movetoTarget();
    }

    movetoTarget() {
        if (this.node == null) return;
        if (this.index >= this.targetNode.length) return;
        tween(this.node.position)
            .to(this.timeSpeed, this.targetNode[this.index].position, {
                onUpdate: (target: Vec3, ratio: number) => {
                    if (this.node) this.node.position = target;
                },
            })
            .delay(this.delayTime)
            .call(() => {
                this.index++;
                this.movetoTarget();
            })
            .start();
    }
}
