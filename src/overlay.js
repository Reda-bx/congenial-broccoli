// /* global TrelloPowerUp */
//
// var t = TrelloPowerUp.iframe();
//
// var CALL_LIST = '58832d6c3d166c2f23513a88'
// var REDA_ID = '578e331dfb72eb74a29dca64'
// var AKRAM_ID = '5779a7a8c9abd2cdd588ec0c'
// var OUR_MOVE = '58832d6c3d166c2f23513a99'
// var HIS_MOVE = '58832d6c3d166c2f23513a9c'
// var APP_KEY = '14148040b20dddf7d33c4eb19da5246b'
// var ADIL_ID = '4ef4bd9bd382fee7350fc09f'
// var TO_ESTIMATE = '58832d6c3d166c2f23513a89'
// var VALIDATED = '58832d6c3d166c2f23513a8b'
//
// var cardId;
// var currentLabel;
// t.render(function() {
//     t.card('id', 'name', 'desc', 'labels').then(function(promiseResult) {
//         console.log(promiseResult.labels)
//         var desc = promiseResult.desc
//         cardId = promiseResult.id
//         currentLabel = promiseResult.labels.find(v => v.name === 'Our Move' || 'His Move')
//         var email = desc.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)[0]
//         $('#to').val(email)
//         t.list('id').then(function(result) {
//             $.get('./config.json', config => {
//                 var state = config.cards.find(c => c.id === result.id)
//                 $('#email').val(state.email)
//             })
//         })
//     });
// });
//
// document.getElementById('sendMessage').addEventListener('click', function(e) {
//     var to = $('#to').val()
//     var cc = $('#cc').val()
//     var email = $('#email').val()
//     to = "akram@hiddenfounders.com"
//     console.log(to);
//     console.log(cc);
//     console.log(email);
//     $.post('https://cahga0hr31.execute-api.us-east-1.amazonaws.com/dev/mail/send', {
//         "metadata": {
//             "project": "HF"
//         },
//         "email": email,
//         "config": "TEST",
//         "from": "email.temp@hiddenfounders.com",
//         "data": [
//             {
//                 "to": [to],
//                 "name": "name"
//             }
//         ]
//     }, res => {
//         console.log(res)
//     })
//     Trello.setKey(APP_KEY)
//     Trello.setToken(localStorage.getItem('trello_token'))
//     t.list('id').then(res => {
//         $.get('./config.json', config => {
//
//             var state = config.cards.find(c => c.id === res.id)
//             if (state.name === "Typeform Application") {
//                 typeToCall(CALL_LIST, AKRAM_ID, OUR_MOVE)
//             } else if (state.name === "Call" && currentLabel && currentLabel.name === 'Our Move') {
//                 Trello.post(`/cards/` + cardId + `/idLabels`, {
//                     value: HIS_MOVE
//                 }, (successMsg) => {
//                     Trello.delete(`/cards/` + cardId + `/idLabels/` + OUR_MOVE, (successMsg) => {
//                         setDueDate(cardId, t)
//                         console.log('done');
//                     }, (err) => {
//                         console.log('add our move label', err)
//                     })
//                 }, (err) => {
//                     console.log('add our move label', err)
//                 })
//             } else if (state.name === "Call" && currentLabel && currentLabel.name === 'His Move') {
//                 Trello.delete(`/cards/` + cardId + `/idLabels/` + HIS_MOVE, (successMsg) => {
//                     typeToCall(TO_ESTIMATE, ADIL_ID, OUR_MOVE)
//                     console.log('done')
//                 }, (err) => {
//                     console.log('add our move label', err)
//                 })
//             } else if (state.name === "Estimated (Rough)") {
//                 Trello.delete(`/cards/` + cardId + `/idLabels/` + OUR_MOVE, (successMsg) => {
//                     typeToCall(VALIDATED, AKRAM_ID, HIS_MOVE)
//                     console.log('done')
//                 }, (err) => {
//                     console.log('add our move label', err)
//                 })
//             }
//         })
//     })
// })
//
// // close overlay if user presses escape key
// document.addEventListener('keyup', function(e) {
//     if (e.keyCode == 27) {
//         t.closeOverlay().done();
//     }
// });
//
// // close overlay if user clicks outside our content
// document.addEventListener('click', function(e) {
//     if (e.target.tagName === 'body') {
//         t.closeOverlay().done();
//     }
// });
//
// document.getElementById('closeCompose').addEventListener('click', function() {
//     t.closeOverlay().done();
// })
//
// function setDueDate(cardId, t) {
//     var date = new Date();
//     date.setDate(date.getDate() + 1);
//     Trello.put(`/cards/` + cardId + '/due/', {
//         value: date
//     }, function(success) {
//         console.log(success);
//         t.closeOverlay().done();
//     }, function(error) {
//         console.log(error);
//         t.closeOverlay().done();
//     })
// }
// function typeToCall(list, newMember, label) {
//     Trello.put(`/cards/` + cardId + `/idList`, {
//         value: list
//     }, (successMsg) => {
//         Trello.put(`/cards/` + cardId + `/idMembers`, {
//             value: newMember
//         }, (successMsg) => {
//             Trello.post(`/cards/` + cardId + `/idLabels`, {
//                 value: label
//             }, (successMsg) => {
//                 t.closeOverlay().done();
//                 console.log('done')
//             }, (err) => {
//                 console.log('add our move label', err)
//             })
//         }, (err) => {
//             console.log('add akram, and remove reda', err)
//         })
//     }, (err) => {
//         console.log('move to calls', err)
//     })
// }
export function test(){
  console.log('hey')
}

test()
