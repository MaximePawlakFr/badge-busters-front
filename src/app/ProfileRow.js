import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  render() {
    var profile = this.props.data;

    var badgeList;
    if(profile.badges){
      badgeList = profile.badges.map(function(b, index) {
        return ( <li className="c-menu__item" key={ index }>{ b.name } {b.date}</li> );
      });
    }

    let ts = profile.ts?profile.ts.replace("T", " "):"";

    return (
      <tr className = "profileRow c-table__row" >
        <td className="c-table__cell"><a href={ profile.url }>{ profile.username }</a></td>
        <td className="c-table__cell">{ profile.badgeNb }</td>
        <td className="c-table__cell">{ profile.lastCoded }</td>
        <td className="c-table__cell">{ ts }</td>
        <td className="flex-5 c-table__cell">
          <ul className="c-menu c-menu--high">
          { badgeList}
          </ul>
        </td>
    </tr> );
  }
}
export default App;
