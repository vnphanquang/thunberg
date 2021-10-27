/**
 * Environment mode, should map to NODE_ENV
 */
export enum EnvMode {
  /** fallback mode if not specified */
  UNKNOWN = 'unknown',
  DEVELOPMENT = 'development',
  /** meant for CI / automation test */
  TESTING = 'testing',
  STAGING = 'staging',
  PRODUCTION = 'production',
}
