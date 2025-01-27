import {Directive, Inject, Input} from '@angular/core';
import {
    TuiDestroyService,
    TuiDirectiveStylesService,
    TuiResizeService,
} from '@taiga-ui/cdk';
import {map} from 'rxjs';

import {TuiSensitiveComponent} from './sensitive.component';

const rowsInSvg = 3;

@Directive({
    selector: '[tuiSensitive]',
    providers: [TuiResizeService, TuiDestroyService],
    host: {
        '[style.--t-offset.px]': 'offset',
        '[$.style.--t-mask-height.px]': 'height$',
        '($.style.--t-mask-height.px)': 'height$',
        '[class.tui-sensitive]': 'tuiSensitive',
    },
})
export class TuiSensitiveDirective {
    @Input()
    tuiSensitive: boolean | null = false;

    readonly offset = Math.round(Math.random() * 10) * 10;
    readonly height$ = this.resize$.pipe(
        map(([{contentRect}]) => [
            Math.max(2, Math.floor(contentRect.height / 16) + 1),
            contentRect.height,
        ]),
        map(([rows, height]) => height * (rowsInSvg / rows)),
    );

    constructor(
        @Inject(TuiDirectiveStylesService) directiveStyles: TuiDirectiveStylesService,
        @Inject(TuiResizeService) private readonly resize$: TuiResizeService,
    ) {
        directiveStyles.addComponent(TuiSensitiveComponent);
    }
}
