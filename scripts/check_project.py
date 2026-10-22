#!/usr/bin/env python3
from pathlib import Path
import json, sys
root = Path(__file__).resolve().parents[1]
required = ["README.md", "Makefile", "limine.conf", "kernel/main.c", "kernel/linker.ld", "include/limine.h", "docs/ARCHITECTURE.md", "docs/ROADMAP.md", "docs/SECURITY.md", "docs/HARDWARE-COMPATIBILITY.md"]
missing = [p for p in required if not (root / p).is_file()]
if missing:
    print("Missing required files:", ", ".join(missing)); sys.exit(1)
for name in ("lite", "home", "pro", "education"):
    path = root / "config" / "editions" / f"{name}.json"
    try:
        data = json.loads(path.read_text())
        assert data.get("name", "").startswith("AlteOS 7 ")
        assert data.get("status")
    except Exception as exc:
        print(f"Invalid edition profile {path}: {exc}"); sys.exit(1)
source = (root / "kernel" / "main.c").read_text()
if "void kmain(void)" not in source or "serial_write" not in source or "framebuffer_clear" not in source:
    print("Expected kernel entry/diagnostics not found."); sys.exit(1)
print("AlteOS 7 source checks passed.")
print("Note: this is not a kernel build or boot test.")
