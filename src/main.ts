import { Func } from '../core/func';
import { Line } from './line';
import './style.css'

const wrapper = document.querySelector('.l-wrapper') as HTMLElement;

const num = Func.val(20, 50)
for (let i = 0; i < num; i++) {
  const el = document.createElement('div')
  el.classList.add('l-line')
  wrapper.appendChild(el)

  const line = new Line({
    el: el,
  })
  line.show(1 + i * 0.01)
}