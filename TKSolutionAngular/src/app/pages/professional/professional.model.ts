export class Professional{
    constructor(
        public Code: number = 0,
        public Name: string = '',
        public CPF: string = '',
        public TypeClassDocument: number = 0,
        public TypeClassDescription: string = '',
        public TypeNumber: string = '',
        public Status: number = 0,
        public StatusDescription: string = '',
        public Selected: boolean = false){
    }
}