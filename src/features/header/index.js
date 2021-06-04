import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

const Header = () => {
  
  return (
    <header>
      <AppBar>
      <Toolbar>
        <h2>Trello</h2>
      </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;