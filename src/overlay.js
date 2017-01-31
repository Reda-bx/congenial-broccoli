import TrelloService from './TrelloService'
import db from '../db'
import {populateSelectBox} from './Utils'
import map from 'lodash/map'

let globalList;

// init trello api
Trello.setKey(db.APP_KEY) // TODO: move to specific constants file
Trello.setToken(localStorage.getItem('trello_token') || db.TRELLO_TOKEN)

// get trello power up iframe
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
  // make list global
  globalList = list
  console.log(list)
  // populate select box with subjects
  const select = document.getElementById('subjects')
  const options = map(list.emails,'subject')
  populateSelectBox(select,options)
})

t.render(() => {});

// detect select change and set corresponding subject and body to email
document.getElementById('subjects').onchange = function(e) {
  // can't arrow this because of the lexical 'this'
  const value = this[this.selectedIndex].value
  // get subject and value from email
  const email = globalList.emails.find(email => email.subject === value)
  // set subject and body to email
  document.getElementById('subject').value = email.subject;
  document.getElementById('body').value = email.body;
};

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

// close overlay on closeCompose click
document.getElementById('close').addEventListener('click', () => {
    t.closeOverlay().done()
})

// TODO: Backlog:
// - markdown/format email
// eslint
