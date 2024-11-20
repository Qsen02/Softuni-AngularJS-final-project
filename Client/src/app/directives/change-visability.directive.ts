import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appChangeVisability]',
    standalone: true
})
export class ChangeVisabilityDirective implements OnInit, OnDestroy {
    unsubArray: (() => void)[] = [];
    constructor(private elRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        const changeHandler = this.renderer.listen(this.elRef.nativeElement, "click", this.change.bind(this));
        this.unsubArray.push(changeHandler);
    }

    change() {
        const inputRef:HTMLInputElement = this.elRef.nativeElement.parentElement.children[2];
        if (inputRef.type == "password") {
            inputRef.type = "text";
        } else {
            inputRef.type = "password";
        }
    }

    ngOnDestroy(): void {
      this.unsubArray.forEach((eventFn)=>eventFn());
    }
}
