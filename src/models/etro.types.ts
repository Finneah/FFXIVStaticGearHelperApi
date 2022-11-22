import { BaseGearset } from '../database/gearset/gearset.types';

export type EtroFood = {
    id: number;
    name: string;
    iconPath: string;
};

export type EtroMateriaTier = {
    [key: string]: {id: number; name: string}; //| string | number;
};

export type EtroGearsetMateria = {[key: string]: number};
export interface EtroGearset extends BaseGearset {
    weapon: number;
    offHand: number | null;
    head: number;
    body: number;
    hands: number;
    legs: number;
    feet: number;
    ears: number;
    neck: number;
    wrists: number;
    fingerL: number;
    fingerR: number;
    food: number;
    materia: {equipId: string; materiaIds: string[]}[];
}

export type EtroEquipment = {
    id: number;
    name: string;
    materiaSlotCount: number;
    slotName: string;
    itemLevel: number;
    materia?: {index: string; id: string; name: string}[];
};
