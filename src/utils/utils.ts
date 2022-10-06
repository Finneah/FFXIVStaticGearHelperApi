import { Equipment } from '../gearset/gearset.types';
import { SlotNames } from '../types/db.types';
import { EtroEquipment } from '../types/etro.types';

export const getEquipmentTypeByString = (
    enumValue: string
): SlotNames | undefined => {
    const value: SlotNames | undefined = Object.values(SlotNames).find(
        (value) => value === enumValue
    );
    return value;
};

export const mapEquipIdToEquip = (
    id: number | null,
    slotName: SlotNames,
    equipment_name = ''
): Equipment | undefined => {
    if (id) {
        return {
            id: id,
            equipment_name,
            slotName
        };
    }
    return undefined;
};

export const mapEquip = (
    equip: (EtroEquipment | null)[],
    slotName: SlotNames
): Equipment | undefined => {
    const e = equip.find((e) => e?.slotName === slotName);
    if (e) {
        return {
            id: e.id,
            equipment_name: e.name,
            slotName: e ? slotName : SlotNames.UNKNOWN
        };
    }

    return undefined;
};

export const mapFingerEquip = (
    equip: EtroEquipment | null,
    slotName: SlotNames
): Equipment => {
    return {
        id: equip?.id ?? 0,
        equipment_name: equip?.name ?? '',
        slotName
    };
};

export const mapMateria = (
    etroMateria: {equipId: string; materiaIds: string[]}[],
    sghEquip: Equipment | undefined,
    materiaList:
        | {
              id: string;
              type: string;
              name: string;
              value: string;
          }[]
        | null
): Equipment | undefined => {
    // http://localhost:3001/gearset/bd287613-ca59-45b7-b50d-5465daca9ccc
    if (!sghEquip) {
        return sghEquip;
    }

    const equipMateria = etroMateria?.find(
        (e) =>
            e.equipId.replace('R', '').replace('L', '') ===
            sghEquip.id.toString()
    );

    if (equipMateria) {
        for (let i = 0; i < equipMateria.materiaIds.length; i++) {
            const materiaId = equipMateria.materiaIds[i];
            const materia = materiaList?.find(
                (m) => m.id === materiaId.toString()
            );

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

export const buildQuery = (
    text: string,
    textValues: string,
    queryValues: any[],
    keys: string[],
    values: (string | undefined)[],
    index: number
) => {
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value) {
            text += `, ${keys[i]}`;
            textValues += `,$${index}`;
            queryValues.push(value);
            index++;
        }
    }

    return {text, textValues, queryValues};
};
