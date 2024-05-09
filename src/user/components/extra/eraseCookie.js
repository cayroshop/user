import React from 'react'

const eraseCookie = (name) => {
    console.log(name)
    document.cookie = name + '=; Max-Age=-99999999; path=/;';  
  };

export default eraseCookie
