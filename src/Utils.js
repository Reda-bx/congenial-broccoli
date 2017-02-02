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

/**
 * extract email from card description
 * @param  {string} description
 * @return {string}
 */
export function extractEmailFromDescription(description){
  const emails = description.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
  return (emails.length > 0) ? emails[0] : null
}
