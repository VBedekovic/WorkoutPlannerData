import express from 'express';
import db from "../db";
var fs = require('fs');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

import { validateExercise, validateWorkout } from '../services/validate';
import { responseWrap } from '../services/responseWrapper';
import path from 'path';

const router = express.Router()

// /workouts
router.get("/workouts", async (req, res) => {
    let results = await db.query(`SELECT workout_id,
                                    name, 
                                    workout_type,
                                    '' as target_muscle_groups,
                                    duration,
                                    rest_interval,
                                    time_of_day,
                                    weekday,
                                    water_intake_L,
                                    environment,
                                    '' as exercises
                                    FROM workout
                                    ORDER BY workout_id;`)

    for (var row of results.rows) {
        let target_results = await db.query(`SELECT target_muscle_group
                                            FROM workout NATURAL JOIN workout_target_muscle_group
                                            WHERE workout_id = '${row.workout_id}';`)
        row.target_muscle_groups = []
        target_results.rows.forEach(target_row => row.target_muscle_groups.push(target_row.target_muscle_group))



        let exercise_results = await db.query(`SELECT exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                            FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                            WHERE workout_id = '${row.workout_id}';`)
        row.exercises = []
        exercise_results.rows.forEach(exercise_row => {
            row.exercises.push(exercise_row)
        })

    }

    res.status(200).json(responseWrap("OK", "Fetched all workouts", results.rows))
})

router.post("/workouts", jsonParser, async (req, res) => {
    if (validateWorkout(req.body)) {
        let exerciseInsertValuesString = ""
        req.body.exercises.forEach(e => {
            exerciseInsertValuesString +=
                `('${e.exercise_name}', ${e.weight_from}, ${e.weight_to}, ${e.weight_increment}, ${e.reps}, ${e.sets}),\n`
        })
        exerciseInsertValuesString = exerciseInsertValuesString.replace(/,\n$/, "")

        let exerciseInsertQuery =
            `
            INSERT INTO exercise (exercise_name, weight_from, weight_to, weight_increment, reps, sets)
                VALUES 
                    ${exerciseInsertValuesString}
                RETURNING exercise_id;
            `

        let exerciseIDResult = await db.query(exerciseInsertQuery)

        if (!req.body.duration.hours) req.body.duration.hours = 0;
        if (!req.body.duration.minutes) req.body.duration.minutes = 0;
        if (!req.body.rest_interval.minutes) req.body.rest_interval.minutes = 0;
        if (!req.body.rest_interval.seconds) req.body.rest_interval.seconds = 0;

        let workoutInsertQuery =
            `
            INSERT INTO workout (name, workout_type, duration, rest_interval, time_of_day, weekday, water_intake_L, environment)
                VALUES 
                ('${req.body.name}',
                    '${req.body.workout_type}',
                    '${req.body.duration.hours} hours ${req.body.duration.minutes} minutes',
                    '${req.body.rest_interval.minutes} minutes ${req.body.rest_interval.seconds} seconds',
                    '${req.body.time_of_day}',
                    ${req.body.weekday},
                    ${req.body.water_intake_l},
                    '${req.body.environment}')
                RETURNING workout_id;
            `

        let workoutIDResult = await db.query(workoutInsertQuery)
        let workoutID = workoutIDResult.rows[0].workout_id

        let muscleGroupCombineWithWorkoutString = ""
        for (let muscle_group of req.body.target_muscle_groups) {
            muscleGroupCombineWithWorkoutString +=
                `(${workoutID}, '${muscle_group}'),\n`
        }
        muscleGroupCombineWithWorkoutString = muscleGroupCombineWithWorkoutString.replace(/,\n$/, "")

        let muscleGroupCombineWithWorkoutQuery =
            `
            INSERT INTO workout_target_muscle_group (workout_id, target_muscle_group)
                VALUES 
                    ${muscleGroupCombineWithWorkoutString};
            `

        await db.query(muscleGroupCombineWithWorkoutQuery);

        let combineExercisesWithWorkoutString = ""
        for (let row of exerciseIDResult.rows) {
            combineExercisesWithWorkoutString +=
                `(${workoutID}, ${row.exercise_id}),\n`
        }
        combineExercisesWithWorkoutString = combineExercisesWithWorkoutString.replace(/,\n$/, "")

        let combineExercisesWithWorkoutQuery =
            `
            INSERT INTO exercise_in_workout (workout_id, exercise_id)
                VALUES 
                    ${combineExercisesWithWorkoutString};
            `
        await db.query(combineExercisesWithWorkoutQuery)




        let results = await db.query(`SELECT workout_id,
                                    name, 
                                    workout_type,
                                    '' as target_muscle_groups,
                                    duration,
                                    rest_interval,
                                    time_of_day,
                                    weekday,
                                    water_intake_L,
                                    environment,
                                    '' as exercises
                                    FROM workout
                                    WHERE workout_id = ${workoutID};`)

        for (var row of results.rows) {
            let target_results = await db.query(`SELECT target_muscle_group
                                            FROM workout NATURAL JOIN workout_target_muscle_group
                                            WHERE workout_id = '${row.workout_id}';`)
            row.target_muscle_groups = []
            target_results.rows.forEach(target_row => row.target_muscle_groups.push(target_row.target_muscle_group))



            let exercise_results = await db.query(`SELECT exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                            FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                            WHERE workout_id = '${row.workout_id}';`)
            row.exercises = []
            exercise_results.rows.forEach(exercise_row => {
                row.exercises.push(exercise_row)
            })

        }


        res.status(200).json(responseWrap("OK", "Created new workout", results.rows[0]))
    }
    else res.status(400).json(responseWrap("Bad Request", "Missing fields and/or wrong values"))
})

