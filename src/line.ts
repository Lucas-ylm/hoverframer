import { Color } from 'three';
import { MyDisplay } from '../core/myDisplay';
import { Tween } from '../core/tween';
import { DisplayConstructor } from '../libs/display';
import { Util } from '../libs/util';
import { Val } from '../libs/val';

export class Line extends MyDisplay {
  private _total: number = 0;
  private _allTexts: string = '';
  private _showRateA: Val = new Val(0);
  private _showRateB: Val = new Val(0);
  private _isShowed: boolean = false;
  private _buf: HTMLElement;
  private _inner: HTMLElement;
  private _cachedColor: Color = new Color(0x000000);

  constructor(opt: DisplayConstructor) {
    super(opt);

    this._buf = document.createElement('div');
    this._buf.classList.add('-buf');

    this._inner = document.createElement('div');
    this._inner.classList.add('-inner');
    this.el.appendChild(this._inner);

    if (opt.el) {
      this._initializeText(opt.el);
    }
  }

  private _initializeText(element: HTMLElement) {
    this._allTexts = element.textContent ?? '';
    this._total = this._allTexts.length;
  }

  public show(d: number = 0): void {
    if (this._isShowed) return;

    const t = 1;
    Tween.kill(this._showRateA);
    Tween.kill(this._showRateB);

    Tween.a(this._showRateA, {
      val: [0, 1]
    }, t, d, Tween.ExpoEaseOut);

    Tween.a(this._showRateB, {
      val: [0, 1]
    }, t, d + t * 0.75, Tween.ExpoEaseInOut);
  }

  public hide(d: number = 0): void {
    if (!this._isShowed) return;

    const t = 1;
    Tween.kill(this._showRateA);
    Tween.kill(this._showRateB);

    Tween.a(this._showRateA, {
      val: 0
    }, t, d + t * 0.75, Tween.ExpoEaseOut);

    Tween.a(this._showRateB, {
      val: 0
    }, t, d, Tween.ExpoEaseInOut, () => {
      this._isShowed = false;
    });
  }

  protected _update(): void {
    super._update();

    const sA = this._showRateA.val;
    const sB = this._showRateB.val;

    if (sA <= 0) return;

    let str = '';
    const etc = Util.map(sB, 0, this._total, 0, 1);
    const num = Util.map(sA, 0, this._total, 0, 1);

    const lines = this._allTexts.split('\n');
    let lineIndex = 0;
    let charIndex = 0;

    for (let i = 0; i < num; i++) {
      const isText = i > etc;
      const line = lines[lineIndex];
      const t = line.charAt(charIndex);

      if (isText) {
        this._cachedColor.setHSL(Util.map(i, 0, 1, 0, num - 1), 1, 0.5);
        str += `<span style="color: #000000; background-color: ${this._cachedColor.getStyle()};">${t}</span>`;
      } else {
        if (i === 0) {
          this._cachedColor.setHSL(Util.map(i, 0, 1, 0, num - 1), 1, 0.5);
          str += `<span style="color: #FFFFFF; background-color: ${this._cachedColor.getStyle()};">${t}</span>`;
        } else {
          str += t;
        }
      }

      charIndex++;
      if (charIndex >= line.length) {
        lineIndex++;
        charIndex = 0;
      }
    }

    this._inner.innerHTML = str;

    if (sB >= 1) {
      this._isShowed = true;
    }
  }
}