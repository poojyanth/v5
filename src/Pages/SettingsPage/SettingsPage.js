import React from "react";
import "./SettingsPage.css";
import Navbar from "../../Component/Navbar/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultUser from "../../Component/Images/blank-profile-picture-973460_960_720.webp";
import {
  Setting1,
  Setting2,
  Setting3,
  Setting4,
  Setting5,
} from "../../Component/Settings/settings";

const SettingsContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "92vh",
};

const SettingsHeaders = {
  display: "flex",
  flexDirection: "column",
  borderRight: "0.5px solid #c2c2c2",
  justifyContent: "center",
  backgroundColor: "white",
  alignItems: "center",
  height: "99%",
  width: "20%",
};

const SettingsContent = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "79%",
};

const SettingsHeaderButton = {
  width: "100%",
  height: "10%",
  border: "none",
  borderRadius: "20px",
  marginBottom: "1px",
  fontSize: "1em",
  backgroundColor: "transparent",
  fontWeight: "bold",
  color: "#000000",
  transition: "background-color 0.2s ease",
  cursor: "pointer",
};

const settingsRightUserDetails = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "10px",
  width: "100%",
  height: "25%",
};

const settingsRightButtons = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "10px",
  width: "100%",
  height: "75%",
};

const settings = [
  // Assign the array of settings to a variable
  {
    name: "Profile",
    component: Setting1,
  },
  {
    name: "Account",
    component: Setting2,
  },
  {
    name: "Profile Photo",
    component: Setting3,
  },
  {
    name: "Cover Photo",
    component: Setting4,
  },
  {
    name: "Theme",
    component: Setting5,
  }
];

export default function SettingsPage({ match }) {
  const [setting, setSetting] = useState(0);
  const userDetails = useSelector((state) => state.user);
  const [user, setUser] = useState(userDetails.user);
  const settingName = useParams(":settingName").settingName;

  useEffect(() => {
    const buttons = document.querySelectorAll(".SettingsHeaderButton");
    buttons.forEach((button) => {
      button.style.backgroundColor = "transparent";
    });
    document.getElementById(setting).style.backgroundColor = "#e0e4e8";
  }, [setting]);


  useEffect(() => {
    const settingIndex = settings.findIndex(
      (setting) => setting.name === settingName
    );
    if (settingIndex !== -1) {
      setSetting(settingIndex);
    }
  }, [settingName]);
  

  if (useSelector((state) => state.user.user) === null) {
    window.location.href = "/login";
  } else {
    const Backendport = process.env.REACT_APP_BACKEND_PORT;

    const handleSettingClick = (e) => {
      e.preventDefault();
      const selectedSetting = settings[parseInt(e.target.value)].name;
      setSetting(parseInt(e.target.value));
      console.log(e.target.value, selectedSetting, setting);

      window.history.pushState(null, null, `/settings/${selectedSetting}`);
    };

    const handleSettingMouseOver = (e) => {
      e.preventDefault();
      const buttonValue = parseInt(e.target.value);
      if (buttonValue === setting) {
        e.target.style.backgroundColor = "#e0e4e8";
      } else {
        e.target.style.backgroundColor = "#e0e4e8";
      }
    };

    const handleSettingMouseOut = (e) => {
      e.preventDefault();
      const buttonValue = parseInt(e.target.value);
      if (buttonValue !== setting) {
        e.target.style.backgroundColor = "transparent";
      }
    };
    return (
      <div className="home">
        <Navbar />

        <div className="SettingsContainer" style={SettingsContainer}>
          <div className="SettingsHeaders" style={SettingsHeaders}>
            <div
              className="settingsRightUserDetails"
              style={settingsRightUserDetails}
            >
              <img
                src={
                  user.user.profilepicture
                    ? user.user.profilepicture
                    : defaultUser
                }
                
                // src={'/Images/ProfilePictures/1708623337285_1678733136955.jpg'}

                width="100px"
                height="100px"
                style={{borderRadius: '50%', border: '1px solid'}}
                alt=""
                className="SettingsProfilePicture"
              />
              <div className="settingsRightUserDetailsText">
                <p
                  className="settingsRightUserDetailsTextUsername"
                  style={{ margin: "0", fontWeight: "bold", userSelect: "none"}}
                >
                  {user.user.username}
                </p>
              </div>
            </div>
            <div className="settingsRightButtons" style={settingsRightButtons}>
              {settings.map((setting, index) => (
                <button
                  key={index}
                  id={index}
                  className="SettingsHeaderButton"
                  style={SettingsHeaderButton}
                  onMouseOver={handleSettingMouseOver}
                  onMouseOut={handleSettingMouseOut}
                  value={index}
                  onClick={handleSettingClick}
                >
                  {setting.name}
                </button>
              ))}
            </div>
          </div>
          <div className="SettingsContent" style={SettingsContent}>
            {setting === 0 ? <Setting1 user={user} setUser={setUser} /> 
            : setting === 1 ? <Setting2  user={user} setUser={setUser}/> 
            : setting === 2 ? <Setting3  user={user} setUser={setUser}/> 
            : setting === 3 ? <Setting4  user={user} setUser={setUser}/>
            : setting === 4 ? <Setting5  user={user} setUser={setUser}/>
            : <Setting1  user={user} setUser={setUser}/>}
          </div>
        </div>
      </div>
    );
  }
}
