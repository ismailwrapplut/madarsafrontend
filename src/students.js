import React, { Component, createRef } from "react";
import {
  Button,
  TextField,
  LinearProgress,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";
import { withRouter } from "./utils";
import axios from "axios";
import "./Dashboard.css";
import logo from "./logo.png";
import one from "./1.jpeg";
import two from "./2.jpeg";
import three from "./3.jpeg";
import four from "./4.jpeg";
import five from "./5.jpeg";
import six from "./6.jpeg";
import { Link } from "react-router-dom";

class Student extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      year: new Date().getFullYear(), // Default to the current year
      students: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/");
    } else {
      this.setState({ token: token }, () => {
        this.getStudentsByYear(this.state.year);
      });
    }
  };

  getStudentsByYear = (year) => {
    this.setState({ loading: true });
    axios
      .get(`https://madarsabackend.onrender.com/get-students-by-year?year=${year}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        this.setState({
          loading: false,
          students: res.data.students,
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.setState({ loading: false, students: [] });
      });
  };

  handleYearChange = (e) => {
    const year = e.target.value;
    this.setState({ year }, () => {
      this.getStudentsByYear(year);
    });
  };
  deleteProduct = (id) => {
    axios
      .post(
        "https://madarsabackend.onrender.com/delete-product",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: this.state.token,
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.setState({ page: 1 }, () => {
          this.pageChange(null, 1);
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  render() {
    return (
      <div>
        <div className="secondheader" style={{ backgroundColor: "#C1E78B", padding: "20px" }}>
          <div className="secondheaderchild">
            <h2 style={{ color: "black", fontSize: "15px", marginBottom: 0, fontWeight: "bolder" }}>
              JAMIA ISLAMIA DARUL-ULOOM MOHAMMADIA
            </h2>
            <h2 style={{ color: "black", fontSize: "20px", marginTop: 5, fontWeight: 400 }}>
              Meel Kherla,Po.Ladamka,Teh.Pahari.
            </h2>
            <h3 style={{ color: "black", fontSize: "20px", marginTop: -10, fontWeight: 600 }}>
              Distt:Bharatpur.Raj.Mob.No.9982742935
            </h3>
          </div>
          <div>
            <img src={logo} alt="logo" height={80} width={110} />
          </div>
          <div className="secondheaderchild">
            <h2 style={{ color: "black", fontSize: "24px", marginBottom: 0, fontFamily: "Arabic Font" }}>
              جامعہ اسلامیہ دارالعلوم محمدیه
            </h2>
            <h2 style={{ color: "black", fontSize: "12px", marginTop: 0, fontWeight: 400 }}>
              میل کھیڑلا, پوسٹ لاڈمکا, تحصیل پہاڑی, ضلع ڈ یگ (بھرت پور), راجستھان
            </h2>
            <h3 style={{ color: "black", fontSize: "20px", marginTop: -10, fontWeight: 600 }}>
              9982742935 -:رابطہ نمبر
            </h3>
          </div>
        </div>
        <hr />
        <div style={{ padding: "5% 10%" }} className="no-printme">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={one} height="500px" alt="First slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={two} height="500px" alt="Second slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={three} height="500px" alt="Fourth slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={four} height="500px" alt="Fifth slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={five} height="500px" alt="Sixth slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={six} height="500px" alt="Seventh slide" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        {this.state.loading && <LinearProgress size={40} />}
        <div className="no-printme">
          <h2>Dashboard</h2>
        </div>
        <Button
            className="button_style no-printme"
            variant="outlined"
            color="primary"
            size="small"
            onClick={(e) => {
              window.print();
            }}
          >
            Print Student details
          </Button>
        <br />
        <div className="no-printme">
          <TextField
            id="standard-basic"
            type="number"
            name="year"
            value={this.state.year}
            onChange={this.handleYearChange}
            placeholder="Enter Year"
            style={{ width: "190px", marginBottom: "20px" }}
            required
          />
        </div>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Student Address</TableCell>
                <TableCell align="center">Student Aadhar Number</TableCell>
                <TableCell align="center">Student Date of Birth</TableCell>
                <TableCell align="center">Student Father Name</TableCell>
                <TableCell align="center">Student Name</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.students.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{fontSize:"18px"}} align="center">{row.studentvillage2},{row.studentpost2}, {row.studenttehseel2}, {row.studentdistt2}, {row.studentstate2}</TableCell>
                  <TableCell style={{fontSize:"14px"}} align="center">{row.studentaadharno}</TableCell>
                  <TableCell style={{fontSize:"14px"}} align="center">{row.studentdateofbirth.split("-")[2]}-{row.studentdateofbirth.split("-")[1]}-{row.studentdateofbirth.split("-")[0]}</TableCell>
                  <TableCell style={{fontSize:"18px"}} align="center">{row.studentfathername2}</TableCell>
                  <TableCell style={{fontSize:"18px"}} align="center">{row.studentname2}</TableCell>


                  <TableCell align="center" className="no-printme">
                  <Button
                      className="button_style no-printme"
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      <Link to={"/dakhlaform?id=" + row._id}>View</Link>
                    </Button>
                    <Button
                    
                      variant="contained"
                      color="secondary"
                      onClick={() => this.deleteProduct(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withRouter(Student);