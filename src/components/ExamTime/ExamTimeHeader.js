import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('ExamTimeStore')
class ExamTimeHeader extends Component {
  render() {
    const { ExamTimeStore } = this.props;

    return (
      <h2>Next exam is on {ExamTimeStore.examTime}</h2>
    )
  }
}

export default ExamTimeHeader;