import { animate, state, style, transition, trigger } from "@angular/animations";



export const slideInAnimationModals =
    trigger('modalAnimation', [
        state('void', style({

            transform: "translateX(100%)"
        }
        )),
        state('*', style({

        })),
        transition("void <=> *", animate('0.3s ease-out')),
    ]) 