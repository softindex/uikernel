/**
 * Copyright 2015, SoftIndex LLC.
 */
// ListModel for SuggestBox

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