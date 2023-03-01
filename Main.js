(function(ext) {
  // Define the 'keep part' block
  ext.keepPart = function(text, start, end, callback) {
    var result = text.substring(start, end); // Extract the desired part of the string
    callback(result); // Pass the result to Scratch
  };

  // Describe the 'keep part' block for Scratch
  var descriptor = {
    blocks: [
      ['R', 'keep part %s from %n to %n', 'keepPart', '', 1, 5]
    ]
  };

  // Register the extension with Scratch
  ScratchExtensions.register('Keep Part Extension', descriptor, ext);
})({});
