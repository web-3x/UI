class CountDown {
    endTime = 0;
    interval
    callback
    constructor(endTime, callback, start = false) {
        this.endTime = endTime
        this.callback = callback;
        if(start) {
            this.start();
        }
    }

    start() {
        this.interval = setInterval(() => {
            const t = ((this.endTime - Date.now()) / 1000) >> 0;
            if (t >= 0) {
                const hh = (t / 3600) >> 0;
                const mm = ((t - hh * 3600) / 60) >> 0
                const ss = t % 60
                if(this.callback) {
                    this.callback(hh, mm, ss, t)
                }
            } else {
                this.stop();
            }
        }, 500);
    }

    restart(endTime) {
        this.stop();
        this.endTime = endTime;
        this.start();
    }

    stop(){
        clearInterval(this.interval)
    }
}


export default CountDown