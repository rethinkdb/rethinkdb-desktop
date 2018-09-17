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

export const validateAddTable = (name, list) => {
  let error
  // Need a name
  if (!name.trim().length) {
    error = 'Please do not use an empty name for a table'
  } else if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    // Only alphanumeric char + underscore are allowed
    error = 'You can only use alphanumeric characters and underscores for a table name'
  } else if (list.find(table => table.name === name)) {
    // And a name that doesn't exist
    error = 'The chosen table name is already exists. Please choose another one'
  }
  return error
}
