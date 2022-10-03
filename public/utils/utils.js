"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMateria = exports.mapFingerEquip = exports.mapEquip = exports.mapEquipIdToEquip = exports.getEquipmentTypeByString = void 0;
const gearset_types_1 = require("../getGearset/gearset.types");
const getEquipmentTypeByString = (enumValue) => {
    const value = Object.values(gearset_types_1.SlotNames).find((value) => value === enumValue);
    return value;
};
exports.getEquipmentTypeByString = getEquipmentTypeByString;
const mapEquipIdToEquip = (id, slotName, equipment_name = '') => {
    if (id) {
        return {
            id: id,
            equipment_name,
            slotName
        };
    }
    return undefined;
};
exports.mapEquipIdToEquip = mapEquipIdToEquip;
const mapEquip = (equip, slotName) => {
    const e = equip.find((e) => e?.slotName === slotName);
    if (e) {
        return {
            id: e.id,
            equipment_name: e.name,
            slotName: e ? slotName : gearset_types_1.SlotNames.UNKNOWN
        };
    }
    return undefined;
};
exports.mapEquip = mapEquip;
const mapFingerEquip = (equip, slotName) => {
    return {
        id: equip?.id ?? 0,
        equipment_name: equip?.name ?? '',
        slotName
    };
};
exports.mapFingerEquip = mapFingerEquip;
const mapMateria = (etroMateria, sghEquip, materiaList) => {
    // http://localhost:3001/gearset/bd287613-ca59-45b7-b50d-5465daca9ccc
    if (!sghEquip) {
        return sghEquip;
    }
    const equipMateria = etroMateria.find((e) => e.equipId.replace('R', '').replace('L', '') ===
        sghEquip.id.toString());
    if (equipMateria) {
        for (let i = 0; i < equipMateria.materiaIds.length; i++) {
            const materiaId = equipMateria.materiaIds[i];
            const materia = materiaList?.find((m) => m.id === materiaId.toString());
            switch (i) {
                case 0:
                    sghEquip.materia_1 = {
                        type: materia?.type ?? '',
                        name: materia?.name ?? '',
                        value: Number(materia?.value) ?? 0
                    };
                    break;
                case 1:
                    sghEquip.materia_2 = {
                        type: materia?.type ?? '',
                        name: materia?.name ?? '',
                        value: Number(materia?.value) ?? 0
                    };
                    break;
                case 2:
                    sghEquip.materia_3 = {
                        type: materia?.type ?? '',
                        name: materia?.name ?? '',
                        value: Number(materia?.value) ?? 0
                    };
                    break;
                case 3:
                    sghEquip.materia_4 = {
                        type: materia?.type ?? '',
                        name: materia?.name ?? '',
                        value: Number(materia?.value) ?? 0
                    };
                    break;
                case 4:
                    sghEquip.materia_5 = {
                        type: materia?.type ?? '',
                        name: materia?.name ?? '',
                        value: Number(materia?.value) ?? 0
                    };
                    break;
                default:
                    break;
            }
        }
    }
    return {
        ...sghEquip
    };
};
exports.mapMateria = mapMateria;
