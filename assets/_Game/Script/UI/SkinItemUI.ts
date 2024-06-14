import { _decorator, Button, Component, EventHandle, EventHandler, Label, log, Node, Sprite, SpriteFrame } from 'cc';
import { DataManager } from '../Manager/DataManager';
import { Skin } from '../Node/Skin';
const { ccclass, property } = _decorator;

@ccclass('SkinItemUI')
export class SkinItemUI extends Component {
    @property(Sprite)
    spriteItems: Sprite;

    @property(Sprite)
    spritePrice: Sprite;

    @property(SpriteFrame)
    ownedSprite: SpriteFrame;

    @property(Label)
    labelPrice: Label;

    @property(Button)
    itemButton: Button;

    logPay: string;
    skinItem: Skin;

    init(item: Skin) {
        this.skinItem = item;
        this.spriteItems.spriteFrame = item.sprite;
        this.checkSkin();
    }
    checkSkin() {
        if (DataManager.instance.playerData.skinID.indexOf(this.skinItem.skinID) == -1) {
            // this.labelPrice.string = this.skinItem.price.toString();
            this.itemButton.node.on(Button.EventType.CLICK, this.onButtonBuy, this);
            console.log("skinID: " + this.skinItem.skinID);
        }
        else {
            console.log("Da co skinID: " + this.skinItem.skinID);
            this.spritePrice.spriteFrame = this.ownedSprite;
            this.labelPrice.string = "Owned";
            this.itemButton.node.off(Button.EventType.CLICK, this.onButtonBuy, this);
        }
    }

    onButtonBuy() {
        alert("Đã mua thành công");
        DataManager.instance.addSkin(this.skinItem.skinID);
        /* for (let i = 0; i < DataManager.instance.playerData.skinID.length; i++) {
            console.log(DataManager.instance.playerData.skinID[i] + ' ');
        } */
        this.checkSkin();
    }
}


