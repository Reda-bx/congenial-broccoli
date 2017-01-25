/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _TrelloService = __webpack_require__(1);

	var _constants = __webpack_require__(2);

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
	//

	var t = TrelloPowerUp.iframe();

	Trello.setKey(_constants.APP_KEY);
	Trello.setToken(localStorage.getItem('trello_token') || _constants.TRELLO_TOKEN);

	var incoming = '588714b4967e55d7882ff042';
	var lead = '588714b4967e55d7882ff00e';

	(0, _TrelloService.moveCard)(Trello, incoming, lead);
	(0, _TrelloService.assignMember)(Trello, incoming, _constants.members.akram);
	(0, _TrelloService.addLabel)(Trello, incoming, _constants.labels.our_move);

	(0, _TrelloService.getCurrentCardId)(t).then(function (id) {
	    if (id === 'ok') console.log('ok');
	    if (id === 'ok2') console.log('ok');
	    if (id === 'ok3') console.log('ok');
	}).catch(function (err) {
	    console.log(err);
	});

	t.render(function () {});

	// close overlay if user presses escape key
	document.addEventListener('keyup', function (e) {
	    if (e.keyCode == 27) {
	        t.closeOverlay().done();
	    }
	});

	// close overlay if user clicks outside our content
	document.addEventListener('click', function (e) {
	    if (e.target.tagName == 'BODY') {
	        t.closeOverlay().done();
	    }
	});

	document.getElementById('closeCompose').addEventListener('click', function () {
	    t.closeOverlay().done();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.moveCard = moveCard;
	exports.assignMember = assignMember;
	exports.addLabel = addLabel;
	exports.getCurrentCardId = getCurrentCardId;
	// TODO: Trello as global wrapper param

	function moveCard(Trello, idCard, idList) {
	  Trello.put('/cards/' + idCard + '/idList', {
	    value: idList
	  }, function (res) {
	    console.log(res); // TODO: figure out what to do with these response and error message
	  }, function (err) {
	    console.log(err);
	  });
	}

	function assignMember(Trello, idCard, idMember) {
	  Trello.put('/cards/' + idCard + '/idMembers', {
	    value: idMember
	  }, function (res) {
	    console.log(res);
	  }, function (err) {
	    console.log(err);
	  });
	}

	function addLabel(Trello, idCard, idLabel) {
	  Trello.post('/cards/' + idCard + '/idLabels', {
	    value: idLabel
	  }, function (res) {
	    console.log(res);
	  }, function (err) {
	    console.log(err);
	  });
	}

	function getCurrentCardId(t) {
	  return t.card('id');
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		"APP_KEY": "14148040b20dddf7d33c4eb19da5246b",
		"TRELLO_TOKEN": "e2eb0dfd9ce886ea1e8fbd0ef39af858a7103b1c6fc114a900069f906963c19e",
		"BOARD_ID": "588714b4967e55d7882ff00c",
		"members": {
			"reeda": "578e331dfb72eb74a29dca64",
			"akram": "5779a7a8c9abd2cdd588ec0c"
		},
		"lists": [
			{
				"id": "588714b4967e55d7882ff00d",
				"name": "Incoming"
			},
			{
				"id": "588714b4967e55d7882ff00e",
				"name": "Lead Captured (HF Landing Page)"
			},
			{
				"id": "588714b4967e55d7882ff00f",
				"name": "Typeform Application"
			},
			{
				"id": "588714b4967e55d7882ff010",
				"name": "Call"
			},
			{
				"id": "588714b4967e55d7882ff011",
				"name": "To Estimate (Rough)"
			},
			{
				"id": "588714b4967e55d7882ff012",
				"name": "Estimated (Rough)"
			},
			{
				"id": "588714b4967e55d7882ff013",
				"name": "Validate Estimate (Rough)"
			},
			{
				"id": "588714b4967e55d7882ff014",
				"name": "Validated (Rough)"
			},
			{
				"id": "588714b4967e55d7882ff015",
				"name": "Kickoff User Stories"
			},
			{
				"id": "588714b4967e55d7882ff016",
				"name": "Discussing User Stories"
			},
			{
				"id": "588714b4967e55d7882ff017",
				"name": "To Estimate (with Details)"
			},
			{
				"id": "588714b4967e55d7882ff018",
				"name": "Estimated (with Details)"
			},
			{
				"id": "588714b4967e55d7882ff019",
				"name": "Validate Estimate (with Details)"
			},
			{
				"id": "588714b4967e55d7882ff01a",
				"name": "Validated detailed estimate"
			},
			{
				"id": "588714b4967e55d7882ff01b",
				"name": "Won"
			},
			{
				"id": "588714b4967e55d7882ff01c",
				"name": "Zombie Lead"
			},
			{
				"id": "588714b4967e55d7882ff01d",
				"name": "Dead Lead"
			},
			{
				"id": "588714b4967e55d7882ff01e",
				"name": "To Entertain"
			}
		],
		"labels": {
			"our_move": "588714b4967e55d7882ff021",
			"his_move": "588714b4967e55d7882ff025"
		}
	};

/***/ }
/******/ ]);