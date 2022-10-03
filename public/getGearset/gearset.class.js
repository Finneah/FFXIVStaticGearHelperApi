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
                const etroGearset = await getEtroGearset(id);
                if (!etroGearset) {
                    return undefined;
                }
                let sghGearset = await getBasicGearset(etroGearset);
                const etroMateria = etroGearset.materia;
                sghGearset = await getGearSetWithMateria(sghGearset, etroMateria);
                return sghGearset;
            }
            catch (error) {
                return error;
            }
            // TODO Fehler beheben wenn link mitgegeben wird, response passt dann auch nicht
        };
    }
}
exports.Gearset = Gearset;
const getBasicGearset = async (etroGearset) => {
    const sghGearset = {
        id: etroGearset.id,
        jobAbbrev: etroGearset.jobAbbrev,
        name: etroGearset.name,
        lastUpdate: etroGearset.lastUpdate,
        bisLink: etroGearset.bisLink
    };
    const etroFood = await getEtroFood(etroGearset.food);
    if (etroFood) {
        sghGearset.food = {
            id: etroFood.id,
            name: etroFood.name,
            iconPath: etroFood.iconPath
        };
    }
    const equipList = await getEtroEquip(etroGearset);
    if (equipList) {
        const sghGearsetWithEquip = {
            ...sghGearset,
            weapon: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.WEAPON),
            head: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.HEAD),
            body: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.BODY),
            hands: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.HANDS),
            legs: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.LEGS),
            feet: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.FEET),
            offHand: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.OFFHAND),
            ears: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.EARS),
            neck: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.NECK),
            wrists: (0, utils_1.mapEquip)(equipList, gearset_types_1.SlotNames.WRISTS),
            fingerL: (0, utils_1.mapFingerEquip)(equipList[equipList.length - 2], gearset_types_1.SlotNames.FINGER_L),
            fingerR: (0, utils_1.mapFingerEquip)(equipList[equipList.length - 1], gearset_types_1.SlotNames.FINGER_R)
        };
        return sghGearsetWithEquip;
    }
    return sghGearset;
};
const getGearSetWithMateria = async (sghGearset, etroMateria) => {
    // http://localhost:3001/gearset/cc743560-11c4-4fe3-89fd-64534cfa50ca
    try {
        const materiaList = await getEtroMateriaList();
        const sghGearsetWithEquip = {
            ...sghGearset,
            weapon: (0, utils_1.mapMateria)(etroMateria, sghGearset.weapon, materiaList),
            head: (0, utils_1.mapMateria)(etroMateria, sghGearset.head, materiaList),
            body: (0, utils_1.mapMateria)(etroMateria, sghGearset.body, materiaList),
            hands: (0, utils_1.mapMateria)(etroMateria, sghGearset.hands, materiaList),
            legs: (0, utils_1.mapMateria)(etroMateria, sghGearset.legs, materiaList),
            feet: (0, utils_1.mapMateria)(etroMateria, sghGearset.feet, materiaList),
            offHand: (0, utils_1.mapMateria)(etroMateria, sghGearset.offHand, materiaList),
            ears: (0, utils_1.mapMateria)(etroMateria, sghGearset.ears, materiaList),
            neck: (0, utils_1.mapMateria)(etroMateria, sghGearset.neck, materiaList),
            wrists: (0, utils_1.mapMateria)(etroMateria, sghGearset.wrists, materiaList),
            fingerL: (0, utils_1.mapMateria)(etroMateria, sghGearset.fingerL, materiaList),
            fingerR: (0, utils_1.mapMateria)(etroMateria, sghGearset.fingerR, materiaList)
        };
        return sghGearsetWithEquip;
    }
    catch (error) {
        return error;
    }
};
const getEtroGearset = async (id) => {
    return axios_1.default
        .get(ETRO_API + `/gearsets/${id}/`)
        .then((response) => {
        if (response.status === 200) {
            const etroMateria = response.data.materia;
            const materia = [];
            for (const key in etroMateria) {
                if (Object.prototype.hasOwnProperty.call(etroMateria, key)) {
                    const element = etroMateria[key];
                    materia.push({
                        equipId: key,
                        materiaIds: Object.values(element)
                    });
                }
            }
            return { ...response.data, materia };
        }
        else {
            return { success: false, data: '' };
        }
    })
        .catch((error) => {
        return error;
    });
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
const getEtroEquip = async (etroGearset) => {
    const gearSet = [
        etroGearset.weapon,
        etroGearset.head,
        etroGearset.body,
        etroGearset.hands,
        etroGearset.legs,
        etroGearset.feet,
        etroGearset.ears,
        etroGearset.neck,
        etroGearset.wrists,
        etroGearset.fingerL,
        etroGearset.fingerR
    ];
    if (etroGearset.offHand) {
        gearSet.push(etroGearset.offHand);
    }
    const equip = await Promise.all(gearSet.map(getEtroSingleEquipment));
    return equip;
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
        const materiaList = response.data;
        const list = [];
        if (materiaList) {
            for (let i = 0; i < materiaList.length; i++) {
                const materiaListElement = materiaList[i];
                const keys = Object.keys(materiaListElement);
                const paramName = materiaListElement.paramName;
                keys.forEach((key) => {
                    if (materiaListElement[key].name) {
                        list.push({
                            id: materiaListElement[key].id.toString(),
                            type: paramName,
                            name: materiaListElement[key].name,
                            value: materiaListElement[key + 'Value']
                        });
                    }
                });
            }
        }
        return list;
    })
        .catch((error) => {
        return error;
    });
};