router.all("/workouts", async (req, res) => {
    res.status(501).json(responseWrap("Not Implemented", "Method not implemented for requested resource"))
})

// /workouts/{id}
router.get("/workouts/:id(\\d+)", async (req, res) => {
    let results = await db.query(`SELECT workout_id,
                                    name, 
                                    workout_type,
                                    '' as target_muscle_groups,
                                    duration,
                                    rest_interval,
                                    time_of_day,
                                    weekday,
                                    water_intake_L,
                                    environment,
                                    '' as exercises
                                    FROM workout
                                    WHERE workout_id = ${req.params.id};`)

    for (var row of results.rows) {
        let target_results = await db.query(`SELECT target_muscle_group
                                            FROM workout NATURAL JOIN workout_target_muscle_group
                                            WHERE workout_id = '${row.workout_id}';`)
        row.target_muscle_groups = []
        target_results.rows.forEach(target_row => row.target_muscle_groups.push(target_row.target_muscle_group))



        let exercise_results = await db.query(`SELECT exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                            FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                            WHERE workout_id = '${row.workout_id}';`)
        row.exercises = []
        exercise_results.rows.forEach(exercise_row => {
            row.exercises.push(exercise_row)
        })

    }

    if (results.rows.length == 1) res.status(200).json(responseWrap("OK", "Fetched workout", results.rows[0]))
    else res.status(404).json(responseWrap("Not Found", `Workout with id ${req.params.id} does not exist`, null))
})

