// test github usernames: gaearon, sophiebits, bvaughn, tj
import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

// TEST DATAs
/* const testData = [
  {
    name: "Dan Abraham",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
];
*/

function fDispError(user, msg) {
  const errDoc = document.getElementById("err");
  errDoc.innerHTML = `
    <p class='error'>
      Error while getting user '${user}'.<br> 
      Err Message: ${msg}
    </p>`;
}
function fRemoveError() {
  const errDoc = document.getElementById("err");
  errDoc.innerHTML = "";
}

//component built as a class
class Card extends React.Component {
  render() {
    console.log("1");
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="User profile avatar" />
        <div className="info">
          <div className="login">Login: {profile.login}</div>
          <div className="location">Location: {profile.location}</div>
          <div className="company">Company: {profile.company}</div>
        </div>
      </div>
    );
  }
}

const CardList = (props) => {
  return (
    <div>
      {props.profiles.map((profile, iCount) => (
        <Card {...profile} key={`${profile.id}`} />
      ))}
    </div>
  );
};

class Form extends React.Component {
  //  USE STATE TO MAKE REACT KNOW OF EVERY CHANGE TO THE TEXT ON INPUT BOX
  state = { userName: "" };
  handleSubmit = async (event) => {
    // PREVENT DEFAULT MAKES REACT TAKEOVER HANDLER EVENT
    // SO THAT DEFAULT HTML DOES NOT RELOAD THE WHOLE PAGE
    event.preventDefault();
    fRemoveError();
    //console.log(this.state.userName);
    try {
      let resp = await axios.get(
        `https://api.github.com/users/${this.state.userName}`
      );
      console.log("Data captured by Axios: ", resp.data);
      this.props.funcOnSubmit(resp.data);
      this.setState({ userName: "" });
    } catch (err) {
      fDispError(this.state.userName, err.message);
      console.log("Error while getting user data. Result: ", err.message);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          // INPUT RECEIVES WHAT IS ON REACT VARIABLE
          value={this.state.userName}
          // VALUE ON CHANGE IS STORED ON REACT VARIABLE
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="Github Name"
          required
        />
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  // }
  // -- CONSTRUCTOR ABOVE IS THE SAME AS:
  state = {
    profiles: [],
  };

  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData], //concat. array
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form funcOnSubmit={this.addNewProfile} />
        <div id="err"></div>
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App title="The GitHub Cards App (By: !!.EduardKB.!!)" />);
