import React from 'react'

function AppBar() {
    const logout = () => {
    console.log('click');
  }
    return (
        <div>
             <ul>
             <li> 
          <a onClick={logout} href='#!'>
            <i className="fas fa-sign-out-alt" />
            {' '} <span className="hide-sm">Logout</span></a>
        </li>
          </ul>
        </div>
    )
}

export default AppBar
