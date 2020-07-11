export class CommandArgs {
  private originalString: string;
  private splitString: string[];
  private index: number = 0;

  constructor(argString: string) {
      this.originalString = argString;
      this.splitString = this.originalString.split(" ");
  }

  public pop(): string {
      if(this.index >= this.splitString.length) {
          throw new Error("Out of bounds");
      }
      return this.splitString[this.index++];
  }

  public putBack() {
      if(this.index > 0) {
          this.index--;
      }
  }

  public atEnd() {
      return this.index >= (this.splitString.length);
  }

  public restToString(): string {
      let retArray = [];
      for(var i = this.index; i < this.splitString.length; i++) {
          retArray.push(this.splitString[i]);
      }
      return retArray.join(" ");
  }
}