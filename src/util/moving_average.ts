export class MovingAverage {
  private readonly timespan: number;

  private ma: number;
  private v = 0;
  private d = 0;
  private f = 0;
  private previousTime: number;

  constructor(timespan: number) {
    this.timespan = timespan;
  }

  public push(time:number, value: number) {
    if (this.previousTime) {
      const a = this.alpha(time, this.previousTime);
      const diff = value - this.ma;
      const incr = a * diff;
      this.ma = a * value + (1 - a) * this.ma;
      this.v = (1 - a) * (this.v + diff * incr);
      this.d = Math.sqrt(this.v);
      this.f = this.ma + a * diff;
    } else {
      this.ma = value;
    }
    this.previousTime = time;
  }

  get movingAverage(): number {
    return this.ma;
  }

  get variance(): number {
    return this.v;
  }

  get deviation(): number {
    return this.d;
  }

  get forecast(): number {
    return this.f;
  }

  private alpha(t, pt) {
    return 1 - (Math.exp(-(t - pt) / this.timespan));
  }
}