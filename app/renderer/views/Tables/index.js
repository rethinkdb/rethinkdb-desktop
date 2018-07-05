import React, { PureComponent, Fragment } from 'react'
import { query, action } from '../../service/ipc'
import Page from '../../components/Page'
import ActionsBar from '../../components/ActionsBar'
import Toast from '../../components/Toast'
import DatabaseList from './Database/DatabaseList'
import DeleteTables from './Modals/DeleteTables'
import AddDatabase from './Modals/AddDatabase'
import DeleteDatabase from './Modals/DeleteDatabase'
import {
  processDeleteTablesResult,
  processAddDatabaseResult,
  processDeleteDatabaseResult,
  validateAddDatabase
} from './tableHelpers'

import { DBActionButton, DBActions } from './Database/styles'

class Tables extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tablesByDb: [],
      selectedTables: [],
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
        // Add Database operation result doesn't guarantee that the table list was updated
        // so calling fetchTables here immediately after add will not yield the changes
        // Thus we need to preform our own dirty local state update
        if (result.inserted === 1) {
          let newList = processAddDatabaseResult(name, result, tablesByDb)
          this.setState({
            tablesByDb: newList,
            addDatabaseError: undefined
          })
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

  deleteDatabase = async (name) => {
    let tablesByDb = this.state.tablesByDb
    try {
        const result = await action({
          name: 'deleteDatabase',
          payload: { name }
        })

        if (result.dbs_dropped === 1) {
          let newList = processDeleteDatabaseResult(name, tablesByDb)
          this.setState({
            tablesByDb: newList,
            deleteDatabaseError: undefined
          })
          this.closeModals()
          Toast.success('Database deleted!')
        } else {
          this.setState({ deleteDatabaseError: "The return result was not `{dbs_dropped: 1}`" })
        }
    } catch (e) {
      console.error(e)
      this.setState({ deleteDatabaseError: e.message })
    }
  }

  addTable = () => {}

  openDeleteTablesModal = () => {
    this.setState({ deleteTablesVisible: true })
  }
  openAddDatabaseModal = () => {
    this.setState({ addDatabaseVisible: true })
  }
  openDeleteDatabaseModal = (db) => {
    this.setState({ deleteDatabaseVisible: true, dbToDelete: db })
  }
  deleteTables = async () => {
    try {
      const tables = this.state.selectedTables
      let tablesByDb = this.state.tablesByDb
      const result = await action({
        name: 'deleteTables',
        payload: tables.map(table => ({ db: table.db, name: table.name }))
      })
      // Delete operation result doesn't guarantee that the table list was updated
      // so calling fetchTables here immediately after delete will not yield the changes
      // Thus we need to preform our own dirty local state update
      if (result.changes) {
        let newList = processDeleteTablesResult(result.changes, tablesByDb)
        if (result.deleted === tables.length) {
          this.setState({
            tablesByDb: newList,
            selectedTables: []
          })
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

  async componentDidMount() {
    try {
      const tablesByDb = await this.fetchTables()
      this.setState({ tablesByDb })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const {
      tablesByDb,
      selectedTables,
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
          <ActionsBar title="Tables in the cluster">
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
            openDeleteDatabaseModal={this.openDeleteDatabaseModal}
          />
        </Page>
        <DeleteTables
          visible={deleteTablesVisible}
          onClose={this.closeModals}
          title="Delete tables"
          selectedTables={selectedTables}
          onDelete={this.deleteTables}
          onCancel={this.closeModals}
        />
        <AddDatabase
          visible={addDatabaseVisible}
          onClose={this.closeModals}
          title="Add Database"
          error={addDatabaseError}
          onSubmit={this.addDatabase}
          onCancel={this.closeModals}
        />
        <DeleteDatabase
          visible={deleteDatabaseVisible}
          onClose={this.closeModals}
          title="Delete Database"
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
