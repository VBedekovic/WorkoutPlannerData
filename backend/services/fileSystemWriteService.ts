import fs from "fs";
import db from "../db";
const fastcsv = require("fast-csv");
const ws = fs.createWriteStream("workoutPlanner.csv");

export async function write_to_csv() {
    db.query(`SELECT name, 
            workout_type,
            target_muscle_group,
            TO_CHAR(duration, 'HH24:MI:SS') as duration,
            TO_CHAR(rest_interval, 'HH24:MI:SS') as rest_interval,
            time_of_day,
            weekday,
            water_intake_L,
            environment,
            exercise_name,
            weight_from,
            weight_to,
            weight_increment,
            reps,
            sets
            FROM workout 
            NATURAL JOIN workout_target_muscle_group 
            NATURAL JOIN exercise_in_workout 
            NATURAL JOIN exercise;`, (err, res) => {

    if (err) {
        console.log(err.stack);
    } else {
        const jsonData = JSON.parse(JSON.stringify(res.rows));

        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function () {
                console.log("Write to workoutPlanner.csv successful!");
            })
            .pipe(ws);
    }
});
}



export async function write_to_json() {
    try {
        let res = await db.query(`SELECT name, 
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

        for (var row of res.rows) {
            let target_res = await db.query(`SELECT target_muscle_group
                                                FROM workout NATURAL JOIN workout_target_muscle_group
                                                WHERE name = '${row.name}';`)
            row.target_muscle_groups = []
            target_res.rows.forEach(target_row => row.target_muscle_groups.push(target_row.target_muscle_group))



            let exercise_res = await db.query(`SELECT exercise_name, weight_from, weight_to, weight_increment, reps, sets
                                                FROM workout NATURAL JOIN exercise_in_workout NATURAL JOIN exercise
                                                WHERE name = '${row.name}';`)
            row.exercises = []
            exercise_res.rows.forEach(exercise_row => {
                row.exercises.push(exercise_row)
            })

        }

        let data = JSON.stringify(res.rows, null, 4);
        fs.writeFileSync('workoutPlanner.json', data);
        console.log("Write to workoutPlanner.json successful!")
    }
    catch (error) {
        console.log(error)
    }
    
}