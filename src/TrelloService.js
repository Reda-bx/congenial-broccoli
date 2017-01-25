// TODO: Trello as global wrapper param

export function moveCard(Trello,idCard,idList){
    Trello.put(`/cards/${idCard}/idList`, {
        value: idList
    }, (res) => {
      console.log(res) // TODO: figure out what to do with these response and error message
    }, (err) => {
      console.log(err)
    })
}

export function assignMember(Trello, idCard, idMember){
  Trello.put(`/cards/${idCard}/idMembers`, {
      value: idMember
  }, (res) => {
    console.log(res)
  }, (err) => {
    console.log(err)
  })
}

export function addLabel(Trello, idCard, idLabel) {
  Trello.post(`/cards/${idCard}/idLabels`, {
      value: idLabel
  }, (res) => {
    console.log(res)
  }, (err) => {
    console.log(err)
  })
}

export function getCurrentCardId(t) {
  return t.card('id')
}
