---
"@workleap/r2wc": patch
---

Fix the wrong render() call when a widget is removed removed, unmount() is called, and then a new widget gets mounted all on a same thread.
