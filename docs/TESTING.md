# Testing

Run `make check`, `make clean kernel verify`, and then build the ISO after installing the pinned Limine boot files. The GitHub Actions workflow builds the ISO and attempts a QEMU serial smoke test. A successful compiler/linker run alone does not prove boot. Record failures as well as successes; do not claim physical-hardware compatibility from a VM test.
