/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.formService = new UIKernel.Form();
    this.state = {
      form: this.formService.getAll()
    };
    this.onFormChange = this.onFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.formService.init({
      model: this.props.model, // Get FormModel from props
      fields: ['name', 'country', 'countryName'],
      changes: this.props.changes
    });
    this.formService.addChangeListener(this.onFormChange);
  }

  componentWillUnmount() {
    this.formService.removeChangeListener(this.onFormChange);
  }

  onFormChange(newFormState) {
    this.setState({form: newFormState});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.formService.submit()
      .then(() => {
        this.props.onSubmit();
      });
  }

  render() {
    if (!this.state.form.isLoaded) {
      return <span>Loading...</span>;
    }

    return (
      <div className="modal-dialog">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">Edit {this.state.form.data.name}</h4>
          </div>
          <div className="modal-body">
            <form>
              <table className="table my-form">
                <tr
                  className={(this.state.form.changes.country ? 'changed' : '') + (this.state.form.errors.hasError('country') ? ' error' : '')}
                >
                  <td>Country:</td>
                  <td>
                    <UIKernel.Editors.SuggestBox
                      model={countries}
                      onChange={() => this.formService.validateField('country')}
                      onLabelChange={() => this.formService.updateField('countryName')}
                      select={true}
                      value={this.state.form.data.country}
                    />
                  </td>
                </tr>
              </table>
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
            <button type="button" className="btn btn-white" onClick={this.form.clearChanges}>Discard</button>
            <button type="button" className="btn btn-white" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
