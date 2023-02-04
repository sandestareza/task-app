import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../helpers/tokens";

const ProtectPage = ({children}) => {
    const navigate = useNavigate();
   
    useEffect(() => {
        
      const token = getToken()

        if (!token) {
          navigate("/auth/login");
          return;
        }

    }, [navigate]);

    return children;
}

export default ProtectPage