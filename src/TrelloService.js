import bluebird from 'bluebird'
import * as db from '../db'

export default class TrelloService {
  init (Trello){
    this.Trello = Trello
  }

  moveCard(idCard,idList){
    return new Promise((resolve,reject) => {
      this.Trello.put(`/cards/${idCard}/idList`, {
          value: idList
      }, (res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  assignMember(Trello, idCard, idMember){
    return new Promise((resolve,reject) => {
      Trello.put(`/cards/${idCard}/idMembers`, {
          value: idMember
      }, (res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  addLabel(Trello, idCard, idLabel) {
    return new Promise((resolve,reject) => {
      Trello.post(`/cards/${idCard}/idLabels`, {
          value: idLabel
      }, (res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
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

  getCurrentList(t) {
    return new Promise((resolve, reject) => {
      t.list('id')
      .then(result => {
        return resolve(db.lists.find(k => k.id === result.id))
      })
      .catch(err => {
        return reject(err)
      })
    })
  }

  getCurrentCard(t) {
    return t.card('id')
  }
}
