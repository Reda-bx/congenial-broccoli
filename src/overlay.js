import TrelloService from './TrelloService'
import db from '../db'
import {populateSelectBox, extractEmailFromDescription} from './Utils'
import map from 'lodash/map'

let globalList;
let globalCard;

// init trello api
Trello.setKey(db.APP_KEY) // TODO: move to specific constants file
Trello.setToken(localStorage.getItem('trello_token') || db.TRELLO_TOKEN)

// get trello power up iframe
const t = TrelloPowerUp.iframe()

// instantiate and init trello service
const trelloService = new TrelloService()
trelloService.init(Trello)

// it all starts here
trelloService.getCurrentList(t)
.then(list => {
  console.log('list details: ')
  console.log(list)
  // make list details global
  globalList = list
  return trelloService.getCurrentCard(t)
})
.then(card => {
  console.log('card details: ')
  console.log(card)
  // make card details global
  globalCard = card
  return true
})
.then(params => {
  // populate select box with subjects
  const subjectsDOM = document.getElementById('subjects')
  const options = map(globalList.emails, 'subject')
  populateSelectBox(subjectsDOM,options)
  // create subjects check list
  trelloService.createCheckList(globalCard.id, 'Follow Ups', options)
  return trelloService.getCardDescription(t)
})
.then(result => {
  // extract email from description and attach it to input
  const email = extractEmailFromDescription(result.desc)
  if(email) document.getElementById('to').value = email
  return true
})
.then(result => {
  console.log('done')
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

// send email event handler
document.getElementById('send').addEventListener('click', () => {
// get input values
const subject = document.getElementById('subject').value
const body = document.getElementById('body').value
const to = document.getElementById('to').value
const cc = document.getElementById('cc').value
if(globalList.name === "Typeform Application"){
  // get call list id
  const callListID = db.lists.find(list => list.name === "Call").id
  // move to call list
  trelloService.moveCard(globalCard.id, callListID)
}
console.log(`to: ${to}, cc: ${cc}, subject: ${subject}, body: ${body}`)
trelloService.getCardCheckLists(globalCard.id)
.then(checkLists => {
  console.log('checkLists: ')
  console.log(checkLists)
  // get subjects checklist
  const checkList = checkLists.find(checkList => checkList.name === 'Follow Ups')
  // get subject of sent email
  const checkItem = checkList.checkItems.find(checkItem => checkItem.name === subject)
  // mark the subject as checked in the checklist
  return trelloService.setCheckListItem(globalCard.id, checkList.id, checkItem.id, true)
})
.then(result => {
  console.log('done');
})
})

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
