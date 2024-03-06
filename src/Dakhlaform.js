import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Dakhlaform.css";
import logo from "./logo.png";
import {useReactToPrint} from "react-to-print"
import { useRef } from "react";



const Dakhlaform = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState();
  const [loader, setLoader] = useState(false);
  const componentPDF=useRef()

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

  return (
    <div className="main">
    <div className="receipt-actions-div">
    <div className="actions-right">
      <button
        className="receipt-modal-download-button button noprint"
        onClick={downloadPDF}
  
      >
      Download
      </button> 
    </div>
  </div>
      <div id="mainform" className="mainform" style={{padding:"5 5"}} ref={componentPDF}>
        <h1 className="mainh1 mainhai" style={{margin:0}}>داخلہ فارم</h1>
        <div className="firstpt">
          <hr className="hr-first" />
          <hr className="star" />
          <hr className="hr-last" />
        </div>
        <div className="secondheader">
          <div className="secondheaderchild">
            <h2 style={{ color: "black", fontSize: "10.5px", marginBottom: 0 }}>
              JAMIA ISLAMIA DARUL-ULOOM MOHAMMADIA
            </h2>
            <h2
              style={{
                color: "black",
                fontSize: "10.5px",
                marginTop: 5,
                fontWeight: 400,
              }}
            >
              Meel Kherla,Po.Ladamka,Teh.Pahari.
            </h2>
            <h3
              style={{
                color: "black",
                fontSize: "9px",
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
            <h2 style={{ color: "black", fontSize: "18px", marginBottom: 0,fontFamily:"Arabic Font" }}>
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
                ممیل کھیڑلا, پوسٹ لاڈمکا, تحصیل پہاڑی, ضلع  ڈ یگ  (بھرت پور), راجستھان
            </h2>
            <h3
              style={{
                color: "black",
                fontSize: "16px",
                marginTop: -10,
                fontWeight: 600,
              }}
            >
              9982742935 -:رابطہ نمبر
            </h3>
          </div>
        </div>
        <hr className="star" style={{marginTop:-10}} />
        <div className="secondheader">
          <div>
            <img
              src={`https://madarsabackend.onrender.com/${product?.studentprofilepic}`}
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
                fontSize: "15px",
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
                fontSize: "12px",
              }}
            >
              Form No: {product?.formnumber} فارم نمبر
            </h2>
            <h2 style={{ marginTop: 0, fontSize: 18, color: "black" }}>
{product?.formDate}
            </h2>
          </div>
        </div>
        <div className="detailtable">
          <table style={{ width: "100%", marginTop: 8 }}>
            <tr>
              <th>مکمل پتہ سرپرست انگریزی/ہندی میں </th>
              <th>مکمل پتہ طالب علم</th>
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
        <h3 style={{direction:"rtl"}}>
              
        (۱) ادارہ کے جملہ قوانین وضوابط کی پابندی اور ارباب جامعہ کی تمام وقتی تحریری و زبانی ہدایات کے مطابق عمل کرنا ضروری ہوگا (۲) اساتذہ، ذمہ داران جامعہ نیز علم و علماء کا ادب واحترام اور جامعہ کی جملہ املاک کی حفاظت آپ کے لئے
 
 ہوگی (۳) ارباب جامعہ ہر طالب علم کی حفاظت کی پوری کوشش کرتے         

<span style={{color:"blue"}}>
ہیں
 لیکن پھر بھی کسی انہونی حادثہ کا ذمہ دار جامعہ نہیں ہوگا، باہر اگر کوئی حادثہ ہوتا ہے تو جامعہ پر اس کی کوئی ذمہ داری نہیں ہوگی (۴) اگر کوئی طالب علم بغیر اطلاع کے مدرسہ سے چلا گیا تو اس کو تلاش کرنے یا کوئی قانونی کارروائی کرنے کی ذمہ داری جامعہ

پر نہ ہوگی 

</span>(۵)
 غیر اخلاقی و غیر شرعی حرکتوں پر جامعہ کو باز پرس کرنے کا پورا پورا حق ہوگا ، اس پر کسی کو قانونی چارہ جوئی کا حق نہ ہوگا۔
        </h3> 
        <h3 style={{direction:"rtl"}}>
        میں  {product?.studentname} بن  {product?.studentfathername} 

          جامعہ کے شعبہ      {product?.shoba}                     داخلہ کا خواہش مند ہوں ، میں نے
              جامعہ کے قواعد وضوابط کا بغور مطالعہ کیا ہے، میں اپنی رضا ، ہوش و
             حواس کے ساتھ 
        </h3>
        <h3 style={{ marginTop: -10, direction:"rtl" }}>
           عہد کرتا ہوں کہ جامعہ کے قوانین کی پابندی کروں گا ، جامعہ
          کے اساتذہ و دیگر عملہ کوکسی قسم کی شکایت کا موقع نہ دونگا ، خلاف ورزی
          کی صورت میں ذمہ داران جامعہ جو بھی سزا میرے , , لئے تجویز کرینگے وہ
          مجھے منظور ہوگی
          <span style={{ color: "blue" }}>
        
            , اور مجھے اور نہ میرے سر پرست کو جامعہ کے خلاف کسی قسم کی قانونی
               چارہ جوئی کا کوئی حق نہ ہوگا۔
          </span>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;, دستخط طالب علم :.................... 
          تاریخ شمسی : {product?.dateshamsi}
       

         <span style={{direction:"rtl"}}> تا سرخ قمری :{product?.datekamari}</span>
         
          </h3>
              <table style={{width:"100%"}}> 
              <tr>
              <td style={{textAlign:"right",fontSize:15,direction:"rtl"}}> اس سے قبل کہاں تعلیم حاصل کی ہے :{product?.beforethis}</td>
              <td style={{textAlign:"right",fontSize:15,direction:"rtl"}}>{"                       "} کس درجہ میں داخلہ مطلوب ہے:۔ :{product?.darjarequested}</td>
              </tr>
            </table>
            <table style={{width:"100%",border:"2px solid black",height:50}}> 
            <tr>
            <td style={{textAlign:"right",border:"none",fontSize:15}}>دستخط ناظم تعلیمات :۔</td>
            <td style={{textAlign:"right",border:"none",fontSize:15,direction:"rtl"}}> 
            اس طالب علم کو درجہ  {" "+product?.darjagiven+" "}
             میں داخلہ دیا جائے 
             
             </td>
           
            </tr>
          </table>
          <div className="box" style={{marginTop:-5}}>
          <div className="thirdheader">
          <div style={{display:"inline-block", width:"85%"}}>
          <h2
              className="mainh1"
              style={{
                color: "red",
                backgroundColor: "black",
                fontSize: "18px",
              }}
            >
            حلف نامہ سرپرست
                </h2>
          </div>
          <div style={{display:"inline-block" ,width:"15%"}}>
          <img
          src={`https://madarsabackend.onrender.com/${product?.sarparastprofilepic}`}
          width="80"
          height="120"
          alt="talib ilm"
        />
      
          </div>

          </div>
          <div style={{fontSize:13}}>
  <h3 style={{ display: 'inline-block', direction: 'rtl', fontSize:11 }}>
    <span>میں :{product?.sarparastname} ولد :{product?.sarparastfathername} سکونت  : {product?.sarparastvillage} طالب علم سے رشتہ :{product?.talibilmrishta}  
    پوسٹ :{product?.sarparastpost} تحصیل :{product?.sarparasttehseel} ضلع :{product?.sarparastdistt} صوبہ :{product?.sarparaststate}  آدھار نمبر :{product?.sarparastaadharno+" "} 
    
    </span>
    موبائل نمبر :{product?.sarparastmobileno}
    واٹسپ نمبر  :{product?.sarparastwhatsappno}
  </h3>
        
        
  <h4 style={{ direction: "rtl", marginTop: -7.5 ,fontSize:11}}>
  (1) بچے کی طرف سے ہونے والی شکایت پر براہ راست جامعہ کے ذمہ داروں سے رابطہ کروں گا ۔ اگر کسی سر پرست کو اہل جامعہ سے کوئی معقول شکایت ہو تو اسکو عوام میں پھیلانے کے بجائے خیر خواہانہ
  و مہذب انداز میں ذمہ دار جامعہ کے سامنے رکھنا لازم ہوگا۔ 
  <span style={{ color: "blue" }}>
  (۲) دوران تعلیم بچے کے جامعہ سے غائب ہو جانے یا کسی حادثہ میں فوت ہو جانے پر یا خدا نخواستہ طالب علم کی موت واقع ہونے کی 
    صورت میں
    ذمہ داران جامعہ کے خلاف کوئی قانونی کارروائی نہیں کروں گا۔
  </span>
  یہ ادارہ کے ساتھ میرا عہد و پیمان ہے اور میں نیچے دستخط کر کے اپنے آپ کو تمام مذکورہ شرائط و عہد نامہ کا پابند بناتا ہوں۔
</h4>
<table style={{width:"100%",marginTop:"-5"}}>
<tr>
<td style={{textAlign:"right",border:"none",direction:"rtl" ,fontSize:20}}>  نشان انگوٹھا والد / سرپرست </td>
<td style={{textAlign:"right",border:"none",direction:"ltr",fontSize:20}}> :دستخط والد / سرپرست </td>

</tr>
</table>


</div>
        
          </div>
         
      </div>
      <div style={{position:"absolute",bottom:0,left:0,width:"100%",height:25,fontSize:14}}>Created By SmileWeb(+91 9868277865)</div>
    </div>
  );
};

export default Dakhlaform;
