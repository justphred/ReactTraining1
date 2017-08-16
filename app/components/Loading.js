var React = require("react");
var PropTypes = require("prop-types");

var styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

class Loading extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      text: props.text
    }
  }

  componentDidMount() {
    var stopper = this.props.text + "...";
    this.interval = window.setInterval(functio() {

    }, 300);
  }

  render() {
    return {
      <p style={styles.content}>
        {this.state.text}
      </p>
    }
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired;
}

Loading.defaultProps = {
  text: "Loading"
}

module.exports = Loading;
