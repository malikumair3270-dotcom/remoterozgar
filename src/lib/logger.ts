/**
 * Structured Production Logger & Monitoring Utility.
 * Formats errors and logs for production observability.
 */

export type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  route?: string;
  userIp?: string;
  [key: string]: unknown;
}

class Logger {
  private formatLog(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      ...(context ?? {}),
    };
  }

  info(message: string, context?: LogContext) {
    console.log(JSON.stringify(this.formatLog('info', message, context)));
  }

  warn(message: string, context?: LogContext) {
    console.warn(JSON.stringify(this.formatLog('warn', message, context)));
  }

  error(message: string, error?: unknown, context?: LogContext) {
    const errorDetails = error instanceof Error ? {
      name: error.name,
      errorMessage: error.message,
      stack: error.stack,
    } : { errorMessage: String(error) };

    console.error(JSON.stringify(this.formatLog('error', message, { ...context, ...errorDetails })));
  }
}

export const logger = new Logger();
