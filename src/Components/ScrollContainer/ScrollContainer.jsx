import React, { Component, createRef } from 'react';
import { ScrollContainerView } from './ScrollContainerView';

class ScrollContainer extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    const { current } = this.ref;
    const { top } = current.getBoundingClientRect();
    const { clientHeight } = document.documentElement;
    this.setState({ height: clientHeight - top });
  }

  render() {
    return (
      <ScrollContainerView
        {...this.props}
        myref={this.ref}
        calcHeight={this.state.height}
      />
    );
  }
}
export default ScrollContainer;
