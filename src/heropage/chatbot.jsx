import { useEffect, useState } from "react";
import "./chatbot.css";
import userimg from "../assets/user-icon.png";
import chatgptimg from "../assets/ChatGPT-Logo-PNG-1.png";
import { BsStars } from "react-icons/bs";
import Searchdata from "./sidemsg";
import {
  BiPlus,
  BiDotsHorizontalRounded,
  BiDockLeft,
  BiComment,
  BiTrash,
} from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import Version from "./version";
import Suggest from "./suggest";
import { IoSend } from "react-icons/io5";

function Chatbot() {
  const [Default, setdefault] = useState(true);
  const [status, setstatus] = useState(true);
  const [ans, setans] = useState([]);
  const [togle, settogle] = useState("");
  const [apimsg, setapimsg] = useState("");
  const [dans, dsetans] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [state, setstate] = useState([]);
  const[effect,seteffect]=useState(true)
  const[teffect,setteffect]=useState(true)
  const [asidemenu, setasidemenu] = useState(
    window.innerWidth > 800 ? true : false
  );
  // for menu on the moblie screen and tablet
  window.onresize = function () {
    if (window.innerWidth > 800) {
      setasidemenu(true);
    } else {
      setasidemenu(false);
    }
  };
  // toggle the true or false
  const toggle = () => {
    setasidemenu(!asidemenu);
  };
  // checking the value of the input whether it is empty or not
  const handleSubmit = () => {
    if (inputValue != "") {
      setteffect(!teffect)
      setdefault(false);
      setstate([...state, inputValue]);
      setInputValue("");
    }
  };

  // checking the user keyboard enter
  const handleKeyPress = (e) => {
   
      if (e.key === "Enter") {
        if (inputValue != "") {
          // call back the fucntion
        handleSubmit(e);
      }
    }
  
  };
  // using the api fetch data when the teffect update it will run
  useEffect( () => {
    // To avoid the initail run of the api make the state effect false after the first run
if(effect){
  seteffect(false)
}else{
  // fetching the api key from chatgtp
  const API_KEY = "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";
  // send the request to the api throught the arruguments of the fetch
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      // apimsg is the state which get the input value of the user and send in the content
      messages: [{ role: "user", content: apimsg }],
    }),
  };
  // fetching the data by sending the data in input 
  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      // setting the data in state of ans
      setans([...ans, [data.choices[0].message.content]]);
    })
    // setting the catch for error handiling
    .catch((message) =>
      setans([
        ...ans,
        "Hey sorry some techinal error occurs please try again or later",
      ])
    )
}
},[teffect]);
  return (
// main section of the div 
    <main>
      {/* aside bar which contains history and user profile */}
      <aside
        className="aside-box"
        //seting the width to adjust the size of it when toggle
        style={asidemenu ? { width: "25%" } : { width: "0%", display: "none" }}
      >
    {/* new chat  div bar*/}
        <div className="newchatbox flex">
          <div className="sub-box flex">
            <span className="Plus flex">
              <BiPlus />
            </span>
            <p> New Chart</p>
          </div>
          <div className="open flex" onClick={toggle}>
            <BiDockLeft />
          </div>
        </div>
        <h6 className="user-history-update">History</h6>
        {/* maping the data set in history of the user input */}
        <div className="aside-user-msg">
          {state
            ? state.map((task, index) => (
                <div
                  className="input-msg-box flex"
                  onClick={() => {
                    setstatus(!status);
                  }}
                >
                  <div className="msg-icon">
                    <BiComment />
                  </div>
                  <p>{task}</p>
                  <div
                    style={
                      status
                        ? { visibility: "hidden" }
                        : { visibility: "visible" }
                    }
                    className="trash-box"
                  >
                    <BiTrash />
                  </div>
                </div>
              ))
            : null}
        </div>
        {/* user-profile */}
        <div className="aside-user-profile">
          <div className="upgrade">
            <BsStars />
            <span>Upgrade</span>
            <div className="flex user-profile-img">
              <div className="flex">
                <img src={userimg} alt="" />
                <span>CustomUser</span>
              </div>
              <div className="user-profile-menu flex">
                <BiDotsHorizontalRounded />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <section className="contanierbox">
        <div
          className="container-menu-toggle"
          onClick={toggle}
          style={asidemenu ? { display: "none" } : { display: "unset" }}
        >
          <BiDockLeft />
        </div>
        {/* checking whether it a default home or chat hero page */}
        {Default ? (
          <>
          {/* setting the version componets from the version */}
            <Version />
            <section className="input-box-container">
          {/* setting the suggestion componets from the version */}
              <Suggest />
              <div
                className="main-input-box"
                style={asidemenu ? { left: "30%" } : { left: "20%" }}
              >
                {/* setting the input to state in apimsg and InputValue */}
                <input
                  type="text"
                  className="main-input"
                  onKeyUp={handleKeyPress}
                  value={inputValue}
                  onChange={(e) => {
                    setapimsg(e.target.value);
                    setInputValue(e.target.value);
                  }}
                />
                {/* handling the keyboard event and send icon event on click*/}
                <div
                  onKeyUp={handleKeyPress}
                  onClick={() => {
                    handleSubmit();
            
                  }}
                  className="flyicon2 flex"
                  style={asidemenu ? { right: "8%" } : { right: "18%" }}
                >
                  <IoSend />
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="default-heading-top flex">
              <h3>Default(GPT-3.5)</h3>
            </div>
            <section className="user-content-data-container">
              <div
                className="main-input-box"
                style={asidemenu ? { left: "30%" } : { left: "20%" }}
              >
                {/* setting the input to state in apimsg and InputValue */}

                <input
                  type="text"
                  className="main-input"
                  onKeyUp={handleKeyPress}
                  value={inputValue}
                  onChange={(e) => {
                    setapimsg(e.target.value);
                    setInputValue(e.target.value);
                  }}
                />
                {/* handling the keyboard event and send icon event on click*/}

                <div
                  onKeyUp={handleKeyPress}
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="flyicon2 flex"
                  style={asidemenu ? { right: "8%" } : { right: "18%" }}
                >
                  <IoSend />
                </div>
              </div>
              {/* setting the user input data in input div container */}
              {state
                ? state.map((task, index) => (
                    <div
                      key={index}
                      className="chatbot-box user-question-box"
                      style={{ order: index }}
                    >
                      <img src={userimg} alt="" />
                      <p>{task}</p>
                    </div>
                  ))
                : null}
              {/* setting the answer of the user data in answer div container */}

              {ans
                ? ans.map((item, index) => (
                    <div
                      key={index}
                      className="chatbot-box chatbot-answer-box"
                      style={{ order: index}}
                    >
                      <img src={chatgptimg} alt="" />
                      <p>{item}</p>
                    </div>
                  ))
                : null}
            </section>
          </>
        )}
      </section>
    </main>
  );
}
export default Chatbot;
