import './index.css'
import React, { Component } from 'react'

class ColorPicker extends Component {
  constructor (props) {
    super(props)
    this.colors = {
      material: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
      shades: ['#212121', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD', '#E0E0E0', '#EEEEEE', '#F5F5F5', '#FAFAFA']
    }
  }
  render () {
    const { theme, onclick } = this.props
    const palette = this.colors[theme]
    return (
      <div className="colors">
        {
          palette.map((color, index) => {
            return (
              <div
                key={index}
                className="color"
                style={{ background: color }}
                onClick={() => onclick(color)}>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ColorPicker
