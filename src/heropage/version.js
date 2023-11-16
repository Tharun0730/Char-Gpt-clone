// initail show page version box
import {  AiFillThunderbolt} from "react-icons/ai";
import { BiSolidLockAlt} from "react-icons/bi";
import{BsStars} from 'react-icons/bs'
export default function Version(){
    return(
        <div className="versionname flex">
            <div className="version-outer-box flex">
              <div className="versionone flex">
                <span className="flex"><AiFillThunderbolt/></span>

                <p>GPT-3.5</p>
              </div>
              <div className="versiontwo flex">
                <span className="flex">
                <BsStars/>
                </span>
                <p>GPT-4</p>
                <span className="flex">
                  <BiSolidLockAlt/>
                </span>
              </div>
            </div>
            <div className="Namechatgpt">
            <h1 className="title">CHATGPT</h1>
          </div>
          </div>

    );
}