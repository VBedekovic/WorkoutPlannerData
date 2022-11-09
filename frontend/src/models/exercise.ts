export class Exercise {
    constructor(
        public exercise_name: string,
        public weight_from: number,
        public weight_to: number,
        public weight_increment: number,
        public reps: number,
        public sets: number
    ) {}
}