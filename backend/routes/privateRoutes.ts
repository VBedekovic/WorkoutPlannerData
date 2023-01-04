import express from 'express';
import fs from "fs";
import {getUserEmail} from '../services/authService';
import { AuthRequest } from '../interface/authRequest';
import { write_to_csv, write_to_json } from '../services/fileSystemWriteService';

const router = express.Router()

router.get('/profile', (req: AuthRequest, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(JSON.stringify(req.oidc.user));
    }
    else {
        res.status(401).send()
    }
});


router.get("/refresh", async (req: AuthRequest, res) => {
    if (req.oidc.isAuthenticated()) {
        await write_to_csv()
        await write_to_json()

        fs.copyFileSync("workoutPlanner.json", "dist/public/workoutPlanner.json");
        fs.copyFileSync("workoutPlanner.csv", "dist/public/workoutPlanner.csv");
        res.status(200).send()
    }
    else {
        res.status(401).send()
    }
});




export = router;

