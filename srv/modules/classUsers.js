

    class cUsers
    {
        constructor(app, db)
        {
            // let db = require("./database.js"); 

            // read list of users
            app.get("/api/users", (req, res, next) => 
            {
                var sql = "select * from user"
                var params = []
                db.all(sql, params, (err, rows) => 
                {
                    if (err) 
                    {
                    res.status(400).json({"error":err.message});
                    return;
                    }
                    res.json(
                    {
                        "message":"success",
                        "data":rows
                    })
                });
            });

            // Get a single user by id
            app.get("/api/user/:id", (req, res, next) => 
            {
                var sql = "select * from user where id = ?"
                var params = [req.params.id]
                db.get(sql, params, (err, row) => 
                {
                    if (err) 
                    {
                        res.status(400).json({"error":err.message});
                        return;
                    }
                    res.json({
                        "message":"success",
                        "data":row
                    })
                });
            });

            // Create a new user
            app.post("/api/user/", (req, res, next) => 
            {
                var errors=[]
                if (!req.body.password)
                {
                    errors.push("No password specified");
                }
                if (!req.body.email)
                {
                    errors.push("No email specified");
                }
                if (errors.length)
                {
                    res.status(400).json({"error":errors.join(",")});
                    return;
                }
                var data = {
                                name: req.body.name,
                                email: req.body.email,
                                password : md5(req.body.password)
                            }
                
                var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
                var params =[data.name, data.email, data.password]
                
                db.run(sql, params, function (err, result) 
                {
                    if (err)
                    {
                        res.status(400).json({"error": err.message})
                        return;
                    }
                    res.json
                    ({
                        "message": "success",
                        "data": data,
                        "id" : this.lastID
                    });
                });
            })


            //update existing user  - https://THOMAS-RASPBERRY-PI-2:8000/api/user/3?name=Test&email=test@a.b&password=test123
            app.patch("/api/user/:id", (req, res, next) => 
            {
                var data = {
                                name: req.body.name,
                                email: req.body.email,
                                password : req.body.password ? md5(req.body.password) : null
                            };

                db.run(
                    `UPDATE user set 
                    name = COALESCE(?,name), 
                    email = COALESCE(?,email), 
                    password = COALESCE(?,password) 
                    WHERE id = ?`,
                    [data.name, data.email, data.password, req.params.id],
                    function (err, result) 
                    {
                        if (err)
                        {
                            res.status(400).json({"error": res.message})
                            return;
                        }
                        res.json({
                            message: "success",
                            data: data,
                            changes: this.changes
                        })
                });
            })


            //Delete a user

            app.delete("/api/user/:id", (req, res, next) => 
            {
                db.run(
                    'DELETE FROM user WHERE id = ?',
                    req.params.id,
                    function (err, result) 
                    {
                        if (err)
                        {
                            res.status(400).json({"error": res.message})
                            return;
                        }
                        res.json({"message":"deleted", changes: this.changes})
                });
            });

        }  //Constructor
}

module.exports = cUsers;
