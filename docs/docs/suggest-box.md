---
title: Suggest Box
id: suggest-box
prev: datepicker.html
---

* [Live demo](/examples/suggest-box-simple/){:target="_blank"}
* [Code]({{ site.github }}/examples/suggest-box-simple){:target="_blank"}

First, let's create a model for `SuggestBox`. It'll have two methods: `read` for getting options and `getLabel`
for getting an option using id.

`countryList.js`
{% highlight javascript %}
const countries = (function () {
  const records = [
    ['AF', 'Afghanistan'], ['AX', 'Aland Islands'], ['AL', 'Albania'], ['DZ', 'Algeria'], ['AS', 'American Samoa'], ['AD', 'Andorra'], ['AO', 'Angola'], ['AI', 'Anguilla'], ['AQ', 'Antarctica'], ['AG', 'Antigua and Barbuda'], ['AR', 'Argentina'], ['AM', 'Armenia'], ['AW', 'Aruba'], ['AU', 'Australia'], ['AT', 'Austria'], ['AZ', 'Azerbaijan'], ['BS', 'Bahamas'], ['BH', 'Bahrain'], ['BD', 'Bangladesh'], ['BB', 'Barbados'], ['BY', 'Belarus'], ['BE', 'Belgium'], ['BZ', 'Belize'], ['BJ', 'Benin'], ['BM', 'Bermuda'], ['BT', 'Bhutan'], ['BO', 'Bolivia Bolivia, Plurinational state of'], ['BA', 'Bosnia and Herzegovina'], ['BW', 'Botswana'], ['BV', 'Bouvet Island'], ['BR', 'Brazil'], ['IO', 'British Indian Ocean Territory'], ['BN', 'Brunei Darussalam'], ['BG', 'Bulgaria'], ['BF', 'Burkina Faso'], ['BI', 'Burundi'], ['KH', 'Cambodia'], ['CM', 'Cameroon'], ['CA', 'Canada'], ['CV', 'Cape Verde'], ['KY', 'Cayman Islands'], ['CF', 'Central Afri'], ['IT', 'Italy']];

  return {
      async read(search) {
        search = search.toLowerCase();
  
        return records
          .filter((record) => record[1].toLowerCase().indexOf(search) >= 0)
          .map((record) => {
            return {
              id: record[0],
              label: record[1]
            }
          });
      },
  
      async getLabel(id) {
        for (let [recordId, recordName] of records) {
          if (id === recordId) {
            return recordName;
          }
        }
  
        throw new Error('Invalid record id.');
      }
    };
})();
{% endhighlight %}
---

Next, let's render our SuggestBox.

`MainComponent.js`:
{% highlight javascript %}
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: 'AD'
    };
    this.updateCountry = this.updateCountry.bind(this);
  }

  updateCountry(countryId) {
    this.setState({countryId});
  }

  render() {
    return (
      <div className="container">
        <UIKernel.Editors.SuggestBox
          model={countries}
          onChange={this.updateCountry}
          value={this.state.countryId}
        />
      </div>
    );
  }
}
{% endhighlight %}
---

`main.js`:
{% highlight javascript %}
React.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}
