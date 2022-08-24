import { useState, useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return (
    <AuthenticatedTemplate>
        [data];
    </AuthenticatedTemplate>
  )
    
  
};

export default useFetch;