router.put("/workouts/:id(\\d+)", jsonParser, async (req, res) => {
    let results = await db.query(`SELECT *
                                    FROM workout
                                    WHERE workout_id = ${req.params.id};`)
    if (results.rows.length == 1) {
        if (validateWorkout(req.body)) {

            if (!req.body.duration.hours) req.body.duration.hours = 0;
            if (!req.body.duration.minutes) req.body.duration.minutes = 0;
            if (!req.body.rest_interval.minutes) req.body.rest_interval.minutes = 0;
            if (!req.body.rest_interval.seconds) req.body.rest_interval.seconds = 0;


            await db.query(
                `
                UPDATE workout
                    SET name = '${req.body.name}',
                        workout_type = '${req.body.workout_type}',
                        duration = '${req.body.duration.hours} hours ${req.body.duration.minutes} minutes',
                        rest_interval = '${req.body.rest_interval.minutes} minutes ${req.body.rest_interval.seconds} seconds',
                        time_of_day = '${req.body.time_of_day}',
                        weekday = ${req.body.weekday},
                        water_intake_L = ${req.body.water_intake_l},
                        environment = '${req.body.environment}'
                    WHERE workout_id = ${req.params.id};
                `
            )
            await db.query(
                `
                DELETE FROM workout_target_muscle_group
                    WHERE workout_id = ${req.params.id};
                `
            )

            let muscleGroupCombineWithWorkoutString = ""
            for (let muscle_group of req.body.target_muscle_groups) {
                muscleGroupCombineWithWorkoutString +=
                    `(${req.params.id}, '${muscle_group}'),\n`
            }
            muscleGroupCombineWithWorkoutString = muscleGroupCombineWithWorkoutString.replace(/,\n$/, "")

            let muscleGroupCombineWithWorkoutQuery =
                `
                INSERT INTO workout_target_muscle_group (workout_id, target_muscle_group)
                    VALUES 
                        ${muscleGroupCombineWithWorkoutString};
                `

            await db.query(muscleGroupCombineWithWorkoutQuery);

            let exerciseIDResult = await db.query(
                `SELECT exercise_id
                    FROM exercise_in_workout
                    WHERE workout_id = ${req.params.id};
                `
            )
            await db.query(
                `
                DELETE FROM exercise_in_workout
                    WHERE workout_id = ${req.params.id};
    
                `
            )
            for (let row of exerciseIDResult.rows) {
                await db.query(
                    `
                    DELETE FROM exercise
                        WHERE exercise_id = ${row.exercise_id};
                    `
                )
            }
            let exerciseInsertValuesString = ""
            req.body.exercises.forEach(e => {
                exerciseInsertValuesString +=
                    `('${e.exercise_name}', ${e.weight_from}, ${e.weight_to}, ${e.weight_increment}, ${e.reps}, ${e.sets}),\n`
            })
            exerciseInsertValuesString = exerciseInsertValuesString.replace(/,\n$/, "")

            let exerciseInsertQuery =
                `
            INSERT INTO exercise (exercise_name, weight_from, weight_to, weight_increment, reps, sets)
                VALUES 
                    ${exerciseInsertValuesString}
                RETURNING exercise_id;
            `
            exerciseIDResult = await db.query(exerciseInsertQuery)
            let combineExercisesWithWorkoutString = ""
            for (let row of exerciseIDResult.rows) {
                combineExercisesWithWorkoutString +=
                    `(${req.params.id}, ${row.exercise_id}),\n`
            }
            combineExercisesWithWorkoutString = combineExercisesWithWorkoutString.replace(/,\n$/, "")

            let combineExercisesWithWorkoutQuery =
                `
            INSERT INTO exercise_in_workout (workout_id, exercise_id)
                VALUES 
                    ${combineExercisesWithWorkoutString};
            `
            await db.query(combineExercisesWithWorkoutQuery)


            let results = await db.query(`SELECT workout_id,
                                        name, 
                                        workout_type,
                                        '' as target_muscle_groups,
                                        duration,
                                        rest_interval,
                                        time_of_day,
                                        weekday,
                                        water_intake_L,
                                        environment,
                                        '' as exercises
                                        FROM workout
                                        WHERE workout_id = ${req.params.id};`)

            for (var row of results.rows) {
                let target_results = await db.query(`SELECT target_muscle_group
                                                FROM workout NATURAL JOIN workout_target_muscle_group
                                                WHERE workout_id = '${row.workout_id}';`)
                row.target_muscle_groups = []
                target_results.rows.forEach(target_row => row.target_muscle_groups.push(target_row.target_muscle_group))



                let exercise_results = await db.query(`SELECT exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                                FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                                WHERE workout_id = '${row.workout_id}';`)
                row.exercises = []
                exercise_results.rows.forEach(exercise_row => {
                    row.exercises.push(exercise_row)
                })
            }

            res.status(200).json(responseWrap("OK", "Workout updated", results.rows[0]))
        }
        else res.status(400).json(responseWrap("Bad Request", "Missing fields and/or wrong values"))
    }
    else res.status(404).json(responseWrap("Not Found", `Workout with id ${req.params.id} does not exist`, null))
})

