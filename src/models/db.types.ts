import { BaseEquipment } from '../database/gearset/gearset.types';

export type DBBis = {
    bis_id?: number;
    gearset_id: number;
    user_id: number;
    bis_name: string;
    is_main?: boolean;
    weapon?: boolean;
    head?: boolean;
    body?: boolean;
    hands?: boolean;
    legs?: boolean;
    feet?: boolean;
    offHand?: boolean;
    ears?: boolean;
    neck?: boolean;
    wrists?: boolean;
    finger_l?: boolean;
    finger_r?: boolean;
    overview_message_id?: string;
};

export interface DBEquipment extends BaseEquipment {
    equipment_id: number;
}

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

export type DBGearsets = {
    gearset_id: string;
    last_update: string;
    bis_link: string;
    jobabbrev: string;
    food: string;
    equipment_ids: number[];
};
