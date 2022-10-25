import { EtroFood } from '../types/etro.types';

export enum SlotNames {
    WEAPON = 'weapon',
    OFFHAND = 'offHand',
    HEAD = 'head',
    BODY = 'body',
    HANDS = 'hands',
    LEGS = 'legs',
    FEET = 'feet',
    EARS = 'ears',
    NECK = 'neck',
    WRISTS = 'wrists',
    FINGER_L = 'finger_l',
    FINGER_R = 'finger_r',
    UNKNOWN = 'unknown'
}

export type BaseEquipment = {
    id: number;
    equipment_name: string;
    slotName: SlotNames;
    materia_1?: Materia;
    materia_2?: Materia;
    materia_3?: Materia;
    materia_4?: Materia;
    materia_5?: Materia;
};

export interface Equipment extends BaseEquipment {
    looted?: boolean;
}

export interface BaseGearset {
    id: string;
    jobAbbrev: string;
    name: string;
    lastUpdate: string;
    bisLink: string;
}

export interface Gearset extends BaseGearset {
    isMain?: boolean;
    weapon?: Equipment;
    head?: Equipment;
    body?: Equipment;
    hands?: Equipment;
    legs?: Equipment;
    feet?: Equipment;
    offHand?: Equipment;
    ears?: Equipment;
    neck?: Equipment;
    wrists?: Equipment;
    fingerL?: Equipment;
    fingerR?: Equipment;
    food?: Food;
}

export type Materia = {
    type: string;
    name: string;
    value: number;
};

export type Food = EtroFood;

export interface Static {
    static_id: number;
    guild_id: number;
    static_name: number;
    overview_message_id?: string;
    keyword_loot?: string;
    keyword_buy?: string;
    members_count: number;
    thumbnail?: string;
}
