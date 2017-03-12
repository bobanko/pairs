const tickInterval = 30;

export class Timer {
	constructor(timeout) {
		this._eventListeners = {};
		this.start(timeout);
	}

	start(value) {
		this.basicTime = this.currentTime = new Date();
		this.timeout = value * 1000;//seconds

		this.intervalId = setInterval(() => {
			if (this.timeLeft > 0) {
				if (new Date() - this.currentTime > 1000) {
					this.currentTime = new Date();
					this.emit('tick', this.timeLeft);
				}
			} else {
				this.stop();
			}
		}, tickInterval);

		this.emit('start', this.timeLeft);
	}


	get timeLeft() {
		return Math.max(this.timeout - (this.currentTime - this.basicTime), 0);
	}


	stop() {
		clearInterval(this.intervalId);
		this.emit('stop', this.timeLeft);
	}

	getEventListeners(event) {
		return this._eventListeners[event] = this._eventListeners[event] || [];
	}

	addEventListener(event, callback) {
		this.getEventListeners(event).push(callback);
	}

	emit(event, data) {
		this.getEventListeners(event).forEach(handler => handler(data));
	}
}

