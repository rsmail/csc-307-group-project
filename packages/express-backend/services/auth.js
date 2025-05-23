import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
const creds = [];

export function registerUser(req, res) {
    const { username, pwd } = req.body;

    if (!username || !pwd) {
        res.status(400).send("Bad request: Invalid input data");
    } else if (creds.find((c) => c.username === username)) {
        res.status(409).send("Username already taken");
    } else {
        bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(pwd, salt))
            .then((hashedPassword) => {
                return generateAccessToken(username).then(
                    (jwttoken) => {
                        // console.log("Token:", token);
                        // res.status(201).send({ token: jwttoken});
                        creds.push({
                            username,
                            hashedPassword
                        });

                        return {
                            username,
                            hashedPassword,
                            jwttoken
                        };
                    }
                );
            })
            .then(async (cred) => {
                console.log(cred);
                const { error } = await db
                    .from("users")
                    .insert({
                        email: cred.username,
                        password: cred.hashedPassword,
                        token: cred.jwttoken
                    });

                if (error) {
                    console.log(error);
                }
                res.status(201).send({
                    email: cred.username,
                    token: cred.jwttoken
                });
            });
    }
}

function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received");
        res.status(401).end();
    } else {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            (error, decoded) => {
                if (decoded) {
                    next();
                } else {
                    console.log("JWT error:", error);
                    res.status(401).end();
                }
            }
        );
    }
}

export function loginUser(req, res) {
    const { username, pwd } = req.body; // from form
    const retrievedUser = creds.find(
        (c) => c.username === username
    );

    if (!retrievedUser) {
        // invalid username
        res.status(401).send("Unauthorized");
    } else {
        bcrypt
            .compare(pwd, retrievedUser.hashedPassword)
            .then((matched) => {
                if (matched) {
                    generateAccessToken(username).then(
                        (token) => {
                            res.status(200).send({
                                token: token
                            });
                        }
                    );
                } else {
                    // invalid password
                    res.status(401).send("Unauthorized");
                }
            })
            .catch(() => {
                res.status(401).send("Unauthorized");
            });
    }
}
