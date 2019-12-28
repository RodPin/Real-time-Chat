# Real-time-Chat
Using React.js,React Native and Socket.io


## Requirements:
 React
 Node.js
 
## How to use it

### Clone

``` git clone git@github.com:RodPin/Real-time-Chat.git && cd Real-time-Chat```

### Install Dependencies

At the project directory
``` yarn install```

### Runing on Web

At the project directory ``` yarn start```

### Runing on Mobile

To run it locally on an emulator you have to map it port with the computer one

``` adb reverse tcp:4001 tcp:4001```


First run the server at the root directory
``` yarn start```

then
``` cd mobile```

``` yarn && react-native run-android```

