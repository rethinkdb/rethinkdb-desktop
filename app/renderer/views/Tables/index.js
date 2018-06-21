import React, { PureComponent } from 'react'
import { query } from '../../service/ipc'
import Page from '../../components/Page'
import ActionsBar from '../../components/ActionsBar'
import DatabaseList from './Database/DatabaseList'

class Tables extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tablesByDb: [],
      selectedTables: []
    }
  }

  fetchTables = () => {
    return query('tablesByDb')
  }

  addDatabase = () => {

  }

  deleteDatabase = () => {

  }

  addTable = () => {

  }

  deleteTable = () => {

  }

  onTableSelect = () => {

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
    const { tablesByDb } = this.state
    return (
      <Page>
        <ActionsBar title="Tables in the cluster" />
        <DatabaseList list={tablesByDb} />
      </Page>
    )
  }
}

export default Tables
