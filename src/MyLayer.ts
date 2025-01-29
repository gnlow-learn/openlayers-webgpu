import { Layer, FrameState } from "./deps.ts"
// @ts-types="https://denopkg.com/gnlow/lilgpu@0535935/browser.ts"
import { initCanvas } from "https://esm.sh/gh/gnlow/lilgpu@0535935/browser.ts"

export class MyLayer extends Layer {
    canvas
    draw
    constructor(
        canvas: HTMLCanvasElement,
        draw: () => HTMLCanvasElement,
    ) {
        super({})
        this.canvas = canvas
        this.draw = draw
    }

    override render(frameState: FrameState | null) {
        if (!frameState) return null
        console.log(frameState.extent, frameState.viewState.projection.getCode())
        this.canvas.width = frameState.size[0]
        this.canvas.height = frameState.size[1]
        return this.draw()
    }

    static async from() {
        const canvas = document.createElement("canvas")
        const g = await initCanvas({
            vertShader: `
                @vertex
                fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4<f32> {
                    let x = f32(i32(in_vertex_index) - 1);
                    let y = f32(i32(in_vertex_index & 1u) * 2 - 1);
                    return vec4<f32>(x, y, 0.0, 1.0);
                }
            `,
            fragShader: `
                @fragment
                fn fs_main() -> @location(0) vec4<f32> {
                    return vec4<f32>(1.0, 0.0, 0.0, 1.0);
                }
            `,
            canvas,
        })
        return new MyLayer(canvas, () => {
            g.draw(3)
            return canvas
        })
    }
}
