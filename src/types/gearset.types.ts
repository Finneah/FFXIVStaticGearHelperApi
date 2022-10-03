import {DBUser} from './db.types';
import {EtroFood} from './etro.types';

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
    materia_1?: SGHMateria;
    materia_2?: SGHMateria;
    materia_3?: SGHMateria;
    materia_4?: SGHMateria;
    materia_5?: SGHMateria;
};

export interface SGHEquipment extends BaseEquipment {
    looted?: boolean;
}

export interface BaseGearset {
    id: string;
    jobAbbrev: string;
    name: string;
    lastUpdate: string;
    bisLink: string;
}

export interface SGHGearset extends BaseGearset {
    isMain?: boolean;
    weapon?: SGHEquipment;
    head?: SGHEquipment;
    body?: SGHEquipment;
    hands?: SGHEquipment;
    legs?: SGHEquipment;
    feet?: SGHEquipment;
    offHand?: SGHEquipment;
    ears?: SGHEquipment;
    neck?: SGHEquipment;
    wrists?: SGHEquipment;
    fingerL?: SGHEquipment;
    fingerR?: SGHEquipment;
    food?: SGHFood;
}

export type SGHMateria = {
    type: string;
    name: string;
    value: number;
};

export type SGHFood = EtroFood;

export interface SGHUser extends DBUser {
    bis: SGHGearset[];
}

export type BaseGuild = {
    discord_guild_id: string;
    moderator_role?: string;
    static_role?: string;
    sgh_channel_id?: string;
    bis_message_id?: string;
};

export interface SGHGuild extends BaseGuild {
    users?: SGHUser[];
}
