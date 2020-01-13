import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import MainPage from "./components/MainPage/MainPage";

class App extends Component {
  state = {
    msg: null
  };

  render() {
    return (
      <div>
        <Layout>
          <MainPage />
        </Layout>
      </div>
    );
  }
}

export default App;
