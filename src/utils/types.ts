export interface Task {
    type: string,
    params: any
}

export interface TaskParam {
    [key: string]: any
}

export interface TaskItem {
    checked: boolean,
    label: string,
    key: string,
    params: TaskItemParam[]
}

export interface TaskItemParam {
    type: 'string' | 'number' | 'boolean' | 'select' | 'list',
    label: string,
    key: string,
    value: any,
    default: any,
    select?: SelectItem[]
}

export interface SelectItem {
    label: string,
    value: any
}

export class StartUp implements TaskItem {
    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'StartUp'
        this.label = '开始唤醒'
        this.checked = false
        this.params = [
            {
                type: 'select',
                label: '客户端版本',
                key: 'client_type',
                value: 'Official',
                default: '',
                select: [ // "Official" | "Bilibili" | "txwy" | "YoStarEN" | "YoStarJP" | "YoStarKR"
                    {
                        label: '官服',
                        value: 'Official'
                    },
                    {
                        label: 'B服',
                        value: 'Bilibili'
                    },
                    {
                        label: 'txwy',
                        value: 'txwy'
                    },
                    {
                        label: 'YoStarEN',
                        value: 'YoStarEN'
                    },
                    {
                        label: 'YoStarJP',
                        value: 'YoStarJP'
                    },
                    {
                        label: 'YoStarKR',
                        value: 'YoStarKR'
                    }
                ]
            },
            {
                type: 'boolean',
                label: '启动客户端',
                key: 'start_game_enabled',
                value: false,
                default: false
            },
            {
                type: 'string',
                label: '切换账号',
                key: 'account_name',
                value: '',
                default: ''
            }
        ] as TaskItemParam[]
    }
}

export class CloseDown implements TaskItem {

    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'CloseDown'
        this.label = '关闭游戏'
        this.checked = false
        this.params = [] as TaskItemParam[]
    }

}

export class Fight implements TaskItem {
    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Fight'
        this.label = '刷理智'
        this.checked = false
        this.params = [
            {
                type: 'string',
                label: '关卡名',
                key: 'stage',
                value: '1-7',
                default: ''
            },
            {
                type: 'number',
                label: '使用理智药数量',
                key: 'medicine',
                default: 0,
                value: 0
            },
            {
                type: 'number',
                label: '使用48小时理智药数量',
                key: 'expiring_medicine',
                default: 0,
                value: 0
            },
            {
                type: 'number',
                label: '使用源石数量',
                key: 'stone',
                default: 0,
                value: 0
            },
            {
                type: 'number',
                label: '指定次数',
                key: 'times',
                default: 9999,
                value: 9999
            },
        ] as TaskItemParam[]
    }
}

export class Recruit implements TaskItem {

    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Recruit'
        this.label = '公开招募'
        this.checked = false
        this.params = [
            {
                type: 'list',
                label: '',
                key: 'select',
                value: [1, 2, 3, 4, 5],
                default: []
            },
            {
                type: 'list',
                label: '',
                key: 'confirm',
                value: [3, 4, 5],
                default: []
            },
            {
                type: 'boolean',
                label: '使用加急券',
                key: 'expedite',
                value: false,
                default: false
            },
            {
                type: 'number',
                label: '公招次数',
                key: 'times',
                value: 4,
                default: 0
            }
        ] as TaskItemParam[]
    }
}

export class Infrast implements TaskItem {
    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Infrast'
        this.label = '基建换班'
        this.checked = false
        this.params = [
            {
                type: 'list',
                label: '',
                key: 'facility',
                value: [
                    "Trade",
                    "Reception",
                    "Mfg",
                    "Control",
                    "Power",
                    "Office",
                    "Dorm"
                ],
                default: []
            },
            {
                type: 'select',
                label: '无人机用途',
                key: 'drones',
                value: '_NotUse',
                default: '',
                select: [
                    {
                        label: '不使用',
                        value: '_NotUse'
                    },
                    {
                        label: 'Money',
                        value: 'Money'
                    },
                    {
                        label: 'SyntheticJade',
                        value: 'SyntheticJade'
                    },
                    {
                        label: 'CombatRecord',
                        value: 'CombatRecord'
                    },
                    {
                        label: 'PureGold',
                        value: 'PureGold'
                    },
                    {
                        label: 'OriginStone',
                        value: 'OriginStone'
                    },
                    {
                        label: 'Chip',
                        value: 'Chip'
                    }
                ]
            },
            {
                type: 'number',
                label: '工作心情阈值(0-1.0)',
                key: 'threshold',
                value: 0.3,
                default: 0
            }
        ] as TaskItemParam[]
    }
}

export class Mall implements TaskItem {
    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Mall'
        this.label = '信用及购物'
        this.checked = false
        this.params = [
            {
                type: "boolean",
                label: '是否自动购物',
                key: 'shopping',
                value: false,
                default: false
            }
        ] as TaskItemParam[]
    }

}

export class Award implements TaskItem {
    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Award'
        this.label = '领取各种奖励'
        this.checked = false
        this.params = [
            {
                type: "boolean",
                label: '领取每日/每周任务奖励',
                key: 'award',
                value: true,
                default: true
            },
            {
                type: "boolean",
                label: '领取所有邮件奖励',
                key: 'mail',
                value: false,
                default: false
            }
        ] as TaskItemParam[]
    }
}

