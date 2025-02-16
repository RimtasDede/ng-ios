import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {

  @Input({ required: true }) pagesTotal!: number;
  @Input({ required: true }) currentPage!: number;

  /**
   * How much pages maximum to display.
   * Pages will be hidden and small page indicator will show if in that side is more pages.
   */
  @Input() maxWidth: number = 4;

  @HostBinding('style.width') hostWidth: string = 'auto';

  pagesArr: number[] = [];
  showFrom: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const currentPage = changes['currentPage'];
    const pagesTotal = changes['pagesTotal'];
    const maxWidth = changes['maxWidth'];

    // handle pagination width
    if (maxWidth || pagesTotal) {
      this.hostWidth = Math.min(
        maxWidth?.currentValue || this.maxWidth,
        pagesTotal?.currentValue || this.pagesTotal
      ) + 'em';
    }

    if (pagesTotal) {
      this.pagesArr = new Array(pagesTotal.currentValue + 1).fill(null).map((val, i) => i);
    }

    if (currentPage) {
      // move pages window to right
      if (currentPage.currentValue > this.showFrom + this.maxWidth - 2) {
        let from = this.currentPage - this.maxWidth + 2;

        if (from + this.maxWidth > this.pagesTotal) {
          from = this.pagesTotal - this.maxWidth + 1;
        }

        this.showFrom = from;
      }

      // move pages window to left
      if (currentPage.currentValue < this.showFrom + 1) {
        let from = currentPage.currentValue - 1;

        if (from < 0) {
          from = 0;
        }

        this.showFrom = from;
      }
    }
  }

}
