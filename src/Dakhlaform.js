import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Dakhlaform.css";
import logo from "./logo.png";
import {useReactToPrint} from "react-to-print"
import { useRef } from "react";
import header from "./header.png"
import fotter from "./fotter.png"
import { toPng } from 'html-to-image';

// import signMain from "./signMain.png"


const Dakhlaform = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState();
  const [loader, setLoader] = useState(false);
  const componentPDF=useRef()
  const componentPNG=useRef()
  const downloadPNG=()=>{
    toPng(componentPNG.current, { cacheBust: false })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const id = searchParams.get("id").toString();
  const getProduct = async () => {
    const { data } = await axios.get("https://madarsabackend.onrender.com/product/" + id, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const product = await data.product;
    setProduct(product);
  };
  const downloadPDF =useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"Application Form",
    onAfterPrint:()=>alert("Data saved in PDF")
  })
  console.log(product)
  useEffect(() => {
    //Runs only on the first render
    getProduct();
    
  }, []);
  const date=product?.formDate?.split(".")[2]
  const dateInt=parseInt(date)
  const dateFinal=`${date}-${dateInt+1}`
  return (
    <div className="main">
    <div className="receipt-actions-div">
    <div className="actions-right">
      <button
        className="receipt-modal-download-button button noprint"
        onClick={downloadPDF}
  
      >
      Print Form
      </button> 
    </div>
  </div>
      <div id="mainform" className="mainform" style={{padding:"5 10"}} ref={componentPDF}>
        <h1 className="mainh1 mainhai" style={{margin:0}}>داخلہ فارم</h1>
        <div className="firstpt">
          <hr className="hr-first" />
          <hr className="star" />
          <hr className="hr-last" />
        </div>
        <div className="secondheader">
          <div className="secondheaderchild">
            <h2 style={{ color: "black", fontSize: "20px", marginBottom: 0 ,fontWeight:"bolder"}}>
              JAMIA ISLAMIA DARUL-ULOOM MOHAMMADIA
            </h2>
            <h2
              style={{
                color: "black",
                fontSize: "18px",
                marginTop: 5,
                fontWeight: 400,
              }}
            >
              Meel Kherla,Po.Ladamka,Teh.Pahari.
            </h2>
            <h3
              style={{
                color: "black",
                fontSize: "18px",
                marginTop: 10,
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
                fontSize: "16px",
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
                marginTop: 10,
                fontWeight: 600,
              }}
            >
              9982742935 -:رابطہ نمبر
            </h3>
          </div>
        </div>
        <hr className="star" style={{marginTop:10}} />
        <div className="secondheader">
          <div>
            <img
              src={product?.studentprofilepic}
              width="100"
              height="120"
              alt="talib ilm"
            />
          </div>
          <div>
            <h2
              className="mainh1"
              style={{
                color: "black",
                backgroundColor: "white",
                fontSize: "22px",
              }}
            >
            مطلوبہ  تفصیلات
            </h2>
          </div>
          <div>
            <h2
              className="mainh1"
              style={{
                color: "black",
                backgroundColor: "white",
                fontSize: "16px",
              }}
            >
              Form No: {product?.formnumber} فارم نمبر
            </h2>
            <h2 style={{ marginTop: 0, fontSize: 18, color: "black" }}>
           
{product?.formDate}  تاریخ داخلہ
            </h2>
            <h2 style={{ marginTop: 0, fontSize: 18, color: "black" }}>
            درخواست داخلہ نمبر
            </h2>
          </div>
        </div>
        <div className="detailtable">
          <table style={{ width: "100%", marginTop: 8 }}>
            <tr>
              <th>مکمل پتہ سرپرست انگریزی/ہندی میں </th>
              <th style={{textAlign:"right",marginRight:10,}}>مکمل پتہ طالب علم</th>
              <th style={{borderLeft:"none",borderBottom:"none",borderRight:"1px solid black"}}></th>

            </tr>
            <tr>
              <td>Sarparast Name: {product?.sarparastname}</td>
              <td>Student Name : {product?.studentname}</td>
              <td style={{textAlign:"right"}}> نام طالب علم  : {product?.studentname2}</td>

            </tr>
            <tr>
              <td>Father Name: {product?.sarparastfathername}</td>
              <td>Father Name : {product?.studentfathername}</td>
              <td style={{textAlign:"right"}}>  والد کا نام : {product?.studentfathername2}</td>

            </tr>
            <tr>
              <td>Village: {product?.sarparastvillage}</td>
              <td>Date Of Birth: {product?.studentdateofbirth}</td>
              <td style={{textAlign:"right"}}> تاریخ پیدائش : {product?.studentdateofbirth2}</td>

            </tr>
            <tr>
              <td>Post: {product?.sarparastpost}</td>
              <td>Village : {product?.studentvillage}</td>
              <td style={{textAlign:"right"}}>  سکونت : {product?.studentvillage2}</td>

            </tr>
            <tr>
              <td>Tehseel: {product?.sarparasttehseel}</td>
              <td>Post : {product?.studentpost}</td>
              <td style={{textAlign:"right"}}> پوسٹ : {product?.studentpost2}</td>

            </tr>

            <tr>
              <td>Distt: {product?.sarparastdistt}</td>
              <td>Tehseel : {product?.studenttehseel}</td>
              <td style={{textAlign:"right"}}>  تحصیل : {product?.studenttehseel2}</td>

            </tr>
            <tr>
              <td>State: {product?.sarparaststate}</td>
              <td>Distt : {product?.studentdistt}</td>
              <td style={{textAlign:"right"}}> ضلع : {product?.studentdistt2}</td>

            </tr>
            <tr>
              <td>Aadhar No.: {product?.sarparastaadharno}</td>
              <td>State : {product?.studentstate}</td>
              <td style={{textAlign:"right"}}> صوبہ :{product?.studentstate2}</td>

            </tr>
            <tr>
              <td></td>
              <td>Aadhar No : {product?.studentaadharno}</td>
              <td style={{textAlign:"right"}}> آدھار کارڈ نمبر : {product?.studentaadharno2}</td>

            </tr>
          </table>
        </div>
        <h3 style={{direction:"rtl",fontSize:20,textAlign:"right"}}>
              
        (۱) ادارہ کے جملہ قوانین وضوابط کی پابندی اور ارباب جامعہ کی تمام وقتی تحریری و زبانی ہدایات کے مطابق عمل کرنا ضروری ہوگا (۲) اساتذہ، ذمہ داران جامعہ نیز علم و علماء کا ادب واحترام اور 
      
           جامعہ کی جملہ املاک کی حفاظت آپ کے لئے
           ضروری
 ہوگی (۳) ارباب جامعہ ہر طالب علم کی حفاظت کی پوری کوشش کرتے         

<span style={{color:"blue"}}>
ہیں
 لیکن پھر بھی کسی انہونی حادثہ کا ذمہ دار جامعہ نہیں ہوگا، باہر اگر کوئی حادثہ ہوتا ہے تو جامعہ پر اس کی کوئی ذمہ داری نہیں ہوگی (۴) اگر کوئی طالب علم بغیر اطلاع کے مدرسہ سے چلا گیا تو اس کو تلاش کرنے یا کوئی قانونی کارروائی کرنے کی ذمہ داری جامعہ

پر نہ ہوگی 

</span>(۵)
 غیر اخلاقی و غیر شرعی حرکتوں پر جامعہ کو باز پرس کرنے کا پورا پورا حق ہوگا ، اس پر کسی کو قانونی چارہ جوئی کا حق نہ ہوگا۔
        </h3> 
        <h3 style={{direction:"rtl",fontSize:20,textAlign:"right"}}>
        میں  {product?.studentname} بن  {product?.studentfathername} 

          جامعہ کے شعبہ      {product?.shoba}                     داخلہ کا خواہش مند ہوں ، میں نے
              جامعہ کے قواعد وضوابط کا بغور مطالعہ کیا ہے، میں اپنی رضا ، ہوش و
             حواس کے ساتھ 
             <span style={{ marginTop: 10, direction:"rtl" ,fontSize:21}}>
             عہد کرتا ہوں کہ جامعہ کے قوانین کی پابندی کروں گا ، جامعہ
            کے اساتذہ و دیگر عملہ کوکسی قسم کی شکایت کا موقع نہ دونگا ، خلاف ورزی
            کی صورت میں ذمہ داران جامعہ جو بھی سزا میرے لئے تجویز کرینگے وہ
            مجھے منظور ہوگی
            <span style={{ color: "blue" ,fontSize:21}}>
          
              , اور مجھے اور نہ میرے سر پرست کو جامعہ کے خلاف کسی قسم کی قانونی
                 چارہ جوئی کا کوئی حق نہ ہوگا۔
            </span>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;,<br></br> دستخط طالب علم :........................................ 
            تاریخ شمسی : {product?.dateshamsi}
         
  
           <span style={{direction:"rtl",fontSize:21}}> تاریخ قمری :{product?.datekamari}</span>
           
            </span>
             </h3>
     
              <table style={{width:"100%"}}> 
              <tr>
              <td style={{textAlign:"right",fontSize:21,direction:"rtl"}}> اس سے قبل کہاں تعلیم حاصل کی ہے :{product?.beforethis}</td>
              <td style={{textAlign:"right",fontSize:21,direction:"rtl"}}>{"                       "} کس درجہ میں داخلہ مطلوب ہے:۔ :{product?.darjarequested}</td>
              </tr>
            </table>
            <table style={{width:"100%",border:"2px solid black",height:40}}> 
            <tr>
            <td style={{textAlign:"right",border:"none",fontSize:21}}>دستخط ناظم تعلیمات :۔</td>
            <td style={{textAlign:"right",border:"none",fontSize:21,direction:"rtl"}}> 
            اس طالب علم کو درجہ  {" "+product?.darjagiven+" "}
             میں داخلہ دیا جائے 
             
             </td>
           
            </tr>
          </table>
          <div className="box" style={{marginTop:5,padding:"0px 10px"}}>
          <div className="thirdheader">
          <div style={{display:"inline-block", width:"85%"}}>
          <h2
              className="mainh1"
              style={{
                color: "red",
                backgroundColor: "black",
                fontSize: "24px",
              }}
            >
             हलफ नामा सरपरस्त
                </h2>
          </div>
          <div style={{display:"inline-block" ,width:"15%"}}>
          <img
          src={product?.sarparastprofilepic}
          width="120"
          height="140"
          alt="talib ilm"
        />
      
          </div>

          </div>
          <div style={{fontSize:20,display:"flex",flexDirection:"column"}}>
  <h3 style={{ display: 'inline-block', direction: 'ltr', fontSize:20,textAlign:"left" }}>
  में:{product?.sarparastname} पुत्र:{product?.sarparastfathername} निवासी  : {product?.sarparastvillage} तालिब इल्म से रिश्ता :{product?.talibilmrishta} पोस्ट :{product?.sarparastpost} तहसील :{product?.sarparasttehseel} ज़िला :{product?.sarparastdistt} सूबा :{product?.sarparaststate} <br/>आधार कार्ड नं:  :{product?.sarparastaadharno+" "}मोबाइल नं :{product?.sarparastmobileno+" "}
  </h3>
        
        
  <h4 style={{ direction: "ltr", marginTop: 7.5 ,fontSize:20,textAlign:"left"}}> 
 
(१) बच्चे की तरफ से होने वाली शिकायत पर सीधे जामिया के ज़िम्मेदारों से संपर्क करूँगा, अगर किसी सरपरस्त को अहले जामिया से कोई विशेष शिकायत हो तो उस को अवाम में फैलाने के बजाय खैर खाहाना और अदब के साथ ज़िम्मेदारे जामिया के सामने रखना लाज़िम होगा।  
(२) दौरान-ए-तालीम बच्चे के जामिया से गायब हो जाने या किसी हादसे में फौत हो जाने पर या खुदाना खस्ता तालिब इल्म की मौत होने की सूरत में ज़िम्मेदाराने जामिया के खिलाफ कोई कानूनी कारवाई नहीं करूँगा , यह मदरसा के साथ मेरा अहद और पैमान है , और में नीचे दस्तखत कर के अपने आप को तमाम ज़िक्र करदा शराइत व अहद नामा का पाबन्द बनाता हूँ।  
</h4>
<table style={{width:"100%",marginTop:"65px"}}>
<tr>
<td style={{textAlign:"left",border:"none",fontSize:20}}>दस्तखत पिता / सरपरस्त: </td>

<td style={{textAlign:"center",border:"none",fontSize:20}}>निशान अंगूठा पिता / सरपरस्त: </td>

</tr>
</table>


</div>
        
          </div>
         
      </div>
      <div className="receipt-actions-div" style={{marginTop:"50px"}}>
      <div className="actions-right">
        <button
          className="receipt-modal-download-button button noprint"
          onClick={downloadPNG}
    
        >
        Download ID Card
        </button> 
      </div>
    </div>
      <div className="card" ref={componentPNG}>
      <div className="header">
      <div className="img" style={{width:"100%"}}>
      <img src={header} width={"100%"} height={45}/>
      </div>
      <div className="others" style={{width:"20%"}}></div>
      </div>
      <div style={{display:"flex"}}>
      <div className="photosign" style={{width:"20%",display:"inline-block",marginBottom:"-14px"}}>
      <img
      src={product?.studentprofilepic}
      width="85px"
      height="95px"
      alt="talib ilm"
      style={{border:"1.5px solid black"}}
    />
    <p style={{color:"blue",fontSize:10,padding:0,margin:0,fontWeight:"bold",marginTop:"8px"}}>PRINCIPAL</p>
    <img src={"/sign.png"} width={50} style={{margin:0,padding:0,marginTop:"-16px",paddingBottom:"12px"}}/>
      </div>
    <div className="maindetails" style={{width:"80%",display:"inline-block",margin:0,marginLeft:25}}>

    <table style={{borderSpacing:"0",borderCollapse:"collapse"}}>
    <tr style={{border:"none",fontSize:"17px",margin:"0px",padding:"0px"}}>
    <td style={{fontSize:11,fontWeight:"900",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>Student ID</td>
    <td style={{fontSize:11,color:"blue",fontWeight:"bold",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>:{product?.formnumber}</td>
    </tr>
    <tr >
    <td style={{fontSize:11,fontWeight:"900",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>Student Name</td>
    <td style={{fontSize:11,color:"blue",fontWeight:"bold",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>:{product?.studentname}</td>
    </tr>
    <tr>
    <td style={{fontSize:11,fontWeight:"900",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>Father's Name</td>
    <td style={{fontSize:11,color:"blue",fontWeight:"bold",margin:0,fontFamily:"serif",textAlign:"left",border:"none"}}>:{product?.studentfathername}</td>
    </tr>
    <tr>
    <td style={{fontSize:11,fontWeight:"900",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>Date Of Birth</td>
    <td style={{fontSize:11,color:"blue",fontWeight:"bold",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>:{product?.studentdateofbirth?.split("-")[2]}-{product?.studentdateofbirth?.split("-")[1]}-{product?.studentdateofbirth?.split("-")[0]}</td>
    </tr>
    <tr>
    <td style={{fontSize:11,fontWeight:"900",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>Class</td>
    <td style={{fontSize:11,color:"blue",fontWeight:"bold",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>:{product?.darjagiven}</td>
    </tr>
    <tr>
    <td style={{fontSize:11,fontWeight:"900",margin:0,fontFamily:"serif",textAlign:"left",border:"none",verticalAlign:"top",margin:"0px",padding:"0px"}}>Address</td>
    <td style={{fontSize:11,color:"blue",fontWeight:"bold",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>:{product?.studentvillage},{product?.studentpost},{product?.studenttehseel}<br></br>,{product?.studentdistrict}{product?.studentstate}</td>
    </tr>
    <tr>
    <td style={{fontSize:11,fontWeight:"900",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>Contact No</td>
    <td style={{fontSize:11,color:"blue",fontWeight:"bold",margin:0,fontFamily:"serif",textAlign:"left",border:"none",margin:"0px",padding:"0px"}}>:{product?.sarparastmobileno}</td>
    </tr>
    </table>
 



      </div>
     
      </div>
      <div className="fotter" style={{marginTop:5,padding:0}}>
      <img src={fotter} width={"100%"}  style={{margin:0,padding:0}}/>
      </div>
      </div>
    </div>
  );
};

export default Dakhlaform;
