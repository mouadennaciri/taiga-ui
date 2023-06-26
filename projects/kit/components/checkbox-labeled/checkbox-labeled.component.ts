import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Inject,
    Input,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    AbstractTuiNullableControl,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiFocusableElementAccessor,
    tuiIsNativeFocused,
    TuiNativeFocusableElement,
} from '@taiga-ui/cdk';
import {
    TUI_CHECKBOX_OPTIONS,
    TuiBrightness,
    TuiCheckboxOptions,
    TuiModeDirective,
    TuiSizeL,
} from '@taiga-ui/core';
import {TuiCheckboxComponent} from '@taiga-ui/kit/components/checkbox';

@Component({
    selector: 'tui-checkbox-labeled',
    templateUrl: './checkbox-labeled.template.html',
    styleUrls: ['./checkbox-labeled.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiCheckboxLabeledComponent),
        tuiAsControl(TuiCheckboxLabeledComponent),
    ],
})
export class TuiCheckboxLabeledComponent
    extends AbstractTuiNullableControl<boolean>
    implements TuiFocusableElementAccessor
{
    @ViewChild(TuiCheckboxComponent)
    private readonly checkbox?: TuiCheckboxComponent;

    @Input()
    @HostBinding('attr.data-size')
    size: TuiSizeL = this.options.size;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) cdr: ChangeDetectorRef,
        @Optional()
        @Inject(TuiModeDirective)
        private readonly modeDirective: TuiModeDirective | null,
        @Inject(TUI_CHECKBOX_OPTIONS)
        private readonly options: TuiCheckboxOptions,
    ) {
        super(control, cdr);
    }

    get focused(): boolean {
        return tuiIsNativeFocused(this.nativeFocusableElement);
    }

    get nativeFocusableElement(): TuiNativeFocusableElement | null {
        return this.checkbox ? this.checkbox.nativeFocusableElement : null;
    }

    @HostBinding('attr.data-mode')
    get hostMode(): TuiBrightness | null {
        return this.modeDirective ? this.modeDirective.mode : null;
    }

    onFocused(focused: boolean): void {
        this.updateFocused(focused);
    }

    /** @deprecated use 'value' setter */
    onModelChange(value: boolean): void {
        this.value = value;
    }
}
