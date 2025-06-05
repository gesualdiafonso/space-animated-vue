export class InputController {
    private keys: { [key: string]: boolean } = {}

    constructor(){
        this.listenToEvents()
    }

    public isPressed( keyCode: string): boolean{
        return !!this.keys[keyCode]
    }
    public onKeyDown(event: KeyboardEvent){
        this.keys[event.code] = true
    }
    
    public onKeyUp(event: KeyboardEvent): void{
        this.keys[event.code] = false
    }

    private listenToEvents(): void{
        window.addEventListener('keydown', this.onKeyDown.bind(this))
        window.addEventListener('keyup', this.onKeyUp.bind(this))
    }
}