import React, { Component } from 'react';

const initialPosition = { x: 0, y: 0 }

class DraggableComponent extends Component {

    state = {
      position: { x: 0, y: 0 },
      isDragging: false,
      offset: { x: 0, y: 0 },
      isResettingToInitialPosition: false,
    };
    touchingInterval = null;
  

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('wheel', this.handleWheel);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('wheel', this.handleWheel);

    if (this.touchingInterval)
        clearInterval(this.touchingInterval);
  }

  handleWheel = (e) => {
    const {isDragging} = this.state;
    const { scrollX, scrollY } = window;

    if(!isDragging)
      return;

    const { pageX, pageY, deltaY } = e;


    // this.setState({
    //   position: {
    //     x: pageX,
    //     y: pageY
    //   }
    // });
    this.setState({position: {...this.state.position, y: pageY + deltaY}})
  };

  handleMouseDown = (e) => {
    this.setState({
      isDragging: true,
      offset: {
        x: e.clientX - this.state.position.x,
        y: e.clientY - this.state.position.y
      }
    });
  };

  handleMouseMove = (e) => {
    if (!this.state.isDragging) return;

    const { x: xBooking, y: yBooking } = e.target.getBoundingClientRect(); // (x, y) coordinates of the booking's top left corner
    const [xCursor, yCursor] = [e.clientX, e.clientY] // (x, y) coordinates of the cursor
    const { scrollX, scrollY } = window;
    
    const { clientWidth, clientHeight } = document.documentElement;
    const buffer = 50;

    // if (yBooking < buffer){
    //   window.scrollTo(scrollX, scrollY - 10);
    // } else if (yBooking > clientHeight - buffer) {
    //   window.scrollTo(scrollX, scrollY + 10);
    // }

    this.setState({
      position: {
        x: scrollX + xCursor - this.state.offset.x,
        y: scrollY + yCursor - this.state.offset.y
      }
    });
  };

  isCursorCloseToScreenBorder(xCursor, yCursor) {
    const THRESHOLD = 150;

    // const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const isCloseToTop = yCursor < THRESHOLD;
    const isCloseToBottom = yCursor > (screenHeight - THRESHOLD);
    // var isCloseToLeft = xCursor < THRESHOLD;
    // var isCloseToRight = xCursor > (screenWidth - THRESHOLD);
    
    // Return an object indicating closeness to each border
    return {
        isCloseToTop,
        isCloseToBottom,
        // isCloseToLeft,
        // isCloseToRight
    };
}



  handleMouseUp = () => {
    if (!this.state.isDragging) return;

    this.props.onDragEnd(this.state.position.x, this.state.position.y )

    this.setState({ isDragging: false });
    this.resetToOriginalPosition();
  };

  resetToOriginalPosition(){
    if (!this.state.isDragging) return;

    this.setState({isResettingToInitialPosition: true})
    this.setState({position: initialPosition})
  }

  handleTouchStart = (e) => {
    // Set interval that will check if you are dragging the border near the border of the screen and scroll if it does
    this.touchingInterval = setInterval(()=> {
      const SCROLL_AMMOUNT = 20;
      const {position} = this.state;
      const {scrollX, scrollY} = window;

      const {isCloseToBottom, isCloseToTop} = this.isCursorCloseToScreenBorder(position.x - scrollX, position.y - scrollY);

      if (isCloseToBottom){
        window.scrollBy(0, SCROLL_AMMOUNT)
        this.setState({position: {...position, y: position.y + SCROLL_AMMOUNT}})
      } else if (isCloseToTop){
        window.scrollBy(0,-SCROLL_AMMOUNT)
        this.setState({position: {...position, y: position.y - SCROLL_AMMOUNT}})
      } 
    }, 60)

    // Initiate dragging
    const {clientX, clientY} = e.touches[0];
    this.setState({
      isDragging: true,
      offset: {
        x: clientX - this.state.position.x,
        y: clientY - this.state.position.y
      }
    });
  };

  handleTouchMove = (e) => {
    if (!this.state.isDragging) return;

    const {clientX: touchX, clientY: touchY} = e.touches[0];
    const { scrollX, scrollY } = window;

    this.setState({
      position: {
        x: scrollX + touchX - this.state.offset.x,
        y: scrollY + touchY - this.state.offset.y
      }
    });

    
  };

  handleTouchEnd = () => {
    if (!this.state.isDragging) return;

    this.props.onDragEnd(this.state.position.x, this.state.position.y )

    clearInterval(this.touchingInterval)
    this.setState({ isDragging: false });
    this.resetToOriginalPosition();
  };

  handleFinishResettingToOriginalPosition = () => {
    this.setState({isResettingToInitialPosition: false})
  }

  render() {
    const { position, isDragging, isResettingToInitialPosition } = this.state;
    const {children} = this.props;

    return (
      <div
        style={{
          position: 'relative',
          top: position.y,
          left: position.x,
          width: '100px',
          height: '100px',
          backgroundColor: 'lightblue',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          transition: isResettingToInitialPosition && 'top 200ms ease, left 200ms ease',
          touchAction: 'none' // This prevents touch scroll while dragging the booking
        }}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        
        onTransitionEnd={this.handleFinishResettingToOriginalPosition}
      >
        {children(isDragging, position)}
      </div>
    );
  }
}

export default DraggableComponent;
