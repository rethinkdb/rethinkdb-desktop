export const processDeleteResult = (result, currentState) => {
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