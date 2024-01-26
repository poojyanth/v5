import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp";

const serverLog = {
  width: '75vw',
  boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
  height: '60vh',
  padding: '4pc',
  backgroundColor: 'white'
}

const serverlogTableContainer = {
  width: '100%',
  height: '40vh',
  overflowY: 'scroll',
  borderCollapse: 'collapse',
  borderSpacing: '0',
  padding: '0.5rem'
}

const serverLogContainer = {
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: '0',

}

const serverLogHeader = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '5vh',
  borderBottom: '1px solid black',
  padding: '0.5rem'

}

const UserStats = ({totalUsers }) => {

  const handleUserMouseOver = (e,user) => {
    const UserData = document.querySelector('.UserData')
    UserData.style.display = 'block'
    UserData.style.position = 'absolute'
    UserData.style.top = `${e.clientY}px`
    UserData.style.left = `${e.clientX + 50}px`
    UserData.style.width = '30vw'
    UserData.style.height = '30vh'
    UserData.style.backgroundColor = 'white'
    UserData.style.border = '1px solid black'
    UserData.style.borderRadius = '5px'
    UserData.style.zIndex = '100'

    UserData.innerHTML = `
    <div style='display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%;'>
      <img style='height: 10vh; width: 10vh; border-radius: 50%; object-fit: cover;' src=${user.profilepicture? user.profilepicture : defaultUser} alt='profile picture'/>
      <h4 style='margin: 0;'>${user.username}</h4>
      <h4 style='margin: 0;'>${user.email}</h4>
      <h4 style='margin: 0;'>${user.followers.length} followers</h4>
      <h4 style='margin: 0;'>${user.following.length} following</h4>
    </div>
    `
  }

  const handleUserMouseOut = () => {
    const UserData = document.querySelector('.UserData')
    UserData.style.display = 'none'
  }

  const navigate = useNavigate()

  return (
    <>
      <div className='adminContainer serverLog' style={{serverLog}} >
            <div className='serverLogHeader' style={serverLogHeader}>
              <h2 style={{width: '100%'}}>Users</h2>  
              </div>
            <div className='serverLogHeader' style={serverLogHeader}>
              <p style={{width: '5%'}}>No.</p>
              <p style={{width: '35%'}}>UserId</p>
              <p style={{width: '30%'}}>Username</p>
              <p style={{width: '12%'}}>followers</p>
              <p style={{width: '12%'}}>following</p>
              <p style={{width: '10%'}}>options</p>
            </div>
            <div className='serverlogTableContainer' style={serverlogTableContainer}>
              <table className='serverLogContainer' style={serverLogContainer}>
                {[...totalUsers].reverse().map((user, index) => {
                  return (
                    <>
                      <tr className='serverLogData' key={index} onMouseOver={(e)=>handleUserMouseOver(e,user)} onMouseOut={handleUserMouseOut}>                
                        <td style={{width: '5%'}}>{index + 1}</td>
                        <td style={{width: '30%'}}>{user._id}</td>
                        <td className='UserStatsUsername' onClick={()=>navigate(`/profilepage/${user._id}`)} style={{width: '25%'}}>{user.username}</td>
                        <td style={{width: '10%'}}>{user.followers.length}</td>
                        <td style={{width: '10%'}}>{user.following.length}</td>
                        <td style={{width: '10%'}}><FontAwesomeIcon className="faCircleExclamation" style={{margin: '0 5px'}} icon={faCircleExclamation}/>
                        <FontAwesomeIcon style={{margin: '0 5px'}} className='faTrash'  icon={faTrash} /></td>        
                      </tr>
                      <div className='UserData'></div>
                    </>
                  );
                }
                )}
              </table>
            </div>
          </div>
    </>
  )
}

export default UserStats