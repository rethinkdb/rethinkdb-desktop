import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({type='', size=24, color='#000', className='rebirth-icon'}) => {
  return (
    <span className={className}>
			<svg width={size} height={size} fill={color}>
				<use xlinkHref={`#${type}`} />
			</svg>
		</span>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
}

export default Icon