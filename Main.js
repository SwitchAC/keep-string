class RemoveAfterSpaceExtension {
  getInfo() {
    return {
      id: 'removeAfterSpace',
      name: 'Remove After Space',
      blocks: [
        {
          opcode: 'removeAfterSpace',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Remove everything after first space in [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'hello world'
            }
          }
        }
      ]
    };
  }

  removeAfterSpace({ TEXT }) {
    const index = TEXT.indexOf(' ');
    if (index === -1) {
      // No spaces found, return the original string
      return TEXT;
    } else {
      // Return the substring up to the first space
      return TEXT.substring(0, index);
    }
  }
}

Scratch.extensions.register(new RemoveAfterSpaceExtension());
