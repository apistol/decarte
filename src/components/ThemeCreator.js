import React from "react";
// import Slider from "reactslick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";



const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
};

class LayoutCreator extends React.Component {
    state = {

        selectedCover: "",
        selectedPage: "",

        name: "",
        pages: "",
        checkedHasCover: true,
        coverWidth: "",
        coverHeight: "",
        pageWidth: "",
        pageHeight: "",
        tipHartie: "",
        pretRon: "",
        pretDolari: "",
        pretEuro: "",
        discount: "",
    };

    handleSelectedCover = (id) => {
        this.setState({ selectedCover: id });
    };

    render() {




        const cover = {
            padding: "20px",
        };
        const coverLayout = {
            border: "1px solid #000000",
            height: "150px",
            padding: "110px",
        };
        const imagePlaceHolder = {
            border: "1px solid #000000",
            background: "red",
            height: "100%",
        };
        const text = {
            textAlign: "center",
        };




        let coperta =
            this.state.checkedHasCover === true ? (
                <div>
                    <div style={cover}>
                        <div style={coverLayout}>
                            <div style={imagePlaceHolder}>1</div>
                        </div>
                    </div>
                    <p style={text}>Coperta</p>
                </div>
            ) : (
                    ""
                );

        return (
            <Container
                style={{
                    marginBottom: "40px"
                }}
            >
                <Grid container>
                    <Grid item xs={12} style={{ padding: "0px 30px" }}>
                        <div>
                            {/* <Slider {...settings}>
                                {coperta}

                                <div>
                                    <div style={cover}>
                                        <div style={coverLayout}>
                                            <div style={imagePlaceHolder}>2</div>
                                        </div>
                                    </div>
                                    <p style={text}>Pagina</p>
                                </div>
                                <div>
                                    <div style={cover}>
                                        <div style={coverLayout}>
                                            <div style={imagePlaceHolder}>3</div>
                                        </div>
                                    </div>
                                    <p style={text}>Pagina</p>
                                </div>
                                {coperta}
                            </Slider> */}
                        </div>
                    </Grid>

                </Grid>
            </Container>
        );
    }
}

export default LayoutCreator;
