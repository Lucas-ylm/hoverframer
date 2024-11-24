import { Color } from 'three';
import { MyDisplay } from '../core/myDisplay';
import { Tween } from '../core/tween';
import { DisplayConstructor } from '../libs/display';
import { Util } from '../libs/util';
import { Val } from '../libs/val';

export class Line extends MyDisplay {
  private _total: number = Util.hit(3) ? 150 : Util.randomInt(30, 70);
  private _allTexts: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private _showRateA: Val = new Val(0);
  private _showRateB: Val = new Val(0);
  private _isShowed: boolean = false;
  private _el: HTMLElement;
  private _kaigyou: number = 20;

  constructor(opt: DisplayConstructor) {
    super(opt);

    if (opt.el) {
      this._el = opt.el;
    } else {
      throw new Error('Element reference is null');
    }

    // Store the original text content
    const originalText = this._el.textContent || '';

    // Clear the element content
    this._el.textContent = '';

    // Create a container that will hold the line effect
    const wrapper = document.createElement('span');
    wrapper.classList.add('line-effect-wrapper');
    this._el.appendChild(wrapper);

    // Create a span to hold the original text
    const originalTextElement = document.createElement('span');
    originalTextElement.classList.add('original-text');
    originalTextElement.textContent = originalText;

    // Insert the original text and the wrapper inside the element
    this._el.appendChild(originalTextElement);

    // Initialize the line effect text
    let str = '';
    for (let i = 0; i < this._total; i++) {
      str += '<span style="color: #000;"></span>';
      if (i % this._kaigyou === 0) {
      }
    }

    // Apply the line effect to the wrapper element
    wrapper.innerHTML = str;
  }

  public show(d: number = 0): void {
    const t = 1;
    Tween.a(this._showRateA, { val: [0, 1] }, t, d, Tween.ExpoEaseOut);

    Tween.a(this._showRateB, { val: [0, 1] }, t, d + t * 0.15, Tween.ExpoEaseInOut, null, null, () => {
      this.hide(2);
    });
  }

  public hide(d: number = 0): void {
    const t = 1;
    Tween.a(this._showRateA, { val: 0 }, t, d + t * 0.75, Tween.ExpoEaseOut, null, null, () => {
      this.show(2);
    });

    Tween.a(this._showRateB, { val: 0 }, t, d, Tween.ExpoEaseInOut, () => {
      this._isShowed = false;
    });
  }

  protected _update(): void {
    super._update();

    const sA = this._showRateA.val;
    const sB = this._showRateB.val;

    if (sA <= 0 || this._isShowed) return;

    let str = '';
    const etc = Util.map(sB, 0, this._total, 0, 1);
    const num = Util.map(sA, 0, this._total, 0, 1);
    for (let i = 0; i < num; i++) {
      let isText = i > etc;
      const t = this._allTexts.charAt(Util.random(0, this._allTexts.length - 1));
      const col = new Color(0x000000).offsetHSL(Util.map(i, 0, 1, 0, num - 1), 1, 0.5);
      const colR = new Color(0x000000);

      if (isText) {
        str += `<span style="color: ${colR.getStyle()}; background-color: ${col.getStyle()};">${t}</span>`;
      }

      if (i % this._kaigyou === 0) {
        str += '<br>';
      }
    }

    // Apply the effect text to the wrapper
    const wrapper = this._el.querySelector('.line-effect-wrapper');
    if (wrapper) {
      wrapper.innerHTML = str;
    }

    if (sB >= 1) {
      this._isShowed = true;
    }
  }
}
