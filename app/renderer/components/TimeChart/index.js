import React from 'react'
import moment from 'moment'

import { VictoryChart, VictoryLine, VictoryClipContainer, VictoryTheme, VictoryAxis } from 'victory'

const TimeChart = ({ chartWidth, rows }) => (
  <svg viewBox={`0 0 ${chartWidth} 350`} preserveAspectRatio='none' width='90%'>
    <VictoryChart
      scale={{ x: 'time', y: 'linear' }}
      standalone={false}
      width={chartWidth}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        tickFormat={x => (x ? moment(x).format('HH:m:s') : '')}
        orientation='bottom'
        style={
          {
            // axis: { stroke: '#ed10f2' },
            // axisLabel: { fontSize: 14, fill: '#0e51f2' },
            // ticks: { stroke: '#ccc60f' },
            // tickLabels: { fontSize: 14, fill: '#1dc571', fontWeight: 'bold' }//,
            // grid: { stroke: '#a13838', strokeWidth: 0.25 }
          }
        }
      />
      <VictoryAxis dependentAxis tickFormat={y => (y < 1 ? '' : y)} orientation='left' />
      {rows.map(row => (
        <VictoryLine
          key={row.id}
          groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }} />}
          style={{ data: { stroke: row.color, strokeWidth: 5, strokeLinecap: 'round' } }}
          data={row.data}
          x='a'
          y='b'
        />
      ))}
    </VictoryChart>
  </svg>
)

export default TimeChart
