import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classNames from 'classnames';
import AppState from '/imports/api/appState.js';
import Colors from '/imports/api/colors';
import Sizes from '/imports/api/sizes';

// Line component - line for the notes layer
class Line extends Component {
  handleErase(){
    const { _id, note_erasing } = this.props;
    if(note_erasing){
      Meteor.call('notes.remove', _id);
    }
  }
  render() {
    const { _id } = this.props;
    const color = Colors.getHex(this.props.color);
    const size = Sizes.get(this.props.size);
    const coords = this.props.data.coords;
    const x1 = coords[0].x;
    const y1 = coords[0].y;
    const x2 = coords[1].x;
    const y2 = coords[1].y;
    return (
      <line id={_id} 
        x1={x1} y1={y1} 
        x2={x2} y2={y2}
        strokeWidth={size} stroke={color}
        onMouseOver={()=>this.handleErase()}
      />
    );
  }
}

Line.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      coords: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        })
      ),
    }),
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

export default createContainer(() => {
  return {
    note_erasing: AppState.get('note_erasing')
  };
}, Line);
