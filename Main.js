class KeepPartExtension {
  getInfo() {
    return {
      id: 'keep_part',
      name: 'Keep Part',
      blocks: [
        {
          opcode: 'keepPart',
          blockType: Scratch.BlockType.REPORTER,
          text: 'keep part %s from %n to %n',
          arguments: {
            s: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            },
            n1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            },
            n2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 5
            }
          }
        }
      ]
    };
  }

  keepPart({s, n1, n2}) {
    var result = s.substring(n1, n2);
    return result;
  }
}

Scratch.extensions.register(new KeepPartExtension());
