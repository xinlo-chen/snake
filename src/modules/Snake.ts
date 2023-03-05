class Snake {
    // 表示蛇头的元素
    head: HTMLElement;

    // 蛇的身体（包括蛇头）
    bodies: HTMLCollection;

    // 获取蛇的容器
    element: HTMLElement;

    // 第二节位置备份
    secondBody: { x: number, y: number };

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
        this.secondBody = { x: 0, y: 0 };
    }

    // 获取蛇的坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value: number) {
        // 如果新值和旧值相同，则直接返回不再修改
        if (this.X === value) {
            return
        };
        // X的值的合法范围 0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error("蛇撞墙了！");
        }

        // 移动身体
        this.moveBody();

        this.head.style.left = value + 'px';


        // 检查蛇头是否撞到身体
        this.checkHeadBody();

    }

    set Y(value: number) {
        if (this.Y === value) {
            return
        };
        // Y的值的合法范围 0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error("蛇撞墙了！");
        }

        // 移动身体
        this.moveBody();

        this.head.style.top = value + 'px';
        // 检查有没有撞自己
        this.checkHeadBody();
    }

    // 蛇增加身体的方法
    addBody() {
        // 向element中添加一个div
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        /*
        将后边的身体设置为前边身体的位置
        例如：
            第4节 = 第3节的位置
            第3节 = 第2节的位置
            第2节 = 蛇头的位置
        */
        // 遍历获取所有的身体
        if (this.bodies[1]) {
            this.secondBody.x = (this.bodies[1] as HTMLElement).offsetLeft;
            this.secondBody.y = (this.bodies[1] as HTMLElement).offsetTop;
        }
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop || this.X === this.secondBody.x && this.Y === this.secondBody.y) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error("撞到自己了！");
            }
        }
    }
}

export default Snake;