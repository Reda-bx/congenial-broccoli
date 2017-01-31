import TrelloService from './TrelloService'
import * as db from '../db'

// init trello api
Trello.setKey(db.APP_KEY) // TODO: move to specific constants file
Trello.setToken(localStorage.getItem('trello_token') || db.TRELLO_TOKEN)

// get trello power up client
const t = TrelloPowerUp.iframe()

// instantiate trello service
const trelloService = new TrelloService(Trello)

// const test = '588714b4967e55d7882ff042'
// const lead = '588714b4967e55d7882ff00e'

// trelloService.moveCard(Trello,test,lead)
// trelloService.addLabel(Trello,test,constants.labels.our_move)
// trelloService.assignMember(Trello,test,constants.members.akram)
// trelloService.setDueDate(Trello,test,1)

// it all starts here
trelloService.getCurrentList(t)
.then(list => {
  // getting list and applying appropriate state operation
  console.log(list)
  document.getElementById('subject').value = list.emails[0].subject;
  document.getElementById('body').value = list.emails[0].body;
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

// TODO: Ideas:
// - markdown/format email 
