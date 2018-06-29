import React, { PureComponent, Fragment } from 'react'
import { query, action } from '../../service/ipc'
import Page from '../../components/Page'
import ActionsBar from '../../components/ActionsBar'
import DatabaseList from './Database/DatabaseList'
import DeleteTables from './Modals/DeleteTables'
import { processDeleteResult } from './tableHelpers'
import { DBActionButton, DBActions } from './Database/styles'

class Tables extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tablesByDb: [],
      selectedTables: [],
      deleteTablesVisible: false
    }
  }

  fetchTables = () => {
    return query({ name: 'tablesByDb' })
  }

  addDatabase = () => {}

  deleteDatabase = () => {}

  addTable = () => {}

  deleteTableConfirm = () => {
    this.setState({ deleteTablesVisible: true })
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
        let newTablesByDb = processDeleteResult(result.changes, tablesByDb)
        this.setState({ tablesByDb: newTablesByDb, deleteTablesVisible: false, selectedTables: [] })
        // TODO: Use Toast with success here
      } else {
        // TODO: Use Toast with info here
      }
    } catch (e) {
      console.error(e)
      // TODO: Use Toast with error here
    }
  }

  onDeleteTablesClose = e => {
    this.setState({ deleteTablesVisible: false })
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
    const { tablesByDb, selectedTables, deleteTablesVisible } = this.state
    return (
      <Fragment>
        <Page>
          <ActionsBar title="Tables in the cluster">
            <div className={DBActions}>
              <button className={DBActionButton}>Add Database</button>
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
          onClose={this.onDeleteTablesClose}
          title="Delete tables"
          selectedTables={selectedTables}
          onDelete={this.deleteTables}
          onCancel={this.onDeleteTablesClose}
        />
      </Fragment>
    )
  }
}

export default Tables
