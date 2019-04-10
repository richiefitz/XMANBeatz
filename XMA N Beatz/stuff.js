// load and configure the ToneJS sample player
var jimmy = new Tone.Player("jimmy.mp3");
jimmy.loop = true;
jimmy.connect(Tone.Master);

// when the nexus UI system loads we call this function
nx.onload = function() {
    
    // set default state of controls
    vinyl1.defaultspeed = 0;
    
    // set event listener for all events on the vinyl control
    vinyl1.on("*", vinylActions);
    
    // and event listener for all events on the toggle button
    toggle1.on("*", toggleActions);
    
    // connect the nexus level meter to the ToneJS master output
    meter1.setup(Tone.Master.context, Tone.Master.output);
}

// callback for actions on the vinyl control
var vinylActions = function(event) {
    
    // are we pushing forward?
    if (vinyl1.val.speed > 0) {
        jimmy.reverse = false;
        jimmy.playbackRate = vinyl1.val.speed;
    }
    
    // maybe pushing backwards?
    else if (vinyl1.val.speed < 0 ) {
        jimmy.reverse = true;
        
        // playback rate must be a positive number
        jimmy.playbackRate = (-1 * vinyl1.val.speed);
    }
}

// callback for actions on the toggle button
var toggleActions = function(event) {
    
    // set the turntable to run or stop
    // depending on the toggle button value
    if (event.value == 1 ){
        vinyl1.defaultspeed = 0.05;
    }
    else {
        vinyl1.defaultspeed = 0;
    }
    
    // if the sample player isn't running yet
    if (jimmy.state == "stopped") {
        jimmy.start();
    }
}


