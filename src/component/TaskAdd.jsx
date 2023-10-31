import React, { useState, useEffect } from "react";
import { db } from "./firebase/config";
import { getDocs, collection } from "firebase/firestore";
import AppNavbar from "./AppNavbar";

const TaskAdd = () => {
  const [userData, setUserData] = useState([]);
  const users = collection(db, "users");
  // const { userId } = useLocation();
  // const location = useLocation();
  // return location;
  let loggedInUser = localStorage.getItem("userId");
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getDocs(users);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const user = filteredData.find((data) => data.id === loggedInUser);

        if (user) {
          console.log(userData);
          setUserData(user);
        }
      } catch (err) {
        alert(err);
        console.error(err);
      }
    };
    getUserData();
  }, [loggedInUser]);

  // console.log("current User ", loggedInUser);

  return (
    <div>
      <AppNavbar {...userData} />
    </div>
  );
};

export default TaskAdd;
