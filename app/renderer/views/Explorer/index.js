import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import Page from '../../components/Page'

const options = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: false
}

const defaultCode = '// type your code... \n'

const Explorer = () => {
  return (
    <Page>
      <MonacoEditor language="javascript" value={defaultCode} options={options} />
    </Page>
  )
}

export default Explorer
