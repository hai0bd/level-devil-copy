import { _decorator, CCFloat, Component, Node, Tween, tween, Vec3 } from 'cc';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('BouncePopUp')
export class BouncePopUp extends Component {
    @property(CCFloat)
    durationTime: number = 1;

    isOpen: boolean = false;

    init() {
        // Thiết lập trạng thái ban đầu cho node (kích thước nhỏ)
        this.node.setScale(new Vec3(0, 0, 0));

        // Sử dụng tween để phóng to node với hiệu ứng nảy ra từ giữa
        if (!this.isOpen) this.openPopUp()
    }

    openPopUp() {
        this.isOpen = true;
        tween(this.node)
            .to(this.durationTime, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .start();
    }

    onClickEsc() {
        this.playSfx(SoundType.Button_Click);
        this.exitPopUp();
    }
    exitPopUp() {
        this.isOpen = false;
        tween(this.node)
            .to(this.durationTime, { scale: new Vec3(0, 0, 0) }, { easing: 'backIn' })
            .call(() => { this.node.active = false })
            .start();
    }

    playSfx(Button_Click: SoundType) {
        const audio = AudioSourceControl.instance;
        audio.playSound(Button_Click);
    }
}