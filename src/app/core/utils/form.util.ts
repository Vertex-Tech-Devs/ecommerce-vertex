import type { FormGroup } from '@angular/forms';

/**
 * Patches a form value and marks the form as dirty.
 * patchValue() does NOT mark the form dirty by default, which can prevent
 * save buttons from becoming enabled when they rely on !form.dirty.
 */
export function patchAndMarkDirty<T extends Record<string, unknown>>(
  form: FormGroup,
  value: Partial<T>,
  options?: { emitEvent?: boolean }
): void {
  form.patchValue(value, options);
  form.markAsDirty();
}
