import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  
import Checkbox from '../components/Checkbox';
import { ThemeContext } from '../ThemeContext'; 
import axios from 'axios';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext); 

  const navigate = useNavigate();  // Hook to navigate between routes

  const [checkedAvailable, setCheckedAvailable] = React.useState(true);
  const [checkedReserved, setCheckedReserved] = React.useState(true);
  const [checkedMaintanance, setCheckedMaintanance] = React.useState(true);
  const [checkedNormal, setCheckedNormal] = React.useState(true);
  const [checkedSuite, setCheckedSuite] = React.useState(true);
  const [checkedOneBed, setCheckedOneBed] = React.useState(true);
  const [checkedTwoBed, setCheckedTwoBed] = React.useState(true);
  const [checkedThreeBed, setCheckedThreeBed] = React.useState(true);

  const handleChangeAvailable = () => {
    setCheckedAvailable(!checkedAvailable);
  };

  const handleChangeReserved = () => {
    setCheckedReserved(!checkedReserved);
  };

  const handleChangeMaintanance = () => {
    setCheckedMaintanance(!checkedMaintanance);
  };

  const handleChangeNormal = () => {
    setCheckedNormal(!checkedNormal);
  };

  const handleChangeSuite = () => {
    setCheckedSuite(!checkedSuite);
  };

  const handleChangeOneBed = () => {
    setCheckedOneBed(!checkedOneBed);
  };

  const handleChangeTwoBed = () => {
    setCheckedTwoBed(!checkedTwoBed);
  };

  const handleChangeThreeBed = () => {
    setCheckedThreeBed(!checkedThreeBed);
  };

    // State to hold the list of elements (strings or JSX)
    const [items, setItems] = useState([]);
  
    // Function to add new item to the list
    const addItem = (item) => {
      //if (item.trim()) {
        // Add the new item
        setItems([...items, item]);
      //}
    };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      <Navbar />

      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Rooms</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Options boxes div*/}
          {/* TODO: Give this div its own little box to seperate it or something. */}
          <div className="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h3 className="text-2xl font-bold mb-6">Search Options</h3>
            <p className="text-1xl font-bold mb-6">Room Availability</p>
            {/* Options boxes */}
            <Checkbox
              label="Available"
              value={checkedAvailable}
              onChange={handleChangeAvailable}
            />
            <br />
            <Checkbox
              label="Reserved"
              value={checkedReserved}
              onChange={handleChangeReserved}
            />
            <br />
            <Checkbox
              label="Maintanance"
              value={checkedMaintanance}
              onChange={handleChangeMaintanance}
            />
            <br />
            <br />
            <p className="text-1xl font-bold mb-6">Room Type</p>
            <Checkbox
              label="Normal"
              value={checkedNormal}
              onChange={handleChangeNormal}
            />
            <br />
            <Checkbox
              label="Suite"
              value={checkedSuite}
              onChange={handleChangeSuite}
            />
           </div>
          </div>
          <div>
          {/* Print room data from database */}
          <button className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick=
          {
            async (e) => {
              try {
              const response = await axios.get('/routes/rooms');
              
                if (response.data) {
                  console.log("Rooms that match the search criteria:")

                for (var i in response.data) {
                  //Would be better to use something like fuse js instead of this massive if statement

                  //Normal room checks
                  if (checkedNormal) {
                    // Do checks later for beds rn idc also we need to have a better solution so this can be done with just a number like binary, these are gonna be massive or chains
                    if (response.data[i].roomTypeCode == "R100" || response.data[i].roomTypeCode == "R150" || response.data[i].roomTypeCode == "R200") {
                      if (checkedAvailable){
                        if (response.data[i].status == "available") {
                          console.log(response.data[i]);
                          //addItem(response.data[i]);
                          continue;
                        }
                      }
    
                      if (checkedReserved){
                        if (response.data[i].status == "occupied") {
                          console.log(response.data[i]);
                          //addItem(response.data[i]);
                          continue;
                        }
                      }
    
                      if (checkedMaintanance){
                        if (response.data[i].status == "maintenance") {
                          console.log(response.data[i]);
                          //addItem(response.data[i]);
                          continue;
                        }
                      }
                    }
                  }

                  // Suite room checks
                  if (checkedSuite) {
                    if (response.data[i].roomTypeCode == "R200S" || response.data[i].roomTypeCode == "R300S" || response.data[i].roomTypeCode == "R400S") {
                      if (checkedAvailable){
                        if (response.data[i].status == "available") {
                          console.log(response.data[i]);
                          //addItem(response.data[i]);
                          continue;
                        }
                      }
    
                      if (checkedReserved){
                        if (response.data[i].status == "occupied") {
                          console.log(response.data[i]);
                          //addItem(response.data[i]);
                          continue;
                        }
                      }
    
                      if (checkedMaintanance){
                        if (response.data[i].status == "maintenance") {
                          console.log(response.data[i]);
                          //addItem(response.data[i]);
                          continue;
                        }
                      }
                    }
                  }
                }

                // If the list is empty, say no results, else render the list
                //console.log(items);
              }
              else {
                console.log("No response");
              }

            } catch (err) {
              console.log("Error getting room data: ", err)
            }
          }
          }>
            Search Rooms
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
