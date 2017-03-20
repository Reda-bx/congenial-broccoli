import map from 'lodash/map'
import axios from 'axios'

let globalList;

// get trello power up iframe
const t = TrelloPowerUp.iframe()

// get current list
t.list('id')
.then(result => {
  const {id} = result
  return axios.get(`https://hf-automator.herokuapp.com/lists/${id}`)
})
.then(res => {
  const {data} = res
  globalList = data
  // populate select box with subjects
  const subjectsDOM = document.getElementById('subjects')
  const options = map(data.checklist.items, 'subject')
  populateSelectBox(subjectsDOM,options)
  return t.card('desc')
})
.then(result => {
  // extract email from description and attach it to input
  const email = extractEmailFromDescription(result.desc)
  if(email) document.getElementById('to').value = email
  return axios.get(`https://hf-automator.herokuapp.com/mail/get/'threadId'`)
})
.then(res => {
  console.log(res)
  const container = document.getElementsByClassName('messages')[0]
  const {data} = res
  data.forEach(row => {
    const div = document.createElement('div')
    div.className = 'message'
    div.innerHTML = `
        <h4>sender@hf.com</h4>
        <p>${row.data}</p>
        <span>12/02/2016</span>
    `
    container.appendChild(div)
  })
})
.catch(err => {
  console.log(err)
})

t.render(() => {});

// detect select change and set corresponding subject and body to email
document.getElementById('subjects').onchange = function(e) {
  // can't arrow this because of the lexical 'this'
  const value = this[this.selectedIndex].value
  // get subject and value from email
  const email = globalList.checklist.items.find(item => item.subject === value)
  // set subject and body to email
  document.getElementById('subject').value = email.subject;
  document.getElementById('body').value = email.body;
};

// send email event handler
document.getElementById('send').addEventListener('click', () => {
  // get input values
  const subject = document.getElementById('subject').value
  const body = document.getElementById('body').value
  const receiver = document.getElementById('to').value
  const cc = document.getElementById('cc').value
  axios.post('https://hf-automator.herokuapp.com/mail/send',{
      subject,
      body,
      receiver
  })
  .then(res => {
    console.log(res)
    t.closeOverlay().done()
  })
  .catch(err => {
    console.log(err)
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

// TODO: Backlog
// - markdown/format email
// - eslint

function populateSelectBox(select, options){
  options.forEach(option => {
    const domOption = document.createElement('option')
    domOption.value = option
    domOption.innerHTML = option
    select.appendChild(domOption)
  })
}

function extractEmailFromDescription(description){
  const emails = description.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
  return (emails.length > 0) ? emails[0] : null
}
