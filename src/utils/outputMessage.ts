class OutputMessage {
  bufferPosition: number;
  bufferx: Buffer;

  constructor(buffer: Buffer) {
    this.bufferPosition = 0;
    this.bufferx = buffer;
  }

  getByte(): number {
    if (this.bufferPosition >= this.bufferx.length) {
      throw new RangeError("Attempt to read beyond buffer length");
    }
    return this.bufferx[this.bufferPosition++];
  }

  getU16(): number {
    if (this.bufferPosition + 1 >= this.bufferx.length) {
      throw new RangeError("Attempt to read beyond buffer length");
    }
    let retU16 =
      this.bufferx[this.bufferPosition] +
      this.bufferx[this.bufferPosition + 1] * 256;
    this.bufferPosition += 2;
    return retU16;
  }

  getU32(): number {
    if (this.bufferPosition + 3 >= this.bufferx.length) {
      throw new RangeError("Attempt to read beyond buffer length");
    }
    let retU32 =
      this.bufferx[this.bufferPosition] +
      this.bufferx[this.bufferPosition + 1] * 256 +
      this.bufferx[this.bufferPosition + 2] * 65536 +
      this.bufferx[this.bufferPosition + 3] * 16777216;
    this.bufferPosition += 4;
    return retU32;
  }

  getString(): string {
    let strLen = this.getU16();
    if (this.bufferPosition + strLen > this.bufferx.length) {
      throw new RangeError("Attempt to read beyond buffer length");
    }
    let retStr = "";
    for (let i = 0; i < strLen; i++) {
      retStr += String.fromCharCode(this.bufferx[this.bufferPosition + i]);
    }
    this.bufferPosition += strLen;
    return retStr;
  }
}

export default OutputMessage;
