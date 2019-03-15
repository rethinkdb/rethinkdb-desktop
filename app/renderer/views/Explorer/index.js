import React, { useState } from 'react'
import MonacoEditor from 'react-monaco-editor'
import Page from '../../components/Page'
import { DBActionButton } from '../Tables/Database/styles'

const options = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: false
}

const Explorer = () => {
  const [code, setCode] = useState('// type your code... \n \n r.tableList()')

  function query () {
    console.log(code)
  }

  return (
    <Page>
      <div style={{ height: '400px', width: '100%' }}>
        <MonacoEditor
          language='javascript'
          theme='vs-dark'
          value={code}
          options={options}
          onChange={setCode} />
        <button className={DBActionButton} onClick={query}>
          Execute
        </button>
      </div>
    </Page>
  )
}

export default Explorer
