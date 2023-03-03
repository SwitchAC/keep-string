class PingCloudDataExtension {
  constructor() {
    this.computing = new Map();
    this.computed = new Map();
  }

  getInfo() {
    return {
      id: 'pingCloudData',
      name: 'Ping Cloud Data',
      blocks: [
        {
          opcode: 'ping',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'is cloud data server [SERVER] up?',
          arguments: {
            SERVER: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'wss://clouddata.turbowarp.org'
            }
          }
        }
      ]
    };
  }

  /**
   * @param {string} uri
   * @returns {Promise<boolean>}
   */
  async pingWebSocket(uri) {
    if (!await Scratch.canFetch(uri)) {
      return false;
    }

    /** @type {WebSocket} */
    let ws;
    try {
      // Permission is checked earlier.
      // eslint-disable-next-line no-restricted-syntax
      ws = new WebSocket(uri);
    } catch (e) {
      return false;
    }

    let timeoutId;
    const isUp = await new Promise((resolve) => {
      ws.onopen = () => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      };
      ws.onclose = () => {
        resolve(false);
      };
      ws.onerror = () => {
        resolve(false);
      };
      timeoutId = setTimeout(() => {
        ws.close();
      }, 5000);
    });

    ws.close();
    clearTimeout(timeoutId);

    return isUp;
  }

  /**
   * @param {string} uri
   * @returns {Promise<boolean>}
   */
  async cachedPingWebSocket(uri) {
    const computingEntry = this.computing.get(uri);
    if (computingEntry) {
      return computingEntry.then((entry) => entry.value);
    }

    const computedEntry = this.computed.get(uri);
    if (computedEntry && Date.now() < computedEntry.expires) {
      return computedEntry.value;
    }

    const promise = this.pingWebSocket(uri);
    this.computing.set(uri, promise);
    const entry = await promise;
    this.computing.delete(uri);
    this.computed.set(uri, { value: entry, expires: Date.now() + 60000 });
    return entry;
  }

  ping({ SERVER }) {
    return this.cachedPingWebSocket(SERVER);
  }
}

Scratch.extensions.register(new PingCloudDataExtension());
class PingCloudDataExtension {
  constructor() {
    this.computing = new Map();
    this.computed = new Map();
  }

  getInfo() {
    return {
      id: 'pingCloudData',
      name: 'Ping Cloud Data',
      blocks: [
        {
          opcode: 'ping',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'is cloud data server [SERVER] up?',
          arguments: {
            SERVER: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'wss://clouddata.turbowarp.org'
            }
          }
        }
      ]
    };
  }

  /**
   * @param {string} uri
   * @returns {Promise<boolean>}
   */
  async pingWebSocket(uri) {
    if (!await Scratch.canFetch(uri)) {
      return false;
    }

    /** @type {WebSocket} */
    let ws;
    try {
      // Permission is checked earlier.
      // eslint-disable-next-line no-restricted-syntax
      ws = new WebSocket(uri);
    } catch (e) {
      return false;
    }

    let timeoutId;
    const isUp = await new Promise((resolve) => {
      ws.onopen = () => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      };
      ws.onclose = () => {
        resolve(false);
      };
      ws.onerror = () => {
        resolve(false);
      };
      timeoutId = setTimeout(() => {
        ws.close();
      }, 5000);
    });

    ws.close();
    clearTimeout(timeoutId);

    return isUp;
  }

  /**
   * @param {string} uri
   * @returns {Promise<boolean>}
   */
  async cachedPingWebSocket(uri) {
    const computingEntry = this.computing.get(uri);
    if (computingEntry) {
      return computingEntry.then((entry) => entry.value);
    }

    const computedEntry = this.computed.get(uri);
    if (computedEntry && Date.now() < computedEntry.expires) {
      return computedEntry.value;
    }

    const promise = this.pingWebSocket(uri);
    this.computing.set(uri, promise);
    const entry = await promise;
    this.computing.delete(uri);
    this.computed.set(uri, { value: entry, expires: Date.now() + 60000 });
    return entry;
  }

  ping({ SERVER }) {
    return this.cachedPingWebSocket(SERVER);
  }
}

Scratch.extensions.register(new PingCloudDataExtension());
