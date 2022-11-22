export enum CommandNames {
    MYBIS = 'mybis',
    ETRO = 'etro_show',
    CONFIG = 'config',
    SETMAINBIS = 'set_mainbis',
    STATICOVERVIEW = 'static_overview',
    DELETE_USER = 'delete_user'
}
export enum SubCommandNames {
    SET = 'set',
    GET = 'get',
    DELETE = 'delete',
    BY_LINK = 'by_link'
    // BY_ID = 'by_id'
}

export enum ButtonCommandNames {
    CONFIG_OVERRIDE = 'overrideConfig',
    CANCEL = 'cancel',
    DELETE_BIS = 'deleteBis',
    SETTINGS = 'settings',
    EDITBIS = 'editbis',
    EDITBISOVERVIEW = 'editbisOverview',
    REFRESH = 'refresh'
}

export enum OptionNames {
    MODERATOR_ROLE = 'moderator_role',
    BEST_IN_SLOT_ROLE = 'best_in_slot_role',
    LINK = 'link',
    NAME = 'name',
    ID = 'id',
    ISMAIN = 'is_main'
}
