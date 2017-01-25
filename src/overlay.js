import {moveCard, assignMember, addLabel, getCurrentCardId} from './TrelloService'
import {TRELLO_TOKEN, APP_KEY, members, labels} from '../constants'

const t = TrelloPowerUp.iframe()

Trello.setKey(APP_KEY)
Trello.setToken(localStorage.getItem('trello_token') || TRELLO_TOKEN)

const incoming = '588714b4967e55d7882ff042'
const lead = '588714b4967e55d7882ff00e'

moveCard(Trello,incoming,lead)
assignMember(Trello,incoming,members.akram)
addLabel(Trello,incoming,labels.our_move)

getCurrentCardId(t)
.then(id => {
  if(id === 'ok')   console.log('ok')
  if(id === 'ok2') console.log('ok')
  if(id === 'ok3') console.log('ok')
})
.catch(err => {
  console.log(err);
})

t.render(() => {});

// close overlay if user presses escape key
document.addEventListener('keyup', (e)  => {
    if (e.keyCode == 27) {
        t.closeOverlay().done();
    }
});

// close overlay if user clicks outside our content
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'body') {
        t.closeOverlay().done()
    }
});

document.getElementById('closeCompose').addEventListener('click', () => {
    t.closeOverlay().done()
})
