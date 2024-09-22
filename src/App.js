import './App.css'
import {v4} from 'uuid'
import {Component} from 'react'

const colorList = ['yellow', 'orange', 'red', 'blue', 'green']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listWebsite = event => {
    this.setState({website: event.target.value})
  }

  listUsername = event => {
    this.setState({username: event.target.value})
  }

  listPassword = event => {
    this.setState({password: event.target.value})
  }

  addContest = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInut: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInut: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      isShow,
      latestList,
      searchInut,
    } = this.state

    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInut.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg_container">
        <img
          className="image_logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
        />

        <div className="bg-blue-container">
          <form className="bg-thicjBlue-container" onSubmit={this.addContest}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                className="website-image"
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
              />
              <input
                value={website}
                type="text"
                placeholder="Enter Website"
                className="inputtext"
                onChange={this.listWebsite}
              />
            </div>

            <div className="input-container">
              <img
                className="website-image"
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
              />
              <input
                type="text"
                value={username}
                placeholder="Enter Username"
                className="inputtext"
                onChange={this.listUsername}
              />
            </div>

            <div className="input-container">
              <img
                className="website-image"
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
              />
              <input
                value={password}
                type="password"
                placeholder="Enter Password"
                className="inputtext"
                onChange={this.listPassword}
              />
            </div>
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <img
            className="password-image"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>

        <div className="bg-blue-container2">
          <div className="search-position">
            <div className="password-holder">
              <h1 className="heading">Your Passwords</h1>
              <p className="para-count"> {newList.length}</p>
            </div>

            <div className="input-search2">
              <img
                className="website-image"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png  "
              />
              <input
                onChange={this.searchList}
                value={searchInut}
                type="search"
                placeholder=" search"
                className="inputtext"
              />
            </div>
          </div>
          <hr />
          <div className="label-container">
            <input
              onChange={this.showPassword}
              className="checkbox"
              id="check"
              type="checkbox"
            />
            <label className="label-box" htmlFor="check">
              Show Passwords
            </label>
          </div>

          {!isTrue && (
            <div className="no_password-position">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="empty-image"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="ul-container">
              {newList.map(eachValue => (
                <li className="li-items" id={eachValue.id} key={eachValue.id}>
                  <div>
                    <p className={`initial ${eachValue.classAdd}`}>
                      {eachValue.initialValue}
                    </p>
                  </div>
                  <div className="list-container">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website">{eachValue.userName}</p>

                    {!isShow && (
                      <img
                        className="stars-image"
                        alt="stars"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.password}</p>}
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      className="delete-image"
                      alt="delete"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
