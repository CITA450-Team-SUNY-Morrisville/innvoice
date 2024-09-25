#!/bin/bash

# Function to handle termination (Ctrl+C or terminal close)
cleanup() {
    echo "Cleaning up..."
    
    echo "Stopping database"
    kill %1
    echo "Stopping frontend"
    kill %2

    # Kill the port these apps run on
    #npx kill-port 5000
    #npx kill-port 3000 3001 3002 3003

    # read  -n 1 -p "Input Selection:" mainmenuinput
    rm $pidfile

    exit 0
}

# Check if terminal is already open
# store the Process ID here

#pidfile=mypid.local
# If there's a stored PID, terminate with SIGKILL
#[[ -f $pidfile ]] && kill -s 9 $(cat $pidfile)
# Save our PID for the next run to kill
#echo "$$" >$pidfile
  
# Trap Ctrl+C (SIGINT) and other termination signals
trap cleanup SIGINT SIGTERM EXIT

# Navigate to the /database directory and run npm start
echo "Starting database server..."
cd ./database
npm start &  # Store the PID of the database process while starting in background
#DATABASE_PID=$!

# Navigate to the /frontEnd directory and run npm run dev
echo "Starting front-end server..."
cd ../frontEnd
npm run dev &  # Store the PID of the frontend process while starting in background
#FRONTEND_PID=$!

# XAMPP Automation
# TODO

# Open the browser with http://localhost:3000 and http://localhost:5000
echo "Opening browser windows..."

# For Windows (using start)
explorer "http://localhost:3000"
explorer "http://localhost:5000"

# Wait for process to be ended so we dont crash
wait