import React, { Component } from 'react';
import { FeedbackView } from './FeedbackView';

class Feedback extends Component {
  componentDidMount() {
    document.title = 'WoW ЛК: Обратная связь';
  }
  render() {
    return <FeedbackView />;
  }
}
export default Feedback;
