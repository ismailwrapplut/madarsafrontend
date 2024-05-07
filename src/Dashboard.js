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
import { useNavigate } from "react-router-dom";

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
    const token =  window.localStorage?.getItem("token");
    if (!token){
      navigate("/")
    }
    setState((prevState) => ({ ...prevState, token:localStorage?.getItem("token"), products: [] }));
    console.log(state)
    getProduct();
  }, [state?.token]);
  

  const getProduct = () => {
    setState((prevState) => ({ ...prevState, loading: true }));

    let data = "?";
    data = `${data}page=${state?.page}`;
    if (state?.search) {
      data = `${data}&search=${state?.search}`;
    }
    axios
      .get(`https://madarsabackend.onrender.com/get-product${data}`, {
        headers: {
          token: localStorage?.getItem("token"),
        },
      })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          products: res.data?.products,
          pages: res.data?.pages,
        }));
      })
      .catch((err) => {
        swal({
          text: err.response?.data?.errorMessage,
          icon: "error",
          type: "error",
        });
        if (
          err.response?.data?.errorMessage ===
          "Login Expired! Please click OK to Login Again"
        ) {
          localStorage?.removeItem("token");
          localStorage?.removeItem("user_id");
          navigate("/");
        } else  if (
          err.response?.data?.errorMessage ===
          "User unauthorized!"
        ) {
          localStorage?.removeItem("token");
          localStorage?.removeItem("user_id");
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
            token: localStorage?.getItem("token"),
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data?.title,
          icon: "success",
          type: "success",
        });

        setState((prevState) => ({ ...prevState, page: 1 }), () => {
          pageChange(null, 1);
        });
        setState({ products: [] }, () => {
          getProduct();
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
        fileName: e.target?.files[0]?.name,
      }));
    }
    if (e.target?.name === "secondfile") {
      setState((prevState) => ({
        ...prevState,
        file2: e.target?.files[0],
        fileName2: e.target?.files[0]?.name,
      }));
    }

    setState((prevState) => ({ ...prevState, [e.target?.name]: e.target?.value }));

    if (e.target?.name === "search") {
      setState((prevState) => ({ ...prevState, page: 1, products: [] }), () => {
        getProduct();
      });
    }
  };

  const addProduct = () => {
    // Set loading state to true
    setState((prevState) => ({ ...prevState, loading2: true }));
  
    // Prepare form data
    const formData = new FormData();
    formData.append("studentprofilepic", state?.file);
    formData.append("sarparastprofilepic", state?.file2);
    formData.append("sarparastname", state?.sarparastname);
    formData.append("sarparastfathername", state?.sarparastfathername);
    formData.append("formDate", state?.formDate);
    formData.append("formnumber", state?.formnumber);
    formData.append("sarparastvillage", state?.sarparastvillage);
    formData.append("sarparastpost", state?.sarparastpost);
    formData.append("sarparasttehseel", state?.sarparasttehseel);
    formData.append("sarparastdistt", state?.sarparastdistt);
    formData.append("sarparaststate", state?.sarparaststate);
    formData.append("sarparastaadharno", state?.sarparastaadharno);
    formData.append("studentname", state?.studentname);
    formData.append("studentfathername", state?.studentfathername);
    formData.append("studentdateofbirth", state?.studentdateofbirth);
    formData.append("studentvillage", state?.studentvillage);
    formData.append("studentpost", state?.studentpost);
    formData.append("studenttehseel", state?.studenttehseel);
    formData.append("studentdistt", state?.studentdistt);
    formData.append("studentstate", state?.studentstate);
    formData.append("studentaadharno", state?.studentaadharno);
    formData.append("studentname2", state?.studentname2);
    formData.append("studentfathername2", state?.studentfathername2);
    formData.append("studentdateofbirth2", state?.studentdateofbirth2);
    formData.append("studentvillage2", state?.studentvillage2);
    formData.append("studentpost2", state?.studentpost2);
    formData.append("studenttehseel2", state?.studenttehseel2);
    formData.append("studentdistt2", state?.studentdistt2);
    formData.append("studentstate2", state?.studentstate2);
    formData.append("studentaadharno2", state?.studentaadharno2);
    formData.append("shoba", state?.shoba);
    formData.append("dateshamsi", state?.dateshamsi);
    formData.append("datekamari", state?.datekamari);
    formData.append("darjarequested", state?.darjarequested);
    formData.append("darjagiven", state?.darjagiven);
    formData.append("beforethis", state?.beforethis);
    formData.append("talibilmrishta", state?.talibilmrishta);
    formData.append("sarparastmobileno", state?.sarparastmobileno);
    formData.append("sarparastwhatsappno", state?.sarparastwhatsappno);
  
    // Make API request
    axios
      .post("https://madarsabackend.onrender.com/add-product", formData, {
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage?.getItem("token"),
        },
      })
      .then((res) => {
        // Set loading state to false on successful response
        setState((prevState) => ({ ...prevState, loading2: false }));
        // Show success message
        swal({
          text: res.data?.title,
          icon: "success",
          type: "success",
        });
        // Close product modal
        handleProductClose();
        // Reset form fields and state
        setState({
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
          file: null,
          file2: null,
          page: 1,
        }, () => {
          // Clear products array and fetch updated product data
          setState({ products: [] }, () => {
            getProduct();
          });
        });
      })
      .catch((err) => {
        // Set loading state to false on error
        setState((prevState) => ({ ...prevState, loading2: false }));
        // Show error message
        swal({
          text: err.response?.data?.errorMessage || "An error occurred.",
          icon: "error",
          type: "error",
        }).then();
        // Close product modal
        handleProductClose();
      });
  };
  
  const updateProduct = () => {
    // Set loading state to true
    setState(prevState => ({ ...prevState, loading2: true }));
  
    // Prepare form data
    const formData = new FormData();
    formData.append("id", state?.id);
    formData.append("studentprofilepic", state?.file);
    formData.append("sarparastprofilepic", state?.file2);
    formData.append("sarparastname", state?.sarparastname);
    formData.append("sarparastfathername", state?.sarparastfathername);
    formData.append("formDate", state?.formDate);
    formData.append("formnumber", state?.formnumber);
    formData.append("sarparastvillage", state?.sarparastvillage);
    formData.append("sarparastpost", state?.sarparastpost);
    formData.append("sarparasttehseel", state?.sarparasttehseel);
    formData.append("sarparastdistt", state?.sarparastdistt);
    formData.append("sarparaststate", state?.sarparaststate);
    formData.append("sarparastaadharno", state?.sarparastaadharno);
    formData.append("studentname", state?.studentname);
    formData.append("studentfathername", state?.studentfathername);
    formData.append("studentdateofbirth", state?.studentdateofbirth);
    formData.append("studentvillage", state?.studentvillage);
    formData.append("studentpost", state?.studentpost);
    formData.append("studenttehseel", state?.studenttehseel);
    formData.append("studentdistt", state?.studentdistt);
    formData.append("studentstate", state?.studentstate);
    formData.append("studentaadharno", state?.studentaadharno);
    formData.append("studentname2", state?.studentname2);
    formData.append("studentfathername2", state?.studentfathername2);
    formData.append("studentdateofbirth2", state?.studentdateofbirth2);
    formData.append("studentvillage2", state?.studentvillage2);
    formData.append("studentpost2", state?.studentpost2);
    formData.append("studenttehseel2", state?.studenttehseel2);
    formData.append("studentdistt2", state?.studentdistt2);
    formData.append("studentstate2", state?.studentstate2);
    formData.append("studentaadharno2", state?.studentaadharno2);
    formData.append("shoba", state?.shoba);
    formData.append("dateshamsi", state?.dateshamsi);
    formData.append("datekamari", state?.datekamari);
    formData.append("darjarequested", state?.darjarequested);
    formData.append("darjagiven", state?.darjagiven);
    formData.append("beforethis", state?.beforethis);
    formData.append("talibilmrishta", state?.talibilmrishta);
    formData.append("sarparastmobileno", state?.sarparastmobileno);
    formData.append("sarparastwhatsappno", state?.sarparastwhatsappno);
  
    // Make API request
    axios
      .post("https://madarsabackend.onrender.com/update-product", formData, {
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // Set loading state to false on successful response
        setState(prevState => ({ ...prevState, loading2: false }));
        // Show success message
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        // Close product edit modal
        handleProductEditClose();
        // Clear form fields and reset state
        setState(prevState => ({
          ...prevState,
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
          file: null,
          file2: null,
        }));
        // Fetch updated product data
        getProduct();
      })
      .catch((err) => {
        // Set loading state to false on error
        setState(prevState => ({ ...prevState, loading2: false }));
        // Show error message
        swal({
          text: err.response?.data?.errorMessage || "An error occurred.",
          icon: "error",
          type: "error",
        }).then();
        // Close product edit modal
        handleProductEditClose();
      });
  };
  

  const handleProductOpen = () => {
    setState((prevState) => ({
      ...prevState,
      openProductModal: true,
      id: "",
      sarparastname:"",
      sarparastfathername:"",
      formDate:"",
      formnumber:"",
      sarparastvillage:"",
      sarparastpost:"",
      sarparasttehseel:"",
      sarparastdistt:"",
      sarparaststate:"",
      sarparastaadharno:"",
      studentname:"",
      studentfathername:"",
      studentdateofbirth:"",
      studentvillage:"",
      studentpost:"",
      studenttehseel:"",
      studentdistt:"",
      studentstate:"",
      studentaadharno:"",
      studentname2:"",
      studentfathername2:"",
      studentdateofbirth2:"",
      studentvillage2:"",
      studentpost2:"",
      studenttehseel2:"",
      studentdistt2:"",
      studentstate2:"",
      studentaadharno2:"",
      shoba:"",
      dateshamsi:"",
      datekamari:"",
      darjarequested:"",
      darjagiven:"",
      beforethis:"",
      talibilmrishta:"",
      sarparastmobileno:"",
      sarparastwhatsappno:"",
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
      sarparastfathername: data.sarparastfathername,
      formDate:data.formDate,
      formnumber:data.formnumber,
      sarparastvillage:data.sarparastvillage,
      sarparastpost:data.sarparastpost,
      sarparasttehseel:data.sarparasttehseel,
      sarparastdistt:data.sarparastdistt,
      sarparaststate:data.sarparaststate,
      sarparastaadharno:data.sarparastaadharno,
      studentname:data.studentname,
      studentfathername:data.studentfathername,
      studentdateofbirth:data.studentdateofbirth,
      studentvillage:data.studentvillage,
      studentpost:data.studentpost,
      studenttehseel:data.studenttehseel,
      studentdistt:data.studentdistt,
      studentstate:data.studentstate,
      studentaadharno:data.studentaadharno,
      studentname2:data.studentname2,
      studentfathername2:data.studentfathername2,
      studentdateofbirth2:data.studentdateofbirth2,
      studentvillage2:data.studentvillage2,
      studentpost2:data.studentpost2,
      studenttehseel2:data.studenttehseel2,
      studentdistt2:data.studentdistt2,
      studentstate2:data.studentstate2,
      studentaadharno2:data.studentaadharno2,
      shoba:data.shoba,
      dateshamsi:data.dateshamsi,
      datekamari:data.datekamari,
      darjarequested:data.darjarequested,
      darjagiven:data.darjagiven,
      beforethis:data.beforethis,
      talibilmrishta:data.talibilmrishta,
      sarparastmobileno:data.sarparastmobileno,
      sarparastwhatsappno:data.sarparastwhatsappno,

      // Set other form fields based on data
    }));
  };

  const handleProductEditClose = () => {
    setState((prevState) => ({ ...prevState, openProductEditModal: false }));
  };

  // Similar modifications for other methods like updateProduct, handleProductOpen, handleProductClose, handleProductEditOpen, handleProductEditClose

  return (
    <div>
      {state?.loading && <LinearProgress size={40} />}
      <div className="no-printme">
        <h2>Dashboard</h2>
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          onClick={handleProductOpen}
        >
          Add Student
        </Button>
      </div>

      {/* Edit Product */}
      <Dialog
        open={state?.openProductEditModal}
        onClose={handleProductClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
        {console.log(state)}
        <DialogContent>
          <br />
          <input
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="sarparastname"
            value={state?.sarparastname}
            onChange={onChange}
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
            value={state?.sarparastfathername}
            onChange={onChange}
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
            value={state?.formDate}
            onChange={onChange}
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
            value={state?.formnumber}
            onChange={onChange}
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
            value={state?.sarparastvillage}
            onChange={onChange}
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
            value={state?.sarparastpost}
            onChange={onChange}
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
            value={state?.sarparasttehseel}
            onChange={onChange}
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
            value={state?.sarparastdistt}
            onChange={onChange}
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
            value={state?.sarparaststate}
            onChange={onChange}
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
            value={state?.sarparastaadharno}
            onChange={onChange}
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
            value={state?.studentname}
            onChange={onChange}
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
            value={state?.studentfathername}
            onChange={onChange}
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
            value={state?.studentdateofbirth}
            label="Student Date of Birth"
            onChange={onChange}
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
            value={state?.studentvillage}
            onChange={onChange}
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
            value={state?.studentpost}
            onChange={onChange}
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
            value={state?.studenttehseel}
            onChange={onChange}
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
            value={state?.studentdistt}
            onChange={onChange}
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
            value={state?.studentstate}
            onChange={onChange}
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
            value={state?.studentaadharno}
            onChange={onChange}
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
            value={state?.studentname2}
            onChange={onChange}
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
            value={state?.studentfathername2}
            onChange={onChange}
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
            value={state?.studentdateofbirth2}
            label="Student Date of Birth"
            onChange={onChange}
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
            value={state?.studentvillage2}
            onChange={onChange}
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
            value={state?.studentpost2}
            onChange={onChange}
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
            value={state?.studenttehseel2}
            onChange={onChange}
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
            value={state?.studentdistt2}
            onChange={onChange}
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
            value={state?.studentstate2}
            onChange={onChange}
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
            value={state?.studentaadharno2}
            onChange={onChange}
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
            value={state?.shoba}
            onChange={onChange}
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
            value={state?.dateshamsi}
            onChange={onChange}
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
            value={state?.datekamari}
            onChange={onChange}
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
            value={state?.darjarequested}
            onChange={onChange}
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
            value={state?.darjagiven}
            onChange={onChange}
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
            value={state?.beforethis}
            onChange={onChange}
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
            value={state?.talibilmrishta}
            onChange={onChange}
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
            value={state?.sarparastmobileno}
            onChange={onChange}
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
            value={state?.sarparastwhatsappno}
            onChange={onChange}
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
              // value={state?.fileName}
              onChange={(e) => onChange(e)}
              // onChange={(e) => {
              //   setState({
              //     fileName: e.target.files[0].name,
              //     file: e.target.files[0],
              //   });
              //   console.log(state?.file);
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
              // value={state?.fileName2}
              onChange={(e) => onChange(e)}
              style={{ visibility: "hidden" }}
              // onChange={(e) => {
              //   console.log(e.target.files[0])
              //   setState({
              //     fileName2: e.target.files[0].name,
              //     file2: e.target.files[0],
              //   });
              //   console.log(state?.file2);
              // }}
              id="fileInput2"
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleProductEditClose} color="primary">
            Cancel
          </Button>
          {state?.loading2 === false ? (
            <Button
              disabled={
                state?.sarparastname === "" ||
                state?.sarparastfathername === "" ||
                state?.sarparastvillage === "" ||
                state?.sarparastpost === "" ||
                state?.sarparasttehseel === "" ||
                state?.sarparastdistt === "" ||
                state?.sarparaststate === "" ||
                state?.sarparastaadharno === "" ||
                state?.studentname === "" ||
                state?.studentfathername === "" ||
                state?.studentdateofbirth === "" ||
                state?.studentvillage === "" ||
                state?.studentpost === "" ||
                state?.studenttehseel === "" ||
                state?.studentdistt === "" ||
                state?.studentstate === "" ||
                state?.formDate === "" ||
                state?.formnumber === "" ||
                state?.studentname2 == "" ||
                state?.studentfathername2 == "" ||
                state?.studentdateofbirth2 == "" ||
                state?.studentvillage2 == "" ||
                state?.studentpost2 == "" ||
                state?.studenttehseel2 == "" ||
                state?.studentdistt2 == "" ||
                state?.studentstate2 == "" ||
                state?.studentaadharno2 == "" ||
                state?.studentaadharno === "" ||
                state?.shoba === "" ||
                state?.dateshamsi === "" ||
                state?.datekamari === "" ||
                state?.darjarequested === "" ||
                state?.darjagiven === "" ||
                state?.beforethis === "" ||
                state?.talibilmrishta === "" ||
                state?.sarparastmobileno === "" ||
                state?.sarparastwhatsappno === "" ||
                state?.fileName === "" ||
                state?.fileName2 === ""
              }
              onClick={(e) => updateProduct()}
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
        open={state?.openProductModal}
        onClose={handleProductClose}
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
            value={state?.sarparastname}
            onChange={onChange}
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
            value={state?.sarparastfathername}
            onChange={onChange}
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
            value={state?.formDate}
            onChange={onChange}
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
            value={state?.formnumber}
            onChange={onChange}
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
            value={state?.sarparastvillage}
            onChange={onChange}
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
            value={state?.sarparastpost}
            onChange={onChange}
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
            value={state?.sarparasttehseel}
            onChange={onChange}
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
            value={state?.sarparastdistt}
            onChange={onChange}
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
            value={state?.sarparaststate}
            onChange={onChange}
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
            value={state?.sarparastaadharno}
            onChange={onChange}
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
            value={state?.studentname}
            onChange={onChange}
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
            value={state?.studentfathername}
            onChange={onChange}
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
            value={state?.studentdateofbirth}
            label="Student Date of Birth"
            onChange={onChange}
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
            value={state?.studentvillage}
            onChange={onChange}
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
            value={state?.studentpost}
            onChange={onChange}
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
            value={state?.studenttehseel}
            onChange={onChange}
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
            value={state?.studentdistt}
            onChange={onChange}
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
            value={state?.studentstate}
            onChange={onChange}
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
            value={state?.studentaadharno}
            onChange={onChange}
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
            value={state?.studentname2}
            onChange={onChange}
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
            value={state?.studentfathername2}
            onChange={onChange}
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
            value={state?.studentdateofbirth2}
            label="Student Date of Birth"
            onChange={onChange}
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
            value={state?.studentvillage2}
            onChange={onChange}
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
            value={state?.studentpost2}
            onChange={onChange}
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
            value={state?.studenttehseel2}
            onChange={onChange}
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
            value={state?.studentdistt2}
            onChange={onChange}
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
            value={state?.studentstate2}
            onChange={onChange}
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
            value={state?.studentaadharno2}
            onChange={onChange}
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
            value={state?.shoba}
            onChange={onChange}
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
            value={state?.dateshamsi}
            onChange={onChange}
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
            value={state?.datekamari}
            onChange={onChange}
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
            value={state?.darjarequested}
            onChange={onChange}
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
            value={state?.darjagiven}
            onChange={onChange}
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
            value={state?.beforethis}
            onChange={onChange}
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
            value={state?.talibilmrishta}
            onChange={onChange}
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
            value={state?.sarparastmobileno}
            onChange={onChange}
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
            value={state?.sarparastwhatsappno}
            onChange={onChange}
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
              onChange={(e) => onChange(e)}
              // onChange={(e) => {
              //   setState({
              //     fileName: e.target.files[0].name,
              //     file: e.target.files[0],
              //   });
              //   console.log(state?.file);
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
              onChange={(e) => onChange(e)}
              style={{ visibility: "hidden" }}
              // onChange={(e) => {
              //   console.log(e.target.files[0])
              //   setState({
              //     fileName2: e.target.files[0].name,
              //     file2: e.target.files[0],
              //   });
              //   console.log(state?.file2);
              // }}
              id="fileInput2"
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleProductClose} color="primary">
            Cancel
          </Button>
          {state?.loading2 === false ? (
            <Button
              disabled={
                state?.sarparastname == "" ||
                state?.sarparastfathername == "" ||
                state?.sarparastvillage == "" ||
                state?.formDate === "" ||
                state?.formnumber === "" ||
                state?.sarparastpost == "" ||
                state?.sarparasttehseel == "" ||
                state?.sarparastdistt == "" ||
                state?.sarparaststate == "" ||
                state?.sarparastaadharno == "" ||
                state?.studentname == "" ||
                state?.studentfathername == "" ||
                state?.studentdateofbirth == "" ||
                state?.studentvillage == "" ||
                state?.studentpost == "" ||
                state?.studenttehseel == "" ||
                state?.studentdistt == "" ||
                state?.studentstate == "" ||
                state?.studentaadharno == "" ||
                state?.studentname2 == "" ||
                state?.studentfathername2 == "" ||
                state?.studentdateofbirth2 == "" ||
                state?.studentvillage2 == "" ||
                state?.studentpost2 == "" ||
                state?.studenttehseel2 == "" ||
                state?.studentdistt2 == "" ||
                state?.studentstate2 == "" ||
                state?.studentaadharno2 == "" ||
                state?.studentaadharno == "" ||
                state?.dateshamsi === "" ||
                state?.datekamari === "" ||
                state?.darjarequested === "" ||
                state?.darjagiven === "" ||
                state?.beforethis === "" ||
                state?.talibilmrishta === "" ||
                state?.sarparastmobileno === "" ||
                state?.sarparastwhatsappno === "" ||
                state?.fileName === "" ||
                state?.fileName2 === ""
              }
              onClick={(e) => addProduct()}
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
          value={state?.search}
          onChange={onChange}
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
            {state?.products?.map((row) => (
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
                    onClick={(e) => handleProductEditOpen(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="button_style no-printme"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={(e) => deleteProduct(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
        <br />

        <Pagination count={state?.pages} page={state?.page} onChange={pageChange} variant="outlined" color="primary" />
      </TableContainer>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 25, fontSize: 14 }}>Created By SmileWeb(+91 9868277865)</div>

    </div>
  );
}

export default withRouter(Dashboard);
