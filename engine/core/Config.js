/**
 * Config object
 * Holds global configuration values for the engine.
 * This is used to control rendering, physics, and debugging options.
 */
const Config = {
  // Boolean flag: enable or disable debug logging globally
  debugMode: false,

  // Boolean flag: enable or disable physics simulation
  physicsEnabled: true,

  // Boolean flag: enable or disable audio system
  audioEnabled: true,

  // Target frames per second (used by Loop and FrameLimiter)
  targetFPS: 60,

  // Default background color (hex)
  backgroundColor: 0x000000,

  // Boolean flag: enable or disable shadows
  shadowsEnabled: true,

  // Boolean flag: enable or disable post-processing effects
  postProcessingEnabled: true,
};

export { Config };
