var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage (props) {
  var languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(function(lang) {
        return (
            <li
              style={lang === props.selectedLanguage ? { color: '#d0021b' }: null}
              onClick={props.onSelect.bind(null, lang)}
              key={lang}>
                {lang}
            </li>
          )
        })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

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
    console.log("new language: " + lang);
    this.setState( function(){
      return {
        selectedLanguage: lang
      }
    });
    // console.log("current language: " + this.state.selectedLanguage);
  }
  render () {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    )
  }
}

module.exports = Popular;
