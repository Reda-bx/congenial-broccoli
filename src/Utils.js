/**
 * [populateSelectBox populate a select box with set of options]
 * @param  {dom} select
 * @param  {array} options
 */
export function populateSelectBox(select,options){
  options.forEach(option => {
    const domOption = document.createElement('option')
    domOption.value = option
    domOption.innerHTML = option
    select.appendChild(domOption)
  })
}
