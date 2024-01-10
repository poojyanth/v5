import React from "react";
import { CSSTransition } from "react-transition-group";
import "./Reels.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items || [],
      active: this.props.active || 0,
      direction: ""
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }

  generateItems() {
    var items = [];
    var level;
    console.log(this.state.active);
    for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
      var index = i;
      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }
      level = this.state.active - i;
      items.push(<Item key={index} id={this.state.items[index]} level={level} />);
    }
    return items;
  }
  moveLeft = () => {
    this.setState((prevState) => {
      const newActive = (prevState.active - 1 + prevState.items.length) % prevState.items.length;
      console.log("New Active (left):", newActive);
      return {
        active: newActive,
        direction: "left"
      };
    });
  };
  
  moveRight = () => {
    this.setState((prevState) => {
      const newActive = (prevState.active + 1) % prevState.items.length;
      console.log("New Active (right):", newActive);
      return {
        active: newActive,
        direction: "right"
      };
    });
  };
  
  

  render() {
    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={this.leftClick}>
          <i className="fi-arrow-left"></i>
        </div>
        {this.generateItems().map((item, index) => (
          <CSSTransition
            key={index}
            classNames={this.state.direction}
            timeout={500} // Adjust the timeout as needed
          >
            {item}
          </CSSTransition>
        ))}
        <div className="arrow arrow-right" onClick={this.rightClick}>
          <i className="fi-arrow-right"></i>
        </div>
        {/* <div className="basedOn">
          Based on:{" "}
          <strong>
            <a
              href="https://codepen.io/andyNroses/pen/KaENLb"
              target="_blank"
              rel="noopener noreferrer"
            >
              andyNroses
            </a>
          </strong>
        </div> */}
      </div>
    );
  }
}

// class Item extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       level: this.props.level
//     };
//   }

//   render() {
//     const className = "item level" + this.props.level;
//     const imageUrl = this.props.id; // Use the id prop to get the image URL
//     return (
//       <div
//         className={className}
//         style={{
//           backgroundImage: `url(${imageUrl})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center center",
//           borderRadius:'20px'
//         }}
//       ></div>
//     );
//   }
// }





// class Item extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       level: this.props.level
//     };
//   }

//   render() {
//     const className = "item level" + this.props.level;
//     const videoUrl = this.props.id; // Use the id prop to get the video URL
//     return (
//       <div className={className}>
//         <video
//           src={videoUrl}
//           autoPlay
//           loop
//           muted
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover'
//           }}
//         ></video>
//       </div>
//     );
//   }
// }


class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level
    };
    this.videoRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // Check if the level has changed
    if (prevProps.level !== this.props.level) {
      // Pause the previous video
      if (this.videoRef.current) {
        this.videoRef.current.pause();
        this.videoRef.current.currentTime = 0; // Reset video to start
      }

      // Play the current video if the level is 0
      if (this.props.level === 0 && this.videoRef.current) {
        this.videoRef.current.play();
      }
    }
  }

  render() {
    const className = "item level" + this.props.level;
    const videoUrl = this.props.id; // Use the id prop to get the video URL
    return (
      <div className={className}>
        <video
          ref={this.videoRef}
          src={videoUrl}
          autoPlay={this.props.level === 0} // Auto-play only for level 0
          loop
          // muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        ></video>
      </div>
    );
  }
}




export default Carousel;
