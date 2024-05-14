import {
    Award,
    CloseDown,
    Depot,
    Fight,
    Infrast,
    Item,
    Mall,
    OperBox,
    ReclamationAlgorithm,
    Recruit,
    Roguelike,
    StartUp,
    TaskParam
} from "@/utils/types.ts";


export const taskList: Item[] = [
    new StartUp(),
    new Recruit(),
    new Fight(),
    new Infrast(),
    new Mall(),
    new Award(),
    new CloseDown(),
    new Roguelike(),
    new ReclamationAlgorithm(),
    new Depot(),
    new OperBox()
]

export const taskMap: TaskParam = {
    "StartUp": "启动游戏",
    "Recruit": "公开招募",
    "Fight": "刷理智",
    "Infrast": "基建换班",
    "Mall": "信用及购物",
    "Award": "领取各种奖励",
    "Roguelike": "肉鸽",
    "ReclamationAlgorithm": "生息演算",
    "CloseDown": "关闭游戏",
    "Copilot": "",
    "Depot": "仓库识别",
    "OperBox": "干员Box识别",
}

export const profileParamsKeyMap: TaskParam = {

    'adb_path': 'adb可执行文件的路径',
    'address': '连接地址',
    'config': '连接配置',
    'touch_mode': '触摸模式',
    'deployment_with_pause': '是否在部署时暂停游戏',
    'adb_lite_enabled': '是否使用 adb-lite',
    'kill_adb_on_exit': '是否在退出时杀死 adb',
}

























