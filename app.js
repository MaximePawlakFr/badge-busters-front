(function() {
    'use strict';

    var CommentList = React.createClass({
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
          var d = [{username:'m'}, {username:'p'}];
            console.log('commentList', typeof this.props.data, this.props.data.length);

            var profileNodes = this.props.data.map(function(profile) {
                return ( < Profile data={profile}/> );
            });

            return ( < div className ="commentList" >
            < form onSubmit = {  this.handleSubmit  } >
              < input name = "promo" type="text" value = {this.state.promo} onChange={this.handlePromoChange}/>
              < input type = "submit" value = "Get promo" / >
            < /form>

            {profileNodes} < /div>);
        }
    });

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
                return ( < ProfileRow data={profile}/> );
            });

            return ( < div className ="profileTable" >
            < form onSubmit = {  this.handleSubmit  } >
              < input name = "promo" type="text" value = {this.state.promo} onChange={this.handlePromoChange}/>
              < input type = "submit" value = "Get promo" / >
            < /form>

            <table border="1">
              <tr>
                <th>Username</th>
                <th>Badges</th>
                <th>-</th>
                <th>Timestamp</th>
              </tr>
                {profileNodes}
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
            var links = val.split('\n').map(function(e) {
                var tmp = e.trim();
                if (e.startsWith(codecademyBaseUrl)) {
                    var noAchievements = e.split('/achievements')[0];
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
            return ( < div className = "commentForm" >
                < form onSubmit = {
                    this.handleSubmit
                } >
                < textarea name = "links"
                rows = "20"
                cols = "100"
                value = {
                    this.state.text
                }
                onChange = {
                    this.handleTextChange
                } > < /textarea> < input type = "submit"
                value = "Send" / >
                < /form> < /div>
            );
        }
    });

    var Profile = React.createClass({
      getInitialState: function() {
        // console.log('profile');
          return {
              data: []
          };
      },
        render: function() {
          console.log('profile', this.props.data);
          var p = this.props.data;
            return ( < div className = "profile" >
              <ul>
                <li>{p.username}</li>
                <ul>
                  <li>Nb badges : {p.badgeNb}</li>
                  <li> {p.lastCoded}</li>
                  <li>Total points : {p.totalPoints}</li>
                  <li>Date : {p.ts}</li>

                </ul>
              </ul>< /div> );
        }
    });

    var ProfileRow = React.createClass({
      getInitialState: function() {
        // console.log('profile');
          return {
              data: []
          };
      },
        render: function() {
          var p = this.props.data;
            return ( < tr className = "profileRow" >
              <td>{p.username}</td>
              <td>{p.badgeNb}</td>
              <td>{p.lastCoded}</td>
              <td>{p.ts}</td>

            < /tr> );
        }
    });

    var CommentBox = React.createClass({
        loadProfilesFromServer: function(promo) {
            firebase.database().ref('/'+promo+'/').once('value').then(function(snapshot) {
                var profiles = [];
                snapshot.forEach(function(childSnapshot) {
                  // key will be "ada" the first time and "alan" the second time
                  var key = childSnapshot.key;
                  // childData will be the actual contents of the child
                  var childData = childSnapshot.val();
                  profiles.push(childData);
              });
              console.log(profiles);
                this.setState({ data: profiles});

            }.bind(this));
        },
        getInitialState: function() {
            return {
                data: []
            };
        },
        componentDidMount: function() {
            var config = {
                apiKey: "J6F3th6HNjUlfYvtG3pegOqYpQ73o2Hi7bTY7Ztf",
                databaseURL: "https://codecademy-eye.firebaseio.com/"
            };
            firebase.initializeApp(config);
            // this.loadProfilesFromServer();
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
              this.loadProfilesFromServer(promo);
          },
        render: function() {
            return (
               < div className = "commentBox" >
                  < h1 > Comments < /h1>
                  < CommentForm onLinksSubmit = { this.handleLinksSubmit} />
                  < ProfileTable onPromoSubmit={this.handlePromoSubmit} data={this.state.data}/>
                < /div>
            );
            // < CommentList onPromoSubmit={this.handlePromoSubmit} data={this.state.data}/>
        }
    });
    ReactDOM.render( < CommentBox url="http://localhost:8888/api/profiles" / > , document.getElementById('content'));

})(window);
