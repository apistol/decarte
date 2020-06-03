import React from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import logo from "../assets/logo.svg";

class Navigation extends React.Component {
  render() {
    return (
      <Container>
        <Grid container spacing={3} style={{ marginBottom: "50px" }}>
          <Grid item xs={4}></Grid>
          <Grid
            item
            xs={4}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <img src={logo} alt="Logo editor deImagini" />
            <Divider />
            <p>
              {this.props.projectName !== ""
                ? this.props.projectName
                : "Album Foto"}
            </p>
          </Grid>
          <Grid item xs={4} container justify="flex-end" alignItems="center">

          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Navigation;