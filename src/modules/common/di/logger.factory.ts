import { ServiceFactory, ServiceKey } from "composed-di";
import pino from "pino";
import pinoLoki from "pino-loki";
import { env } from "../env";
import { ILogger } from "../logger.port";

const LOGGER = new ServiceKey<ILogger>('Logger')
const loggerFactory = ServiceFactory.singleton({
  provides: LOGGER,
  dependsOn: [],
  initialize: () => {
    const logger = pino(
      {
        level: env.NODE_ENV === 'production' ? 'info' : 'debug',
        formatters: {
          level(label) {
            return { level: label }; // use "info", "error", etc. instead of numbers
          },
        },
      },
      pinoLoki({
        host: env.LOKI_URL || 'http://localhost:3100/',
        interval: 1,
        labels: { app: 'stellarstay-app' },
      })
    )

    return {
      info(message: string, meta?: Record<string, any>) {
        logger.info(meta, message);
      },
      error(message: string, meta?: Record<string, any>) {
        logger.error(meta, message);
      },
      debug(message: string, meta?: Record<string, any>) {
        logger.debug(meta, message);
      },
    };
  }
})

export {
  LOGGER,
  loggerFactory
}