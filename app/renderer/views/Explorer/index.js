import React from 'react'
import Page from '../../components/Page'
import Monaco from './Monaco'

class Explorer extends React.Component {
  render() {
    return (
      <Page>
        <Monaco ref={ref => (this.monaco = ref)} />
        <button onClick={() => console.log(this.monaco.editor.getValue())}>Run</button>
      </Page>
    )
  }
}

export default Explorer
