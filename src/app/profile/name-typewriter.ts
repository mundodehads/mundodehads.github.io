import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { INITIAL_TYPEWRITER_STEP, nextTypewriterStep, visibleTextOf } from './typewriter-step';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

@Component({
  selector: 'app-name-typewriter',
  templateUrl: './name-typewriter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameTypewriter {
  private readonly typewriterState = signal(INITIAL_TYPEWRITER_STEP.state);
  private pendingTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly visibleText = computed(() => visibleTextOf(this.typewriterState()));

  constructor() {
    afterNextRender(() => this.startTyping());
    inject(DestroyRef).onDestroy(() => clearTimeout(this.pendingTimer));
  }

  private startTyping(): void {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      return;
    }
    this.scheduleNextStep(INITIAL_TYPEWRITER_STEP.delayInMilliseconds);
  }

  private scheduleNextStep(delayInMilliseconds: number): void {
    this.pendingTimer = setTimeout(() => this.advance(), delayInMilliseconds);
  }

  private advance(): void {
    const typewriterStep = nextTypewriterStep(this.typewriterState());
    this.typewriterState.set(typewriterStep.state);
    this.scheduleNextStep(typewriterStep.delayInMilliseconds);
  }
}
