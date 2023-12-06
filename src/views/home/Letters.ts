interface Mouse {
  x: number
  y: number
  radius: number
}

interface TextSize {
  width: number
  height: number
}

export class Letters {
  public container: HTMLElement
  public canvas: HTMLCanvasElement

  public ctx: CanvasRenderingContext2D
  public msg: string
  public fontSize: string

  public textCoordinates: ImageData
  public mouse: Mouse
  public textSize: TextSize

  public particleArr: Particle[]

  constructor(option) {
    this.container = option.container
    this.canvas = option.canvas

    const { width, height } = this.container.getBoundingClientRect()
    this.canvas.width = width
    this.canvas.height = height

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.msg = option.msg
    this.fontSize = option.fontSize || '200'

    this.ctx.fillStyle = 'white'
    this.ctx.font = `bold ${this.fontSize}px Verdana`

    const { x, y } = this.getPosition()
    this.ctx.fillText(this.msg, x, y)

    this.textCoordinates = this.ctx?.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.mouse = {
      x: this.canvas.width * 2,
      y: this.canvas.height * 2,
      radius: 200,
    }
    this.textSize = {
      width: 0,
      height: 0,
    }

    this.particleArr = []

    this.start()
  }

  start() {
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))

    this.init()
    this.animate()
  }

  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this))
  }

  init() {
    const stagger = 8
    for (let y = 0, y2 = this.textCoordinates.height; y < y2; y += stagger) {
      for (let x = 0, x2 = this.textCoordinates.width; x < x2; x += stagger) {
        if (this.textCoordinates.data[y * 4 * this.textCoordinates.width + x * 4 + 3] > 128) {
          const posX = x
          this.textSize.width =
            this.textSize.width < posX || this.textSize === null ? posX : this.textSize.width
          const posY = y
          this.textSize.height =
            this.textSize.height < posY || this.textSize === null ? posY : this.textSize.height
          const size = 1
          this.particleArr.push(
            new Particle({
              canvas: this.canvas,
              ctx: this.ctx,
              mouse: this.mouse,
              x: posX * size,
              y: posY * size,
            }),
          )
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.connect()

    this.particleArr.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    requestAnimationFrame(this.animate.bind(this))
  }

  getPosition() {
    const textMetrics = this.ctx.measureText(this.msg)
    const textWidth = textMetrics.width
    const textHeight = parseInt(this.fontSize, 10)

    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    const textX = centerX - textWidth / 2
    const textY = centerY + textHeight / 2

    return { x: textX, y: textY }
  }

  connect() {
    let opacityValue = 1
    for (let a = 0; a < this.particleArr.length; a++) {
      for (let b = a; b < this.particleArr.length; b++) {
        const distance =
          (this.particleArr[a].x - this.particleArr[b].x) *
            (this.particleArr[a].x - this.particleArr[b].x) +
          (this.particleArr[a].y - this.particleArr[b].y) *
            (this.particleArr[a].y - this.particleArr[b].y)
        const lineDistance = 500
        if (distance < lineDistance) {
          opacityValue = 1 - distance / lineDistance
          const dx = this.mouse.x - this.particleArr[a].x
          const dy = this.mouse.y - this.particleArr[a].y
          const mouseDistance = Math.sqrt(dx * dx + dy * dy)
          if (mouseDistance < this.mouse.radius * 0.66) {
            this.ctx.strokeStyle = `rgba(145, 235, 255,${opacityValue})`
          } else if (mouseDistance < this.mouse.radius - 25) {
            this.ctx.strokeStyle = `rgba(195, 240, 255,${opacityValue})`
          } else if (mouseDistance < this.mouse.radius) {
            this.ctx.strokeStyle = `rgba(220, 245, 255,${opacityValue})`
          } else {
            this.ctx.strokeStyle = `rgba(255, 255, 255,${opacityValue})`
          }
          this.ctx.lineWidth = 4
          this.ctx.beginPath()
          this.ctx.moveTo(this.particleArr[a].x, this.particleArr[a].y)
          this.ctx.lineTo(this.particleArr[b].x, this.particleArr[b].y)
          this.ctx.stroke()
        }
      }
    }
  }

  handleMouseMove = (e) => {
    this.mouse.x = e.x
    this.mouse.y = e.y
  }
}

class Particle {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public mouse: Mouse

  public x: number
  public y: number
  public size: number
  public baseX: number
  public baseY: number
  public density: number
  public flag: boolean
  public counter: number

  constructor(option) {
    const { canvas, ctx, mouse, x, y } = option

    this.canvas = canvas
    this.ctx = ctx
    this.mouse = mouse

    this.x = x
    this.y = y
    this.size = 1
    this.baseX = this.x
    this.baseY = this.y
    this.density = Math.random() * 10 + 1
    this.flag = false
    this.counter = 0
  }

  update() {
    const dx = this.mouse.x - this.x
    const dy = this.mouse.y - this.y
    const distance = Math.sqrt(dx ** 2 + dy ** 2)
    const forceDirectionX = dx / distance
    const forceDirectionY = dy / distance
    const maxDistance = this.mouse.radius
    const force = (maxDistance - distance) / maxDistance
    const directionX = forceDirectionX * force * this.density
    const directionY = forceDirectionY * force * this.density
    if (!this.flag) {
      if (Math.random() >= 0.5) {
        this.x = Math.random() * this.canvas.width
        this.y =
          Math.random() > 0.5 ? this.canvas.height + Math.random() * 500 : Math.random() * -500
      } else {
        this.x =
          Math.random() > 0.5 ? this.canvas.width + Math.random() * 500 : Math.random() * -500
        this.y = Math.random() * this.canvas.height
      }
      this.flag = !this.flag
    }
    if (distance < this.mouse.radius && this.counter > 125) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX
        this.x -= dx / 30
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY
        this.y -= dy / 30
      }
    }
    this.counter++
  }

  draw() {
    this.ctx.fillStyle = 'white'
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
  }
}
