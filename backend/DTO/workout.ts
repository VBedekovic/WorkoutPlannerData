import { Exercise } from "./exercise";

export class Workout {
    public name: string = "";
    public workout_type: string = "";
    public target_muscle_groups: string[] = [];
    public duration: {
        hours: number,
        minutes: number
    } = {
        hours: 0,
        minutes: 0
    };
    public rest_interval: {
        minutes: number,
        seconds: number
    } = {
        minutes: 0,
        seconds: 0
    };
    public time_of_day: string = "";
    public weekday: number = 0;
    public water_intake_l: number = 0;
    public environment: string = "";
    public exercises: Exercise[] = [];
}