export const callApiWithToken = async(id,accessToken, apiEndpoint) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
    };
    const url = apiEndpoint+id
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log(error));
  }