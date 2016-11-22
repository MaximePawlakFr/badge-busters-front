import React, { Component } from "react";

import ProfileRow from './ProfileRow';

class App extends Component {
      constructor(props){
        super(props);
        this.state = {
          promo: ''
        }
      }

      handlePromoChange = (e) => {
        let val = e.target.value.trim();
        this.setState({ promo: val  });
      }

      handleSubmit = (e) => {
          console.log('handleSubmit');
          e.preventDefault();
          var promo = this.state.promo;
          // promo = promo.toLowerCase();

          console.log(promo);
          let button = this.submitButton;
          this.props.onGetPromoSubmit(button, promo);
      }

        render() {
            var profileNodes = this.props.data.map(function(profile, index) {
              // if(Number.isInteger(parseInt(profile.badgeNb))){
              return ( < ProfileRow data={ profile } key={ index }/> );
              // }
            });

            return (
              < div className ="profileTable" >
                < form onSubmit = {  this.handleSubmit  } >
                  < input className="c-field" name = "promo" type="text" placeholder="The name of the promo you want to fetch ..."value={this.state.promo} onChange={this.handlePromoChange}/>
                  < input ref={ (i)=>{this.submitButton = i;} } type="submit" className="c-button c-button--block c-button--secondary" value = "Get promo !" / >
                < /form>

                <table className="c-table c-table--striped">
                  <thead className="c-table__head">
                  <tr className="c-table__row c-table__row--heading">
                    <th className="c-table__cell">Username</th>
                    <th className="c-table__cell">Badges</th>
                    <th className="c-table__cell">Last coded</th>
                    <th className="c-table__cell">mis à jour le</th>
                    <th className=" flex-5 c-table__cell">Badges</th>
                  </tr>
                  </thead>
                   <tbody className="c-table__body">
                    { profileNodes }
                    </tbody>
                </table>

                < /div>);
        }
}

export default App;
