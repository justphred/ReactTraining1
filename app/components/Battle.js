var React = require("react");
var PropTypes = require('prop-types');
var Link = require("react-router-dom").Link;
var PlayerPreview = require("./PlayerPreview");

class UserCredentials extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        userID: "",
        accessToken: ""
      }

      this.handleUIDChange = this.handleUIDChange.bind(this);
      this.handleAccessTokenChange = this.handleAccessTokenChange.bind(this);
    }

    handleUIDChange(event) {
      var value = event.target.value;
      this.setState(function() {
        return (
          {userID: value}
        )
      });
    }
    handleAccessTokenChange(event) {
      var value = event.target.value;
      this.setState(function () {
        return (
          {accessToken: value}
        )
      })
    }
    handleSubmit (event) {
      event.preventDefault();
      this.props.onSubmit(this.state.userId, this.state.accessToken);
    }

    render() {

      return (
        <form className="column" onSubmit={this.handleSubmit}>
          <h3>Github Needs Some Credentials</h3>
          <label className="header" htmlFor="user-id">
            Github User Id
          </label>
          <input
            id="user-id"
            placeholder="Github Id"
            type="text"
            autoComplete="off"
            value={this.state.userID}
            onChange={this.handleUIDChange}
          />
          <label className="header" htmlFor="access-token">
            User Access Token
          </label>
          <input
            id="user-id"
            placeholder="access token"
            type="text"
            autoComplete="off"
            value={this.state.accessToken}
            onChange={this.handleAccessTokenChange}
          />

          <button className="button" type="submit" disabled={!this.state.userID && !this.state.accessToken}>
            Submit
          </button>
        </form>
      )
    }
} // End class UserCredentials

UserCredentials.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;

    this.setState(function(){
      return (
        {username: value}
      )
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button className="button" type="submit" disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null,

      userGithubID: null,
      userAccessKey: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] = "https://github.com/" + username + ".png?size=200";

      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      var newState = {};
      newState[id + "Name"] = "";
      newState[id + "Image"] = null;

      return newState;
    });
  }

  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;
    var userGithubID   = this.state.userGithubID;
    var userAccessKey  = this.state.userAccessKey;

    return (
      <div>
        <div className="row">
          {!playerOneName &&
              <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit} />
          }

          {playerOneImage !== null &&
              <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}>
                  <button
                    className="reset"
                    onClick={this.handleReset.bind(null, "playerOne")} >
                      Reset
                  </button>
              </PlayerPreview>}

          {!playerTwoName &&
              <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit} />
          }

          {playerTwoImage !== null &&
              <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}>
                  <button
                    className="reset"
                    onClick={this.handleReset.bind(null, "playerTwo")} >
                      Reset
                  </button>
              </PlayerPreview>}
        </div>

        // userGithubID
        // userAccessKey

        {playerOneImage && playerTwoImage && userGithubID && userAccessKey &&
          <Link
            className="button"
            to={{
              pathname: match.url + "/results",
              search: "?playerOneName=" + playerOneName +
                      "&playerTwoName=" + playerTwoName
            }}>
              Battle
          </Link>
        }

      </div>
    )
  }
}

module.exports = Battle;
