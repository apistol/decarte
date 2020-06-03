import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import ImageUploader from 'react-images-upload';
import Switch from "@material-ui/core/Switch";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import DropDownLayouts from "./lowLeveComponents/DropDownLayouts";
import RenderedPage from "../layoutComponents/RenderedPage";
import RenderedCover from "../layoutComponents/RenderedCover";
import Draggable from 'react-draggable';

import ViwerComponent from '../themeComponents/ThemeViewerComponent';


class NewTheme extends React.Component {

  constructor(props) {
    super(props);

    const pageLayoutsList = this.props.layouts.filter(l => l.tipLayout === "Pagina");
    const coverLayoutsList = this.props.layouts.filter(l => l.tipLayout !== "Pagina");


    this.state = {
      name: (this.props.returnedTheme !== null) ? this.props.returnedTheme.name : "",
      checkedIsCover: (this.props.returnedTheme !== null) ? this.props.returnedTheme.checkedIsCover : false,
      layoutUsed: (this.props.returnedTheme !== null) ? this.props.returnedTheme.layoutUsed : "",
      textEdit: false,
      layoutEdit: false,
      backgroundEdit: false,

      pageLayouts: pageLayoutsList,
      coverLayouts: coverLayoutsList,
      themeImage: props.themeImage,
      coverThemeImage: props.coverThemeImage,
      zoom: 1
    }

  }

  componentDidMount() {
  }

