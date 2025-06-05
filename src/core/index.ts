import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from 'three';
import { Spaceship } from './spaceship';
import { InputController } from './input.controller';
import { Starfield } from './starfield';
import { CameraController } from './camera.controller';

export class App {
    private declare static instance: App;
    private readonly canvas = document.querySelector('canvas') as HTMLCanvasElement;
    private readonly scene = new Scene();
    private readonly renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
    private readonly perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    private readonly inputController = new InputController();
    private readonly spaceship = new Spaceship(this.scene, this.inputController, 0.2)
    private readonly cameraController = new CameraController(this.perspectiveCamera, this.spaceship)



    private constructor() {
        this.config();
        this.createLight();   
        this.creatInstace();
        this.animate();
        window.addEventListener('resize', this.onResize.bind(this));
    }

    public static start(): void{
        if (App.instance) return
        console.log('App started');
        App.instance = new App();
    }

    private creatInstace(): void {
        this.spaceship.loadModel();
        new Starfield(this.scene);
    }

    private config(): void  {
        this.perspectiveCamera.position.set(0, 8, -10);
        this.perspectiveCamera.lookAt(0, 0, 0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate(): void  {
        this.renderer.render(this.scene, this.perspectiveCamera);
        this.spaceship.update();
        this.cameraController.update()
        requestAnimationFrame(this.animate.bind(this));
    }

    private createLight(): void  {
        // iluminacion
        const ambientLight = new AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    private onResize(): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
        this.perspectiveCamera.updateProjectionMatrix();
    }

}