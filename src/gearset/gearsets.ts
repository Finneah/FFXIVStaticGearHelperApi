import axios from 'axios';

import { ETRO_API } from '../config';
import { EtroEquipment, EtroFood, EtroGearset } from '../types/etro.types';
import { mapEquip, mapFingerEquip, mapMateria } from '../utils/utils';
import { gearsetsMock } from './gearset.test.data';
import { Gearset, SlotNames } from './gearset.types';

export const getGearsetFromEtro = async (
    id: string
): Promise<Gearset | undefined> => {
    try {
        const etroGearset = await getEtroGearset(id);

        if (!etroGearset) {
            return undefined;
        }
        let sghGearset = await getBasicGearset(etroGearset);

        const etroMateria = etroGearset.materia;

        sghGearset = await getGearSetWithMateria(sghGearset, etroMateria);

        return sghGearset;
    } catch (error: any) {
        return error;
    }
    // TODO Fehler beheben wenn link mitgegeben wird, response passt dann auch nicht
};

export const getGearsetFromDB = async (
    name: string,
    discord_user_id: string
): Promise<Gearset | undefined> => {
    try {
        /**
         * find gearset from user in db
         */
        console.log(discord_user_id);

        return gearsetsMock.find((g: Gearset) => g.name === name);
    } catch (error: any) {
        return error;
    }
    // TODO Fehler beheben wenn link mitgegeben wird, response passt dann auch nicht
};

export const setGearset = async (
    id: string,
    name: string
): Promise<Gearset | undefined> => {
    try {
        console.log(id, name);
    } catch (error: any) {
        return error;
    }
};

const getBasicGearset = async (etroGearset: EtroGearset): Promise<Gearset> => {
    const sghGearset: Gearset = {
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
        const sghGearsetWithEquip: Gearset = {
            ...sghGearset,
            weapon: mapEquip(equipList, SlotNames.WEAPON),
            head: mapEquip(equipList, SlotNames.HEAD),
            body: mapEquip(equipList, SlotNames.BODY),
            hands: mapEquip(equipList, SlotNames.HANDS),
            legs: mapEquip(equipList, SlotNames.LEGS),
            feet: mapEquip(equipList, SlotNames.FEET),
            offHand: mapEquip(equipList, SlotNames.OFFHAND),
            ears: mapEquip(equipList, SlotNames.EARS),
            neck: mapEquip(equipList, SlotNames.NECK),
            wrists: mapEquip(equipList, SlotNames.WRISTS),
            fingerL: mapFingerEquip(
                equipList[equipList.length - 2],
                SlotNames.FINGER_L
            ),
            fingerR: mapFingerEquip(
                equipList[equipList.length - 1],
                SlotNames.FINGER_R
            )
        };

        return sghGearsetWithEquip;
    }

    return sghGearset;
};

const getGearSetWithMateria = async (
    sghGearset: Gearset,
    etroMateria: {equipId: string; materiaIds: string[]}[]
): Promise<Gearset> => {
    try {
        const materiaList = await getEtroMateriaList();

        const sghGearsetWithEquip: Gearset = {
            ...sghGearset,
            weapon: mapMateria(etroMateria, sghGearset.weapon, materiaList),
            head: mapMateria(etroMateria, sghGearset.head, materiaList),
            body: mapMateria(etroMateria, sghGearset.body, materiaList),
            hands: mapMateria(etroMateria, sghGearset.hands, materiaList),
            legs: mapMateria(etroMateria, sghGearset.legs, materiaList),
            feet: mapMateria(etroMateria, sghGearset.feet, materiaList),
            offHand: mapMateria(etroMateria, sghGearset.offHand, materiaList),
            ears: mapMateria(etroMateria, sghGearset.ears, materiaList),
            neck: mapMateria(etroMateria, sghGearset.neck, materiaList),
            wrists: mapMateria(etroMateria, sghGearset.wrists, materiaList),
            fingerL: mapMateria(etroMateria, sghGearset.fingerL, materiaList),
            fingerR: mapMateria(etroMateria, sghGearset.fingerR, materiaList)
        };

        return sghGearsetWithEquip;
    } catch (error: any) {
        return error;
    }
};

const getEtroGearset = async (id: string): Promise<EtroGearset | null> => {
    // https://etro.gg/api/gearsets/bd287613-ca59-45b7-b50d-5465daca9ccc
    return axios
        .get(ETRO_API + `/gearsets/${id}/`)
        .then((response) => {
            if (response.status === 200) {
                const etroMateria = response.data.materia;
                const materia: {equipId: string; materiaIds: string[]}[] = [];
                for (const key in etroMateria) {
                    if (
                        Object.prototype.hasOwnProperty.call(etroMateria, key)
                    ) {
                        const element = etroMateria[key];

                        materia.push({
                            equipId: key,
                            materiaIds: Object.values(element)
                        });
                    }
                }

                return {...response.data, materia};
            } else {
                return {success: false, data: ''};
            }
        })

        .catch((error) => {
            return error;
        });
};

const getEtroSingleEquipment = async (
    id: number
): Promise<EtroEquipment | null> => {
    return axios
        .get(ETRO_API + `/equipment/${id}/`)
        .then((response) => {
            return response.data;
        })

        .catch((error) => {
            return error;
        });
};

const getEtroEquip = async (
    etroGearset: EtroGearset
): Promise<(EtroEquipment | null)[]> => {
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

const getEtroFood = async (id: number): Promise<EtroFood | null> => {
    return axios
        .get(ETRO_API + `/food/${id}/`)
        .then((response) => {
            return response.data;
        })

        .catch((error) => {
            return error;
        });
};

const getEtroMateriaList = async (): Promise<
    | {
          id: string;
          type: string;
          name: string;
          value: string;
      }[]
    | null
> => {
    return axios
        .get(ETRO_API + `/materia/`)
        .then((response) => {
            const materiaList = response.data;
            const list: {
                id: string;
                type: string;
                name: string;
                value: string;
            }[] = [];
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