  handleTextUpdate = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event });
  };
  handleChangeDropdown = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
    this.props.getLayoutsForId(event.target.value);
  };
  handleChangeCheck = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  showOnlyForCategory = (category) => {

    if (this.props.returnedLayout == null) return;
    const categs = [...category];
    let conditionEval = categs.includes(this.props.returnedLayout.tipLayout);
    return (
      this.props.returnedLayout.tipLayout !== "" &&
      conditionEval === true) ? true : false
  }
  zoomOut = () => {
    this.setState((prevState) => ({
      zoom: prevState.zoom + 0.1
    }))
  }
  zoomIn = (prevState) => {
    this.setState((prevState) => ({
      zoom: prevState.zoom - 0.1
    }))
  }

  onDrop = (event) => {
    this.props.postImageForTheme(event[0]);
    this.setState({
      picture: event[0]
    });
  }
  onDropCoverImage = (event) => {
    this.props.postCoverImageForTheme(event[0]);
    this.setState({
      coverPicture: event[0]
    });
  }

  render() {

    const renderer = {
      width: `500px`,
      height: `600px`,
      background: "#f0f0f0",
      paddingTop: "100px",
      overflow: "hidden"
    }


    return (
      <Container
        direction="column"
        justify="flex-start"
        style={{
          marginBottom: "60px",
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#e14013",
            color: "#FFF",
            marginRight: "8px",
          }}
          onClick={() => {
            this.props.handleCreateNewTheme(this.state);
          }}
        >
          {this.props.name !== "" ? "Creeaza" : "Update"}
        </Button>



        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              label="Denumeste tematica"
              type="text"
              onChange={this.handleTextUpdate}
              name="name"
              value={this.state.name}
            />

            <br />
            <br />

            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.checkedIsCover}
                      onChange={this.handleChangeCheck}
                      name="checkedIsCover"
                      color="primary"
                    />
                  }
                  label="Este coperta"
                />
              </FormGroup>
            </FormControl>
            <br />


            <DropDownLayouts
              pageLayouts={this.state.checkedIsCover !== true ? this.state.pageLayouts : this.state.coverLayouts}
              value={this.state.layoutUsed}
              label="Alege layout pentru tematica"
              name="layoutUsed"
              handleChangeDropdown={this.handleChangeDropdown}
              getLayoutsForId={this.props.getLayoutsForId}
            />


            <br />

            <ImageUploader
              label="Marime imagine max: 4MB se accepta doar .jpg, .png"
              withIcon={false}
              buttonText='Imagine background'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png']}
              maxFileSize={5242880}
              withPreview={true}
              withLabel={false}
              fileContainerStyle={{
                padding: "0px",
                alignItems: "flex-start",
                margin: "10px auto"
              }}
            />


            {this.state.checkedIsCover && <ImageUploader
              label="Marime imagine max: 4MB se accepta doar .jpg, .png"
              withIcon={false}
              buttonText='Imagine coperta'
              onChange={this.onDropCoverImage}
              imgExtension={['.jpg', '.png']}
              maxFileSize={5242880}
              withPreview={true}
              withLabel={false}
              fileContainerStyle={{
                padding: "0px",
                alignItems: "flex-start",
                margin: "10px auto"
              }}
            />}


          </Grid>

          <br />
          <Grid item xs={5}>

            <Button
              variant="contained"
              style={{ backgroundColor: "#e14013", color: "#FFF", margin: "0px 20px 20px 0px" }}
              onClick={() => {
                this.zoomOut();
              }}
            >
              Zoom in
          </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#e14013", color: "#FFF", margin: "0px 20px 20px 0px" }}
              onClick={() => {
                this.zoomIn();
              }}
            >
              Zoom out
          </Button>

            <div id="renderer" style={renderer}>

              <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[1, 1]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div>
                  <div className="handle">

                    {this.showOnlyForCategory(["Pagina"]) &&

                      <div>
                        {console.log(this.props.returnedTheme)}
                        <RenderedPage

                          tipLayout={this.props.returnedLayout.tipLayout}
                          rowsLayout={this.props.returnedLayout.rowsLayout}
                          layoutPadding={this.props.returnedLayout.layoutPadding}
                          layoutWidth={this.props.returnedLayout.layoutWidth}
                          layoutHeight={this.props.returnedLayout.layoutHeight}
                          row1={this.props.returnedLayout.row1}
                          row1Col1={this.props.returnedLayout.row1Col1}
                          row1Col2={this.props.returnedLayout.row1Col2}
                          row1Col3={this.props.returnedLayout.row1Col3}
                          row1Col4={this.props.returnedLayout.row1Col4}
                          row2={this.props.returnedLayout.row2}
                          row2Col1={this.props.returnedLayout.row2Col1}
                          row2Col2={this.props.returnedLayout.row2Col2}
                          row2Col3={this.props.returnedLayout.row2Col3}
                          row2Col4={this.props.returnedLayout.row2Col4}
                          row3={this.props.returnedLayout.row3}
                          row3Col1={this.props.returnedLayout.row3Col1}
                          row3Col2={this.props.returnedLayout.row3Col2}
                          row3Col3={this.props.returnedLayout.row3Col3}
                          row3Col4={this.props.returnedLayout.row3Col4}
                          row4={this.props.returnedLayout.row4}
                          row4Col1={this.props.returnedLayout.row4Col1}
                          row4Col2={this.props.returnedLayout.row4Col2}
                          row4Col3={this.props.returnedLayout.row4Col3}
                          row4Col4={this.props.returnedLayout.row4Col4}
                          themeImage={this.props.returnedTheme.themeImage}
                          zoom={this.state.zoom} />
                      </div>}


                    {this.showOnlyForCategory(["CopertaC1C4", "CopertaC2", "CopertaC3"]) &&
                      <RenderedCover
                        tipLayout={this.props.returnedLayout.tipLayout}
                        layoutWidth={this.props.returnedLayout.layoutWidth}
                        layoutHeight={this.props.returnedLayout.layoutHeight}
                        coverHasImage={this.props.returnedLayout.coverHasImage}
                        coverImageWidth={this.props.returnedLayout.coverImageWidth}
                        coverImageHeight={this.props.returnedLayout.coverImageHeight}
                        coverImageTopPosition={this.props.returnedLayout.coverImageTopPosition}
                        coverImageLeftPosition={this.props.returnedLayout.coverImageLeftPosition}
                        themeImage={this.props.themeImage}
                        coverThemeImage={this.props.coverThemeImage}
                        zoom={this.state.zoom} />}

                  </div>
                </div>
              </Draggable>


            </div>

          </Grid>
          <Grid item xs={3}>

            {this.props.themes.map(theme => <ViwerComponent
              key={theme.id}
              id={theme.id}
              name={theme.name}
              themeImage={theme.themeImage}
              getThemesForId={this.props.getThemesForId}
              deleteThemeForId={this.props.deleteThemeForId}
            />
            )}


          </Grid>
        </Grid>
      </Container >
    );
  }
}

export default NewTheme;