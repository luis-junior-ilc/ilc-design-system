import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  input,
  signal,
  viewChild,
  OnDestroy
} from '@angular/core';

export type IlcScrollAxis = 'vertical' | 'horizontal' | 'both';
export type IlcScrollSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ilc-scroll-area',
  standalone: true,
  templateUrl: './ilc-scroll-area.component.html',
  styleUrl: './ilc-scroll-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-size]': 'size()',
    '[class.ilc-scroll-area--horizontal]': 'axis() === "horizontal" || axis() === "both"'
  }
})
export class IlcScrollAreaComponent implements OnDestroy {
  readonly axis = input<IlcScrollAxis>('vertical');
  readonly size = input<IlcScrollSize>('md');
  readonly label = input('');
  readonly trackProgress = input(true);
  readonly scrollToTopOnContentChange = input(false);

  readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');

  readonly scrolled = signal(false);
  readonly atStart = signal(true);
  readonly atEnd = signal(false);
  readonly verticalThumb = signal(1);
  readonly verticalOffset = signal(0);
  readonly horizontalThumb = signal(1);
  readonly horizontalOffset = signal(0);

  readonly hasOverflowX = signal(false);
  readonly hasOverflowY = signal(false);

  readonly showScrollbar = computed(() => this.trackProgress() && (this.hasOverflowX() || this.hasOverflowY()));

  constructor() {
    afterNextRender(() => {
      const element = this.viewport().nativeElement;
      element.addEventListener('scroll', this.handleScroll, { passive: true });
      this.update();
      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => this.update());
        observer.observe(element);
        if (element.firstElementChild) {
          observer.observe(element.firstElementChild);
        }
      }
    });
  }

  private readonly handleScroll = (): void => this.update();

  private update(): void {
    const element = this.viewport().nativeElement;
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = element;
    const overflowY = scrollHeight - clientHeight;
    const overflowX = scrollWidth - clientWidth;

    this.hasOverflowY.set(overflowY > 1);
    this.hasOverflowX.set(overflowX > 1);
    this.atStart.set(scrollTop <= 1 && scrollLeft <= 1);
    this.atEnd.set(scrollTop >= overflowY - 1 && scrollLeft >= overflowX - 1);
    this.scrolled.set(scrollTop > 1 || scrollLeft > 1);

    if (overflowY > 0) {
      const ratio = clientHeight / scrollHeight;
      this.verticalThumb.set(ratio);
      this.verticalOffset.set((scrollTop / overflowY) * (1 - ratio));
    } else {
      this.verticalThumb.set(1);
      this.verticalOffset.set(0);
    }

    if (overflowX > 0) {
      const ratio = clientWidth / scrollWidth;
      this.horizontalThumb.set(ratio);
      this.horizontalOffset.set((scrollLeft / overflowX) * (1 - ratio));
    } else {
      this.horizontalThumb.set(1);
      this.horizontalOffset.set(0);
    }

    if (this.scrollToTopOnContentChange() && !this.scrolled()) {
      element.scrollTop = 0;
    }
  }

  scrollToTop(): void {
    this.viewport().nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    const element = this.viewport().nativeElement;
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.viewport().nativeElement.removeEventListener('scroll', this.handleScroll);
  }
}