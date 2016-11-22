import React, { Component } from 'react';
import $ from 'jquery';

import BadgeInput from './BadgeInput';
import ProfileTable from './ProfileTable';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }


  handleLinksSubmit = (button, promo, links) => {
    console.log('handleLinksSubmit', button, promo, links);
    button.setAttribute("disabled", "disabled");

    let data = JSON.stringify({
      links: links
    });

    $.ajax({
      url: this.props.url+"/"+promo,
      contentType: "application/json; charset=utf-8",
      type: 'POST',
      timeout: 0,
      data: data,
      success: function(response) {
        console.log('success',response);
        this.setState({
          data: response.data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      },
      complete: function(){
        button.removeAttribute("disabled");
      }
    });
  }

  handleGetPromoSubmit = (button, promo) => {
    console.log('handleGetPromoSubmit', promo);

    button.setAttribute("disabled", "disabled");
    $.ajax({
      url: this.props.url+"/"+promo,
      contentType: "application/json; charset=utf-8",
      type: 'GET',
      success: function(data) {
        console.log('success');

        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      },
      complete: function(){
        button.removeAttribute("disabled", "disabled");
      }
    });
  }

  render() {
    return (
      <div>
        <div className="o-container o-container--medium">
          <h1 className="c-heading c-heading--super"> Badge Busters ! </h1>
          <BadgeInput onLinksSubmit={ this.handleLinksSubmit } />
        </div>

        <div className="o-container o-container--super">
          <h2 className="c-heading c-heading--medium">Find a promo</h2>
          <ProfileTable onGetPromoSubmit={ this.handleGetPromoSubmit } data={ this.state.data }/>
        </div>
      </div>
    );
  }
}

export default App;
