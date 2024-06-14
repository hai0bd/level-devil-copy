import { _decorator, Component, Game, Node, sys } from 'cc';
import { Skin } from '../Node/Skin';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Component {
    private static _instance: DataManager;

    @property(Skin)
    listGameSkin: Skin[] = [];

    keyPlayerData: string = "PlayerData";
    playerData: PlayerData;

    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!DataManager._instance) {
            DataManager._instance = this;
        } else {
            this.destroy();
        }
    }

    start() {
        this.loadPlayerData();
        this.showPlayerData();
    }

    loadPlayerData() {
        let data = sys.localStorage.getItem(this.keyPlayerData);
        if (data) {
            this.playerData = JSON.parse(data);
        }
        else this.playerData = new PlayerData();
    }

    showPlayerData() {
        for (let i = 0; i < this.playerData.skinID.length; i++) {
            console.log(this.playerData.skinID);
        }
    }

    findSkin(id: string): Skin {
        for (let i = 0; i < this.listGameSkin.length; i++) {
            if (this.listGameSkin[i].skinID == id) return this.listGameSkin[i];
        }
        return null;
    }

    addSkin(skinID: string) {
        if (this.playerData.skinID.indexOf(skinID) == -1) {
            this.playerData.skinID.push(skinID);
        }
    }

    deathTimesPlus() {
        this.playerData.deathTimes++;
    }

    addGate() {
        this.playerData.gate++;
    }

    saveData() {
        var jsonData = JSON.stringify(this.playerData);
        sys.localStorage.setItem(this.keyPlayerData, jsonData);
    }
}

export class PlayerData {
    deathTimes: number;
    gate: number;
    skinID: string[] = [];

    constructor() {
        this.deathTimes = 10;
        this.gate = 0;
        this.skinID = ["0"];
    }
}
