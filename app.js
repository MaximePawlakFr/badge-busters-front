(function() {
    'use strict';

    var ProfileTable = React.createClass({
      getInitialState: function() {
          return {
               promo: ''
          };
      },
      handlePromoChange: function(e) {
        var val = e.target.value.trim();
        this.setState({ promo: val  });
      },
      handleSubmit: function(e) {
          console.log('handleSubmit');
          e.preventDefault();
          var promo = this.state.promo;
          console.log(promo);
          this.props.onPromoSubmit(promo);
      },

        render: function() {

            var profileNodes = this.props.data.map(function(profile) {
              if(Number.isInteger(parseInt(profile.badgeNb))){
                return ( < ProfileRow data={profile}/> );
              }
            });

            return (
              < div className ="profileTable" >
                < form onSubmit = {  this.handleSubmit  } >
                  < input className="c-field" name = "promo" type="text" placeholder="The name of the promo you want to fetch ..."value = {this.state.promo} onChange={this.handlePromoChange}/>
                  < input type = "submit" className="c-button c-button--block c-button--secondary" value = "Get promo !" / >
                < /form>

                <table border="1" className="c-table c-table--striped">
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
                    {profileNodes}
                    </tbody>
                </table>

                < /div>);
        }
    });

    var CommentForm = React.createClass({
        getInitialState: function() {
            return {
                text: '',
                links: []
            };
        },

        handleTextChange: function(e) {
            var val = e.target.value.trim();
            console.log(val);
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
            console.log(links);
            this.setState({
                links: links
            });
        },
        handleSubmit: function(e) {
            console.log('handleSubmit');
            e.preventDefault();
            var links = this.state.links;
            console.log(links);
            this.props.onLinksSubmit(links);
        },
        render: function() {
            return ( 
              < div className="commentForm" >
                < form onSubmit = {
                    this.handleSubmit
                } >
                  < textarea name = "links" className="c-field"
                    placeholder="List of codecademy urls. Copy and paste your SpreadSheet column Ex : https://www.codecademy.com/fr/Mcesbron  https://www.codecademy.com/fr/valeriie26"
                    rows = "15"
                    cols = "80"
                    value = {
                        this.state.text
                    }
                    onChange = {
                        this.handleTextChange
                    } > 
                  < /textarea> 
                  <div className="c-input-group">
                    <input placeholder="Name of your promo. Ex : montreuil03 " className="c-field" type="text"/>
                    <input type="submit" className="c-button c-button--primary" value="Fetch and parse profiles !" />
                  < /div>
                  
                < /form> 
               < /div>
            );
        }
    });

  

    var ProfileRow = React.createClass({
      getInitialState: function() {
        console.log('profile');
          return {
              data: []
          };
      },
        render: function() {


          var p = this.props.data;
          
          var badgeList;
          if( p.badges){
            badgeList = p.badges.map(function(b) {
                return ( <li className="c-menu__item">{ b.name } {b.date}</li> );
            });
          }

            return ( < tr className = "profileRow c-table__row" >
              <td className="c-table__cell"><a href={p.url}>{p.username}</a></td>
              <td className="c-table__cell">{p.badgeNb}</td>
              <td className="c-table__cell">{p.lastCoded}</td>
              <td className="c-table__cell">{ p.ts }</td>
              <td className=" flex-5 c-table__cell">
                <ul className="c-menu c-menu--high">
                  { badgeList}
                </ul>
              </td>
            < /tr> );
        }
    });

    var CommentBox = React.createClass({
        getInitialState: function() {
            return {
                data: []
            };
        },
        componentDidMount: function() {
            var config = {
                apiKey: "AIzaSyD_q49h1dF29xsKNPlH8DpCOHSfnJiJmnE",
                databaseURL: "https://codecademy-eye.firebaseio.com/"
            };
            firebase.initializeApp(config);
            console.log(this.state.data);
        },

        handleLinksSubmit: function(links) {
            console.log('handleLinksSubmit', links);
            var data = JSON.stringify({
                links: links
            })
            console.log(data);
            $.ajax({
                url: this.props.url,
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                timeout: 0,
                data: data,
                success: function(data) {
                    console.log('success');
                    this.setState({
                        data: data
                    });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        handlePromoSubmit: function(promo) {
              console.log('handlePromoSubmit', promo);
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
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
          },
        render: function() {
            return (
               < div className = "commentBox" >

                  <div className="o-container o-container--medium">
                  < h1 className="c-heading c-heading--super"> Codecademy profiles < /h1>
                    < CommentForm onLinksSubmit = { this.handleLinksSubmit} />
                  </div>
                  <div className="o-container o-container--super">
                      <h2 class="c-heading c-heading--medium">Find a promo</h2>
                      < ProfileTable onPromoSubmit={this.handlePromoSubmit} data={this.state.data}/>
                  </div>
                < /div>
            );
        }
    });
    ReactDOM.render( < CommentBox url="http://localhost:8888/api/profiles" / > , document.getElementById('content'));

})(window);
