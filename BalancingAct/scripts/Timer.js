class Timer {
    _milliseconds = 0;
    _isDown = true;
    _offset;
    _interval;
    _initMinutes;
    _initSeconds;
    _callback;
    _self = this;
 
    constructor(minutes, seconds, down, callback) {
        this.setTime(minutes, seconds)
        this.setDirection(down);
        this._callback = callback;
    }
 
    setTime(minutes, seconds) {
        this._milliseconds = ((minutes * 60) + seconds) * 1000;
        this._initMinutes = minutes;
        this._initSeconds = seconds;
    }
 
    setTime(seconds) {
        this._milliseconds = seconds * 1000;
        this._initMinutes = 0;
        this._initSeconds = seconds;
    }

    setMilliseconds(milliseconds) {
        this._milliseconds = milliseconds;
    }
 
    setDirection(down) {
        this._isDown = down;
    }
 
    getTime() {
        let minutes = Math.floor((this._milliseconds / 1000) / 60);
        let seconds = (Math.floor(this._milliseconds / 1000) % 60).toString().padStart(2,'0');
 
        return `${minutes}:${seconds}`;
    }
 
    getMilliseconds() {
        return this._milliseconds;
    }

    getSeconds() {
        return Math.floor(this._milliseconds / 1000);
    }
}

function clockDelta(clk) {
        let now = Date.now();
        d = now - clk._offset;
        clk._offset = now;

        return d;
    }
  
function clockStart(clk) {
    if(!clk._interval) {
        clk._offset = Date.now();
        clk._interval = setInterval(function () {
            if(clk._isDown) {
                clk._milliseconds -= clockDelta(clk);
            }
            else {
               var x = clockDelta(clk)
               clk._milliseconds += x;
            }
            clk._callback();
        }, 1000);
    }  
}

function clockStop(clk) {
    if(clk._interval) {
        clearInterval(clk._interval);
        clk._interval = null;
    }
    
}

function clockReset(clk) {
    if(clk._interval) {
        clearInterval(clk._interval);
    }   
    clk._milliseconds = 0;
}