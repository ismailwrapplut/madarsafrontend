import React, { Component, createRef } from "react";
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
import Webcam from "react-webcam";

import { Pagination } from "@material-ui/lab";
import { Audio } from "react-loader-spinner";
import Loader from "react-js-loader";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';


import swal from "sweetalert";
import { withRouter } from "./utils";
import axios from "axios";
import "./Dashboard.css";
import logo from "./logo.png";
import one from "./1.jpeg"
import two from "./2.jpeg"
import three from "./3.jpeg"
import four from "./4.jpeg"
import five from "./5.jpeg"
import six from "./6.jpeg"



import { Link } from "react-router-dom";

class Dashboard extends Component {
  
  constructor() {
    super();
    this.state = {
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
    };
    this.webcamRef=createRef();
    this.webcamRef2=createRef();

    this.capture = this.capture.bind(this);
    this.capture2 = this.capture2.bind(this);

  }

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    console.log(this.props)
    if (!token) {
      this.props.navigate("/");
      
    } else {
      this.setState({ token: token ,products:[]}, () => {
        this.getProduct();
      });
    }
  };
  capture() {
    if (this.webcamRef?.current) {
      const imageSrc = this.webcamRef?.current?.getScreenshot();
      this.setState({ file: imageSrc });
      console.log(imageSrc);
    }
  }
  capture2() {
    if (this.webcamRef2?.current) {
      const imageSrc = this.webcamRef2?.current?.getScreenshot();
      this.setState({ file2: imageSrc });
      console.log(imageSrc);
    }
  }
  getProduct = () => {
    this.setState({ loading: true });

    let data = "?";
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios
      .get(`https://madarsabackend.onrender.com/get-product${data}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        console.log(res.data.products)
        this.setState({
          loading: false,
          products: res.data.products,
          pages: res.data.pages,
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        if(err.response.data.errorMessage==="Login Expired! Please click OK to Login Again"){
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.props.navigate("/")


        }
       else if(err.response.data.errorMessage==="User unauthorized!"){
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.props.navigate("/")

        }
        this.setState({ loading: false, products: [], pages: 0 }, () => {});
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

  pageChange = async (event, page) => {
    console.log(page)
    await this.setState({ page: page,products:[] });
    this.getProduct();
  };

  // logOut = () => {
  //   localStorage.setItem("token", null);
  //   // this.props.history.push('/');
  //   this.props.navigate("/");
  // };
   villageOptions = [
    { value: 'Sarai', label: 'Sarai' },
    { value: 'Ladamka', label: 'Ladamka' },
    { value: 'Sikiri', label: 'Sikiri' },
    { value: 'Noabad', label: 'Noabad' },
    { value: 'Pali', label: 'Pali' },
    { value: 'Chhajju Khera', label: 'Chhajju Khera' },
    { value: 'Pipal Kheraa', label: 'Pipal Kheraa' },
    { value: 'Piproli', label: 'Piproli' },
    { value: 'Jhantli', label: 'Jhantli' },
    { value: 'Nakatpur', label: 'Nakatpur' },
    { value: 'Gopalgarh', label: 'Gopalgarh' },
    { value: 'Khunta Bas', label: 'Khunta Bas' },
    { value: 'Jarla', label: 'Jarla' },
    { value: 'Biwan', label: 'Biwan' },
    { value: 'Mahon', label: 'Mahon' },
    { value: 'Nagla Ahsanpur', label: 'Nagla Ahsanpur' },
    { value: 'Singar', label: 'Singar' },
    { value: 'Kameda', label: 'Kameda' },
    { value: 'Bakhshuka', label: 'Bakhshuka' },
    { value: 'Dolabas', label: 'Dolabas' },
    { value: 'Rupraka', label: 'Rupraka' },
    { value: 'Ghasera', label: 'Ghasera' },
    { value: 'Malai', label: 'Malai' },
    { value: 'Chhapra', label: 'Chhapra' },
    { value: 'Rewasan', label: 'Rewasan' },
    { value: 'Guraksar', label: 'Guraksar' },
    { value: 'Bisru', label: 'Bisru' },
    { value: 'Kot', label: 'Kot' },
    { value: 'Utawar', label: 'Utawar' },
    { value: 'Jhanda', label: 'Jhanda' },
  ];
  
  tehseelOptions = [
    { value: 'Pahari', label: 'Pahari' },
    { value: 'Kama', label: 'Kama' },
    { value: 'Sikiri', label: 'Sikiri' },
    { value: 'Nagar', label: 'Nagar' },
    { value: 'Lachmangarh', label: 'Lachmangarh' },
    { value: 'Ramgarh', label: 'Ramgarh' },
    { value: 'Nogaon', label: 'Nogaon' },
    { value: 'Alwar', label: 'Alwar' },
    { value: 'Kishangarh', label: 'Kishangarh' },
    { value: 'Tijara', label: 'Tijara' },
    { value: 'Tapukra', label: 'Tapukra' },
    { value: 'Firozpurjhirka', label: 'Firozpurjhirka' },
    { value: 'Punhana', label: 'Punhana' },
    { value: 'Nagina', label: 'Nagina' },
    { value: 'Hodal', label: 'Hodal' },
    { value: 'Hathin', label: 'Hathin' },
    { value: 'Nuh', label: 'Nuh' },
    { value: 'Tauru', label: 'Tauru' },
    { value: 'Sohna', label: 'Sohna' },
    { value: 'Dhoj', label: 'Dhoj' },
    { value: 'Indri', label: 'Indri' },
  ];
  
  districtOptions = [
    { value: 'Deeg', label: 'Deeg' },
    { value: 'Alwar', label: 'Alwar' },
    { value: 'Khairthal', label: 'Khairthal' },
    { value: 'Nuh(Mewat)', label: 'Nuh(Mewat)' },
    { value: 'Palwal', label: 'Palwal' },
    { value: 'Bharatpur', label: 'Bharatpur' },
    { value: 'Gurugram', label: 'Gurugram' },
    { value: 'Faridabad', label: 'Faridabad' },
    { value: 'Mathura', label: 'Mathura' },
    { value: 'Duasa', label: 'Duasa' },
    { value: 'Ajmer', label: 'Ajmer' },
  ];
  onChange = (e, actionMeta) => {
    if (actionMeta && actionMeta.name) {
      // Handling react-select change
      this.setState({ [actionMeta.name]: e ? e.value : '' }, () => {
        console.log(`${actionMeta.name} updated to ${e ? e.value : ''}`);
      });
    } else {
      // Handling standard input change
      console.log(e.target);
      if (e.target?.name === "firstfile") {
        console.log(e.target.files[0]);
        this.setState(
          { file: e.target?.files[0], fileName: e.target.files[0]?.name },
          () => {
            console.log(this.state.file);
          }
        );
      }
      if (e.target?.name === "secondfile") {
        console.log(e.target.files[0]);
        this.setState(
          {
            file2: e.target?.files[0],
            fileName2: e.target?.files[0]?.name,
          },
          () => {
            console.log(this.state.file2);
          }
        );
      }
      console.log(e.target?.name);
      this.setState({ [e.target?.name]: e.target?.value }, () => {});
  
      if (e.target?.name === "search") {
        this.setState({ page: 1, products: [] }, () => {
          this.getProduct();
        });
      }
    }
  };
  base64ToBlob(base64) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }
  addProduct = () => {
    this.setState({ loading2: true });
    //  console.log(fileInput)
    const file = new FormData();
    const fileArray = [this.state.file, this.state.file2];
    const blob = this.base64ToBlob(this.state.file);
    const blob2 = this.base64ToBlob(this.state.file2);

    console.log(this.state);
    file.append("studentprofilepic", blob, "studentprofilepic.jpg");
    file.append("sarparastprofilepic", blob2,"sarparastprofilepic.jpg");
    file.append("sarparastname", this.state.sarparastname);
    file.append("sarparastfathername", this.state.sarparastfathername);
    file.append("formDate", this.state.formDate);
    file.append("formnumber", this.state.formnumber);

    file.append("sarparastvillage", this.state.sarparastvillage);
    file.append("sarparastpost", this.state.sarparastpost);
    file.append("sarparasttehseel", this.state.sarparasttehseel);
    file.append("sarparastdistt", this.state.sarparastdistt);
    file.append("sarparaststate", this.state.sarparaststate);
    file.append("sarparastaadharno", this.state.sarparastaadharno);
    file.append("studentname", this.state.studentname);
    file.append("studentfathername", this.state.studentfathername);
    file.append("studentdateofbirth", this.state.studentdateofbirth);
    file.append("studentvillage", this.state.studentvillage);
    file.append("studentpost", this.state.studentpost);
    file.append("studenttehseel", this.state.studenttehseel);
    file.append("studentdistt", this.state.studentdistt);
    file.append("studentstate", this.state.studentstate);
    file.append("studentaadharno", this.state.studentaadharno);
    file.append("studentname2", this.state.studentname2);
    file.append("studentfathername2", this.state.studentfathername2);
    file.append("studentdateofbirth2", this.state.studentdateofbirth2);
    file.append("studentvillage2", this.state.studentvillage2);
    file.append("studentpost2", this.state.studentpost2);
    file.append("studenttehseel2", this.state.studenttehseel2);
    file.append("studentdistt2", this.state.studentdistt2);
    file.append("studentstate2", this.state.studentstate2);
    file.append("studentaadharno2", this.state.studentaadharno2);
    file.append("shoba", this.state.shoba);
    file.append("dateshamsi", this.state.dateshamsi);
    file.append("datekamari", this.state.datekamari);
    file.append("darjarequested", this.state.darjarequested);
    file.append("darjagiven", this.state.darjagiven);
    file.append("beforethis", this.state.beforethis);
    file.append("talibilmrishta", this.state.talibilmrishta);
    file.append("sarparastmobileno", this.state.sarparastmobileno);
    file.append("sarparastwhatsappno", this.state.sarparastwhatsappno);

    console.log(this.state.file2);

    axios
      .post("https://madarsabackend.onrender.com/add-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        this.setState({ loading2: false });
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.handleProductClose();
        this.setState(
          {
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
          },
          this.setState({products: []}, () => {
            this.getProduct();
          })
         
        );
      })
      .catch((err) => {
        this.setState({ loading2: false });

        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.handleProductClose();
      });
  };

  updateProduct = () => {
    this.setState({ loading2: true });

    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    console.log(fileInput.files[0]);
    file.append("id", this.state.id);
    file.append("studentprofilepic", this.state.file);
    file.append("sarparastprofilepic", this.state.file2);
    file.append("sarparastname", this.state.sarparastname);
    file.append("sarparastfathername", this.state.sarparastfathername);
    file.append("formDate", this.state.formDate);
    file.append("formnumber", this.state.formnumber);

    file.append("sarparastvillage", this.state.sarparastvillage);
    file.append("sarparastpost", this.state.sarparastpost);
    file.append("sarparasttehseel", this.state.sarparasttehseel);
    file.append("sarparastdistt", this.state.sarparastdistt);
    file.append("sarparaststate", this.state.sarparaststate);
    file.append("sarparastaadharno", this.state.sarparastaadharno);
    file.append("studentname", this.state.studentname);
    file.append("studentfathername", this.state.studentfathername);
    file.append("studentdateofbirth", this.state.studentdateofbirth);
    file.append("studentvillage", this.state.studentvillage);
    file.append("studentpost", this.state.studentpost);
    file.append("studenttehseel", this.state.studenttehseel);
    file.append("studentdistt", this.state.studentdistt);
    file.append("studentstate", this.state.studentstate);
    file.append("studentaadharno", this.state.studentaadharno);
    file.append("studentname2", this.state.studentname2);
    file.append("studentfathername2", this.state.studentfathername2);
    file.append("studentdateofbirth2", this.state.studentdateofbirth2);
    file.append("studentvillage2", this.state.studentvillage2);
    file.append("studentpost2", this.state.studentpost2);
    file.append("studenttehseel2", this.state.studenttehseel2);
    file.append("studentdistt2", this.state.studentdistt2);
    file.append("studentstate2", this.state.studentstate2);
    file.append("studentaadharno2", this.state.studentaadharno2);
    file.append("shoba", this.state.shoba);
    file.append("dateshamsi", this.state.dateshamsi);
    file.append("datekamari", this.state.datekamari);
    file.append("darjarequested", this.state.darjarequested);
    file.append("darjagiven", this.state.darjagiven);
    file.append("beforethis", this.state.beforethis);
    file.append("talibilmrishta", this.state.talibilmrishta);
    file.append("sarparastmobileno", this.state.sarparastmobileno);
    file.append("sarparastwhatsappno", this.state.sarparastwhatsappno);

    axios
      .post("https://madarsabackend.onrender.com/update-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        this.setState({ loading2: false });

        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.handleProductEditClose();
        this.setState(
          {
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
          },
          this.setState({products: []},() => {
            this.getProduct();
          })
          
        );
      })
      .catch((err) => {
        this.setState({ loading2: false });

        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.handleProductEditClose();
      });
  };

  handleProductOpen = () => {
    this.setState({
      openProductModal: true,
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
      fileName: "",
      fileName2: "",
    });
  };

  handleProductClose = () => {
    this.setState({ openProductModal: false });
  };

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      fileName: data.studentprofilepic,
      fileName2: data.sarparastprofilepic,

      sarparastname: data.sarparastname,
      sarparastfathername: data.sarparastfathername,
      formDate: data.formDate,
      formnumber: data.formnumber,

      sarparastvillage: data.sarparastvillage,
      sarparastpost: data.sarparastpost,
      sarparasttehseel: data.sarparasttehseel,
      sarparastdistt: data.sarparastdistt,
      sarparaststate: data.sarparaststate,
      sarparastaadharno: data.sarparastaadharno,
      studentname: data.studentname,
      studentfathername: data.studentfathername,
      studentdateofbirth: data.studentdateofbirth,
      studentvillage: data.studentvillage,
      studentpost: data.studentpost,
      studenttehseel: data.studenttehseel,
      studentdistt: data.studentdistt,
      studentstate: data.studentstate,
      studentaadharno: data.studentaadharno,
      studentname2: data.studentname2,
      studentfathername2: data.studentfathername2,
      studentdateofbirth2: data.studentdateofbirth2,
      studentvillage2: data.studentvillage2,
      studentpost2: data.studentpost2,
      studenttehseel2: data.studenttehseel2,
      studentdistt2: data.studentdistt2,
      studentstate2: data.studentstate2,
      studentaadharno2: data.studentaadharno2,
      shoba: data.shoba,
      dateshamsi: data.dateshamsi,
      datekamari: data.datekamari,
      darjarequested:data.darjarequested,
      darjagiven: data.darjagiven,
      beforethis: data.beforethis,
      talibilmrishta: data.talibilmrishta,
      sarparastmobileno: data.sarparastmobileno,
      sarparastwhatsappno: data.sarparastwhatsappno,
    });
  };

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };

  render() {
    const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: "user"
    };
    return (
      <div>
         <div className="secondheader" style={{backgroundColor:"#C1E78B",padding:"20px"}}>
          <div className="secondheaderchild">
            <h2 style={{ color: "black", fontSize: "15px", marginBottom: 0 ,fontWeight:"bolder"}}>
              JAMIA ISLAMIA DARUL-ULOOM MOHAMMADIA
            </h2>
            <h2
              style={{
                color: "black",
                fontSize: "20px",
                marginTop: 5,
                fontWeight: 400,
              }}
            >
              Meel Kherla,Po.Ladamka,Teh.Pahari.
            </h2>
            <h3
              style={{
                color: "black",
                fontSize: "20px",
                marginTop: -10,
                fontWeight: 600,
              }}
            >
              Distt:Bharatpur.Raj.Mob.No.9982742935
            </h3>
          </div>
          <div>
            <img src={logo} alt="logo" height={80} width={110} />
          </div>
          <div className="secondheaderchild">
            <h2 style={{ color: "black", fontSize: "24px", marginBottom: 0,fontFamily:"Arabic Font" }}>
              جامعہ اسلامیہ دارالعلوم محمدیه
            </h2>
            <h2
              style={{
                color: "black",
                fontSize: "12px",
                marginTop: 0,
                fontWeight: 400,
              }}
            >
            میل کھیڑلا, پوسٹ لاڈمکا, تحصیل پہاڑی, ضلع  ڈ یگ  (بھرت پور), راجستھان
            </h2>
            <h3
              style={{
                color: "black",
                fontSize: "20px",
                marginTop: -10,
                fontWeight: 600,
              }}
            >
              9982742935 -:رابطہ نمبر
            </h3>
          </div>
        </div>
        <hr />
        <div style={{padding:"5% 10%"}}>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src={one} height="500px" alt="First slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={two} height="500px" alt="Second slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={three} height="500px" alt="Fourth slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={four} height="500px" alt="Fifth slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={five} height="500px" alt="Sixth slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={six} height="500px" alt="Seventh slide"/>
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
            
             <label for="select">Sarparast Village</label>
             <CreatableSelect
             id="standard-basic"
             value={this.villageOptions.find(option => option.value === this.state.sarparastvillage)}
             onChange={this.onChange}
             options={this.villageOptions}
             name="sarparastvillage"
             isClearable
             required
             placeholder="Select or type Saparast Village"
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

                         <label for="select">Sarparast Tehseel</label>
                         <CreatableSelect
                         id="standard-basic"
                         required
             value={this.tehseelOptions.find(option => option.value === this.state.sarparasttehseel)}

                         name="sarparasttehseel"
               
                         onChange={this.onChange}
                         options={this.tehseelOptions}
                         isClearable
                         placeholder="Select or type... Sarparast Tehseel"
                       />
          
            <br />
            <br />
          
             <label for="select">Sarparast District</label>
             <CreatableSelect
             id="standard-basic"
             name="sarparastdistt"
             value={this.districtOptions.find(option => option.value === this.state.sarparastdistt)}

             onChange={this.onChange}
             options={this.districtOptions}
             isClearable
             required
             placeholder="Select or type... Sarparast Distt"
           />
       
            <br />
            <br />
           <label for="standard-basic">Sarparast State</label>
            <select  id="standard-basic"
              type="text"
              autoComplete="off"
              name="sarparaststate"
              value={this.state.sarparaststate}
              onChange={this.onChange}
              placeholder="Sarparast State"
              required>
<option value="Pahari">Choose</option>

	<option value="Andhra Pradesh">Andhra Pradesh</option>
	<option value="Arunachal Pradesh">Arunachal Pradesh</option>
	<option value="Assam">Assam</option>
	<option value="Bihar">Bihar</option>
	<option value="Chhattisgarh">Chhattisgarh</option>
	<option value="Gujarat">Gujarat</option>
	<option value="Haryana">Haryana</option>
	<option value="Himachal Pradesh">Himachal Pradesh</option>
	<option value="Jammu & Kashmir">Jammu and Kashmir</option>
	<option value="Goa">Goa</option>
	<option value="Jharkhand">Jharkhand</option>
	<option value="Karnataka">Karnataka</option>
	<option value="Kerala">Kerala</option>
	<option value="Madhya Pradesh">Madhya Pradesh</option>
	<option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
	<option value="Mizoram">Mizoram</option>
	<option value="Nagaland">Nagaland</option>
	<option value="Odisha">Odisha</option>
	<option value="Punjab">Punjab</option>
	<option value="Rajasthan">Rajasthan</option>
	<option value="Sikkim">Sikkim</option>
	<option value="Tamil Nadu">Tamil Nadu</option>
	<option value="Telangana">Telangana</option>
	<option value="Tripura">Tripura</option>
	<option value="Uttarakhand">Uttarakhand</option>
	<option value="Uttar Pradesh">Uttar Pradesh</option>
	<option value="West Bengal">West Bengal</option>
	<option value="Andaman & Nicobar Islands">Andaman and Nicobar Islands</option>
	<option value="Chandigarh">Chandigarh</option>
	<option value="Haveli">Dadra and Nagar Haveli</option>
	<option value="Daman & Diu">Daman and Diu</option>
	<option value="Delhi">Delhi</option>
	<option value="Lakshadweep">Lakshadweep</option>
	<option value="Puducherry">Puducherry</option>
</select>
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
            
                <label for="select">Student Village</label>
                <CreatableSelect
                id="standard-basic"
                value={this.villageOptions.find(option => option.value === this.state.studentvillage)}
                onChange={this.onChange}
                options={this.villageOptions}
                name="studentvillage"
                isClearable
                required
                placeholder="Select or type Student Village"
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
           
                <label for="select">Student Tehseel</label>
                <CreatableSelect
                id="standard-basic"
                required
    value={this.tehseelOptions.find(option => option.value === this.state.studenttehseel)}

                name="studenttehseel"
      
                onChange={this.onChange}
                options={this.tehseelOptions}
                isClearable
                placeholder="Select or type... student Tehseel"
              />
         

            <br />
            <br />

              <label for="select">Student District</label>
              <CreatableSelect
              id="standard-basic"
              name="studentdistt"
              value={this.districtOptions.find(option => option.value === this.state.studentdistt)}
 
              onChange={this.onChange}
              options={this.districtOptions}
              isClearable
              required
              placeholder="Select or type... student Distt"
            />
         
            <br />
            <br />
        
             <label for="select">Student State</label>
            <select  id="standard-basic"
              type="text"
              autoComplete="off"
              name="studentstate"
              value={this.state.studentstate}
              onChange={this.onChange}
              placeholder="Student State"
              required>
                <option value="Pahari">Choose</option>

                <option value="Andhra Pradesh">Andhra Pradesh</option>
	<option value="Arunachal Pradesh">Arunachal Pradesh</option>
	<option value="Assam">Assam</option>
	<option value="Bihar">Bihar</option>
	<option value="Chhattisgarh">Chhattisgarh</option>
	<option value="Gujarat">Gujarat</option>
	<option value="Haryana">Haryana</option>
	<option value="Himachal Pradesh">Himachal Pradesh</option>
	<option value="Jammu & Kashmir">Jammu and Kashmir</option>
	<option value="Goa">Goa</option>
	<option value="Jharkhand">Jharkhand</option>
	<option value="Karnataka">Karnataka</option>
	<option value="Kerala">Kerala</option>
	<option value="Madhya Pradesh">Madhya Pradesh</option>
	<option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
	<option value="Mizoram">Mizoram</option>
	<option value="Nagaland">Nagaland</option>
	<option value="Odisha">Odisha</option>
	<option value="Punjab">Punjab</option>
	<option value="Rajasthan">Rajasthan</option>
	<option value="Sikkim">Sikkim</option>
	<option value="Tamil Nadu">Tamil Nadu</option>
	<option value="Telangana">Telangana</option>
	<option value="Tripura">Tripura</option>
	<option value="Uttarakhand">Uttarakhand</option>
	<option value="Uttar Pradesh">Uttar Pradesh</option>
	<option value="West Bengal">West Bengal</option>
	<option value="Andaman & Nicobar Islands">Andaman and Nicobar Islands</option>
	<option value="Chandigarh">Chandigarh</option>
	<option value="Haveli">Dadra and Nagar Haveli</option>
	<option value="Daman & Diu">Daman and Diu</option>
	<option value="Delhi">Delhi</option>
	<option value="Lakshadweep">Lakshadweep</option>
	<option value="Puducherry">Puducherry</option>
</select>
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
            {this.state.file ? (
        <img src={this.state.file} alt="webcam" />
      ) : (
        <Webcam 
        audio={false} 
        height={300} 
        width={300} 
        ref={this.webcamRef} 
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      )}
      <div className="btn-container">
        <button onClick={this.capture}>Capture Student photo</button>
      </div>
            </div>
            <div>
            {this.state.file2 ? (
        <img src={this.state.file2} alt="webcam" />
      ) : (
        <Webcam 
        audio={false} 
        height={300} 
        width={300} 
        ref={this.webcamRef2} 
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      )}
      <div className="btn-container">
        <button onClick={this.capture2}>Capture Sarparast photo</button>
      </div>
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
                  this.state.file === "" ||
                  this.state.file2 === ""
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
      {/* <div style={{position:"absolute",bottom:0,left:0,width:"100%",height:25,fontSize:14}}>Created By SmileWeb(+91 9868277865)</div> */}

      </div>
    );
  }
}

export default withRouter(Dashboard);