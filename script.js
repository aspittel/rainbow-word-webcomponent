const getStyle = (fontSize = '50') => {
  return `
  @import url('https://fonts.googleapis.com/css?family=Lato:400,800');
  
  .letter {
    font-family: 'Lato', sans-serif;
    font-weight: 800;
    letter-spacing: -${parseInt(fontSize) * 0.1}px;
    mix-blend-mode: darken;
    position: relative;
    -webkit-transition: top ease 0.1s;
    -o-transition: top ease 0.1s;
    transition: top ease 0.1s;
    -webkit-transition-delay: 2s;
    -o-transition-delay: 2s;
    transition-delay: 2s;
    opacity: 0.8;
    font-size: ${fontSize}px;
    text-transform: uppercase;
  }
  
  .header span:nth-child(10n+1) {
    color: #ef5350;
  }
  
  .header span:nth-child(10n+2) {
    color: #ab47bc;
  }
  
  .header span:nth-child(10n+3) {
    color: #651fff;
  }
  
  .header span:nth-child(10n+4) {
    color: #3949ab;
  }
  
  .header span:nth-child(10n+5) {
    color: #2196f3;
  }
  
  .header span:nth-child(10n+6) {
    color: #00bcd4;
  }
  
  .header span:nth-child(10n+7) {
    color: #4caf50;
  }
  
  .header span:nth-child(10n+8) {
    color: #ffc107;
  }
  
  .header span:nth-child(10n+9) {
    color: #ff80ab;
  }
  
  .header span:nth-child(10n+10) {
    color: #ff8f00;
  }
  
  @media (max-width: 600px) {
    .letter {
        font-size: ${parseInt(fontSize) * 0.5}px;
        letter-spacing: -${parseInt(fontSize) * 0.05}px;
    }
  }

  @-webkit-keyframes hoveranimation {
    0% {
        top: 0px;
    }
    50% {
        top: ${parseInt(fontSize) * 0.5}px;
    }
    100% {
        top: 0px;
    }
  }

  .hovered {
    -webkit-animation: hoveranimation 3s;
    animation: hoveranimation 3s;
  }
  `
}

class RainbowText extends HTMLElement {
  connectedCallback () {
    this.createShadowRoot()
    this.text = this.getAttribute('text')
    this.size = this.getAttribute('font-size')
    this.render()
  }

  addStyle () {
    const styleTag = document.createElement('style')
    styleTag.textContent = getStyle(this.size)
    this.shadowRoot.appendChild(styleTag)
  }

  addSpanEventListeners (span) {
    span.addEventListener('mouseover', () => { span.classList.add('hovered') })
    span.addEventListener('animationend', () => { span.classList.remove('hovered') })
  }

  createSpan (letter) {
    const span = document.createElement('span')
    span.classList.add('letter')
    span.innerHTML = letter
    this.addSpanEventListeners(span)
    return span
  }

  addSpans (div) {
    Array.from(this.text).forEach(letter => {
      let span = this.createSpan(letter)
      div.appendChild(span)
    })
  }

  render () {
    const div = document.createElement('div')
    div.classList.add('header')
    this.shadowRoot.appendChild(div)
    this.addSpans(div)
    this.addStyle()
  }
}

try {
  customElements.define('rainbow-text', RainbowText)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
