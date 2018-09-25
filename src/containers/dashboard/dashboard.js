import React, { Component } from "react";

// components.
import Search from "../../components/search/search";
import Footer from "../../components/footer/footer";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Search />
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
