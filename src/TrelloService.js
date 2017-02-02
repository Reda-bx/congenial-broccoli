import bluebird from 'bluebird'
import * as db from '../db'

export default class TrelloService {
  init (Trello){
    this.Trello = Trello
  }

  /**
   * move card to list
   * @param {string} idCard
   * @param {string} idList
   */
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

  /**
   * assign new member to card
   * @param {string} idCard
   * @param {string} idMember
   */
  assignMember(idCard, idMember){
    return new Promise((resolve,reject) => {
      this.Trello.put(`/cards/${idCard}/idMembers`, {
          value: idMember
      }, (res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  /**
   * add label to card
   * @param {string} idCard
   * @param {string} idLabel
   */
  addLabel(idCard, idLabel) {
    return new Promise((resolve,reject) => {
      this.Trello.post(`/cards/${idCard}/idLabels`, {
          value: idLabel
      }, (res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  /**
   * set due date of card
   * @param {string} idCard
   * @param {number} days
   */
  setDueDate(idCard, days){
    const date = new Date()
    // increment with n days
    date.setDate(date.getDate() + days)
    return new Promise((resolve,reject) => {
      const path = `cards/${idCard}/due`
      // get current due date
      Trello.get(path,
      (success) => {
        const {_value} = success
        const newDate = new Date(_value).getDate() // FIXME
        // set new due date
        this.Trello.put(path,{value: date.setDate((newDate + days))},
        (success) => resolve(success),
        (err) => reject(err))
      },
      (err) => {
        reject(err)
      })
    })
  }

  /**
   * get current list
   * @param {object} t [trello powerup iframes]
   */
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

  /**
   * get current card
   * @param {object} t [trello powerup iframes]
   */
  getCurrentCard(t) {
    return t.card('id')
  }

  /**
   * Create checklist and fill it with items
   * @param {string} idCard
   * @param {string} name [checklist name]
   * @param {array} items [array holding name of checklist items]
   */
  createCheckList(idCard,name,items){
    return new Promise((resolve, reject) => {
      this.Trello.post('/checklists',
      {idCard,name},
      (result) => {
        const {id} = result
          Promise.all(
            items.map(item =>
                // checklist item is unchecked by default
                this.createCheckListItem(id, item, false)))
        .then(result => resolve(result))
        .catch(err  => reject(err))
      },
      (err) => reject(err)
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
      (result) => resolve(result),
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

  getCardCheckLists(idCard){
    return new Promise((resolve, reject) => {
      this.Trello.get(`cards/${idCard}/checklists`,
        result => resolve(result),
        error => reject(err))
      })
  }

  getCardDescription(t){
    return t.card('desc')
  }
}
