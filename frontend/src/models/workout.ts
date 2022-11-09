import { Exercise } from "./exercise";

export class Workout {
    constructor(
        public name: string,
        public workout_type: string,
        public target_muscle_groups: string[],
        public duration: {hours: number, minutes: number},
        public rest_interval: {minutes: number, seconds: number},
        public time_of_day: string,
        public weekday: 1 | 2 | 3 | 4 | 5 | 6 | 7,
        public water_intake_l: number,
        public environment: "gym" | "home" | "outdoors",
        public exercises: Exercise[]
    ) {}

    get DOW(): string {
        switch(this.weekday) {
            case 1: {
                return "Mon"
            }
            case 2: {
                return "Thu"
            }
            case 3: {
                return "Wen"
            }
            case 4: {
                return "Thr"
            }
            case 5: {
                return "Fri"
            }
            case 6: {
                return "Sat"
            }
            case 7: {
                return "Sun"
            }
            default: {
                return "idk"
            }
        }
    }
}