router.delete("/workouts/:id(\\d+)", async (req, res) => {
    let results = await db.query(`SELECT *
                                    FROM workout
                                    WHERE workout_id = ${req.params.id};`)
    if (results.rows.length == 1) {
        let exerciseIDResult = await db.query(
            `SELECT exercise_id
                FROM exercise_in_workout
                WHERE workout_id = ${req.params.id};
            `
        )

        await db.query(
            `
            BEGIN;
            DELETE FROM workout_target_muscle_group
                WHERE workout_id = ${req.params.id};
    
            DELETE FROM exercise_in_workout
                WHERE workout_id = ${req.params.id};
    
            DELETE FROM workout
                WHERE workout_id = ${req.params.id};
            COMMIT;
            `
        )

        for (let row of exerciseIDResult.rows) {
            await db.query(
                `
                DELETE FROM exercise
                    WHERE exercise_id = ${row.exercise_id};
                `
            )
        }

        res.status(200).json(responseWrap("OK", `Workout with id ${req.params.id} has been deleted`, null))
    }
    else res.status(404).json(responseWrap("Not Found", `Workout with id ${req.params.id} does not exist`, null))
})

router.all("/workouts/:id(\\d+)", async (req, res) => {
    res.status(501).json(responseWrap("Not Implemented", "Method not implemented for requested resource"))
})

// /exercises
router.get("/exercises", async (req, res) => {
    let results = await db.query(`SELECT exercise_id, exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                    FROM exercise
                                    ORDER BY exercise_id;`)
    res.status(200).json(responseWrap("OK", "Fetched all exercises", results.rows))
})

router.all("/exercises", async (req, res) => {
    res.status(501).json(responseWrap("Not Implemented", "Method not implemented for requested resource"))
})


// /exercises/{id}
router.get("/exercises/:id(\\d+)", async (req, res) => {
    let results = await db.query(`SELECT exercise_id, exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                    FROM exercise
                                    WHERE exercise_id = ${req.params.id};`)

    if (results.rows.length == 1) res.status(200).json(responseWrap("OK", "Fetched exercise", results.rows[0]))
    else res.status(404).json(responseWrap("Not Found", `Exercise with id ${req.params.id} does not exist`, null))
})

router.all("/exercises/:id(\\d+)", async (req, res) => {
    res.status(501).json(responseWrap("Not Implemented", "Method not implemented for requested resource"))
})


// /workouts/{id}/exercises
router.get("/workouts/:id(\\d+)/exercises", async (req, res) => {
    let results = await db.query(`SELECT *
                                    FROM workout
                                    WHERE workout_id = ${req.params.id};`)
    if (results.rows.length == 1) {
        let results = await db.query(`SELECT exercise_id, exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                            FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                            WHERE workout_id = '${req.params.id}';`)

        res.status(200).json(responseWrap("OK", `Fetched exercises from workout with id ${req.params.id}`, results.rows))
    }
    else res.status(404).json(responseWrap("Not Found", `Workout with id ${req.params.id} does not exist`, null))
})

router.all("/workouts/:id(\\d+)/exercises", async (req, res) => {
    res.status(501).json(responseWrap("Not Implemented", "Method not implemented for requested resource"))
})


router.get("/openapi", async (req, res) => {
    res.status(200).json(
        responseWrap("OK", "Retrieved OpenAPI specification",
            JSON.parse(fs.readFileSync(path.resolve('./dist/public/openapi.json'), 'utf8'))
        )
    )
})

router.all("/openapi", async (req, res) => {
    res.status(501).json(responseWrap("Not Implemented", "Method not implemented for requested resource"))
})
/* 
router.post("/workout-valdiate-test", jsonParser, async (req, res) => {

    if (validateWorkout(req.body)) res.status(200).json(responseWrap("OK", "Workout valid", req.body))
    else res.status(400).json(responseWrap("Bad Request", "Missing fields and/or wrong values"))
})

router.post("/exercise-valdiate-test", jsonParser, async (req, res) => {

    if (validateExercise(req.body)) res.status(200).json(responseWrap("OK", "Exercise valid", req.body))
    else res.status(400).json(responseWrap("Bad Request", "Missing fields and/or wrong values"))
})
 */
export = router;