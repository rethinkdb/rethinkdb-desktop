const { r } = require('rethinkdb-ts')
const driver = require('../driver')
const { SYSTEM_DB } = require('../../helpers/constants')

const connection = () => driver.getConnection()

const tablesByDb = () => {
  return r
    .db(SYSTEM_DB)
    .table('db_config')
    .filter(db => db('name').ne(SYSTEM_DB))
    .map(db => ({
      name: db('name'),
      id: db('id'),
      tables: r
        .db(SYSTEM_DB)
        .table('table_status')
        .orderBy(table => table('name'))
        .filter({ db: db('name') })
        .merge(table => ({
          shards: table('shards')
            .count()
            .default(0),
          replicas: table('shards')
            .default([])
            .map(shard => shard('replicas').count())
            .sum(),
          replicasReady: table('shards')
            .default([])
            .map(shard =>
              shard('replicas')
                .filter(replica => replica('state').eq('ready'))
                .count()
            )
            .sum(),
          status: table('status'),
          id: table('id')
        }))
    }))
    .run(connection())
}

const deleteTables = tablesToDelete => {
  return r
    .db(SYSTEM_DB)
    .table('table_config')
    .filter(table => {
      return r.expr(tablesToDelete).contains({
        db: table('db'),
        name: table('name')
      })
    })
    .delete({ returnChanges: true })
    .run(connection())
}

const addTable = ({ db, name, primaryKey, durability }) => {
  return r
    .db(SYSTEM_DB)
    .table('server_status')
    .coerceTo('ARRAY')
    .do(servers => {
      return r.branch(
        servers.isEmpty(),
        r.error('No server is connected'),
        servers
          .sample(1)
          .nth(0)('name')
          .do(server => {
            return r
              .db(SYSTEM_DB)
              .table('table_config')
              .insert(
                {
                  db,
                  name,
                  primary_key: primaryKey,
                  durability,
                  shards: [
                    {
                      primary_replica: server,
                      replicas: [server]
                    }
                  ]
                },
                { returnChanges: true }
              )
          })
      )
    })
    .run(connection())
}

module.exports = {
  tablesByDb,
  addTable,
  deleteTables
}
