import * as winston from "winston";

const Logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
	]
});


export default Logger;