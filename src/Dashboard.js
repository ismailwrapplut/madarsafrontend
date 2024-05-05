import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import { Audio } from "react-loader-spinner";
import Loader from "react-js-loader";
import {  useNavigate } from "react-router-dom";

import swal from "sweetalert";
import { withRouter } from "./utils";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard(props) {
  const navigate = useNavigate()
  const [state, setState] = useState({
    token: "",
    openProductModal: false,
    openProductEditModal: false,
    id: "",
    sarparastname: "",
    sarparastfathername: "",
    formDate: "",
    formnumber: "",
    sarparastvillage: "",
    sarparastpost: "",
    sarparasttehseel: "",
    sarparastdistt: "",
    sarparaststate: "",
    sarparastaadharno: "",
    studentname: "",
    studentfathername: "",
    studentdateofbirth: "",
    studentvillage: "",
    studentpost: "",
    studenttehseel: "",
    studentdistt: "",
    studentstate: "",
    studentaadharno: "",
    studentname2: "",
    studentfathername2: "",
    studentdateofbirth2: "",
    studentvillage2: "",
    studentpost2: "",
    studenttehseel2: "",
    studentdistt2: "",
    studentstate2: "",
    studentaadharno2: "",
    shoba: "",
    dateshamsi: "",
    datekamari: "",
    darjarequested: "",
    darjagiven: "",
    beforethis: "",
    talibilmrishta: "",
    sarparastmobileno: "",
    sarparastwhatsappno: "",
    file: "",
    file2: "",
    fileName: "",
    fileName2: "",
    page: 1,
    search: "",
    products: [],
    pages: 0,
    loading: false,
    loading2: false,
  });

  useEffect(() => {
    let token = localStorage.getItem("token");  
    if (!token) {
      navigate("/");
    } else {
      setState((prevState) => ({ ...prevState, token: token, products: [] }));
      getProduct();
    }
  }, []);

  const getProduct = () => {
    setState((prevState) => ({ ...prevState, loading: true }));

    let data = "?";
    data = `${data}page=${state.page}`;
    if (state.search) {
      data = `${data}&search=${state.search}`;
    }
    axios
      .get(`https://madarsabackend.onrender.com/get-product${data}`, {
        headers: {
          token: state.token,
        },
      })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          products: res.data.products,
          pages: res.data.pages,
        }));
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        if (
          err.response.data.errorMessage ===
          "Login Expired! Please click OK to Login Again"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          navigate("/");
        }
        setState((prevState) => ({
          ...prevState,
          loading: false,
          products: [],
          pages: 0,
        }));
      });
  };

  const deleteProduct = (id) => {
    axios
      .post(
        "https://madarsabackend.onrender.com/delete-product",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: state.token,
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        setState((prevState) => ({ ...prevState, page: 1 }), () => {
          pageChange(null, 1);
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

  const pageChange = async (event, page) => {
    setState((prevState) => ({ ...prevState, page: page, products: [] }));
    getProduct();
  };

  const onChange = (e) => {
    if (e.target.name === "firstfile") {
      setState((prevState) => ({
        ...prevState,
        file: e.target?.files[0],
        fileName: e.target.files[0]?.name,
      }));
    }
    if (e.target.name === "secondfile") {
      setState((prevState) => ({
        ...prevState,
        file2: e.target?.files[0],
        fileName2: e.target.files[0]?.name,
      }));
    }

    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

    if (e.target.name === "search") {
      setState((prevState) => ({ ...prevState, page: 1, products: [] }), () => {
        getProduct();
      });
    }
  };

  const addProduct = () => {
    setState((prevState) => ({ ...prevState, loading2: true }));
    const file = new FormData();
    const fileArray = [state.file, state.file2];
    file.append("studentprofilepic", state.file);
    file.append("sarparastprofilepic", state.file2);
    file.append("sarparastname", state.sarparastname);
    file.append("sarparastfathername", state.sarparastfathername);
    file.append("formDate", state.formDate);
    file.append("formnumber", state.formnumber);
    file.append("sarparastvillage", state.sarparastvillage);
    file.append("sarparastpost", state.sarparastpost);
    file.append("sarparasttehseel", state.sarparasttehseel);
    file.append("sarparastdistt", state.sarparastdistt);
    file.append("sarparaststate", state.sarparaststate);
    file.append("sarparastaadharno", state.sarparastaadharno);
    // Append other form fields as needed

    axios
      .post("https://madarsabackend.onrender.com/add-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: state.token,
        },
      })
      .then((res) => {
        setState((prevState) => ({ ...prevState, loading2: false }));
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        handleProductClose();
        setState((prevState) => ({
          ...prevState,
          sarparastname: "",
          sarparastfathername: "",
          formDate: "",
          formnumber: "",
          sarparastvillage: "",
          sarparastpost: "",
          sarparasttehseel: "",
          sarparastdistt: "",
          sarparaststate: "",
          sarparastaadharno: "",
          // Reset other form fields as needed
          file: null,
          file2: null,
        }));
      })
      .catch((err) => {
        setState((prevState) => ({ ...prevState, loading2: false }));
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        handleProductClose();
      });
  };
  const updateProduct = () => {
    setState((prevState) => ({ ...prevState, loading2: true }));

    const file = new FormData();
    console.log(state.file);
    file.append("id", state.id);
    file.append("studentprofilepic", state.file);
    file.append("sarparastprofilepic", state.file2);
    file.append("sarparastname", state.sarparastname);
    file.append("sarparastfathername", state.sarparastfathername);
    file.append("formDate", state.formDate);
    file.append("formnumber", state.formnumber);
    // Append other form fields as needed

    axios
      .post("https://madarsabackend.onrender.com/update-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: state.token,
        },
      })
      .then((res) => {
        setState((prevState) => ({ ...prevState, loading2: false }));

        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        handleProductEditClose();
        setState((prevState) => ({
          ...prevState,
          sarparastname: "",
          sarparastfathername: "",
          formDate: "",
          formnumber: "",
          sarparastvillage: "",
          sarparastpost: "",
          sarparasttehseel: "",
          sarparastdistt: "",
          sarparaststate: "",
          sarparastaadharno: "",
          // Reset other form fields as needed
          file: null,
          file2: null,
        }));
        getProduct();
      })
      .catch((err) => {
        setState((prevState) => ({ ...prevState, loading2: false }));

        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        handleProductEditClose();
      });
  };

  const handleProductOpen = () => {
    setState((prevState) => ({
      ...prevState,
      openProductModal: true,
      id: "",
      // Reset other form fields as needed
      file: null,
      file2: null,
    }));
  };

  const handleProductClose = () => {
    setState((prevState) => ({ ...prevState, openProductModal: false }));
  };

  const handleProductEditOpen = (data) => {
    setState((prevState) => ({
      ...prevState,
      openProductEditModal: true,
      id: data._id,
      fileName: data.studentprofilepic,
      fileName2: data.sarparastprofilepic,
      sarparastname: data.sarparastname,
      // Set other form fields based on data
    }));
  };

  const handleProductEditClose = () => {
    setState((prevState) => ({ ...prevState, openProductEditModal: false }));
  };

  // Similar modifications for other methods like updateProduct, handleProductOpen, handleProductClose, handleProductEditOpen, handleProductEditClose

  return (
    <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div className="no-printme">
          <h2>Dashboard</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleProductOpen}
          >
            Add Student
          </Button>
        </div>

        {/* Edit Product */}
        <Dialog
          open={this.state.openProductEditModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
          <DialogContent>
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastname"
            value={this.state.sarparastname}
            onChange={this.onChange}
            placeholder="Sarparast Name "
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastfathername"
            value={this.state.sarparastfathername}
            onChange={this.onChange}
            placeholder="Sarparast Father Name"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="formDate"
            value={this.state.formDate}
            onChange={this.onChange}
            placeholder="Form Date"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="formnumber"
            value={this.state.formnumber}
            onChange={this.onChange}
            placeholder="Form Number"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastvillage"
            value={this.state.sarparastvillage}
            onChange={this.onChange}
            placeholder="Sarparast Village"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastpost"
            value={this.state.sarparastpost}
            onChange={this.onChange}
            placeholder="Sarparast Post"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparasttehseel"
            value={this.state.sarparasttehseel}
            onChange={this.onChange}
            placeholder="Sarparast Tehseel"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastdistt"
            value={this.state.sarparastdistt}
            onChange={this.onChange}
            placeholder="Sarparast Distt"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparaststate"
            value={this.state.sarparaststate}
            onChange={this.onChange}
            placeholder="Sarparast State"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastaadharno"
            value={this.state.sarparastaadharno}
            onChange={this.onChange}
            placeholder="Sarparast Aadhar No"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentname"
            value={this.state.studentname}
            onChange={this.onChange}
            placeholder="Student Name"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentfathername"
            value={this.state.studentfathername}
            onChange={this.onChange}
            placeholder="Student's Father Name"
            required
          />
          <br />
          <br />
          <label for="studentdateofbirth">Student Date of Birth</label>

          <input
            id="standard-basic"
            type="date"
            autoComplete="off"
            name="studentdateofbirth"
            value={this.state.studentdateofbirth}
            label="Student Date of Birth"
            onChange={this.onChange}
            placeholder="Student's Date of Birth"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentvillage"
            value={this.state.studentvillage}
            onChange={this.onChange}
            placeholder="Student's Village"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentpost"
            value={this.state.studentpost}
            onChange={this.onChange}
            placeholder="Student's Post"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studenttehseel"
            value={this.state.studenttehseel}
            onChange={this.onChange}
            placeholder="Student Tehseel"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentdistt"
            value={this.state.studentdistt}
            onChange={this.onChange}
            placeholder="Student Distt"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentstate"
            value={this.state.studentstate}
            onChange={this.onChange}
            placeholder="Student State"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentaadharno"
            value={this.state.studentaadharno}
            onChange={this.onChange}
            placeholder="Student Aadhar No"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentname2"
            value={this.state.studentname2}
            onChange={this.onChange}
            placeholder="نام طلب علم "
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentfathername2"
            value={this.state.studentfathername2}
            onChange={this.onChange}
            placeholder="والد کا نام "
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="date"
            autoComplete="off"
            name="studentdateofbirth2"
            value={this.state.studentdateofbirth2}
            label="Student Date of Birth"
            onChange={this.onChange}
            placeholder=" تاریخ   پیدایش"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentvillage2"
            value={this.state.studentvillage2}
            onChange={this.onChange}
            placeholder="سکونت"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentpost2"
            value={this.state.studentpost2}
            onChange={this.onChange}
            placeholder="پوسٹ"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studenttehseel2"
            value={this.state.studenttehseel2}
            onChange={this.onChange}
            placeholder="تحصیل"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentdistt2"
            value={this.state.studentdistt2}
            onChange={this.onChange}
            placeholder="ضلع"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentstate2"
            value={this.state.studentstate2}
            onChange={this.onChange}
            placeholder="صوب"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="studentaadharno2"
            value={this.state.studentaadharno2}
            onChange={this.onChange}
            placeholder="آدھار  کارڈ  نمبر"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="shoba"
            value={this.state.shoba}
            onChange={this.onChange}
            placeholder="جامعہ کے شعبہ "
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="dateshamsi"
            value={this.state.dateshamsi}
            onChange={this.onChange}
            placeholder="تاریخ شمسی "
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="datekamari"
            value={this.state.datekamari}
            onChange={this.onChange}
            placeholder="تا سرخ قمری"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="darjarequested"
            value={this.state.darjarequested}
            onChange={this.onChange}
            placeholder="کس درجہ میں داخلہ مطلوب ہے"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="darjagiven"
            value={this.state.darjagiven}
            onChange={this.onChange}
            placeholder="س طالب علم کو درجہ کس میں داخلہ دیا جائے۔"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="beforethis"
            value={this.state.beforethis}
            onChange={this.onChange}
            placeholder="اس سے قبل کہاں تعلیم حاصل کی ہے"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="talibilmrishta"
            value={this.state.talibilmrishta}
            onChange={this.onChange}
            placeholder="طالب علم سے رشتہ "
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastmobileno"
            value={this.state.sarparastmobileno}
            onChange={this.onChange}
            placeholder="موبائل نمبر  سرپرست"
            required
          />
          <br />
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastwhatsappno"
            value={this.state.sarparastwhatsappno}
            onChange={this.onChange}
            placeholder="واٹسپ نمبر سرپرست"
            required
          />
          <br />
          <br />
            <div>
              <label for="fileInput" class="btn">
                Select Student Photo
              </label>
              <input
                className="submit"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                name="firstfile"
                style={{ visibility: "hidden" }}
                // value={this.state.fileName}
                onChange={(e) => this.onChange(e)}
                // onChange={(e) => {
                //   this.setState({
                //     fileName: e.target.files[0].name,
                //     file: e.target.files[0],
                //   });
                //   console.log(this.state.file);
                // }}
                id="fileInput"
              />
            </div>
            <div>
              <label for="fileInput2" class="btn">
                Select Sarparast Photo
              </label>
              <input
                className="submit"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                name="secondfile"
                // value={this.state.fileName2}
                onChange={(e) => this.onChange(e)}
                style={{ visibility: "hidden" }}
                // onChange={(e) => {
                //   console.log(e.target.files[0])
                //   this.setState({
                //     fileName2: e.target.files[0].name,
                //     file2: e.target.files[0],
                //   });
                //   console.log(this.state.file2);
                // }}
                id="fileInput2"
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductEditClose} color="primary">
              Cancel
            </Button>
            {this.state.loading2 === false ? (
              <Button
                disabled={
                  this.state.sarparastname === "" ||
                  this.state.sarparastfathername === "" ||
                  this.state.sarparastvillage === "" ||
                  this.state.sarparastpost === "" ||
                  this.state.sarparasttehseel === "" ||
                  this.state.sarparastdistt === "" ||
                  this.state.sarparaststate === "" ||
                  this.state.sarparastaadharno === "" ||
                  this.state.studentname === "" ||
                  this.state.studentfathername === "" ||
                  this.state.studentdateofbirth === "" ||
                  this.state.studentvillage === "" ||
                  this.state.studentpost === "" ||
                  this.state.studenttehseel === "" ||
                  this.state.studentdistt === "" ||
                  this.state.studentstate === "" ||
                  this.state.formDate === "" ||
                  this.state.formnumber === "" ||
                  this.state.studentname2 == "" ||
                  this.state.studentfathername2 == "" ||
                  this.state.studentdateofbirth2 == "" ||
                  this.state.studentvillage2 == "" ||
                  this.state.studentpost2 == "" ||
                  this.state.studenttehseel2 == "" ||
                  this.state.studentdistt2 == "" ||
                  this.state.studentstate2 == "" ||
                  this.state.studentaadharno2 == "" ||
                  this.state.studentaadharno === "" ||
                  this.state.shoba === "" ||
                  this.state.dateshamsi === "" ||
                  this.state.datekamari === "" ||
                  this.state.darjarequested === "" ||
                  this.state.darjagiven === "" ||
                  this.state.beforethis === "" ||
                  this.state.talibilmrishta === "" ||
                  this.state.sarparastmobileno === "" ||
                  this.state.sarparastwhatsappno === "" ||
                  this.state.fileName === "" ||
                  this.state.fileName2 === ""
                }
                onClick={(e) => this.updateProduct()}
                color="primary"
                autoFocus
              >
                Edit Student
              </Button>
            ) : (
              <div className={"item"}>
              <Loader type="spinner-cub" bgColor={"white"} color={"blue"} title={"loading"} size={50} />
          </div>
            )}
          </DialogActions>
        </Dialog>

        {/* Add Product */}
        <Dialog
          open={this.state.openProductModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Student</DialogTitle>
          <DialogContent>
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastname"
              value={this.state.sarparastname}
              onChange={this.onChange}
              placeholder="Sarparast Name "
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastfathername"
              value={this.state.sarparastfathername}
              onChange={this.onChange}
              placeholder="Sarparast Father Name"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="formDate"
              value={this.state.formDate}
              onChange={this.onChange}
              placeholder="Form Date"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="formnumber"
              value={this.state.formnumber}
              onChange={this.onChange}
              placeholder="Form Number"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastvillage"
              value={this.state.sarparastvillage}
              onChange={this.onChange}
              placeholder="Sarparast Village"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastpost"
              value={this.state.sarparastpost}
              onChange={this.onChange}
              placeholder="Sarparast Post"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparasttehseel"
              value={this.state.sarparasttehseel}
              onChange={this.onChange}
              placeholder="Sarparast Tehseel"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastdistt"
              value={this.state.sarparastdistt}
              onChange={this.onChange}
              placeholder="Sarparast Distt"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparaststate"
              value={this.state.sarparaststate}
              onChange={this.onChange}
              placeholder="Sarparast State"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastaadharno"
              value={this.state.sarparastaadharno}
              onChange={this.onChange}
              placeholder="Sarparast Aadhar No"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentname"
              value={this.state.studentname}
              onChange={this.onChange}
              placeholder="Student Name"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentfathername"
              value={this.state.studentfathername}
              onChange={this.onChange}
              placeholder="Student's Father Name"
              required
            />
            <br />
            <br />
            <label for="studentdateofbirth">Student Date of Birth</label>

            <input
              id="standard-basic"
              type="date"
              autoComplete="off"
              name="studentdateofbirth"
              value={this.state.studentdateofbirth}
              label="Student Date of Birth"
              onChange={this.onChange}
              placeholder="Student's Date of Birth"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentvillage"
              value={this.state.studentvillage}
              onChange={this.onChange}
              placeholder="Student's Village"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentpost"
              value={this.state.studentpost}
              onChange={this.onChange}
              placeholder="Student's Post"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studenttehseel"
              value={this.state.studenttehseel}
              onChange={this.onChange}
              placeholder="Student Tehseel"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentdistt"
              value={this.state.studentdistt}
              onChange={this.onChange}
              placeholder="Student Distt"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentstate"
              value={this.state.studentstate}
              onChange={this.onChange}
              placeholder="Student State"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentaadharno"
              value={this.state.studentaadharno}
              onChange={this.onChange}
              placeholder="Student Aadhar No"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentname2"
              value={this.state.studentname2}
              onChange={this.onChange}
              placeholder="نام طلب علم "
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentfathername2"
              value={this.state.studentfathername2}
              onChange={this.onChange}
              placeholder="والد کا نام "
              required
            />
            <br />
            <br />
            <label for="studentdateofbirth">تاریخ  پیدائش </label>

            <input
              id="standard-basic"
              type="date"
              autoComplete="off"
              name="studentdateofbirth2"
              value={this.state.studentdateofbirth2}
              label="Student Date of Birth"
              onChange={this.onChange}
              placeholder=" تاریخ   پیدایش"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentvillage2"
              value={this.state.studentvillage2}
              onChange={this.onChange}
              placeholder="سکونت"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentpost2"
              value={this.state.studentpost2}
              onChange={this.onChange}
              placeholder="پوسٹ"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studenttehseel2"
              value={this.state.studenttehseel2}
              onChange={this.onChange}
              placeholder="تحصیل"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentdistt2"
              value={this.state.studentdistt2}
              onChange={this.onChange}
              placeholder="ضلع"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentstate2"
              value={this.state.studentstate2}
              onChange={this.onChange}
              placeholder="صوب"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentaadharno2"
              value={this.state.studentaadharno2}
              onChange={this.onChange}
              placeholder="آدھار  کارڈ  نمبر"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="shoba"
              value={this.state.shoba}
              onChange={this.onChange}
              placeholder="جامعہ کے شعبہ "
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="dateshamsi"
              value={this.state.dateshamsi}
              onChange={this.onChange}
              placeholder="تاریخ شمسی "
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="datekamari"
              value={this.state.datekamari}
              onChange={this.onChange}
              placeholder="تا سرخ قمری"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="darjarequested"
              value={this.state.darjarequested}
              onChange={this.onChange}
              placeholder="کس درجہ میں داخلہ مطلوب ہے"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="darjagiven"
              value={this.state.darjagiven}
              onChange={this.onChange}
              placeholder="س طالب علم کو درجہ کس میں داخلہ دیا جائے۔"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="beforethis"
              value={this.state.beforethis}
              onChange={this.onChange}
              placeholder="اس سے قبل کہاں تعلیم حاصل کی ہے"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="talibilmrishta"
              value={this.state.talibilmrishta}
              onChange={this.onChange}
              placeholder="طالب علم سے رشتہ "
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastmobileno"
              value={this.state.sarparastmobileno}
              onChange={this.onChange}
              placeholder="موبائل نمبر  سرپرست"
              required
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparastwhatsappno"
              value={this.state.sarparastwhatsappno}
              onChange={this.onChange}
              placeholder="واٹسپ نمبر سرپرست"
              required
            />
            <br />
            <br />
            <div>
              <label for="fileInput" class="btn">
                Select Student Photo
              </label>
              <input
                className="submit"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                name="firstfile"
                style={{ visibility: "hidden" }}
                onChange={(e) => this.onChange(e)}
                // onChange={(e) => {
                //   this.setState({
                //     fileName: e.target.files[0].name,
                //     file: e.target.files[0],
                //   });
                //   console.log(this.state.file);
                // }}
                id="fileInput"
              />
            </div>
            <div>
              <label for="fileInput2" class="btn">
                Select Sarparast Photo
              </label>
              <input
                className="submit"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                name="secondfile"
                onChange={(e) => this.onChange(e)}
                style={{ visibility: "hidden" }}
                // onChange={(e) => {
                //   console.log(e.target.files[0])
                //   this.setState({
                //     fileName2: e.target.files[0].name,
                //     file2: e.target.files[0],
                //   });
                //   console.log(this.state.file2);
                // }}
                id="fileInput2"
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductClose} color="primary">
              Cancel
            </Button>
            {this.state.loading2 === false ? (
              <Button
                disabled={
                  this.state.sarparastname == "" ||
                  this.state.sarparastfathername == "" ||
                  this.state.sarparastvillage == "" ||
                  this.state.formDate === "" ||
                  this.state.formnumber === "" ||
                  this.state.sarparastpost == "" ||
                  this.state.sarparasttehseel == "" ||
                  this.state.sarparastdistt == "" ||
                  this.state.sarparaststate == "" ||
                  this.state.sarparastaadharno == "" ||
                  this.state.studentname == "" ||
                  this.state.studentfathername == "" ||
                  this.state.studentdateofbirth == "" ||
                  this.state.studentvillage == "" ||
                  this.state.studentpost == "" ||
                  this.state.studenttehseel == "" ||
                  this.state.studentdistt == "" ||
                  this.state.studentstate == "" ||
                  this.state.studentaadharno == "" ||
                  this.state.studentname2 == "" ||
                  this.state.studentfathername2 == "" ||
                  this.state.studentdateofbirth2 == "" ||
                  this.state.studentvillage2 == "" ||
                  this.state.studentpost2 == "" ||
                  this.state.studenttehseel2 == "" ||
                  this.state.studentdistt2 == "" ||
                  this.state.studentstate2 == "" ||
                  this.state.studentaadharno2 == "" ||
                  this.state.studentaadharno == "" ||
                  this.state.dateshamsi === "" ||
                  this.state.datekamari === "" ||
                  this.state.darjarequested === "" ||
                  this.state.darjagiven === "" ||
                  this.state.beforethis === "" ||
                  this.state.talibilmrishta === "" ||
                  this.state.sarparastmobileno === "" ||
                  this.state.sarparastwhatsappno === "" ||
                  this.state.fileName === "" ||
                  this.state.fileName2 === ""
                }
                onClick={(e) => this.addProduct()}
                color="primary"
                autoFocus
              >
                Add Student
              </Button>
            ) : (
              <div className={"item"}>
              <Loader type="spinner-cub" bgColor={"white"} color={"blue"} title={"loading"} size={50} />
          </div>
            )}
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <TextField
            id="standard-basic"
            className="no-printme"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by Student name"
            style={{ width: "190px" }}
            required
          />
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
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Student Photo</TableCell>

                <TableCell align="center" className="no-printme">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((row) => (
                <TableRow key={row.studentname}>
                  <TableCell align="center" component="th" scope="row">
                    {row.studentname}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={row.studentprofilepic}
                      width="70"
                      height="70"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      className="button_style no-printme"
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      <Link to={"/dakhlaform?id=" + row._id}>View</Link>
                    </Button>
                    <Button
                      className="button_style no-printme"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.handleProductEditOpen(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_style no-printme"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deleteProduct(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        
          </Table>
          <br />
  
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} variant="outlined" color="primary"/>
        </TableContainer>
      <div style={{position:"absolute",bottom:0,left:0,width:"100%",height:25,fontSize:14}}>Created By SmileWeb(+91 9868277865)</div>

      </div>
  );
}

export default withRouter(Dashboard);
