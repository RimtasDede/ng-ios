import { Directive, ElementRef, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';

/**
 * Adds
 */
@Directive({
  selector: 'button[libPressAni]',
})
export class PressAniDirective implements OnInit, OnDestroy {

  private readonly host = inject(ElementRef);
  private readonly builder = inject(AnimationBuilder);

  private animationFactoryIn!: AnimationFactory;
  private animationFactoryOut!: AnimationFactory;
  private playerIn!: AnimationPlayer;
  private playerOut!: AnimationPlayer;

  ngOnInit(): void {
    this.animationFactoryIn = this.builder.build([
      style({ backgroundColor: 'rgba(255, 255, 255, 0)' }),
      animate(`100ms`, style({ backgroundColor: 'rgba(255, 255, 255, 0.5)' }))
    ]);
    this.playerIn = this.animationFactoryIn.create(this.host.nativeElement);

    this.animationFactoryOut = this.builder.build([
      style({ backgroundColor: 'rgba(255, 255, 255, 0.5)' }),
      animate(`400ms ease-out`, style({ backgroundColor: 'rgba(255, 255, 255, 0)' }))
    ]);
    this.playerOut = this.animationFactoryOut.create(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.playerIn.destroy();
    this.playerOut.destroy();
  }

  @HostListener('mousedown')
  pressDown() {
    this.fadeInAnimation();
  }

  @HostListener('mouseup')
  pressUp() {
    this.fadeOutAnimation();
  }

  @HostListener('mouseleave')
  pressLeave() {
    if (this.playerIn.hasStarted()) {
      this.fadeOutAnimation();
    }
  }

  private fadeInAnimation() {
    this.playerOut.reset();
    this.playerIn.play();
  }

  private fadeOutAnimation() {
    this.playerOut.setPosition(
      1 - this.playerIn.getPosition()
    );

    this.playerIn.reset();
    this.playerOut.play();
  }

}
