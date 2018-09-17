import React, { PureComponent, Fragment } from 'react'
import { query, action } from '../../service/ipc'
import Page from '../../components/Page'
import ActionsBar from '../../components/ActionsBar'
import Toast from '../../components/Toast'
import DatabaseList from './Database/DatabaseList'
import AddTable from './Modals/AddTable'
import DeleteTables from './Modals/DeleteTables'
import AddDatabase from './Modals/AddDatabase'
import DeleteDatabase from './Modals/DeleteDatabase'
import { validateAddTable, validateAddDatabase } from './tableHelpers'

import { DBActionButton, DBActions } from './Database/styles'

class Tables extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      tablesByDb: [],
      selectedTables: [],
      addTableVisible: false,
      addTableError: undefined,
      addToDb: undefined,
      deleteTablesVisible: false,
      addDatabaseVisible: false,
      addDatabaseError: undefined,
      dbToDelete: undefined,
      deleteDatabaseVisible: false,
      deleteDatabaseError: undefined
    }
  }

  fetchTables = () => {
    return query({ name: 'tablesByDb' })
  }

  addTable = async ({ name, primaryKey, durability }) => {
    const { tablesByDb, addToDb } = this.state
    // get all tables of the selected db
    const selectedDb = tablesByDb.find(db => db.name === addToDb)
    const selectedDbTables = selectedDb.tables
    try {
      // validation
      const validationError = validateAddTable(name, selectedDbTables)
      if (validationError) {
        this.setState({ addTableError: validationError })
      } else {
        // prepare payload
        durability = durability ? 'hard' : 'soft'
        primaryKey = primaryKey || 'id'

        const result = await action({
          name: 'addTable',
          payload: { db: addToDb, name, primaryKey, durability }
        })
        if (result.errors === 0) {
          this.setState({
            addTableError: undefined
          })
          const tablesByDb = await this.fetchTables()
          this.setState({ tablesByDb })
          this.closeModals()
          Toast.success(`The table ${addToDb}.${name} was successfully created.`)

          // allow outdated reads to update
          setTimeout(async () => {
            const tablesByDb = await this.fetchTables()
            this.setState({ tablesByDb })
          }, 3000)
        } else {
          this.setState({ addTableError: 'The returned result was not `{created: 1}`' })
        }
      }
    } catch (e) {
      console.error(e)
      this.setState({ addDatabaseError: e.message })
    }
  }

  addDatabase = async name => {
    let tablesByDb = this.state.tablesByDb
    try {
      // validation
      const validationError = validateAddDatabase(name, tablesByDb)
      if (validationError) {
        this.setState({ addDatabaseError: validationError })
      } else {
        const result = await action({
          name: 'addDatabase',
          payload: { name }
        })
        if (result.inserted === 1) {
          this.setState({
            addDatabaseError: undefined
          })
          const tablesByDb = await this.fetchTables()
          this.setState({ tablesByDb })
          this.closeModals()
          Toast.success('Database created!')
        } else {
          this.setState({ addDatabaseError: result.first_error || 'Unknown error' })
        }
      }
    } catch (e) {
      console.error(e)
      this.setState({ addDatabaseError: e.message })
    }
  }

  deleteDatabase = async name => {
    try {
      const result = await action({
        name: 'deleteDatabase',
        payload: { name }
      })

      if (result.dbs_dropped === 1) {
        this.setState({
          deleteDatabaseError: undefined
        })
        const tablesByDb = await this.fetchTables()
        this.setState({ tablesByDb })
        this.closeModals()
        Toast.success('Database deleted!')
      } else {
        this.setState({ deleteDatabaseError: 'The return result was not `{dbs_dropped: 1}`' })
      }
    } catch (e) {
      console.error(e)
      this.setState({ deleteDatabaseError: e.message })
    }
  }

  openAddTableModal = db => {
    this.setState({ addTableVisible: true, addToDb: db, addTableError: undefined })
  }
  openDeleteTablesModal = () => {
    this.setState({ deleteTablesVisible: true })
  }
  openAddDatabaseModal = () => {
    this.setState({ addDatabaseVisible: true })
  }
  openDeleteDatabaseModal = db => {
    this.setState({ deleteDatabaseVisible: true, dbToDelete: db })
  }

  deleteTables = async () => {
    try {
      const tables = this.state.selectedTables
      const result = await action({
        name: 'deleteTables',
        payload: tables.map(table => ({ db: table.db, name: table.name }))
      })
      if (result.changes) {
        if (result.deleted === tables.length) {
          this.setState({
            selectedTables: []
          })
          const tablesByDb = await this.fetchTables()
          this.setState({ tablesByDb })
          this.closeModals()
          Toast.success('Table deleted!')
        } else {
          this.closeModals()
          Toast.warning('The value returned for `deleted` did not match the number of tables.')
        }
      }
    } catch (e) {
      console.error(e)
      this.closeModals()
      Toast.error(e.message)
    }
  }

  closeModals = e => {
    this.setState({
      addTableVisible: false,
      deleteTablesVisible: false,
      addDatabaseVisible: false,
      deleteDatabaseVisible: false,
      addDatabaseError: undefined,
      dbToDelete: undefined
    })
  }

  onTableSelect = table => {
    let arr = this.state.selectedTables

    if (arr.find(item => item.id === table.id)) {
      arr = arr.filter(item => item.id !== table.id)
    } else {
      arr = [...arr, table]
    }

    this.setState({ selectedTables: arr })
  }

  async componentDidMount () {
    try {
      const tablesByDb = await this.fetchTables()
      this.setState({ tablesByDb })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const {
      tablesByDb,
      selectedTables,
      addTableVisible,
      addTableError,
      deleteTablesVisible,
      addDatabaseVisible,
      addDatabaseError,
      deleteDatabaseVisible,
      deleteDatabaseError,
      dbToDelete
    } = this.state
    return (
      <Fragment>
        <Page>
          <ActionsBar title='Tables in the cluster'>
            <div className={DBActions}>
              <button className={DBActionButton} onClick={this.openAddDatabaseModal}>
                Add Database
              </button>
              <button
                className={DBActionButton}
                disabled={selectedTables.length < 1}
                onClick={this.openDeleteTablesModal}
              >
                Delete Selected Tables ({selectedTables.length})
              </button>
            </div>
          </ActionsBar>
          <DatabaseList
            list={tablesByDb}
            onTableSelect={this.onTableSelect}
            openAddTableModal={this.openAddTableModal}
            openDeleteDatabaseModal={this.openDeleteDatabaseModal}
          />
        </Page>
        <AddTable
          visible={addTableVisible}
          onClose={this.closeModals}
          title='Add Table'
          error={addTableError}
          onSubmit={this.addTable}
          onCancel={this.closeModals}
        />
        <DeleteTables
          visible={deleteTablesVisible}
          onClose={this.closeModals}
          title='Delete tables'
          selectedTables={selectedTables}
          onDelete={this.deleteTables}
          onCancel={this.closeModals}
        />
        <AddDatabase
          visible={addDatabaseVisible}
          onClose={this.closeModals}
          title='Add Database'
          error={addDatabaseError}
          onSubmit={this.addDatabase}
          onCancel={this.closeModals}
        />
        <DeleteDatabase
          visible={deleteDatabaseVisible}
          onClose={this.closeModals}
          title='Delete Database'
          error={deleteDatabaseError}
          dbToDelete={dbToDelete}
          onDelete={this.deleteDatabase}
          onCancel={this.closeModals}
        />
      </Fragment>
    )
  }
}

export default Tables
