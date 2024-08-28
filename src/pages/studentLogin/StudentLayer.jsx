import React, { useState, useEffect } from "react";
import axios from "axios";
import StudetntApplyForm from "./StudetntApplyForm";

import ViewApplicationLayer from "./ViewApplicationLayer";

const StudentLayer = () => {
  const [hasApplied, setHasApplied] = useState(false);
  const [applications, setApplications] = useState([]);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    validate();
    console.log(hasApplied);
  }, [hasApplied]); // Empty dependency array ensures this effect runs only once on component mount

  const validate = async () => {
    console.log(userId);
    if (userId) {
      // Check if the user has already applied
      await axios
        .get("http://localhost:9952/findApplicationByUserId/" + userId)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            // User has already applied
            setHasApplied(true);

            setApplications(response.data);
          }
        });
    }
  };

  return (
    <div>
      {hasApplied ? (
        // Render view application component
        <ViewApplicationLayer></ViewApplicationLayer>
      ) : (
        // Render apply form component

        <StudetntApplyForm />
      )}
    </div>
  );
};

export default StudentLayer;
