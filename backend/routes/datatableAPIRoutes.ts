import express from 'express';
import db from "../db";

const router = express.Router()

router.get("/datatableData", async (req, res) => {
    let results = await db.query(`SELECT name, 
                                    workout_type,
                                    '' as target_muscle_groups,
                                    duration,
                                    rest_interval,
                                    time_of_day,
                                    weekday,
                                    water_intake_L,
                                    environment,
                                    '' as exercises
                                    FROM workout;`)

    for (var row of results.rows) {
        let target_results = await db.query(`SELECT target_muscle_group
                                            FROM workout NATURAL JOIN workout_target_muscle_group
                                            WHERE name = '${row.name}';`)
        row.target_muscle_groups = []
        target_results.rows.forEach(target_row => row.target_muscle_groups.push(target_row.target_muscle_group))



        let exercise_results = await db.query(`SELECT exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                            FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                            WHERE name = '${row.name}';`)
        row.exercises = []
        exercise_results.rows.forEach(exercise_row => {
            row.exercises.push(exercise_row)
        })

    }

    res.json(results.rows)
});

const search_req = ["name", "workout_type", "time_of_day", "environment", "target_muscle_groups", "exercise_name", "wild"];
const special_search_req = ["target_muscle_groups", "exercise_name", "wild"];
router.get("/datatableDataSearch", async (req, res) => {
    let searchField = req.query.field as string;
    let searchValue = req.query.value as string;
    if (!search_req.includes(searchField)) {
        res.status(400).send("Invalid parameters!")
        return
    }

    let results;
    if (special_search_req.includes(searchField)) {
        let searchValues = searchValue.trim().split(/\s+/);
        if (searchField === "target_muscle_groups") {
            let st = `SELECT name, 
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
                        WHERE EXISTS (`
            
            let isFirst = true;
            for (let value of searchValues) {
                if (!isFirst) st += `INTERSECT
                                    `;
                isFirst = false;
                st += `SELECT workout_target_muscle_group.workout_id
                        FROM workout_target_muscle_group
                        WHERE workout.workout_id = workout_target_muscle_group.workout_id
                            AND target_muscle_group LIKE lower('%${value}%')
                        `
            }

            st += `)`
            results = await db.query(st)

        } else if (searchField === "exercise_name") {
            results = await db.query(`SELECT name, 
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
                                        WHERE EXISTS (
                                            SELECT *
                                                FROM workout workout2 NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                                WHERE workout.workout_id = workout2.workout_id
                                                    AND lower(exercise_name) LIKE lower('%${searchValue}%')
                                        );`)
        
        } else if (searchField === "wild") {
            let st = `SELECT DISTINCT name, 
                        workout_type,
                        '' as target_muscle_groups,
                        duration,
                        rest_interval,
                        time_of_day,
                        weekday,
                        water_intake_L,
                        environment,
                        '' as exercises
                        FROM (
                        `

            st += `SELECT name, 
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
                        WHERE EXISTS (`
            
            let isFirst = true;
            for (let value of searchValues) {
                if (!isFirst) st += `INTERSECT
                                    `;
                isFirst = false;
                st += `SELECT workout_target_muscle_group.workout_id
                        FROM workout_target_muscle_group
                        WHERE workout.workout_id = workout_target_muscle_group.workout_id
                            AND target_muscle_group LIKE lower('%${value}%')
                        `
            }
            st += `)
                    `
            

            st += `UNION
                    SELECT name, 
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
                        WHERE EXISTS (
                            SELECT *
                                FROM workout workout2 NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                WHERE workout.workout_id = workout2.workout_id
                                    AND lower(exercise_name) LIKE lower('%${searchValue}%')
                        )
                ` 
            
            
            for (let field of ["name", "workout_type", "time_of_day", "environment"]) {
                st += `UNION
                        SELECT name, 
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
                            WHERE lower(${field}) LIKE lower('%${searchValue}%')
                `
            }
            

            st += `) as foo`

            results = await db.query(st)


        } else {
            results = await db.query(`SELECT name, 
                                        workout_type,
                                        '' as target_muscle_groups,
                                        duration,
                                        rest_interval,
                                        time_of_day,
                                        weekday,
                                        water_intake_L,
                                        environment,
                                        '' as exercises
                                        FROM workout;`)
        }
    } else {
        results = await db.query(`SELECT name, 
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
                                    WHERE lower(${searchField}) LIKE lower('%${req.query.value}%');`)

    }

    for (var row of results.rows) {
        let target_results = await db.query(`SELECT target_muscle_group
                                            FROM workout NATURAL JOIN workout_target_muscle_group
                                            WHERE name = '${row.name}';`)
        row.target_muscle_groups = []
        target_results.rows.forEach(target_row => row.target_muscle_groups.push(target_row.target_muscle_group))



        let exercise_results = await db.query(`SELECT exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                            FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                            WHERE name = '${row.name}';`)
        row.exercises = []
        exercise_results.rows.forEach(exercise_row => {
            row.exercises.push(exercise_row)
        })

    }

    res.json(results.rows);

    
});

export = router;