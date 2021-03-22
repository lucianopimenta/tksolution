export class DashBoard{
    constructor(
        public TotalOccurrences: number = 0,
        public StatusOpen: number = 0,
        public StatusPendent: number = 0,
        public StatusClose: number = 0){
    }
}

export class ChartDashBoard{
    constructor(
        public y: number = 0,
        public name: string = '',
        public exploded: boolean = false){
    }
}