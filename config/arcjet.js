import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";

const aj = arcjet({
key: ARCJET_KEY,
rules: [
    shield({ mode: "DRY_RUN" }), 
    detectBot({
    mode: "DRY_RUN",
    allow: ["CATEGORY:SEARCH_ENGINE"], 
    }),
    tokenBucket({
    mode: "DRY_RUN",
    refillRate: 5,
    interval: 10,
    capacity: 10,
    }),
],
});



export default aj ;