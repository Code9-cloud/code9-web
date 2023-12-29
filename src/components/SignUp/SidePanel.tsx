import React from "react";
import logo from './logo.svg';
import random from "./random.png";
import "./signpanel.css"


const SidePanel = () => {
    return(
            <div className='sidepanel' style={{backgroundColor: "#0b0a12"}}>
                <div className="sidepanel--logo"><img src={logo}/></div>
                <div className="sidepanel--main">
                    <div className="sidepanel--main--head"><div>Unleash the Power of No-Code Automation</div></div>
                    <ul>
                        <li className="sidepanel--main--points">Build <span style={{color: "#6200EE"}}>powerful workflows</span> without the need for coding expertise.</li>
                        <li className="sidepanel--main--points">Simplify and <span style={{color: "#6200EE"}}>optimize your business processes</span> with intuitive no-code tools.</li>
                        <li className="sidepanel--main--points">Quickly implement and deploy automation solutions, <span style={{color: "#6200EE"}}>saving time and resources</span>.</li>
                    </ul>
                </div>
                <div className="sidepanel--vector">
                    <img src={random} alt="" width={200} />
                </div>
            </div>
    );
};

export default SidePanel