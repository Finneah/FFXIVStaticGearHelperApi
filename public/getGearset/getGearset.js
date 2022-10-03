"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gearset = void 0;
const gearset_types_1 = require("./gearset.types");
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
const ETRO_API = 'https://etro.gg/api';
class Gearset {
    constructor() {
        this.getGearset = async (id) => {
            try {
                const gearset = await this.getGearsetWithEquipment(id);
                if (!gearset) {
                    return undefined;
                }
                return gearset;
            }
            catch (error) {
                return error;
            }
            // TODO Fehler beheben wenn link mitgegeben wird, response passt dann auch nicht
        };
        this.getGearsetWithEquipment = async (id) => {
            try {
                // https://etro.gg/api/gearsets/e78a29e3-1dcf-4e53-bbcf-234f33b2c831/
                const etroGearset = await getEtroGearset(id);
                if (!etroGearset) {
                    return undefined;
                }
                const equipment = await getEquipmentAll(etroGearset);
                if (!equipment) {
                    return undefined;
                }
                const etroFood = await getEtroFood(etroGearset.food);
                const gearset = {
                    id: etroGearset.id,
                    bisLink: 'https://etro.gg/gearset/' + id,
                    lastUpdate: etroGearset.lastUpdate,
                    jobAbbrev: etroGearset.jobAbbrev,
                    name: etroGearset.name,
                    weapon: equipment.find((e) => e.id === etroGearset.weapon),
                    head: equipment.find((e) => e.id === etroGearset.head),
                    body: equipment.find((e) => e.id === etroGearset.body),
                    hands: equipment.find((e) => e.id === etroGearset.hands),
                    legs: equipment.find((e) => e.id === etroGearset.legs),
                    feet: equipment.find((e) => e.id === etroGearset.feet),
                    offHand: equipment.find((e) => e.id === etroGearset.offHand),
                    ears: equipment.find((e) => e.id === etroGearset.ears),
                    neck: equipment.find((e) => e.id === etroGearset.neck),
                    wrists: equipment.find((e) => e.id === etroGearset.wrists),
                    fingerL: equipment.find((e) => e.id === etroGearset.fingerL),
                    fingerR: equipment.find((e) => e.id === etroGearset.fingerR),
                    food: etroFood
                        ? {
                            id: etroFood.id,
                            name: etroFood.name,
                            iconPath: etroFood.iconPath
                        }
                        : undefined
                };
                const gearsetWithMateria = await getGearSetWithMateria(gearset, etroGearset.materia);
                return gearsetWithMateria;
            }
            catch (error) {
                return Promise.reject(error);
            }
        };
    }
}
exports.Gearset = Gearset;
const getEtroGearset = async (id) => {
    return axios_1.default
        .get(ETRO_API + `/gearsets/${id}/`)
        .then((response) => {
        if (response.status === 200) {
            return response.data;
        }
        else {
            return { success: false, data: '' };
        }
    })
        .catch((error) => {
        return error;
    });
};
const getGearSetWithMateria = async (gearset, etroMateria) => {
    try {
        const materiaList = await getEtroMateriaList();
        if (!materiaList) {
            return undefined;
        }
        for (let i = 0; i < materiaList.length; i++) {
            const materiaListElement = materiaList[i];
            if (materiaListElement.id) {
                const keys = Object.keys(materiaListElement);
                let k;
                for (k in keys) {
                    const key = keys[k];
                    for (const gMKey in etroMateria) {
                        if (Object.prototype.hasOwnProperty.call(etroMateria, gMKey)) {
                            if (materiaListElement[key].id) {
                                let gearsetmateriaString = JSON.stringify(etroMateria[gMKey]);
                                gearsetmateriaString =
                                    gearsetmateriaString.replaceAll(materiaListElement[key].id.toString(), JSON.stringify({
                                        type: materiaListElement.paramName,
                                        name: materiaListElement[key].name,
                                        value: materiaListElement[key + 'Value']
                                    }));
                            }
                        }
                    }
                }
            }
        }
        return gearset;
    }
    catch (error) {
        return error;
    }
};
const getEtroSingleEquipment = async (id) => {
    return axios_1.default
        .get(ETRO_API + `/equipment/${id}/`)
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        return error;
    });
};
const getEquipmentAll = async (gearset) => {
    const gearSet = [
        gearset.weapon,
        gearset.head,
        gearset.body,
        gearset.hands,
        gearset.legs,
        gearset.feet,
        gearset.ears,
        gearset.neck,
        gearset.wrists,
        gearset.fingerL,
        gearset.fingerR
    ];
    if (gearset.offHand) {
        gearSet.push(gearset.offHand);
    }
    const equip = await Promise.all(gearSet.map(getEtroSingleEquipment));
    const sghEquipment = [];
    const getFingerSLotName = (e) => {
        if (e.slotName !== 'finger') {
            return gearset_types_1.SlotNames.UNKNOWN;
        }
        return equip.findIndex((value) => value === e) === equip.length - 1
            ? gearset_types_1.SlotNames.FINGER_R
            : gearset_types_1.SlotNames.FINGER_L;
    };
    equip?.forEach((e) => {
        if (e) {
            const sghE = {
                id: e.id,
                equipment_name: e.name,
                slotName: (0, utils_1.getEquipmentTypeByString)(e.slotName) ?? getFingerSLotName(e)
            };
            sghEquipment.push(sghE);
        }
    });
    return sghEquipment;
};
const getEtroFood = async (id) => {
    return axios_1.default
        .get(ETRO_API + `/food/${id}/`)
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        return error;
    });
};
const getEtroMateriaList = async () => {
    return axios_1.default
        .get(ETRO_API + `/materia/`)
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        return error;
    });
};
