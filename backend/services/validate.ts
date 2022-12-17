import { Workout } from "../DTO/workout";
import { Exercise } from "../DTO/exercise"



function hasAllProperties(data, theClass) {
    const keyObj = new theClass()
    return Object.keys(keyObj).every((key) => data[key] !== undefined)
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

export function validateExercise(data) {
    if (hasAllProperties(data, Exercise)) {
        if (!(Number.isFinite(data.weight_to)
            && Number.isFinite(data.weight_from)
            && Number.isFinite(data.weight_increment)
            && Number.isInteger(data.reps)
            && Number.isInteger(data.sets))) {
            return false;
        }
        else return true;
    }
    else return false;
}

export function validateWorkout(data) {
    if (hasAllProperties(data, Workout)) {
        if (!(["hypertrophy", "strength", "cardio"].includes(data.workout_type))) return false;
        if (!(data.target_muscle_groups.every(value => ["chest", "back", "arms", "shoulders", "legs", "abs"].includes(value)))) return false;
        if (hasDuplicates(data.target_muscle_groups)) return false;
        if (data.target_muscle_groups.length == 0) return false;

        if (!(data.duration.hours || data.duration.minutes)) return false;
        if (data.duration.hours) if (!(Number.isInteger(data.duration.hours))) return false;
        if (data.duration.minutes) if (!( Number.isInteger(data.duration.minutes))) return false;
        
        if (!(data.rest_interval.minutes || data.rest_interval.seconds)) return false;
        if (data.rest_interval.minutes) if (!(Number.isInteger(data.rest_interval.minutes))) return false;
        if (data.rest_interval.seconds) if (!( Number.isInteger(data.rest_interval.seconds))) return false;
        
        if (!(["morning", "noon", "afternoon", "evening", "night"].includes(data.time_of_day))) return false;
        if (!([1, 2, 3, 4, 5, 6, 7].includes(data.weekday))) return false;
        if (!(Number.isFinite(data.water_intake_l))) return false;
        if (!(["gym", "home", "outdoors"].includes(data.environment))) return false;
        if (!Array.isArray(data.exercises)) return false;
        if (data.exercises.length == 0) return false;
        if (!(data.exercises.every(e => validateExercise(e)))) return false;
        
        return true;
    }
    else return false;
}