import React, { Component } from 'react';


class App extends Component {
  constructor(props){
    super(props);
    this.state =  {
      text: '',
      promoName:'',
      links: [],
      errorLinks: []
    };
  }

  handleTextChange = (e) => {
    var val = e.target.value.trim();

    this.setState({
      text: val
    });
    var codecademyBaseUrl = "https://www.codecademy.com";
    var codecademyBaseUrl2 = "https://www.codeacademy.com";
    var falseUrl = "codecademy.com/courses";
    var falseUrl2 = "codecademy.com/fr/courses";

    var errorLinks = [];
    var guessedLinks = [];

    var links = val.split('\n').map(function(e) {
      // console.log(e);
      var link = e.trim();
      // Delete space and keep first

      // Check if it's a url.
      var urlRegex = /^((http[s]):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g;
      var isUrl = link.match(urlRegex);
      // console.log("isUrl", isUrl, link.indexOf(' '));

      if(isUrl){
        link = isUrl[0];
        link = link.split(' ')[0];

      }else if(link.indexOf(codecademyBaseUrl) > -1){
        // To avoid things like : "https://...
        var index = link.indexOf(codecademyBaseUrl);
        link = link.slice(index);
      }
      // else if(link.indexOf(' ') == -1){
      //   // If no space, could be a codecademy pseudo;
      //   link = codecademyBaseUrl + "/" + link;
      //   guessedLinks.push(e);
      //   return;
      // }
      // console.log("link", link);

      if ( (link.startsWith(codecademyBaseUrl) || link.startsWith(codecademyBaseUrl2) ) &&
      link.indexOf(falseUrl) === -1 &&
      link.indexOf(falseUrl2) === -1 &&
      link !== codecademyBaseUrl &&
      link !== codecademyBaseUrl+"/fr") {
        var linkNoAchievements = link.split('/achievements')[0];
        return linkNoAchievements;
      } else {
        errorLinks.push(e);
        return null;
      }
    }).filter(function(item) {
      if (item) {
        return true;
      }
      return false;
    });

    console.log("links", links);
    console.log("guessedLinks", guessedLinks);
    console.log("errorLinks", errorLinks);
    this.setState({
      links: links,
      errorLinks: errorLinks

    });
  }

  handlePromoChange = (e) => {
    var val = e.target.value.trim();
    val = val.toLowerCase();
    console.log("promoName", val);
    this.setState({
      promoName: val
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let links = this.state.links;
    let promoName = this.state.promoName;

    var button = this.submitButton;
    this.props.onLinksSubmit(button, promoName, links);
  }

  render() {
    let errorNodes = null;
    if(this.state.errorLinks.length > 0){
      errorNodes = this.state.errorLinks.map(function(link, index){
        return (<li key={ index }>{ link }</li>);
      });
    }

    return (
      <div className="commentForm" >
        <form onSubmit={
          this.handleSubmit
        } >
          <textarea name="links" className="c-field"
          placeholder="List of codecademy urls. Copy and paste your SpreadSheet column Ex : https://www.codecademy.com/fr/Mcesbron  https://www.codecademy.com/fr/valeriie26"
          rows="15"
          cols="80"
          value={
            this.state.text
          }
          onChange={
            this.handleTextChange
          } >
          </textarea>

          <div className="c-input-group">
            <input placeholder="Name of your promo. Ex : montreuil03 "
              className="c-field"
              type="text"
              onChange={ this.handlePromoChange }
            />
            <input ref={(input) => { this.submitButton = input; }}
              type="submit"
              className="c-button c-button--info"
              value="Fetch and parse codecademy profiles !" />
          </div>
        </form>
        { errorNodes?(
          <div className="mp-error-links c-alert c-alert--error">
            <h4>Ces liens n'ont pas pu être identifiés : </h4>
            <ul>
              { errorNodes }
            </ul>
          </div>
            ):""
        }
      </div>
    );
  }
}

export default App;
