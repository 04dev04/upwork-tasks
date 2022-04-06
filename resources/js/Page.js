 // import libs
import React, { Component } from 'react'

// initialize component
class Page extends Component {
  // set name of the component
  static displayName = 'Home Page'

  constructor(props) {
    super(props)

  }

  // after mounting the component add a style to the body
  componentDidMount() {
    
  }

  // remove body style before component leaves dom
  componentWillUnmount() {
   
  }

  // render component
  render() {

    return (<div className="container py-5">
        <div className="row">
            <div className="col-md-12">
                Contents
            </div>
        </div>
    </div>)
  }
}

export default Page
