import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, type Scene } from "three";

export class Starfield {
    private declare starField: Points;

    constructor(
        private readonly scene: Scene,
        private readonly starQty: number = 30000,
        private readonly range: number = 1000,
    ){
        this.createStarField();
    }

    private createStarField(): void{
        const positions = new Float32Array(this.starQty * 3); //posiciones de las estrellas en 3d

        for (let i = 0; i < this.starQty; i++ ){
            positions[i * 3] = Math.random() * this.range - this.range / 2; // Posicion X
            positions[i * 3 + 1] = Math.random() * this.range - this.range / 2; // Posición en Y
            positions[i * 3 + 2] = Math.random() * this.range - this.range / 2 // Posición en Z
        }

        const geometry = new BufferGeometry()
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        
        const material = new PointsMaterial({
            color: 0xccccff,
            size: 1,
            transparent: true,
            opacity: 0.7,
            depthTest: true,
        })

        this.starField = new Points(geometry, material)

        this.scene.add(this.starField);
    }
}