import React from 'react';
import FormService from './FormService';

function connectForm(fields = null) {
  return Component => class ComponentWithFormService extends React.Component {
    constructor() {
      super();
      this.form = new FormService(fields);
      this.state = this.form.getAll();

      this.onFormChange = this.onFormChange.bind(this);
    }

    async componentDidMount() {
      this.form.addChangeListener(this.onFormChange);
    }

    componentWillUnmount() {
      this.form.removeChangeListener(this.onFormChange);
    }

    onFormChange(newFormState) {
      this.setState(newFormState);
    }

    render() {
      return <Component {...this.props} formData={this.state} formService={this.form}/>;
    }
  };
}

export default connectForm;
