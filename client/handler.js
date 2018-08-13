// get all models
const findAll = async (model, handler) => {
  try {
    console.log('findAll')
    let res = await fetch(`api/${model}/`, {   
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res = await res.json()
    handler(res)

  } catch(err) {
    console.error(err)
  }
  
}

// get one model 
const findOne = async (model, id, handler) => {
  try {
    console.log('findOne')
    let res = await fetch(`api/${model}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res = await res.json()
    if(handler)
      handler(res)

  } catch(err){
    console.error(err)
  }
}

// edit model 
const edit = async (model, id, obj, handler) => {
  try {
    console.log('edit')
    console.log({id: id, obj: obj, model: model})
    let res = await fetch(`api/${model}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    console.log(res)
    res = await res.json()
    
    if(handler)
      handler()

  } catch(err){
    console.error(err)
  } 
}

// delete model
const drop = async (model, id, handler) => {
  try {
    console.log('drop')
    let res = await fetch(`api/${model}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res = await res.json()
    if(handler)
      handler(res)

  } catch(err){
    console.error(err)
  }
}

//create new model
const insert = async (model, obj, handler ) => {
  try {
    console.log('insert')
    let res = await fetch (`api/${model}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    res = await res.json()
    if(handler)
      handler(res)

  } catch(err){
    console.error(err)
  }
}