export class Roguelike implements TaskItem {

    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Roguelike'
        this.label = '无限刷肉鸽'
        this.checked = false
        this.params = [
            {
                type: "select",
                label: '肉鸽主题',
                key: 'theme',
                value: 'Phantom',
                default: '',
                select: [
                    {
                        label: '傀影与猩红血钻',
                        value: 'Phantom'
                    },
                    {
                        label: '水月与深蓝之树',
                        value: 'Mizuki'
                    },
                    {
                        label: '探索者的银凇止境',
                        value: 'Sami'
                    }
                ]
            },
            {
                type: "select",
                label: '模式',
                key: 'mode',
                value: 0,
                default: 0,
                select: [
                    {
                        label: '刷蜡烛，尽可能稳定地打更多层数',
                        value: 0
                    },
                    {
                        label: '刷源石锭，第一层投资完就退出',
                        value: 1
                    },
                    {
                        label: '【即将弃用】两者兼顾，投资过后再退出，没有投资就继续往后打',
                        value: 2
                    },
                    {
                        label: '开发中...',
                        value: 3
                    },
                    {
                        label: '刷开局，到达第三层后直接退出',
                        value: 4
                    }
                ]
            },
            {
                type: 'string',
                label: '开局分队',
                key: 'squad',
                value: '指挥分队',
                default: '指挥分队',
            },
            {
                type: 'string',
                label: '开局职业组',
                key: 'roles',
                value: '取长补短',
                default: '取长补短'
            },
            {
                type: 'string',
                label: '开局干员名,默认识别练度自动选择',
                key: 'core_char',
                value: '',
                default: ''
            },
            {
                type: 'boolean',
                label: '允许开局干员为助战干员',
                key: 'use_support',
                value: false,
                default: false
            },
            {
                type: "boolean",
                label: '允许非好友助战干员,开局干员为为助战true时有效',
                key: 'use_nonfriend_support',
                value: false,
                default: false
            }

        ] as TaskItemParam[]
    }

}

export class ReclamationAlgorithm implements TaskItem {

    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'ReclamationAlgorithm'
        this.label = '生息演算'
        this.checked = false
        this.params = [] as TaskItemParam[]
    }
}

export class Depot implements TaskItem {


    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Depot'
        this.label = '仓库识别'
        this.checked = false
        this.params = [] as TaskItemParam[]
    }

}

export class OperBox implements TaskItem {


    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'OperBox'
        this.label = '干员 box 识别'
        this.checked = false
        this.params = [] as TaskItemParam[]
    }

}

export class Copilot implements TaskItem {
    checked: boolean;
    key: string;
    label: string;
    params: any;

    constructor() {
        this.key = 'Copilot'
        this.label = '自动抄作业'
        this.checked = false
        this.params = [
            {
                type: 'string',
                label: '作业ID, Agent会自动下载作业到本地',
                key: 'filename',
                value: '',
                default: '_'
            },
            {
                type: 'boolean',
                label: '自动编队',
                key: 'formation',
                value: false,
                default: false
            }
        ] as TaskItemParam[]
    }
}

export interface Profile {
    connection: ConnectionProfile,
    instance_options: InstanceOptionProfile
}

export interface ConnectionProfile {

    params: TaskItemParam[]
}

export interface InstanceOptionProfile {
    params: TaskItemParam[]
}

export class Profiles implements Profile {
    connection: ConnectionProfile;
    instance_options: InstanceOptionProfile;

    constructor() {
        this.connection = new class implements ConnectionProfile {
            params: TaskItemParam[];

            constructor() {
                this.params = [
                    {
                        type: "string",
                        label: 'adb可执行文件的路径',
                        key: 'adb_path',
                        value: 'adb',
                        default: 'adb'
                    },
                    {
                        type: 'string',
                        label: '连接地址',
                        key: 'address',
                        value: '',
                        default: '_'
                    },
                    {
                        type: 'string',
                        label: '连接配置,通常不需要修改',
                        key: 'config',
                        value: 'General',
                        default: '_'
                    },
                ] as TaskItemParam[]
            }
        }
        this.instance_options = new class implements InstanceOptionProfile {
            params: TaskItemParam[];

            constructor() {
                this.params = [
                    {
                        type: 'select',
                        label: '触摸模式',
                        key: 'touch_mode',
                        value: 'ADB',
                        default: '',
                        select: [//"ADB"，"MiniTouch"，"MAATouch" 或者 "MacPlayTools"
                            {
                                label: 'ADB',
                                value: 'ADB'
                            },
                            {
                                label: 'MiniTouch',
                                value: 'MiniTouch'
                            },
                            {
                                label: 'MAATouch',
                                value: 'MAATouch'
                            },
                            {
                                label: 'MacPlayTools',
                                value: 'MacPlayTools'
                            },
                        ]
                    },
                    {
                        type: "boolean",
                        label: '是否在部署时暂停游戏',
                        key: 'deployment_with_pause',
                        value: false,
                        default: null
                    },
                    {
                        type: "boolean",
                        label: '是否使用 adb-lite',
                        key: 'adb_lite_enabled',
                        value: false,
                        default: null
                    },
                    {
                        type: "boolean",
                        label: '是否在退出时杀死 adb',
                        key: 'kill_adb_on_exit',
                        value: false,
                        default: null
                    }
                ] as TaskItemParam[]
            }
        }
    }
}



