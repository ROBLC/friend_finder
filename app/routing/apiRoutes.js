
var friendArray = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendArray);
    });
    app.post("/api/friends", function (req, res) {
        var bestMatch;
        for (i = 0; i < req.body.scores.length; i++) {
            req.body.scores[i] = parseInt(req.body.scores[i]);
        };
        for (i = 0; i < friendArray.length; i++) {
            var scoredif;
            var tempdif = 0;
            var bestdif = 100;
            for (j = 0; j < req.body.scores.length; j++) {
                var userArr = friendArray[i];
                var newuser = req.body;
                console.log("old user score #" + j + ": " + userArr.scores[j]);
                console.log("new user score #" + j + ": " + newuser.scores[j])
                scoredif = userArr.scores[j] - newuser.scores[j];
                console.log("score #" + j + " diff: " + Math.abs(scoredif));
                tempdif += Math.abs(scoredif);
                if (tempdif < bestdif) {
                    bestdif = tempdif;
                    bestMatch = friendArray[i];
                    console.log("hey" + friendArray[i]);
                }


            };
            console.log("diff for" + friendArray[i].name + ": " + tempdif);
        }
        res.json(bestMatch);


        friendArray.push(req.body);
        console.log(friendArray);
    })
}


