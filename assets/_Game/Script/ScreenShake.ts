import { _decorator, CCFloat, Component, misc, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenShake')
export class ScreenShake extends Component {
    @property(CCFloat)
    timeSet: number;

    @property(CCFloat)
    intensity: number;

    duration: number = 0;
    nodePosition: Vec3;

    init() {
        this.duration = this.timeSet;
        this.nodePosition = this.node.getPosition();
    }

    update(deltaTime: number) {
        if (this.duration <= 0 || this.duration == null) {
            this.node.setPosition(new Vec3(0, 0, 0));
            return;
        }
        this.duration -= deltaTime;

        // Tạo giá trị ngẫu nhiên cho việc thay đổi vị trí camera
        const offsetX = Math.random() * this.intensity - this.intensity / 2;
        const offsetY = Math.random() * this.intensity - this.intensity / 2;

        // Áp dụng thay đổi vị trí camera
        this.node.setPosition(this.node.position.x + offsetX, this.node.position.y);
    }
}