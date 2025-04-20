import util from "util";

import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Define custom log levels and colors
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "blue",
    silly: "grey",
  },
};

// Add colors to winston
winston.addColors(logLevels.colors);

// Custom format function for handling object inspection
const formatObject = (param: unknown): string => {
  if (typeof param === "object" && param !== null) {
    // Increase depth for better object inspection
    return util.inspect(param, { showHidden: false, depth: 5, colors: true });
  }
  return String(param);
};

// Define the custom log format
const customFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let msg = message;
  // Handle potential objects in the message or metadata
  if (typeof message === "object") {
    msg = formatObject(message);
  }

  // Format additional metadata if it exists
  const metaString = Object.keys(metadata).length ? formatObject(metadata) : "";

  // Combine message and metadata
  const fullMessage = metaString ? `${msg} ${metaString}` : msg;

  // Apply custom prefix and structure
  return `[+] -- ${timestamp} -- [+] [${level}] -- ${fullMessage}`;
});

// Create the logger instance
const logger = winston.createLogger({
  levels: logLevels.levels,
  level: process.env.LOG_LEVEL || "info", // Default level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), // ISO 8601 format timestamp
    winston.format.colorize({ all: true }), // Apply colors to the level
    winston.format.errors({ stack: true }), // Log stack traces for errors
    winston.format.splat(), // String interpolation
    customFormat // Apply the custom format last
  ),
  transports: [
    // Console transport
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      level: "info",
      handleExceptions: true,
      handleRejections: true,
      format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    }),
    new winston.transports.Console({
      stderrLevels: ["error"], // Log errors to stderr
    }),

    // -------------------------------------------------------------------------
    // Placeholder for External Log Aggregator Transports
    // -------------------------------------------------------------------------
    // Example: Winston HTTP Transport (install `winston-transport-http`)
    // new winston.transports.Http({
    //   host: 'your-log-aggregator.com',
    //   port: 8080,
    //   path: '/logs',
    //   ssl: true,
    //   format: winston.format.json(), // Send logs as JSON
    // }),
    //
    // Example: Winston Logstash UDP Transport (install `winston-logstash-udp`)
    // new winston.transports.LogstashUDP({
    //   port: 9999,
    //   host: 'your-logstash-host.com',
    //   format: winston.format.json(),
    // }),
    //
    // Example: Datadog Transport (install `@shelf/winston-datadog-logs-transport`)
    // new DataDogTransport({
    //    apiKey: process.env.DATADOG_API_KEY,
    //    service: 'api-gateway', // Your service name
    //    hostname: os.hostname(),
    //    ddsource: 'nodejs',
    //    format: winston.format.json(),
    // }),
    // -------------------------------------------------------------------------
  ],
  // Do not exit on handled exceptions
  exitOnError: false,
});

// Define an interface that extends the Logger type to include the morganStream property
interface MorganStreamLogger extends winston.Logger {
  morganStream: {
    write: (message: string) => void;
  };
}

// Add a stream interface for use with tools like morgan
(logger as MorganStreamLogger).morganStream = {
  write: (message: string): void => {
    // Use http level for morgan logs
    logger.http(message.trim());
  },
};

export default logger as MorganStreamLogger;
