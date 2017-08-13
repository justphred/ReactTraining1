var axios = require('axios');

// Github client id and "secret id" will be required if you hit then
// the Github api interface too often within some period of time.
// "Google" Github client id to figure out how to get one.
// var personalAccessToken = 45f131268215b0b480af7a3ffc1e3eae0842872b
// curl -u username:token https://api.github.com/user
// curl -u justphred:45f131268215b0b480af7a3ffc1e3eae0842872b https://api.github.com/justphred
// var github_id = "MY_CLIENT_ID";
// var github_sec_id = "MY_SECRET_ID";
var myUserId = "justphred";
var myPersAccessToken = "45f131268215b0b480af7a3ffc1e3eae0842872b";
// var params = "?client_id=" + github_id + "&client_secret" + github_sec_id;
var params = "?client_id=" + myUserId + "&client_secret" + myPersAccessToken;
//var params = "";

function getProfile( username ) {
   return axios.get("https://api.github.com/users/" + username + params)
    .then( function(user) {
      return user.data;
    });
}

function getRepos(username) {
  return axios.get("https://api.github.com/users/" + username + "/repos" + params + "&per_page=100");
}

function getStarCount(repos) {
  return repos.data.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

// axios.all() takes an array of asynchronous functions which return promises,
// as its parameter. Once all of the asynchronous operations have been resolved,
// it, returns an array that contains the results of each of those functions.

function getUserData(player) {
  return axios.all([
      getProfile(player),
      getRepos(player)
    ]).then (function (data){
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers(players) {
  return players.sort(function(a, b){
    return b.score - a.score;
  });
}

module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: function (language) {
    var encodedURI =
       window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then( function(response) {
        return response.data.items;
      });
  }
}






//asdfasdfasdf
