import { _decorator, animation, Animation, AnimationClip, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property(Animation)
    anim: Animation;

    start() {
        const clip = AnimationClip.createWithSpriteFrames()
    }

    update(deltaTime: number) {

    }
}


