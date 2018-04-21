import React, { Component } from 'react';

import { WizardFormFirstPage, FormContainer } from './';

import { message } from 'antd';
class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  render() {
    const { onSubmit, loading } = this.props;
    const { page } = this.state;
    return (
      <FormContainer>
        {loading && message.loading('Se esta corroborando la informacion')}
        {page === 1 && (
          <WizardFormFirstPage loading={loading} onSubmit={onSubmit} />
        )}
        {/* {page === 2 && (
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )} */}
        {/* {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )} */}
      </FormContainer>
    );
  }
}

export default WizardForm;
