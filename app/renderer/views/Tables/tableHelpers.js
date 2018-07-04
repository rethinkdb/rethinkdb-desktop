export const processDeleteTablesResult = (result, currentState) => {
  let newState = currentState
  for (let change of result) {
    let keepGoing = true
    for (let db of newState) {
      if (!keepGoing) {
        break
      }
      if (db.name === change.old_val.db) {
        const iterable = db.tables
        for (let position = 0; position < iterable.length; position++) {
          const table = iterable[position]
          if (table.name === change.old_val.name) {
            db.tables = db.tables.slice(0, position).concat(db.tables.slice(position + 1))
          }
        }
        keepGoing = false
        break
      }
    }
  }
  return newState
}

export const validateAddDatabase = (name, list) => {
  let error
  // Empty name is not valid
  if (!name.trim().length) {
    error = 'Please do not use an empty name for a database'
  } else if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    // Only alphanumeric char + underscore are allowed
    error = 'You can only use alphanumeric characters and underscores for a database name'
  } else if (list.find(db => db.name === name)) {
    // Check if it's a duplicate
    error = "The chosen database's name is already being used. Please choose another one"
  }
  return error
}

export const processAddDatabaseResult = (name, result, currentState) => {
  const newDB = {
    id: result.generated_keys[0],
    name: name,
    tables: []
  }
  return [...currentState, newDB]
}
