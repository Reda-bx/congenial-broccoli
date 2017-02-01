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

  /**
   * Create checklist and fill it with items
   * @param {string} idCard
   * @param {string} name [checklist name]
   * @param {array} items [checklist items]
   */
  createCheckList(idCard,name,items){
    return new Promise((resolve, reject) => {
      this.Trello.post('/checklists',
      {idCard,name},
      (result) => {
        console.log(`idCheckList ${result.id}`);
        const {id} = result
        return Promise.all(items.map(item => {
          this.createCheckListItem(id, item.name, item.checked)
        }))
      },
      (err) => resolve(err)
    )})
  }

  /**
   * Create check list item
   * @param {string} idCheckList
   * @param {string} name
   * @param {boolean} checked
   */
  createCheckListItem(idCheckList, name, checked){
    return new Promise((resolve, reject) => {
    this.Trello.post(`/checklists/${idCheckList}/checkItems`,
      {name, checked},
      (result) => {console.log(`idCheckListItem ${result.id}`);resolve(result)},
      (err) => resolve(err))
    })
  }

  /**
   * Set checked state of check list item
   * @param {string} idCard
   * @param {string} idCheckList
   * @param {string} idCheckItem
   * @param {boolean} checked
   */
  setCheckListItem(idCard,idCheckList,idCheckItem,checked){
    return new Promise((resolve, reject) => {
      this.Trello.put(`/cards/${idCard}/checklist/${idCheckList}/checkItem/${idCheckItem}/state`,
        {value:checked},
        result => resolve(result),
        error => reject(err))
      })
  }
}
