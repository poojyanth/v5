import React from 'react'
import './SettingsPage.css'
import Navbar from '../../Component/Navbar/Navbar'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function SettingsPage () {

    const [setting, setSetting] = useState([]);

    if(useSelector((state)=>state.user.user)===null){
        window.location.href="/login"
      }
      else{

        const Backendport = process.env.REACT_APP_BACKEND_PORT;
        

      return (
        <div className='home'>
            <Navbar/>
    
            <div className= "SettingsContainer">
                <div className="SettingsHeaders">
                    <button className="SettingsHeaderButton" >Profile</button>
                </div>
                <div className='SettingsContent'>
                <p>Hi</p>
                <p>Hi</p>
                <p>Hi</p>
                </div>
            </div>
          
        </div>
      )
      }
}

