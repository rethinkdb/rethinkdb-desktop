import React, { PureComponent, Fragment } from 'react'
import { query, action } from '../../service/ipc'
import Page from '../../components/Page'
import ActionsBar from '../../components/ActionsBar'
import DatabaseList from './Database/DatabaseList'
import DeleteTables from './Modals/DeleteTables'
import AddDatabase from './Modals/AddDatabase'
import {
  processDeleteTablesResult,
  processAddDatabaseResult,
  validateAddDatabase
} from './tableHelpers'
import { DBActionButton, DBActions } from './Database/styles'
import Toast from '../../components/Toast'

class Tables extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tablesByDb: [],
      selectedTables: [],
      deleteTablesVisible: false,
      addDatabaseVisible: false,
      addDatabaseError: undefined
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

  deleteDatabase = () => {}

  addTable = () => {}

  deleteTableConfirm = () => {
    this.setState({ deleteTablesVisible: true })
  }
  addDatabaseConfirm = () => {
    this.setState({ addDatabaseVisible: true })
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
      addDatabaseError: undefined
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
      addDatabaseError
    } = this.state
    return (
      <Fragment>
        <Page>
          <ActionsBar title="Tables in the cluster">
            <div className={DBActions}>
              <button className={DBActionButton} onClick={this.addDatabaseConfirm}>
                Add Database
              </button>
              <button
                className={DBActionButton}
                disabled={selectedTables.length < 1}
                onClick={this.deleteTableConfirm}
              >
                Delete Selected Tables ({selectedTables.length})
              </button>
            </div>
          </ActionsBar>
          <DatabaseList list={tablesByDb} onTableSelect={this.onTableSelect} />
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
      </Fragment>
    )
  }
}

export default Tables
