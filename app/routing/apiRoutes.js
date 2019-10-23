var friendsData = require("../data/friends");

module.exports = function(app) {
app.get("/api/friends", function(req, res) {
    res.json(friendsData);
});
app.post("/api/friends", function(req, res) {
    
    var match ={name:' ',photo:' ',bestscore:100}
    console.log(req.body);
    var userData = req.body;
    var userScores = userData.scores;
    var totalDifference = 0;
    for (var i = 0; i < friendsData.length; i++){
        console.log('friend: ' + friendsData[i].name);
        console.log('length: ' + friendsData.length);
        totalDifference = 0;
        for (var j = 0; j < friendsData[i].scores.length; j++ ){
            console.log('score length : ' + friendsData[i].scores.length);
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
            console.log('difference ' + (j+1)+':'+ totalDifference);
        }
        if (totalDifference <= match.bestscore){
            match.name = friendsData[i].name;
            match.photo = friendsData[i].photo;
            match.bestscore = totalDifference;
            console.log('best: '+match.bestscore);
        }
    }
    console.log('best: '+match.bestscore);
    friendsData.push(userData);
    res.json(match);
});

}