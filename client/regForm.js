function getForms(fields) {
  return fields.map( x => 
		`<div class="form-group">
      <label for="${x.field}">${x.name}: </label> 
      <input class="form-control" name="${x.field}"/>
    </div>`).join('')
} 
function getTableHead(fields) {
  return fields.map( x => `<th>${x.name}</th>`).concat(`<th>Options</th>`).join('')
}

function row(validFields, obj) {
  let fields = []
  for( key in obj ){
    if(validFields.includes(key))
      fields.push(obj[key])
  }
  return `<tr data-rowid='${obj.id}'>
    ${fields.map( x => `<td>${x}</td>`).join('')}
    <td>
      <a class="editLink" data="${obj.id}">Edit</a>
      <a class="removeLink" data="${obj.id}">Delete</a>
    </td>
    </tr>`
}

function addNewTableString(validFields, obj){
  document.getElementById(`Table`).insertAdjacentHTML('beforeEnd', row(validFields, obj))
}

function createChild(parentId, child, elemType = 'div'){
  let newElem = document.createElement(elemType)
  newElem.innerHTML = child
  document.getElementById(parentId).appendChild(newElem)
}