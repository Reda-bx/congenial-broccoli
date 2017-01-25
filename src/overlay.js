import TrelloService from './TrelloService'
import * as constants from '../constants'

Trello.setKey(constants.APP_KEY)
Trello.setToken(localStorage.getItem('trello_token') || constants.TRELLO_TOKEN)

const trelloService = new TrelloService(Trello)
const t = TrelloPowerUp.iframe()
const test = '588714b4967e55d7882ff042'
const lead = '588714b4967e55d7882ff00e'

trelloService.moveCard(Trello,test,lead)
trelloService.addLabel(Trello,test,constants.labels.our_move)
trelloService.assignMember(Trello,test,constants.members.akram)
trelloService.setDueDate(Trello,test,1)

trelloService.getCurrentCardId(t)
.then(id => {
  console.log(id)
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
