var React = require('react');

class Popular extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    }
    // Ensure that the context of the this keyword when invoked/used
    // within the method updateLanguage is set to that of this class (or the object created from this class)
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState( function(){
      return {
        selectedLanguage: lang
      }
    });
  }
  render () {
    var languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
    return (
      <ul className="languages">
        {languages.map(function(lang) {
          return (
            <li
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}>
              {lang}
            </li>
          )
        }, this)
        }
      </ul>
    )
  }
}

module.exports = Popular;
