import React, {useState} from 'react'
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
  const [code, setCode] = useState('// type your code... \n')
  function onChange (newValue, e) {
    console.log('onChange', newValue, e)
    setCode(newValue)
  }

  return (
    <Page>
      <div style={{ height: '400px', width: '100%' }}>
        <MonacoEditor language='javascript' theme='vs-dark' value={code}
          options={options}
          onChange={onChange} />
        <button className={DBActionButton} onClick={() => {
          // const model = this.refs.monaco.editor.getModel()
          // const value = model.getValue()
          // alert(value)
        }}>
          Executed
        </button>
      </div>
    </Page>
  )
}

export default Explorer
