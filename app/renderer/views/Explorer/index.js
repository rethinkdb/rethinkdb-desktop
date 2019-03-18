import React, { useState, useEffect } from 'react'
import MonacoEditor from 'react-monaco-editor'
import * as monaco from 'monaco-editor'
import Page from '../../components/Page'
import { evalQuery } from '../../service/ipc'
import styled from 'react-emotion'
import { Button as BaseButton } from '../../components/Button'
import { rebirthdbTypes } from './types'

const options = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: false
}

const Container = styled.div`
  padding: 1rem;
`

const Pre = styled.pre`
  border: 1px solid black;
  margin: 1rem 0;
  padding: 1rem;
`

const Button = styled(BaseButton)`
  margin: 1rem 0;
  padding: 1rem 3rem;
`

const Explorer = () => {
  const [code, setCode] = useState('// type your code... \n \n r.dbList()')
  const [result, setResult] = useState('')

  useEffect(() => {
    // https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-javascript-defaults
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true
    })
    monaco.languages.typescript.javascriptDefaults.addExtraLib(rebirthdbTypes, 'rebirthdb-ts.d.ts')
  }, [])

  function textChange (value) {
    setCode(value)
  }

  function query () {
    evalQuery(code).then(setResult)
  }

  return (
    <Page>
      <Container>
        <MonacoEditor
          language='javascript'
          theme='vs-dark'
          value={code}
          options={options}
          height='300'
          onChange={textChange} />
        <Button onClick={query}>
          Execute
        </Button>
        <Pre>
          <code>
            {result}
          </code>
        </Pre>
      </Container>
    </Page>
  )
}

export default Explorer
