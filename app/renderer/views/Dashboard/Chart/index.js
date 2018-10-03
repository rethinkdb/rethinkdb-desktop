import React, { PureComponent } from 'react'
import moment from 'moment'
import throttle from 'lodash.throttle'
import theme from '@/style/common'
import { Panel } from './styles'
import TimeChart from '../../../components/TimeChart/index'

export default class Chart extends PureComponent {
  state = {
    chartWidth: 0,
    reads: [],
    writes: []
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)

    this.updateReads = throttle(() => {
      this.setState(({ reads }) => ({
        reads: [
          ...reads.slice(1),
          {
            a: new Date(),
            b: this.props.reads || 0
          }
        ]
      }))
    }, 1000)

    this.updateWrites = throttle(() => {
      this.setState(({ writes }) => ({
        writes: [
          ...writes.slice(1),
          {
            a: new Date(),
            b: this.props.writes || 0
          }
        ]
      }))
    }, 1000)

    this.updateReadsInterval = setInterval(this.updateReads, 1000)
    this.updateWritesInterval = setInterval(this.updateWrites, 1000)

    this.setState({
      chartWidth: window.innerWidth,
      reads: Array(8)
        .fill()
        .map(i => ({
          a: moment()
            .subtract(i + 1, 'second')
            .toDate(),
          b: 0
        }))
        .reverse(),
      writes: Array(8)
        .fill()
        .map(i => ({
          a: moment()
            .subtract(i + 1, 'second')
            .toDate(),
          b: 0
        }))
        .reverse()
    })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!prevProps || !prevProps.reads || prevProps.reads !== this.props.reads) {
      this.updateReads()
    }

    if (!prevProps || !prevProps.writes || prevProps.writes !== this.props.writes) {
      this.updateWrites()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
    this.updateReads.cancel()
    this.updateWrites.cancel()
    clearInterval(this.updateReadsInterval)
    clearInterval(this.updateWritesInterval)
  }

  updateDimensions = event => {
    this.setState({
      chartWidth: event.target.innerWidth
    })
  }

  render () {
    const { chartWidth, reads, writes } = this.state

    return (
      <Panel>
        <TimeChart
          chartWidth={chartWidth}
          rows={[
            { id: 'reads', data: reads, color: theme.success },
            { id: 'writes', data: writes, color: theme.error }
          ]}
        />
      </Panel>
    )
  }
}
