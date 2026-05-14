// Walks up to find the nearest scrollable ancestor and scrolls the element
// into view there; falls back to window scroll. Mirrors the prototype's
// scrollToEl helper.
export function scrollToEl(el: HTMLElement | null | undefined): void {
  if (!el) return;
  let parent: HTMLElement | null = el.parentElement;
  while (parent) {
    const style = getComputedStyle(parent);
    if (/(auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight) {
      const top =
        el.getBoundingClientRect().top - parent.getBoundingClientRect().top + parent.scrollTop - 40;
      parent.scrollTo({ top, behavior: 'smooth' });
      return;
    }
    parent = parent.parentElement;
  }
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
}
