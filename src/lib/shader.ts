import { Result, ok, err } from "true-myth/result"

function createShader(
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string
): Result<WebGLShader, string> {
  const shader = gl.createShader(type)

  if (shader === null) {
    return err("Shader could not be created")
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    return err(`Shader could not be compiled. Log: ${log}`)
  }

  return ok(shader)
}

export function createShaderProgram(
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
): Result<WebGLProgram, string> {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  )

  if (vertexShader.isErr || fragmentShader.isErr) {
    const errorMessage = [
      "Error during shader creation.",
      vertexShader.isErr ? vertexShader.error : "",
      fragmentShader.isErr ? fragmentShader.error : "",
    ]

    return err(errorMessage.join(" "))
  }

  const program = gl.createProgram()

  if (program === null) {
    return err("Error during program creation")
  }

  gl.attachShader(program, vertexShader.value)
  gl.attachShader(program, fragmentShader.value)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return err(`Error during program linking: ${gl.getProgramInfoLog(program)}`)
  }

  return ok(program)
}
