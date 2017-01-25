import {moveCard, assignMember, addLabel, getCurrentCardId, setDueDate} from './TrelloService'
import {TRELLO_TOKEN, APP_KEY, members, labels} from '../constants'

const t = TrelloPowerUp.iframe()

Trello.setKey(APP_KEY)
Trello.setToken(localStorage.getItem('trello_token') || TRELLO_TOKEN)

const test = '588714b4967e55d7882ff042'
const lead = '588714b4967e55d7882ff00e'

// moveCard(Trello,test,lead)
// assignMember(Trello,test,members.akram)
// addLabel(Trello,test,labels.our_move)

// getCurrentCardId(t)
// .then(id => {
//   console.log(id)
// })
// .catch(err => {
//   console.log(err);
// })

// setDueDate(Trello,test,1)
// .then(response => {
//   console.log(response);
// })
// .catch(error => {
//   console.log(error)
// })

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
