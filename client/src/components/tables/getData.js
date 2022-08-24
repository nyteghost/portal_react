const callApiWithToken = async(id, accessToken) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
    };
  
    return fetch(`http://localhost:5000/getAssetLocation?assetid=${id}`
      ,options    
      ).then(res => {
          return res.json();
      }).then(jsonResponse => {   
        console.log(jsonResponse)
        return jsonResponse;   
      });
  }
  
