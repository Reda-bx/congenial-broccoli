import bluebird from 'bluebird'

export default class TrelloService {

  init (Trello){
    this.Trello = Trello
  }

  moveCard(Trello,idCard,idList){
    Trello.put(`/cards/${idCard}/idList`, {
        value: idList
    }, (res) => {
      console.log(res) // TODO: figure out what to do with these response and error message
    }, (err) => {
      console.log(err)
    })
  }

  assignMember(Trello, idCard, idMember){
    Trello.put(`/cards/${idCard}/idMembers`, {
        value: idMember
    }, (res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  }

  addLabel(Trello, idCard, idLabel) {
    Trello.post(`/cards/${idCard}/idLabels`, {
        value: idLabel
    }, (res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  }

  setDueDate(Trello, idCard, days){
    const date = new Date()
    // increment with n days
    date.setDate(date.getDate() + days)
    return new Promise((resolve,reject) => {
      const path = `cards/${idCard}/due`
      Trello.get(path,
      (success) => {
        const {_value} = success
        const newDate = new Date(_value).getDate()
        Trello.put(path,{value: date.setDate((newDate + days))},
        (success) => resolve(success),
        (err) => reject(err))
      },
      (err) => {
        reject(err)
      })
    })
  }

  getCurrentCardId(t) {
    return t.card('id')
  }
}
