# AlteOS 7 — kernel development branch

This branch contains the early freestanding x86-64 kernel and a cloud workflow intended to produce a bootable development ISO.

## Build
```sh
make check
make clean kernel verify
```

The kernel currently emits serial diagnostics, attempts to clear a 32-bpp Limine framebuffer and halts. It is **not** a complete desktop operating system. No installer, persistent filesystem, hardware driver suite, native app platform, app store or Windows compatibility layer is implemented.

## ISO and smoke test
GitHub Actions downloads/builds Limine, installs ISO tooling, creates `build/alteous7.iso`, applies the BIOS boot installation and attempts a QEMU serial boot check. The ISO and kernel ELF are uploaded as workflow artifacts when the workflow reaches the artifact step. See `docs/ROADMAP.md` for remaining work.

## Safety
Use QEMU first. This project does not include a disk installer and must not be used as a daily-use OS.
