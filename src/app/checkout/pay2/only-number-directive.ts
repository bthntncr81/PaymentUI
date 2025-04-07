import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const original = input.value;
    const filtered = original.replace(/[^0-9]/g, '');

    if (original !== filtered) {
      input.value = filtered;
      // Dispatch an input event so Angular updates the value
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeInputValueSetter?.call(input, filtered);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}