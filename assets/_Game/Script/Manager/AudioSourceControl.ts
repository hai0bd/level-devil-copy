import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioSourceControl')
export class AudioSourceControl extends Component {
    private static _instance: AudioSourceControl;
    /* @property({ type: AudioClip })
    backgroundMusic: AudioClip = null; */

    @property({ type: AudioClip })
    jumpSfx: AudioClip = null;

    @property({ type: AudioClip })
    dieSfx: AudioClip = null;

    @property({ type: AudioClip })
    winSfx: AudioClip = null;

    @property({ type: AudioClip })
    openMap: AudioClip;

    @property(AudioClip)
    trapMoverment: AudioClip = null;

    @property(AudioClip)
    buttonClickSfx: AudioClip = null;

    @property(AudioSource)
    soundEffectSource: AudioSource | null = null;

    public static get instance(): AudioSourceControl {
        if (!this._instance) {
            this._instance = new AudioSourceControl;
        }
        return this._instance;
    }

    onLoad() {
        if (!AudioSourceControl._instance) {
            AudioSourceControl._instance = this;
        } else {
            this.destroy();
        }
    }

    playSound(type: SoundType) {
        if (this.soundEffectSource) {
            let clipToPlay: AudioClip | null = null;
            switch (type) {
                case SoundType.E_Sound_Jump:
                    clipToPlay = this.jumpSfx;
                    break;
                case SoundType.E_Sound_Die:
                    clipToPlay = this.dieSfx;
                    break;
                case SoundType.E_Sound_Win:
                    clipToPlay = this.winSfx;
                    break;
                case SoundType.Open_Map:
                    clipToPlay = this.openMap;
                    break;
                case SoundType.Trap_Move:
                    clipToPlay = this.trapMoverment;
                    break;
                case SoundType.Button_Click:
                    clipToPlay = this.buttonClickSfx;
                    break;
            }
            if (clipToPlay) {
                this.soundEffectSource.clip = clipToPlay;
                this.soundEffectSource.play();
            }
        }
    }
}
export enum SoundType {
    E_Sound_Jump = 1,
    E_Sound_Die = 2,
    E_Sound_Win = 3,
    Trap_Move = 4,
    Button_Click = 5,
    Open_Map = 6
}