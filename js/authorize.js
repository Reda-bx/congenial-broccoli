var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

document.getElementById('authorize').addEventListener('click', function(){
  Trello.authorize(
    {
      name: 'HF Automator',
      type: 'popup',
      expiration: 'never',
      interactive: true,
      scope: { read: true, write: true },
      success (e) {
        console.log('success')
        Trello.setToken(localStorage.getItem('trello_token'))
      },
      error () {
        console.log('failure')
      }
    }
  )
})
