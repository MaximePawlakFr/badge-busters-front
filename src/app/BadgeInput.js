import React, { Component } from 'react';


class App extends Component {
  constructor(props){
    super(props);
    this.state =  {
      text: '',
      promoName:'',
      links: []
    };
  }

  handleTextChange = (e) => {
    var val = e.target.value.trim();

    this.setState({
      text: val
    });
    var codecademyBaseUrl = "https://www.codecademy.com";
    var falseUrl = "codecademy.com/courses";
    var falseUrl2 = "codecademy.com/fr/courses";

    var links = val.split('\n').map(function(e) {
      var tmp = e.trim();
      tmp = tmp.replace(/['"]+/g, '').replace(/['"]+/g, '');
      var urlRegex = /^((http[s]):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g;
      var res = tmp.match(urlRegex);

      if(res){
        e = res[0];
        e = e.split(/(\s+)/)[0];
      }
      if (e.startsWith(codecademyBaseUrl) && e.indexOf(falseUrl) == -1 && e.indexOf(falseUrl2) == -1) {
        var noAchievements = e.split('/achievements')[0];
        console.log('e',noAchievements);
        return noAchievements;
      } else {
        return;
      }
    }).filter(function(item) {
      if (item) {
        return true;
      }
    });

    console.log("links", links);
    this.setState({
      links: links
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
    return (
      <div className="commentForm" >
        <form onSubmit = {
          this.handleSubmit
        } >
          <textarea name = "links" className="c-field"
          placeholder="List of codecademy urls. Copy and paste your SpreadSheet column Ex : https://www.codecademy.com/fr/Mcesbron  https://www.codecademy.com/fr/valeriie26"
          rows = "15"
          cols = "80"
          value = {
            this.state.text
          }
          onChange = {
            this.handleTextChange
          } >
          </textarea>

          <div className="c-input-group">
            <input placeholder="Name of your promo. Ex : montreuil03 "
              className="c-field"
              type="text"
              onChange = { this.handlePromoChange }
            />
            <input ref={(input) => { this.submitButton = input; }}
              type="submit"
              className="c-button c-button--primary"
              value="Fetch and parse codecademy profiles !" />
          </div>

        </form>
      </div>
    );
  }
}

export default App;
