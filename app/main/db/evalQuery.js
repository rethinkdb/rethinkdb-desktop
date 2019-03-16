const driver = require('./driver')
const { r } = require('rethinkdb-ts')
const vm = require('vm')

// Custom eval function for the repl module
async function replEval (code, context) {
  if (code === '(\n)') {
    return null
  }

  let err, re

  // we do not need force expression, just because we carefully check syntax later
  // code = code.replace(/^\(/, '').replace(/\)$/, '')

  // first, create the Script object to check the syntax
  try {
    var script = vm.createScript(code, {
      displayErrors: false
    })
  } catch (e) {
    console.log('Script compile error:', e)
    console.log(e.stack)
    throw e
  }

  // then, run in context
  if (!err) {
    try {
      re = script.runInContext(context, { displayErrors: false })
    } catch (e) {
      console.log('Runtime error:', e)
      console.log(e.stack)
      throw e
    }
    return evalResult(context.conn, re)
  }
}

async function evalResult (conn, result) {
  if (typeof result.run !== 'function') {
    throw new Error(result)
  }

  return result.run(conn).then(resultOrCursor => {
    if (!resultOrCursor) {
      return null
    }

    if (typeof resultOrCursor.toArray !== 'function') {
      return JSON.stringify(resultOrCursor)
    }
    return resultOrCursor.toArray()
  })
}

function evalQuery (code) {
  const context = vm.createContext({
    r,
    conn: driver.getConnection()
  })
  return replEval(code, context)
}

module.exports = evalQuery
