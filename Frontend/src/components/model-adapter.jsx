import * as tf from "@tensorflow/tfjs";

/**
 * Utility class to handle model input/output transformations
 * This helps bridge the gap between handpose landmarks and model expectations
 */
export class ModelAdapter {
  /**
   * Preprocesses handpose landmarks for model input
   * @param landmarks - Array of landmarks from handpose model
   * @returns Tensor ready for model input
   */
  static preprocessLandmarks(landmarks) {
    // Flatten the landmarks array (21 points with x,y,z coordinates)
    const flattenedLandmarks = landmarks.flat();

    // Normalize values to a reasonable range (handpose values can be quite large)
    // Dividing by 500 to get values roughly in [0,1] range for most hand positions
    const normalizedLandmarks = flattenedLandmarks.map((val) => val / 500);

    // Create a properly shaped tensor for the model
    // Important: Ensure the shape matches what the model expects
    return tf.tensor2d([normalizedLandmarks], [1, flattenedLandmarks.length]);
  }

  /**
   * Ensures the model has proper input shape configuration
   * @param model - The loaded TensorFlow.js model
   * @returns The model with proper input shape
   */
  static async ensureModelInputShape(loadedModel) {
    try {
      // Create a new Sequential model
      const model = tf.sequential();
      
      // Get the original model's layers
      const layers = loadedModel.layers;
      
      // Add an input layer with explicit shape
      // For handpose landmarks (21 points with x,y,z coordinates)
      const inputShape = [63]; // 21 landmarks × 3 coordinates (x, y, z)
      
      // Add each layer from the original model to the new model
      // But for the first layer, ensure it has a defined input shape
      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        
        if (i === 0) {
          // Clone the first layer but with explicit input shape
          const config = layer.getConfig();
          config.batchInputShape = [null, ...inputShape];
          
          // Create a new layer with the updated config
          const newLayer = tf.layers[layer.getClassName().toLowerCase()](config);
          model.add(newLayer);
        } else {
          // Add the original layer for all other layers
          model.add(layer);
        }
      }
      
      // Compile the model with the same configuration as the original
      model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });
      
      console.log("Model input shape configured successfully:", model.inputs[0].shape);
      
      return model;
    } catch (error) {
      console.error("Error configuring model input shape:", error);
      throw new Error(`Failed to configure model input shape: ${error.message}`);
    }
  }
}
