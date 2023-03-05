export default class Controls {

    /************************/
    /******** FIELDS ********/
    /************************/
    
    public up: boolean = false;
    public down: boolean = false;
    public right: boolean = false;
    public left: boolean = false;

    /************************/
    /****** CONSTRUCTOR *****/
    /************************/

    constructor() {
        // ADD EVENT LISTENER KEY DOWN
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    this.up = true;
                    break;
                case 'ArrowDown':
                case 's':
                    this.down = true;
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.left = true;
                    break;
                case 'ArrowRight':
                case 'd':
                    this.right = true;
                    break;
            }
        });
        // ADD EVENT LISTENER KEY UP
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    this.up = false;
                    break;
                case 'ArrowDown':
                case 's':
                    this.down = false;
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.left = false;
                    break;
                case 'ArrowRight':
                case 'd':
                    this.right = false;
                    break;
            }
        });
    }
}
