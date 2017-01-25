/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var oauthUrl = 'https://trello.com/1/authorize?expiration=never' +
  '&nameHF=&scope=read,write&key=14148040b20dddf7d33c4eb19da5246b&type=popup';
const APP_KEY = '14148040b20dddf7d33c4eb19da5246b'
t.render(function(){

});

document.getElementById('save').addEventListener('click', function(){
  Trello.setKey(APP_KEY)
  Trello.authorize(
    {
      name: 'HF Trello',
      type: 'popup',
      expiration: 'never',
      interactive: true,
      scope: { read: true, write: true },
      success (e) {
        // Can't do nothing, we've left the page
        console.log(localStorage.getItem('trello_token'))
        Trello.setToken(localStorage.getItem('trello_token'))
        var success = function (successMsg) {
          console.log(successMsg)
        }

        var error = function (errorMsg) {
          console.log(errorMsg)
        }
        Trello.get(`/member/me/boards`, success, error)
      },
      error () {
        console.log('ailed to authorize with Trello.')
      }
    }
  )
})
