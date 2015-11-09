---
title: Suggest box
id: suggest-box
prev: form-example.html
next: reports-example.html
---

* [Live demo](/examples/suggest-box/){:target="_blank"}
* [Code]({{site.github}}_site/examples/suggest-box){:target="_blank"}

### Create suggest box form

Create list model for SuggestBox

`countryList.js`
{% highlight javascript %}
var countries = (function () {
  var records = [
    ['AF', 'Afghanistan'], ['AX', 'Aland Islands'], ['AL', 'Albania'], ['DZ', 'Algeria'], ['AS', 'American Samoa'], ['AD', 'Andorra'], ['AO', 'Angola'], ['AI', 'Anguilla'], ['AQ', 'Antarctica'], ['AG', 'Antigua and Barbuda'], ['AR', 'Argentina'], ['AM', 'Armenia'], ['AW', 'Aruba'], ['AU', 'Australia'], ['AT', 'Austria'], ['AZ', 'Azerbaijan'], ['BS', 'Bahamas'], ['BH', 'Bahrain'], ['BD', 'Bangladesh'], ['BB', 'Barbados'], ['BY', 'Belarus'], ['BE', 'Belgium'], ['BZ', 'Belize'], ['BJ', 'Benin'], ['BM', 'Bermuda'], ['BT', 'Bhutan'], ['BO', 'Bolivia Bolivia, Plurinational state of'], ['BA', 'Bosnia and Herzegovina'], ['BW', 'Botswana'], ['BV', 'Bouvet Island'], ['BR', 'Brazil'], ['IO', 'British Indian Ocean Territory'], ['BN', 'Brunei Darussalam'], ['BG', 'Bulgaria'], ['BF', 'Burkina Faso'], ['BI', 'Burundi'], ['KH', 'Cambodia'], ['CM', 'Cameroon'], ['CA', 'Canada'], ['CV', 'Cape Verde'], ['KY', 'Cayman Islands'], ['CF', 'Central Afri'], ['IT', 'Italy']];

  return {
    read(search, cb) {
      search = search.toLowerCase();
      cb(null, records.filter(function (record) {
        return record[1].toLowerCase().indexOf(search) >= 0;
      }));
    },

    getLabel(id, cb) {
      for (var i = 0; i < records.length; i++) {
        if (records[i][0] === id) {
          return cb(null, records[i][1]);
        }
      }
      cb(Error('Invalid record id.'));
    }
  };
})();
{% endhighlight %}

Create validator

`validator.js`
{% highlight javascript %}
var validation = UIKernel.createValidator()
  .field('country', UIKernel.Validators.notNull('Invalid country.'));
{% endhighlight %}


Create Grid model

`model.js`
{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  data: data,
  validation: validation
});
{% endhighlight %}

`FormComponent.jsx`:
{% highlight javascript %}
var FormComponent = React.createClass({
  mixins: [UIKernel.Mixins.Form],

  componentDidMount: function () {
    this.initForm({
      model: this.props.model, // Get FormModel from props
      fields: ['name', 'country', 'countryName'],
      changes: this.props.changes
    });
  },

  save: function (e) {
    e.preventDefault();
    this.submit(function (err) {
      if (!err) {
        this.props.onSubmit();
      }
    }.bind(this));
  },

  render: function () {
    if (!this.isLoaded()) {
      return <span>Loading...</span>;
    }

    var data = this.getData();

    return (
      <div className="modal-dialog">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">Edit {data.name}</h4>
          </div>
          <div className="modal-body">
            <form>
              <table className="table my-form">
                <tr
                  className={(this.hasChanges('country') ? 'changed' : '') + (this.hasError('country') ? ' error' : '')}
                >
                  <td>Country:</td>
                  <td>
                    <UIKernel.Editors.SuggestBox
                      model={countries}
                      onChange={this.validateField.bind(null, 'country')}
                      onLabelChange={this.updateField.bind(null, 'countryName')}
                      select={true}
                      value={data.country}
                    />
                  </td>
                </tr>
              </table>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-white" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-white" onClick={this.clearChanges}>Discard</button>
            <button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
          </div>
        </div>
      </div>
    );
  }
});
{% endhighlight %}

Add name, country and button for show modal. 

`columns.js`:
{% highlight javascript %}
var columns = {
  tools: {
    width: '40px',
    render: [function () {
      return '<button ref="edit" class="btn btn-outline btn-success btn-xs"><i class="fa fa-pencil"></i></button>';
    }],
    onClickRefs: {
      edit: (function (e, recordId, record, grid) {
        var editPopup = popup.open(FormComponent, {
          model: UIKernel.Adapters.Grid.toFormUpdate(grid.getModel(), recordId),
          changes: grid.getRecordChanges(recordId),
          onSubmit: function onSubmit() {
            editPopup.close();
            grid.clearRecordChanges(recordId);
          }
        });
      })
    }
  },
  name: {
    name: 'First name',
    sortCycle: ['desc', 'asc', 'default'],
    sortDefault: 'desc',
    editor: function () {
         return <input type="text" {...this.props}/>;
    },
    render: ['name', function (record) {
      return _.escape(record.name);
    }]
  },
  country: {
    name: 'Country',
    editor: function () {
      return (
        <UIKernel.Editors.SuggestBox
          {...this.props}
          onLabelChange={this.updateField.bind(null, 'countryName')}
          model={countries}
          select={true}
        />
      );
    },
    render: ['country', 'countryName', function (record) {
      return record.countryName;
    }]
  }
};
{% endhighlight %}

Add save and clear buttons

`MainComponent.js`:
{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model
    };
  },
  save: function () {
    this.refs.grid.save(function (err) {
      if (err) {
        alert('Error');
      }
    });
  },

  clear: function () {
    this.refs.grid.clearAllChanges();
  },

  render: function () {
    return (
      <div>
        <UIKernel.Grid
          ref="grid"
          cols={columns}
          model={this.state.model}
          viewCount={10}
        />
        <a className="btn btn-success" onClick={this.save}>Save</a>
        {' '}
        <a className="btn btn-success" onClick={this.clear}>Clear</a>
      </div>
    );
  }
});
{% endhighlight %}

Bootstrap needs jquery version higher 1.9.1
