var friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
      });
    

    app.post("/api/friends", function (req, res) {

        console.log(req.body.scores);

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };


        var userInfo = {
            name: req.body.name,
            photo: req.body.photo,
            scores: req.body.scores
        };


        var getSum2 = userInfo.scores.reduce(function (a, b) {
            return a + b;
        }, 0);

        console.log(getSum2)

        var userScore = userInfo.scores;


        for (var i = 0; i < friends.length; i++) {
            var allFriends = friends[i];
            console.log("all friends: " + JSON.stringify(allFriends))
            var allFriendSum = allFriends.scores;
            console.log("all friends scores: " + allFriendSum)
            var getSum = allFriendSum.reduce(function (a, b) {
                return a + parseFloat(b);
            }, 0);
            console.table("SUM friendScores: " + getSum)


            // // allFriends.scores.length === 10
            // for (var j = 0; j < allFriends.scores.length; j++) {
            //     var allFriendScores = allFriends.scores[j];
            //     // console.table("2nd scores: " + allFriendScores)
            //     var currentUserScore = userScore[j];
            //     // console.log("---------------------------------")

            //     // console.log("---------------------------------")



            totalDifference = Math.abs(parseInt(getSum2) - parseInt(getSum));
            // console.table("Name: " + allFriends.name + " Score: " + allFriendScores + " userScore " + currentUserScore
            //     + " Total Difference: " + totalDifference)
            // console.log("------------------------")
        }

        if (totalDifference <= bestMatch.friendDifference) {
            bestMatch.name = allFriends.name;
            // bestMatch.photo = allFriends.photo;
            bestMatch.friendDifference = totalDifference;
            console.log("best match is: " + JSON.stringify(bestMatch));
        }

        friends.push(req.body);

        res.json(bestMatch)
        
    })
    



}



