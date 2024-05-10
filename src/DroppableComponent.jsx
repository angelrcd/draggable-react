import React, { Component } from 'react';


export default class DroppableComponent extends Component{
    
    render(){
    const {children} = this.props;

        return (
            <div
            id="droppable"
            style={{
            width: '300px',
            height: '300px',
            backgroundColor: 'lightpink',
            }}
        >
            {children}
      </div>
        )
    }
}