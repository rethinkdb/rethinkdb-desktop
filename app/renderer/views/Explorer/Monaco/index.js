import React from 'react'
import ReactDOM from 'react-dom'
import { rebirthdbTypes } from './types'

class Monaco extends React.Component {
  componentDidMount() {
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
    const target = ReactDOM.findDOMNode(this)
    this.editor = monaco.editor.create(target, {
      language: 'javascript',
      minimap: { enabled: false }
    })
  }
  render() {
    return <div style={{ width: '100%', height: '600px', border: '1px solid gray' }} />
  }
}

export default Monaco
