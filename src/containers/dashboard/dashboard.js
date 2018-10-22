import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// components.
import Search from "../../components/search/search";
import Header from "../../components/header/header";
import Toaster from "../../components/toaster/toaster";
import Spinner from "../../components/spinner/spinner";
import Playlist from "../../components/playlist/playlist";

// helpers.
import { getToken } from "./../../helpers";

import "./dashboard.css";
let audio = new Audio();

class Dashboard extends Component {
  playAudio(previewUrl) {
    audio.src = previewUrl;
    audio.play();
  }

  stopAudio() {
    audio.pause();
  }

  render() {
    return (
      <div>
        {getToken() ? (
          <div>
            <Header />
            <Search />
            <Playlist />
          </div>
        ) : (
          <div>
            <Redirect to="/" />
          </div>
        )}
        <Toaster />
        <Spinner />

        <div class="wrapper">
          <div class="cards">
            <div class="card">
              <div class="overlayer">
                <i
                  class="fas fa-play-circle"
                  onClick={() =>
                    this.playAudio(
                      "https://p.scdn.co/mp3-preview/478b68bfe89ae10511e080bd742f985489b8d371?cid=b8d858330e0e4ab28a6e318a518c694c"
                    )
                  }
                />
                <i
                  class="fas fa-stop-circle"
                  onClick={() =>
                    this.stopAudio(
                      "https://p.scdn.co/mp3-preview/478b68bfe89ae10511e080bd742f985489b8d371?cid=b8d858330e0e4ab28a6e318a518c694c"
                    )
                  }
                />
              </div>
              <img
                src="https://i.scdn.co/image/7479b4966cd3b86803d9379a2064365182ad1829"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
