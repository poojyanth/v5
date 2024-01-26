import React from 'react'
import AdminSmallNumberCard from './AdminSmallNumberCard'
import { useNavigate } from 'react-router-dom';

const serverLog = {
  width: '75vw',
  boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
  height: '60vh',
  padding: '2pc',
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


const AllStats = ({totalTrafficNumber, totalTraffic,totalUsers, totalPosts }) => {

  const totalLikes = totalPosts.reduce((total, post) => {
    return total + post.likes.length;
  }, 0);

  // console.log(totalTraffic)
    const navigate = useNavigate();

    const toggleDropdown = (ID) => {
        // alert(userId)
        document.getElementById(ID).classList.toggle('show');
    
      };

      const handleMethodMouseOver = (e,method) => {
        e.target.style.fontWeight = '500'        
      }

      const handleMethodLoad = (e,method) => {
        if(method==='GET'){
          e.target.style.color = 'green'
        }
        else if(method==='POST'){
          e.target.style.color = 'blue'
        }
        else if(method==='PUT'){
          e.target.style.color = 'yellow'
        }
        else if(method==='DELETE'){
          e.target.style.color = 'red'
        }
      }

      const handleMethodMouseOut = (e) => {
        e.target.style.fontWeight = 'normal'
      }

  return (
    <>
          <div className='adminContainer'>
            <AdminSmallNumberCard CardName={'Traffic'} CardValue= {totalTrafficNumber} />
            <AdminSmallNumberCard CardName={'Posts'} CardValue={totalPosts.length} />  
            <AdminSmallNumberCard CardName={'Users'} CardValue={totalUsers.length}/>
            <AdminSmallNumberCard CardName={'Likes'} CardValue={totalLikes}/>
          </div>
          <div className='adminContainer serverLog' style={serverLog} >
            <div className='serverLogHeader' style={serverLogHeader}>
              <h2 style={{width: '100%'}}>Traffic</h2>
              </div>
            <div className='serverLogHeader' style={serverLogHeader}>
              <p style={{width: '5%'}}>No.</p>
              <p style={{width: '30%'}}>Timestamp</p>
              <p style={{width: '20%'}}>IP</p>
              <p style={{width: '10%'}}>Method</p>
              <p style={{width: '35%'}}>Path</p>
            </div>
            <div className='serverlogTableContainer' style={serverlogTableContainer}>
              <table className='serverLogContainer' style={serverLogContainer}>
                {[...totalTraffic].reverse().map((traffic, index) => {
                  return (
                    <tr className='serverLogData' key={index}>
                      <td style={{width: '5%'}}>{index + 1}</td>
                      <td style={{width: '30%'}}>{traffic.timestamp}</td>
                      <td style={{width: '20%'}}>{traffic.ip}</td>
                      <td className="Trafficmethod" onMouseOver={(e)=>handleMethodMouseOver(e,traffic.method)} onMouseOut={handleMethodMouseOut} 
                      style={traffic.method==='GET'? {width: '10%', color: 'green'} : traffic.method==='POST'? {width: '10%', color: 'blue'} : traffic.method==='PUT'? {width: '10%', color: 'yellow'} : {width: '10%', color: 'red'}}
                      >{traffic.method}</td>
                      <td style={{width: '40%'}}>{traffic.path}</td>
                    </tr>
                  );
                }
                )}
              </table>
            </div>
          </div>

          <div className='adminContainer serverLog' style={serverLog}>
                <div className='serverLogHeader' style={serverLogHeader}>
                    <h2 style={{width: '100%'}}>Reports</h2>
                </div>
                <div className='serverLogHeader' style={serverLogHeader}>
                    <p style={{width: '5%'}}>No.</p>
                    <p style={{width: '20%'}}>Timestamp</p>
                    <p style={{width: '25%'}}>User</p>
                    <p style={{width: '50%'}}>Report</p>
                </div>
                <div className='serverlogTableContainer' style={serverlogTableContainer}>
                    <table className='serverLogContainer' style={serverLogContainer}>
                        {[...totalTraffic].reverse().map((traffic, index) => {
                            return (
                                <tr className='serverLogData' key={index}>
                                    <td style={{width: '5%'}}>{index + 1}</td>
                                    <td style={{width: '20%'}}>{traffic.timestamp}</td>
                                    <td style={{width: '25%'}}>{traffic.ip}</td>
                                    <td style={{width: '50%'}}>{traffic.path}</td>
                                </tr>
                            );
                        }
                        )}
                    </table>
                </div>
          </div>

    </>
  )
}

export default AllStats