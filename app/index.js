 var React = require('react');
 var ReactDOM = require('react-dom');
 require('./index.css');

// state
// lifecicle events
// UI

 class APP extends React.Component {
   render () {
     return (
       <div> Hello Worldlings! </div>
     )
   }
 }

 ReactDOM.render (
   <APP />, document.getElementById('app')
 );
